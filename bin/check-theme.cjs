const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "../assets/js/theme.js"), "utf8");

function setup({ saved = null, osDark = false, blockRead = false, blockWrite = false, hasToggle = true } = {}) {
  const attributes = new Map();
  const labels = new Map();
  const events = new Map();
  const osEvents = new Map();
  const highlightLight = {};
  const highlightDark = {};
  let loaded = false;
  const toggle = {
    setAttribute: (name, value) => labels.set(name, value),
    addEventListener: (name, callback) => events.set(name, callback),
  };
  const context = vm.createContext({
    document: {
      documentElement: {
        getAttribute: (name) => attributes.get(name) ?? null,
        setAttribute: (name, value) => attributes.set(name, value),
        classList: { add() {}, remove() {} },
      },
      getElementById(id) {
        if (id === "highlight_theme_light") return highlightLight;
        if (id === "highlight_theme_dark") return highlightDark;
        if (id === "light-toggle" && loaded && hasToggle) return toggle;
        return null;
      },
      querySelector: () => null,
      getElementsByTagName: () => [],
      getElementsByClassName: () => [],
      addEventListener: (name, callback) => events.set(name, callback),
    },
    localStorage: {
      getItem() {
        if (blockRead) throw new Error("Storage unavailable");
        return saved;
      },
      setItem(key, value) {
        assert.equal(key, "theme");
        if (blockWrite) throw new Error("Storage unavailable");
        saved = value;
      },
    },
    window: {
      setTimeout: (callback) => callback(),
      matchMedia: () => ({ matches: osDark, addEventListener: (name, callback) => osEvents.set(name, callback) }),
    },
  });
  vm.runInContext(source, context);
  vm.runInContext("initTheme()", context);
  loaded = true;
  events.get("DOMContentLoaded")();
  return {
    saved: () => saved,
    click: () => events.get("click")(),
    assertTheme(theme) {
      assert.equal(attributes.get("data-theme"), theme);
      assert.equal(attributes.get("data-theme-setting"), theme);
      assert.equal(vm.runInContext("determineComputedTheme()", context), theme);
      assert.equal(highlightLight.media, theme === "light" ? "" : "none");
      assert.equal(highlightDark.media, theme === "dark" ? "" : "none");
      if (hasToggle) {
        const label = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
        assert.equal(labels.get("aria-label"), label);
        assert.equal(labels.get("title"), label);
      }
      assert.equal(osEvents.size, 0, "The OS must not override the explicit site theme");
    },
  };
}

for (const osDark of [false, true]) {
  for (const saved of [null, "system", "invalid", "light", "dark"]) {
    const app = setup({ saved, osDark });
    const initial = saved === "dark" ? "dark" : "light";
    app.assertTheme(initial);
    assert.equal(app.saved(), initial);
    for (let i = 0; i < 4; i++) {
      app.click();
      const next = i % 2 === 0 ? (initial === "light" ? "dark" : "light") : initial;
      app.assertTheme(next);
      setup({ saved: app.saved(), osDark }).assertTheme(next);
    }
  }
}

for (const options of [{ blockRead: true, blockWrite: true }, { blockWrite: true }, { blockWrite: true, saved: "dark" }]) {
  const app = setup(options);
  const initial = options.saved === "dark" ? "dark" : "light";
  app.assertTheme(initial);
  app.click();
  app.assertTheme(initial === "light" ? "dark" : "light");
  app.click();
  app.assertTheme(initial);
}

setup({ hasToggle: false }).assertTheme("light");
console.log("PASS: light default, legacy preference migration, two-state toggle, persistence, labels, and blocked storage");
