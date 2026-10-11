// Takes one screenshot per catalog entry and records it in catalog.yaml.
//
// Usage, from this directory:
//   node screenshots.mjs            entries that have no screenshot yet
//   node screenshots.mjs --all      every entry
//   node screenshots.mjs <slug>...  only the named entries
//
// The page shot is the entry's `demo` when it has one, otherwise its `url`.
// Cookie banners are declined when a decline button exists and hidden when it
// does not; consent is never given. Set CHROMIUM_PATH to use a Chromium that
// is already installed instead of the one from `npx playwright install chromium`.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { chromium } from "playwright";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG = join(ROOT, "catalog.yaml");
const OUT_DIR = join(ROOT, "screenshots");
const VIEWPORT = { width: 1280, height: 800 };
const QUALITY = 80;
const SETTLE_MS = 2500;
const PARALLEL = 4;

const DECLINE = /\b(reject|decline|deny|refuse)\b|only (necessary|essential)|(necessary|essential) only/i;
const CONSENT = [
  '[id*="cookie" i]', '[class*="cookie" i]', '[id*="consent" i]',
  '[class*="consent" i]', '[aria-label*="cookie" i]', '[aria-label*="consent" i]',
].join(",");
const BLOCKED = /security checkpoint|just a moment|attention required|access denied|deployment paused/i;

async function settleCookies(page) {
  const decline = page.getByRole("button", { name: DECLINE });
  if (await decline.count()) {
    await decline.first().click({ timeout: 2000 }).catch(() => {});
    await page.waitForTimeout(500);
  }
  await page.evaluate((selector) => {
    for (const el of document.querySelectorAll(selector)) {
      const position = getComputedStyle(el).position;
      if (position === "fixed" || position === "sticky") {
        el.style.setProperty("display", "none", "important");
      }
    }
  }, CONSENT);
}

async function shoot(browser, entry) {
  const target = entry.demo || entry.url;
  const context = await browser.newContext({ viewport: VIEWPORT, locale: "en-US", colorScheme: "light" });
  const page = await context.newPage();
  try {
    await page.goto(target, { waitUntil: "load", timeout: 45000 });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(SETTLE_MS);
    const title = await page.title();
    if (BLOCKED.test(title)) return { slug: entry.slug, ok: false, error: `blocked: ${title}` };
    await settleCookies(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    const cdp = await context.newCDPSession(page);
    const { data } = await cdp.send("Page.captureScreenshot", { format: "webp", quality: QUALITY });
    const bytes = Buffer.from(data, "base64");
    writeFileSync(join(OUT_DIR, `${entry.slug}.webp`), bytes);
    return { slug: entry.slug, ok: true, kb: Math.round(bytes.length / 1024), title, final: page.url() };
  } catch (error) {
    return { slug: entry.slug, ok: false, error: String(error.message).split("\n")[0] };
  } finally {
    await context.close();
  }
}

// Sets `screenshot` and `status: screenshotted` on one entry, line by line, so
// the rest of catalog.yaml keeps its formatting and comments.
function record(text, slug) {
  const lines = text.split("\n");
  const start = lines.indexOf(`- slug: ${slug}`);
  if (start === -1) throw new Error(`slug not found in catalog.yaml: ${slug}`);
  let end = lines.findIndex((line, i) => i > start && (line.startsWith("- slug: ") || line.startsWith("#")));
  if (end === -1) end = lines.length;
  const find = (prefix) => lines.findIndex((line, i) => i > start && i < end && line.startsWith(prefix));
  const status = find("  status:");
  const source = find("  source:");
  if (status === -1 || source === -1) throw new Error(`entry ${slug} lacks a status or source line`);
  lines[status] = "  status: screenshotted";
  const field = `  screenshot: screenshots/${slug}.webp`;
  const existing = find("  screenshot:");
  if (existing !== -1) lines[existing] = field;
  else lines.splice(source + 1, 0, field);
  return lines.join("\n");
}

const args = process.argv.slice(2);
const entries = parse(readFileSync(CATALOG, "utf8"));
const wanted = args.filter((a) => !a.startsWith("--"));
const queue = entries.filter((e) =>
  wanted.length ? wanted.includes(e.slug) : args.includes("--all") || !e.screenshot,
);

mkdirSync(OUT_DIR, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const results = [];
const workers = Array.from({ length: PARALLEL }, async () => {
  while (queue.length) {
    const result = await shoot(browser, queue.shift());
    console.log(result.ok ? `ok    ${result.slug} ${result.kb} KB  ${result.final}` : `FAIL  ${result.slug}  ${result.error}`);
    results.push(result);
  }
});
await Promise.all(workers);
await browser.close();

let text = readFileSync(CATALOG, "utf8");
for (const result of results.filter((r) => r.ok)) text = record(text, result.slug);
writeFileSync(CATALOG, text);
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed} shot, ${failed} failed`);
process.exitCode = failed ? 1 : 0;
