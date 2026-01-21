module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
  // Safelist to preserve classes that might be stripped incorrectly
  safelist: [
    // What I Do section styles on About page
    /^what-i-do-/,
    "what-i-do-section",
    "what-i-do-list",
    "what-i-do-icon",
    "what-i-do-content",
  ],
};
