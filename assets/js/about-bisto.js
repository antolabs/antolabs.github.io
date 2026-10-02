(() => {
  const video = document.getElementById("bisto-video");
  const button = document.querySelector(".bisto-toggle");
  if (!video || !button) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const annotations = document.querySelector(".bisto-annotations");
  const leaders = annotations?.querySelector(".bisto-leaders");
  const solidLabel = annotations?.querySelector(".bisto-callout-solid");
  const fluidLabel = annotations?.querySelector(".bisto-callout-fluid");
  let userPaused = false;
  let wantsPlayback = !reducedMotion.matches;
  let failed = false;
  const hasMediaFailure = () => Boolean(video.error) || video.networkState === video.NETWORK_NO_SOURCE;

  // Map the rendered label edges into SVG coordinates, including responsive/font changes.
  const updateLeaderOrigins = () => {
    if (!leaders || !solidLabel || !fluidLabel) return;
    const bounds = leaders.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const viewBox = leaders.viewBox.baseVal;
    const point = (x, y) => ({
      x: Math.round(((x - bounds.left) * viewBox.width * 100) / bounds.width) / 100,
      y: Math.round(((y - bounds.top) * viewBox.height * 100) / bounds.height) / 100,
    });
    const solidBox = solidLabel.getBoundingClientRect();
    const fluidBox = fluidLabel.getBoundingClientRect();
    const solid = point(solidBox.right, solidBox.bottom);
    const fluid = point(fluidBox.right, fluidBox.top + fluidBox.height / 2);
    const solidStart = `M ${solid.x},${solid.y} L ${Math.max(150, solid.x + 36)},${Math.max(130, solid.y + 44)}`;
    const paths = {
      ".bisto-solid-initial path": `${solidStart} L 260,240`,
      ".bisto-solid-evolved path": `${solidStart} L 320,285`,
      ".bisto-fluid-leader path": `M ${fluid.x},${fluid.y} L ${Math.max(255, fluid.x + 40)},${fluid.y} L 315,460 L 360,345`,
    };
    for (const [selector, d] of Object.entries(paths)) {
      for (const path of annotations.querySelectorAll(selector)) path.setAttribute("d", d);
    }
  };
  updateLeaderOrigins();
  if (leaders && solidLabel && fluidLabel) {
    if (window.ResizeObserver) {
      const observer = new window.ResizeObserver(updateLeaderOrigins);
      [leaders, solidLabel, fluidLabel].forEach((element) => observer.observe(element));
    } else {
      window.addEventListener("resize", updateLeaderOrigins);
    }
    document.fonts?.ready.then(updateLeaderOrigins);
  }

  // This cutaway point becomes solid after 1.9 s in the source; point to the shell before then.
  const updateAnnotations = (time = video.currentTime) => {
    if (annotations) annotations.dataset.solidPhase = time >= 2.1 ? "evolved" : "initial";
  };
  video.addEventListener("timeupdate", () => updateAnnotations());
  video.addEventListener("seeked", () => updateAnnotations());
  if (video.requestVideoFrameCallback) {
    const onFrame = (_now, metadata) => {
      updateAnnotations(metadata.mediaTime);
      video.requestVideoFrameCallback(onFrame);
    };
    video.requestVideoFrameCallback(onFrame);
  }

  const updateButton = () => {
    const label = failed ? "Retry animation" : video.paused ? "Play animation" : "Pause animation";
    button.setAttribute("aria-label", label);
    button.title = label;
    button.dataset.playing = String(!failed && !video.paused);
  };

  const play = () => {
    if (failed) return;
    const playback = video.play();
    if (playback) {
      playback.catch(() => {
        if (hasMediaFailure()) onError();
        else updateButton();
      });
    }
  };

  // Start on entry, without waiting for scrolling; preserve the visitor's playback choice.
  const syncPlayback = () => {
    if (document.hidden || !wantsPlayback) {
      video.pause();
    } else {
      play();
    }
  };

  video.muted = true;
  video.controls = false;
  button.hidden = false;
  video.addEventListener("play", updateButton);
  video.addEventListener("pause", updateButton);
  updateButton();

  button.addEventListener("click", () => {
    const needsReload = failed || hasMediaFailure();
    if (needsReload || video.paused) {
      userPaused = false;
      wantsPlayback = true;
      if (needsReload) {
        failed = false;
        video.load();
        updateAnnotations(0);
      }
    } else {
      userPaused = true;
      wantsPlayback = false;
    }
    syncPlayback();
  });

  const onError = () => {
    failed = true;
    if (annotations) annotations.hidden = true;
    video.pause();
    updateButton();
  };
  video.addEventListener("error", onError);
  video.querySelector("source")?.addEventListener("error", onError);
  video.addEventListener("canplay", () => {
    failed = false;
    if (annotations) annotations.hidden = false;
    updateLeaderOrigins();
    syncPlayback();
    updateButton();
  });
  // A source may have failed before this deferred script could observe its error event.
  if (hasMediaFailure()) onError();

  document.addEventListener("visibilitychange", syncPlayback);
  reducedMotion.addEventListener("change", () => {
    wantsPlayback = !reducedMotion.matches && !userPaused;
    syncPlayback();
  });
  syncPlayback();
})();
