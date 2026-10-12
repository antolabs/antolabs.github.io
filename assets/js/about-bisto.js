(() => {
  const video = document.getElementById("bisto-video");
  const button = document.querySelector(".bisto-toggle");
  if (!video || !button) return;

  const annotations = document.querySelector(".bisto-annotations");
  const leaders = annotations?.querySelector(".bisto-leaders");
  const solidLabel = annotations?.querySelector(".bisto-callout-solid");
  const fluidLabel = annotations?.querySelector(".bisto-callout-fluid");
  // This research video starts by default; its dedicated control owns playback.
  let wantsPlayback = true;
  let failed = false;
  const hasMediaFailure = () => Boolean(video.error) || video.networkState === video.NETWORK_NO_SOURCE;

  // Map the rendered label edges into SVG coordinates, including responsive/font changes.
  const updateLeaderOrigins = () => {
    if (!leaders || !solidLabel || !fluidLabel) return;
    const bounds = leaders.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const viewBox = leaders.viewBox?.baseVal;
    if (!viewBox?.width || !viewBox?.height) return;
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
    video.dataset.playbackState = failed ? "error" : video.paused ? "paused" : "playing";
  };

  const play = () => {
    if (failed || !video.paused) return;
    const playback = video.play();
    if (playback) {
      playback.catch((error) => {
        video.dataset.playbackError = error.name;
        if (hasMediaFailure()) onError();
        else updateButton();
      });
    }
  };

  // Start on entry, without waiting for scrolling; preserve the visitor's playback choice.
  const syncPlayback = () => {
    video.autoplay = !document.hidden && wantsPlayback && !failed;
    if (document.hidden || !wantsPlayback) {
      video.pause();
    } else {
      play();
    }
  };

  video.defaultMuted = true;
  video.muted = true;
  video.controls = false;
  button.hidden = false;
  video.addEventListener("play", () => {
    delete video.dataset.playbackError;
    updateButton();
  });
  video.addEventListener("pause", updateButton);
  updateButton();

  button.addEventListener("click", () => {
    const needsReload = failed || hasMediaFailure();
    if (needsReload || video.paused) {
      wantsPlayback = true;
      if (needsReload) {
        failed = false;
        video.load();
        updateAnnotations(0);
      }
    } else {
      wantsPlayback = false;
    }
    syncPlayback();
  });

  const onError = () => {
    failed = true;
    video.autoplay = false;
    if (annotations) annotations.hidden = true;
    video.pause();
    updateButton();
  };
  video.addEventListener("error", onError);
  video.querySelector("source")?.addEventListener("error", onError);
  const onReady = () => {
    failed = false;
    if (annotations) annotations.hidden = false;
    syncPlayback();
    updateButton();
    updateLeaderOrigins();
  };
  video.addEventListener("loadeddata", onReady);
  video.addEventListener("canplay", onReady);
  // A source may have failed before the controller observed its error event.
  if (hasMediaFailure()) onError();

  document.addEventListener("visibilitychange", syncPlayback);
  window.addEventListener("pageshow", syncPlayback);
  syncPlayback();

  // Annotation layout must not delay initial playback.
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
})();
