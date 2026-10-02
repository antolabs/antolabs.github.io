(() => {
  const video = document.getElementById("bisto-video");
  const button = document.querySelector(".bisto-toggle");
  if (!video || !button) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const annotations = document.querySelector(".bisto-annotations");
  let userPaused = false;
  let wantsPlayback = !reducedMotion.matches;
  let failed = false;
  const hasMediaFailure = () => Boolean(video.error) || video.networkState === video.NETWORK_NO_SOURCE;

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
