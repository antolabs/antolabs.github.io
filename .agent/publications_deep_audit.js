const fs = require('fs');
const path = require('path');
const http = require('http');
const { chromium } = require('playwright');

function getArg(name, fallback = '') {
  const idx = process.argv.indexOf(name);
  if (idx >= 0 && idx + 1 < process.argv.length) return process.argv[idx + 1];
  return fallback;
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.js': return 'application/javascript; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    case '.svg': return 'image/svg+xml';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.webp': return 'image/webp';
    case '.gif': return 'image/gif';
    case '.ico': return 'image/x-icon';
    case '.pdf': return 'application/pdf';
    default: return 'application/octet-stream';
  }
}

function createStaticServer(rootDir) {
  const root = path.resolve(rootDir);
  return http.createServer((req, res) => {
    try {
      const reqPath = decodeURIComponent((req.url || '/').split('?')[0].split('#')[0]);
      let targetPath = path.join(root, reqPath);
      if (!targetPath.startsWith(root)) {
        res.writeHead(403); res.end('Forbidden'); return;
      }
      if (reqPath.endsWith('/')) {
        targetPath = path.join(root, reqPath, 'index.html');
      } else if (path.extname(reqPath) === '') {
        const asDirIndex = path.join(root, reqPath, 'index.html');
        if (fs.existsSync(asDirIndex)) targetPath = asDirIndex;
      }
      if (!fs.existsSync(targetPath)) {
        res.writeHead(404); res.end('Not Found'); return;
      }
      const stat = fs.statSync(targetPath);
      if (stat.isDirectory()) {
        const idx = path.join(targetPath, 'index.html');
        if (!fs.existsSync(idx)) { res.writeHead(404); res.end('Not Found'); return; }
        targetPath = idx;
      }
      res.writeHead(200, { 'Content-Type': contentType(targetPath) });
      fs.createReadStream(targetPath).pipe(res);
    } catch (err) {
      res.writeHead(500); res.end(String(err));
    }
  });
}

function uniq(arr) { return Array.from(new Set(arr)); }

async function checkUrl(context, url) {
  try {
    const resp = await context.request.get(url, { timeout: 20000, maxRedirects: 5 });
    return { url, status: resp.status(), ok: resp.status() < 400 };
  } catch (err) {
    return { url, status: null, ok: false, error: String(err.message || err) };
  }
}

async function run(baseUrl) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const out = {
    baseUrl,
    publications: {
      doiChecks: [],
      pdfChecks: [],
      citeButtonCount: 0,
      citeChecks: [],
    },
    home: { socialChecks: [] },
    cv: { pdfCheck: null },
    runtimeErrors: []
  };

  page.on('pageerror', (e) => out.runtimeErrors.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => { if (msg.type() === 'error') out.runtimeErrors.push(`console: ${msg.text()}`); });

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  const socialLinks = await page.$$eval('a[href*="researchgate.net"],a[href*="scholar.google.com"],a[href*="orcid.org"],a[href*="scopus.com"],a[href*="frib.msu.edu"],a[href*="msu.edu"]', els => els.map(e => e.href));
  for (const u of uniq(socialLinks)) out.home.socialChecks.push(await checkUrl(context, u));

  await page.goto(new URL('/publications/', baseUrl).toString(), { waitUntil: 'domcontentloaded' });

  const doiLinks = await page.$$eval('a[href*="doi.org"]', els => els.map(e => e.href));
  const pdfLinks = await page.$$eval('a[href$=".pdf"],a[href*=".pdf?"]', els => els.map(e => e.href));
  const citeCount = await page.$$eval('.btn-cite', els => els.length);

  out.publications.citeButtonCount = citeCount;

  for (const u of uniq(doiLinks)) out.publications.doiChecks.push(await checkUrl(context, u));
  for (const u of uniq(pdfLinks)) out.publications.pdfChecks.push(await checkUrl(context, u));

  for (let i = 0; i < citeCount; i++) {
    const row = { index: i + 1, opened: false, contentLength: 0 };
    try {
      await page.locator('.btn-cite').nth(i).click({ timeout: 5000 });
      await page.waitForFunction(() => {
        const modal = document.getElementById('citation-modal');
        if (!modal) return false;
        const style = window.getComputedStyle(modal);
        return style.display !== 'none' && style.visibility !== 'hidden';
      }, { timeout: 3000 });
      const citationText = await page.locator('#citation-content').innerText();
      row.opened = true;
      row.contentLength = (citationText || '').trim().length;
      await page.locator('#citation-close-btn').click({ timeout: 3000 });
      await page.waitForFunction(() => {
        const modal = document.getElementById('citation-modal');
        if (!modal) return false;
        const style = window.getComputedStyle(modal);
        return style.display === 'none';
      }, { timeout: 3000 });
    } catch (err) {
      row.error = String(err.message || err);
    }
    out.publications.citeChecks.push(row);
  }

  await page.goto(new URL('/cv/', baseUrl).toString(), { waitUntil: 'domcontentloaded' });
  const cvPdf = await page.$eval('a[href*=".pdf"]', a => a.href).catch(() => null);
  if (cvPdf) out.cv.pdfCheck = await checkUrl(context, cvPdf);

  out.runtimeErrors = uniq(out.runtimeErrors);

  await browser.close();
  return out;
}

async function main() {
  const siteDir = getArg('--siteDir');
  const outFile = getArg('--out');
  const port = Number(getArg('--port', '4130'));
  if (!siteDir || !outFile) {
    console.error('Usage: node publications_deep_audit.js --siteDir <dir> --out <json> [--port 4130]');
    process.exit(2);
  }
  const server = createStaticServer(siteDir);
  await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));
  try {
    const result = await run(`http://127.0.0.1:${port}/`);
    fs.writeFileSync(outFile, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`Wrote ${outFile}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
