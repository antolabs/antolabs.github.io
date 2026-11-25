let getThemeToggles = () => {
  if (typeof document.querySelectorAll === "function") {
    const nodes = Array.from(document.querySelectorAll("[data-theme-toggle]"));
    if (nodes.length > 0) return nodes;
  }
  const single = document.getElementById("light-toggle");
  return single ? [single] : [];
};

let toggleThemeSetting = () => {
  setThemeSetting(determineThemeSetting() === "dark" ? "light" : "dark");
}, setThemeSetting = (theme) => {
  const setting = theme === "dark" ? "dark" : "light";
  try {
    localStorage.setItem("theme", setting);
  } catch {
    // Keep the toggle usable when the browser blocks preference storage.
  }
  document.documentElement.setAttribute("data-theme-setting", setting);
  applyTheme();
  updateThemeToggle();
}, updateThemeToggle = () => {
  const label = determineComputedTheme() === "dark" ? "Switch to light mode" : "Switch to dark mode";
  getThemeToggles().forEach((toggle) => {
    toggle.setAttribute("title", label);
    toggle.setAttribute("aria-label", label);
  });
}, applyTheme = () => {
  const e = determineComputedTheme();
  transTheme();
  setHighlight(e);
  setGiscusTheme(e);
  setSearchTheme(e);
  document.documentElement.setAttribute("data-theme", e);
  const tables = document.getElementsByTagName("table");
  for (let i = 0; i < tables.length; i++) {
    if (e === "dark") tables[i].classList.add("table-dark");
    else tables[i].classList.remove("table-dark");
  }
  if (typeof medium_zoom !== "undefined") {
    medium_zoom.update({
      background: getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee",
    });
  }
}, setHighlight = (e) => {
  const light = document.getElementById("highlight_theme_light");
  const dark = document.getElementById("highlight_theme_dark");
  if (!light || !dark) return;
  if (e === "dark") {
    light.media = "none";
    dark.media = "";
  } else {
    dark.media = "none";
    light.media = "";
  }
}, setGiscusTheme = (e) => {
  const iframe = document.querySelector("iframe.giscus-frame");
  if (iframe) iframe.contentWindow.postMessage({ giscus: { setConfig: { theme: e } } }, "https://giscus.app");
}, setSearchTheme = (e) => {
  const t = document.querySelector("ninja-keys");
  if (t) {
    if (e === "dark") t.classList.add("dark");
    else t.classList.remove("dark");
  }
}, transTheme = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 500);
}, determineThemeSetting = () => {
  const applied = document.documentElement.getAttribute("data-theme-setting");
  if (applied === "light" || applied === "dark") return applied;
  try {
    // Missing, invalid, and legacy "system" preferences default to light.
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}, determineComputedTheme = () => determineThemeSetting(), initTheme = () => {
  setThemeSetting(determineThemeSetting());
  document.addEventListener("DOMContentLoaded", () => {
    updateThemeToggle();
    getThemeToggles().forEach((toggle) => {
      toggle.addEventListener("click", toggleThemeSetting);
    });
  });
};
