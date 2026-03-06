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
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      if (reqPath.endsWith('/')) {
        targetPath = path.join(root, reqPath, 'index.html');
      } else if (path.extname(reqPath) === '') {
        const asDirIndex = path.join(root, reqPath, 'index.html');
        if (fs.existsSync(asDirIndex)) targetPath = asDirIndex;
      }

      if (!fs.existsSync(targetPath)) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }

      const stat = fs.statSync(targetPath);
      if (stat.isDirectory()) {
        const idx = path.join(targetPath, 'index.html');
        if (!fs.existsSync(idx)) {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
        targetPath = idx;
      }

      res.writeHead(200, { 'Content-Type': contentType(targetPath) });
      fs.createReadStream(targetPath).pipe(res);
    } catch (err) {
      res.writeHead(500);
      res.end(String(err));
    }
  });
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

async function checkUrl(context, url) {
  try {
    const r = await context.request.get(url, { timeout: 30000, maxRedirects: 10 });
    return { url, status: r.status(), ok: r.ok(), finalUrl: r.url() };
  } catch (err) {
    return { url, status: null, ok: false, finalUrl: null, error: String(err.message || err) };
  }
}

async function checkExternalNav(context, url) {
  const p = await context.newPage();
  try {
    const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await p.waitForTimeout(1500);
    const title = await p.title().catch(() => null);
    const snippet = await p.evaluate(() => ((document.body && document.body.innerText) || '').slice(0, 300)).catch(() => '');
    const blockedLike = /(access denied|forbidden|captcha|verify you are human|temporarily unavailable|blocked|security verification)/i.test(snippet || '');
    return {
      url,
      status: r ? r.status() : null,
      finalUrl: p.url(),
      title,
      blockedLike,
      textSnippet: snippet
    };
  } catch (err) {
    return {
      url,
      status: null,
      finalUrl: null,
      title: null,
      blockedLike: null,
      textSnippet: null,
      error: String(err.message || err)
    };
  } finally {
    await p.close().catch(() => {});
  }
}

async function clickDownload(page, locator) {
  try {
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 6000 }),
      locator.click({ timeout: 5000 })
    ]);
    const failure = await download.failure();
    return {
      triggered: true,
      failure: failure || null,
      suggestedFilename: download.suggestedFilename()
    };
  } catch (err) {
    return {
      triggered: false,
      failure: String(err.message || err)
    };
  }
}

async function run(baseUrl, headedPreferred) {
  const out = {
    baseUrl,
    browser: { headedRequested: headedPreferred, headedUsed: null },
    publications: {
      doiCount: 0,
      pdfCount: 0,
      citeCount: 0,
      doiChecks: [],
      pdfChecks: [],
      citeChecks: []
    },
    cv: {
      pdfLink: null,
      pdfStatus: null,
      clickDownload: null
    },
    runtimeErrors: []
  };

  let browser;
  try {
    browser = await chromium.launch({ headless: !headedPreferred });
    out.browser.headedUsed = headedPreferred;
  } catch (_err) {
    browser = await chromium.launch({ headless: true });
    out.browser.headedUsed = false;
  }

  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();

  page.on('pageerror', (e) => out.runtimeErrors.push(`pageerror: ${e.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') out.runtimeErrors.push(`console: ${msg.text()}`);
  });

  await page.goto(new URL('/publications/', baseUrl).toString(), { waitUntil: 'domcontentloaded' });

  await page.waitForFunction(() => document.querySelectorAll('.btn-cite').length >= 13, null, { timeout: 15000 });
  await page.waitForFunction(() => document.querySelectorAll('.btn-pdf').length >= 13, null, { timeout: 20000 });

  const doiLinks = await page.$$eval('a[href*="doi.org/"]', (els) => els.map((e) => e.href));
  const pdfLinks = await page.$$eval('.btn-pdf', (els) =>
    els.map((e) => ({
      href: e.href,
      hasDownload: e.hasAttribute('download'),
      target: e.getAttribute('target')
    }))
  );
  const citeCount = await page.$$eval('.btn-cite', (els) => els.length);

  out.publications.doiCount = uniq(doiLinks).length;
  out.publications.pdfCount = pdfLinks.length;
  out.publications.citeCount = citeCount;

  for (const href of uniq(doiLinks)) {
    out.publications.doiChecks.push(await checkExternalNav(context, href));
  }

  for (let i = 0; i < pdfLinks.length; i++) {
    const btnInfo = pdfLinks[i];
    const status = await checkUrl(context, btnInfo.href);
    const clickResult = await clickDownload(page, page.locator('.btn-pdf').nth(i));
    out.publications.pdfChecks.push({
      index: i + 1,
      href: btnInfo.href,
      hasDownload: btnInfo.hasDownload,
      target: btnInfo.target,
      status,
      clickDownload: clickResult
    });
  }

  for (let i = 0; i < citeCount; i++) {
    const row = { index: i + 1, opened: false, contentLength: 0 };
    try {
      await page.locator('.btn-cite').nth(i).click({ timeout: 5000 });
      await page.waitForFunction(() => {
        const modal = document.getElementById('citation-modal');
        if (!modal) return false;
        return window.getComputedStyle(modal).display !== 'none';
      }, null, { timeout: 3000 });
      const text = await page.locator('#citation-content').innerText();
      row.opened = true;
      row.contentLength = (text || '').trim().length;
      await page.locator('#citation-close-btn').click({ timeout: 3000 });
      await page.waitForFunction(() => {
        const modal = document.getElementById('citation-modal');
        if (!modal) return false;
        return window.getComputedStyle(modal).display === 'none';
      }, null, { timeout: 3000 });
    } catch (err) {
      row.error = String(err.message || err);
    }
    out.publications.citeChecks.push(row);
  }

  await page.goto(new URL('/cv/', baseUrl).toString(), { waitUntil: 'domcontentloaded' });
  const cvLink = await page.$eval('a[href*=".pdf"]', (a) => a.href).catch(() => null);
  out.cv.pdfLink = cvLink;
  if (cvLink) {
    out.cv.pdfStatus = await checkUrl(context, cvLink);
    const cvLocator = page.locator('a[href*=".pdf"]').first();
    out.cv.clickDownload = await clickDownload(page, cvLocator);
  }

  out.runtimeErrors = uniq(out.runtimeErrors);

  await browser.close();
  return out;
}

async function main() {
  const siteDir = getArg('--siteDir', '_site');
  const outFile = getArg('--out', '.agent/user_flow_click_audit.json');
  const port = Number(getArg('--port', '4140'));
  const headed = getArg('--headed', 'true').toLowerCase() === 'true';

  const server = createStaticServer(siteDir);
  await new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));
  try {
    const result = await run(`http://127.0.0.1:${port}/`, headed);
    fs.writeFileSync(outFile, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`Wrote ${outFile}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
