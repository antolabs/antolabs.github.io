const fs = require('fs');
const { chromium } = require('playwright');

const URLS = [
  'https://doi.org/10.1080/00223131.2025.2464742',
  'https://doi.org/10.1002/er.5100',
  'https://doi.org/10.1002/er.4080',
  'https://www.researchgate.net/profile/Geunhyeong-Lee-3/',
  'https://www.scopus.com/authid/detail.uri?authorId=56779304800'
];

const CHROME_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

function getArg(name, fallback = '') {
  const idx = process.argv.indexOf(name);
  if (idx >= 0 && idx + 1 < process.argv.length) return process.argv[idx + 1];
  return fallback;
}

async function requestCheck(ctx, url) {
  try {
    const resp = await ctx.request.get(url, { timeout: 35000, maxRedirects: 10 });
    return {
      url,
      ok: resp.ok(),
      status: resp.status(),
      finalUrl: resp.url()
    };
  } catch (err) {
    return {
      url,
      ok: false,
      status: null,
      finalUrl: null,
      error: String(err.message || err)
    };
  }
}

async function navCheck(page, url) {
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(2000);

    const title = await page.title().catch(() => null);
    const bodyText = await page.evaluate(() => {
      const txt = (document.body && document.body.innerText) ? document.body.innerText : '';
      return txt.slice(0, 1200);
    }).catch(() => '');

    const blockedLike = /(access denied|forbidden|captcha|verify you are human|not authorized|robot)/i.test(bodyText || '');

    return {
      url,
      status: resp ? resp.status() : null,
      finalUrl: page.url(),
      title,
      blockedLike,
      textSnippet: (bodyText || '').slice(0, 300)
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
  }
}

async function run() {
  const outFile = getArg('--out', '.agent/external_link_recheck.json');
  const out = {
    checkedAt: new Date().toISOString(),
    urls: URLS,
    requestDefault: [],
    requestBrowserUA: [],
    navHeadless: [],
    navHeaded: {
      supported: null,
      results: []
    }
  };

  const browser = await chromium.launch({ headless: true });
  const ctxDefault = await browser.newContext();
  const pageDefault = await ctxDefault.newPage();

  for (const url of URLS) {
    out.requestDefault.push(await requestCheck(ctxDefault, url));
  }
  for (const url of URLS) {
    out.navHeadless.push(await navCheck(pageDefault, url));
  }

  const ctxUA = await browser.newContext({
    userAgent: CHROME_UA,
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
      'Upgrade-Insecure-Requests': '1'
    }
  });

  for (const url of URLS) {
    out.requestBrowserUA.push(await requestCheck(ctxUA, url));
  }

  await browser.close();

  // Try headed mode if environment supports GUI.
  try {
    const headedBrowser = await chromium.launch({ headless: false });
    out.navHeaded.supported = true;
    const headedCtx = await headedBrowser.newContext({
      userAgent: CHROME_UA,
      extraHTTPHeaders: {
        'Accept-Language': 'en-US,en;q=0.9',
        'Upgrade-Insecure-Requests': '1'
      }
    });
    const headedPage = await headedCtx.newPage();
    for (const url of URLS) {
      out.navHeaded.results.push(await navCheck(headedPage, url));
    }
    await headedBrowser.close();
  } catch (err) {
    out.navHeaded.supported = false;
    out.navHeaded.error = String(err.message || err);
  }

  fs.writeFileSync(outFile, JSON.stringify(out, null, 2), 'utf-8');
  console.log(`Wrote ${outFile}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
