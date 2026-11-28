(function () {
  function initProgressBar() {
    var progressBar = document.getElementById("progress");
    var navbar = document.getElementById("navbar");
    if (!progressBar || !navbar) return;

    function getMaxScroll() {
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }

    function updatePosition() {
      var navHeight = navbar.offsetHeight || 56;
      document.body.style.paddingTop = navHeight + "px";
      progressBar.style.top = navHeight + "px";
      progressBar.setAttribute("max", String(getMaxScroll()));
      progressBar.setAttribute("value", String(window.scrollY || 0));
    }

    function onScroll() {
      progressBar.setAttribute("value", String(window.scrollY || 0));
    }

    updatePosition();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });
  }

  if (document.readyState === "complete") {
    initProgressBar();
  } else {
    window.addEventListener("load", function () {
      window.setTimeout(initProgressBar, 50);
    });
  }
})();
