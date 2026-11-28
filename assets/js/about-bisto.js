(() => {
  const video = document.getElementById("bisto-video");
  const button = document.querySelector(".bisto-toggle");
  if (!video || !button) return;

  const annotations = document.querySelector(".bisto-annotations");
  const progressTrack = annotations?.querySelector(".bisto-progress-track");
  const progressFill = annotations?.querySelector(".bisto-progress-fill");
  // This research video starts by default; its dedicated control owns playback.
  let wantsPlayback = true;
  let failed = false;
  const hasMediaFailure = () => Boolean(video.error) || video.networkState === video.NETWORK_NO_SOURCE;

  // Map raw video time into a brisk ~10.5 s visual loop so visitors quickly see the
  // red-to-cool transition instead of waiting through the slow convergence tail.
  const computePlaybackRate = (time, duration) => {
    const endHold = duration > 16 ? Math.max(19.6, duration - 1.6) : duration * 0.9;
    if (time < 0.85) return 0.85;
    if (time < 8.5) return 1.5;
    if (time < endHold) return 4.0;
    return 0.75;
  };

  const computeVisualProgress = (time, duration) => {
    if (!Number.isFinite(duration) || duration <= 0) return 0;
    const endHold = duration > 16 ? Math.max(19.6, duration - 1.6) : duration * 0.9;
    const seg1 = 0.85 / 0.85;
    const seg2 = Math.max(0, Math.min(8.5, duration) - 0.85) / 1.5;
    const seg3 = Math.max(0, Math.min(endHold, duration) - 8.5) / 4.0;
    const seg4 = Math.max(0, duration - endHold) / 0.75;
    const total = seg1 + seg2 + seg3 + seg4;
    if (total <= 0) return 0;
    let elapsed = 0;
    if (time <= 0.85) {
      elapsed = time / 0.85;
    } else if (time <= 8.5) {
      elapsed = seg1 + (time - 0.85) / 1.5;
    } else if (time <= endHold) {
      elapsed = seg1 + seg2 + (time - 8.5) / 4.0;
    } else {
      elapsed = seg1 + seg2 + seg3 + (time - endHold) / 0.75;
    }
    return Math.max(0, Math.min(1, elapsed / total));
  };

  const updateAnnotations = (time = video.currentTime) => {
    const duration = video.duration;
    if (Number.isFinite(duration) && duration > 0) {
      const targetRate = computePlaybackRate(time, duration);
      if (Math.abs((video.playbackRate || 1) - targetRate) > 0.05) {
        video.playbackRate = targetRate;
      }
      if (progressFill) {
        progressFill.style.transform = `scaleX(${computeVisualProgress(time, duration).toFixed(4)})`;
      }
    }
  };
  if (progressTrack) progressTrack.hidden = false;

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
    updateAnnotations();
  };
  video.addEventListener("loadedmetadata", () => updateAnnotations());
  video.addEventListener("loadeddata", onReady);
  video.addEventListener("canplay", onReady);
  // A source may have failed before the controller observed its error event.
  if (hasMediaFailure()) onError();

  document.addEventListener("visibilitychange", syncPlayback);
  window.addEventListener("pageshow", syncPlayback);
  syncPlayback();
  updateAnnotations();
})();
