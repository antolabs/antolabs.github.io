document.addEventListener("DOMContentLoaded", function () {
  if (typeof mediumZoom !== "function") return;
  window.medium_zoom = mediumZoom("[data-zoomable]", {
    margin: 24,
    background: getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color").trim() + "ee",
  });
});
