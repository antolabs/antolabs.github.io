const fs = require("fs");
const path = require("path");
const http = require("http");
const { chromium } = require("playwright");

function getArg(name, fallback = "") {
  const idx = process.argv.indexOf(name);
  if (idx >= 0 && idx + 1 < process.argv.length) return process.argv[idx + 1];
  return fallback;
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".js":
      return "application/javascript; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".ico":
      return "image/x-icon";
    case ".pdf":
      return "application/pdf";
    default:
      return "application/octet-stream";
  }
}

function createStaticServer(rootDir) {
  const root = path.resolve(rootDir);
  return http.createServer((req, res) => {
    try {
      const reqPath = decodeURIComponent((req.url || "/").split("?")[0].split("#")[0]);
      let targetPath = path.join(root, reqPath);
      if (!targetPath.startsWith(root)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }

      if (reqPath.endsWith("/")) {
        targetPath = path.join(root, reqPath, "index.html");
      } else {
        const hasExt = path.extname(reqPath) !== "";
        if (!hasExt) {
          const asDirIndex = path.join(root, reqPath, "index.html");
          if (fs.existsSync(asDirIndex)) targetPath = asDirIndex;
        }
      }

      if (!fs.existsSync(targetPath)) {
        res.writeHead(404);
        res.end("Not Found");
        return;
      }

      const stat = fs.statSync(targetPath);
      if (stat.isDirectory()) {
        const idx = path.join(targetPath, "index.html");
        if (!fs.existsSync(idx)) {
          res.writeHead(404);
          res.end("Not Found");
          return;
        }
        targetPath = idx;
      }

      res.writeHead(200, { "Content-Type": contentType(targetPath) });
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
    const resp = await context.request.get(url, { timeout: 20000, maxRedirects: 5 });
    return { url, ok: resp.status() < 400, status: resp.status() };
  } catch (err) {
    return { url, ok: false, status: null, error: String(err.message || err) };
  }
}

async function runAudit(baseUrl) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const out = {
    baseUrl,
    pageStatus: {},
    navChecks: [],
    publications: {
      doiLinkCount: 0,
      pdfLinkCount: 0,
      citeButtonCount: 0,
      doiSampleChecks: [],
      pdfSampleChecks: [],
      citeModalOpened: null,
    },
    cv: {
      pdfLink: null,
      pdfCheck: null,
    },
    runtimeErrors: [],
  };

  page.on("pageerror", (e) => out.runtimeErrors.push({ type: "pageerror", message: e.message }));
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      out.runtimeErrors.push({ type: "console", message: msg.text() });
    }
  });

  const homeResp = await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  out.pageStatus.home = homeResp ? homeResp.status() : null;

  const navLinks = await page.$$eval("nav a.nav-link", (els) =>
    els.map((el) => ({
      text: (el.textContent || "").trim(),
      href: el.getAttribute("href") || "",
    }))
  );

  for (const link of navLinks) {
    if (!link.href || link.href.startsWith("#")) continue;
    const url = new URL(link.href, baseUrl).toString();
    const resp = await page.goto(url, { waitUntil: "domcontentloaded" });
    out.navChecks.push({
      text: link.text,
      url,
      status: resp ? resp.status() : null,
      ok: resp ? resp.status() < 400 : false,
    });
  }

  const pubUrl = new URL("/publications/", baseUrl).toString();
  const pubResp = await page.goto(pubUrl, { waitUntil: "domcontentloaded" });
  out.pageStatus.publications = pubResp ? pubResp.status() : null;

  const doiLinks = await page.$$eval("a", (els) =>
    els
      .map((a) => ({ href: a.href || "", text: (a.textContent || "").trim() }))
      .filter((x) => x.href && (x.href.includes("doi.org") || /^doi$/i.test(x.text)))
      .map((x) => x.href)
  );
  const pdfLinks = await page.$$eval("a", (els) =>
    els
      .map((a) => ({ href: a.href || "", text: (a.textContent || "").trim() }))
      .filter((x) => x.href && (/\.pdf(?:$|\?)/i.test(x.href) || /^pdf$/i.test(x.text)))
      .map((x) => x.href)
  );
  out.publications.doiLinkCount = uniq(doiLinks).length;
  out.publications.pdfLinkCount = uniq(pdfLinks).length;

  const citeButtons = await page.$$eval("a,button", (els) =>
    els.filter((el) => (el.textContent || "").trim().toLowerCase() === "cite").length
  );
  out.publications.citeButtonCount = citeButtons;

  for (const u of uniq(doiLinks).slice(0, 8)) {
    out.publications.doiSampleChecks.push(await checkUrl(context, u));
  }
  for (const u of uniq(pdfLinks).slice(0, 8)) {
    out.publications.pdfSampleChecks.push(await checkUrl(context, u));
  }

  if (citeButtons > 0) {
    try {
      await page.getByText("Cite", { exact: true }).first().click({ timeout: 5000 });
      await page.waitForFunction(() => {
        const modal = document.getElementById("citation-modal");
        if (!modal) return false;
        const style = window.getComputedStyle(modal);
        return style.display !== "none" && style.visibility !== "hidden";
      }, { timeout: 3000 });
      out.publications.citeModalOpened = true;
    } catch (_err) {
      out.publications.citeModalOpened = false;
    }
  }

  const cvUrl = new URL("/cv/", baseUrl).toString();
  const cvResp = await page.goto(cvUrl, { waitUntil: "domcontentloaded" });
  out.pageStatus.cv = cvResp ? cvResp.status() : null;
  const cvPdf = await page.$eval("a[href*='.pdf']", (a) => a.href).catch(() => null);
  out.cv.pdfLink = cvPdf;
  if (cvPdf) out.cv.pdfCheck = await checkUrl(context, cvPdf);

  await browser.close();
  out.runtimeErrors = uniq(out.runtimeErrors.map((x) => `${x.type}: ${x.message}`)).map((x) => ({ message: x }));
  return out;
}

async function main() {
  const siteDir = getArg("--siteDir");
  const output = getArg("--out");
  const port = Number(getArg("--port", "4123"));
  if (!siteDir || !output) {
    console.error("Usage: node functional_playwright_audit.js --siteDir <dir> --out <json> [--port 4123]");
    process.exit(2);
  }

  const server = createStaticServer(siteDir);
  await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
  try {
    const result = await runAudit(`http://127.0.0.1:${port}/`);
    fs.writeFileSync(output, JSON.stringify(result, null, 2), "utf-8");
    console.log(`Wrote ${output}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
