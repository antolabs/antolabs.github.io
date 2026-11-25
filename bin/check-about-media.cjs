const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "../assets/js/about-bisto.js"), "utf8");
const eventTarget = (properties = {}) => {
  const listeners = new Map();
  return Object.assign(properties, {
    addEventListener(type, fn) {
      listeners.set(type, [...(listeners.get(type) || []), fn]);
    },
    emit(type) {
      for (const fn of listeners.get(type) || []) fn();
    },
  });
};

function setup({
  reduced = false,
  hidden = false,
  rejectPlay = false,
  frameCallback = false,
  initialError = false,
  noSource = false,
  alreadyPlaying = false,
  duration = 22.1,
} = {}) {
  const mediaSource = eventTarget();
  const video = eventTarget({
    paused: !alreadyPlaying,
    autoplay: true,
    dataset: {},
    controls: true,
    playCalls: 0,
    loadCalls: 0,
    currentTime: 0,
    duration,
    playbackRate: 1,
    error: initialError,
    NETWORK_NO_SOURCE: 3,
    networkState: noSource ? 3 : 1,
  });
  let frame;
  if (frameCallback) video.requestVideoFrameCallback = (callback) => (frame = callback);
  video.querySelector = () => mediaSource;
  video.play = () => {
    video.playCalls++;
    if (rejectPlay) return Promise.reject(Object.assign(new Error("Autoplay blocked"), { name: "NotAllowedError" }));
    video.paused = false;
    video.emit("play");
    return Promise.resolve();
  };
  video.pause = () => {
    video.paused = true;
    video.emit("pause");
  };
  video.load = () => {
    video.loadCalls++;
    video.error = null;
    video.networkState = 2;
    video.currentTime = 0;
  };
  const button = eventTarget({
    hidden: true,
    attributes: {},
    dataset: {},
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
  });
  const progressTrack = { hidden: true };
  const progressFill = { style: { transform: "" } };
  const annotations = {
    hidden: false,
    querySelector: (selector) =>
      ({
        ".bisto-progress-track": progressTrack,
        ".bisto-progress-fill": progressFill,
      })[selector],
  };
  const motion = eventTarget({ matches: reduced });
  const document = eventTarget({
    hidden,
    getElementById: () => video,
    querySelector: (selector) => ({ ".bisto-toggle": button, ".bisto-annotations": annotations })[selector],
  });
  const window = eventTarget({ matchMedia: () => motion });
  const context = { document, window };
  vm.runInNewContext(source, context);
  return {
    video,
    button,
    annotations,
    progressTrack,
    progressFill,
    motion,
    document,
    mediaSource,
    window,
    frame: (time) => frame(0, { mediaTime: time }),
  };
}

async function check() {
  const normal = setup();
  assert.equal(normal.progressTrack.hidden, false, "Reveal the progress track when JS initializes");
  assert.equal(normal.video.playbackRate, 0.85, "Hold the baseline frame briefly before search");

  normal.video.currentTime = 4.0;
  normal.video.emit("timeupdate");
  assert.equal(normal.video.playbackRate, 1.5, "Play the active evolution smoothly");
  assert.ok(normal.progressFill.style.transform.startsWith("scaleX("), "Update visual progress bar");

  normal.video.currentTime = 14.0;
  normal.video.emit("timeupdate");
  assert.equal(normal.video.playbackRate, 4.0, "Accelerate through the slow convergence tail");

  normal.video.currentTime = 21.0;
  normal.video.emit("timeupdate");
  assert.equal(normal.video.playbackRate, 0.75, "Hold the converged state before looping");

  normal.video.currentTime = 0;
  normal.video.emit("seeked");
  assert.equal(normal.video.playbackRate, 0.85, "Reset pacing after looping");

  const synced = setup({ frameCallback: true });
  synced.frame(14);
  assert.equal(synced.video.playbackRate, 4.0);
  synced.frame(0);
  assert.equal(synced.video.playbackRate, 0.85, "Synchronize pacing with frame callback at loop boundaries");

  assert.equal(normal.video.playCalls, 1, "Start immediately without waiting for a viewport observer");
  assert.equal(normal.video.paused, false);
  assert.equal(normal.button.attributes["aria-label"], "Pause animation");
  assert.equal(normal.button.dataset.playing, "true");
  assert.equal(normal.video.muted, true);
  assert.equal(normal.video.defaultMuted, true);
  assert.equal(normal.video.autoplay, true);
  assert.equal(normal.video.dataset.playbackState, "playing");
  assert.equal(normal.video.controls, false, "Only show the custom play/pause button");

  normal.button.emit("click");
  normal.video.emit("canplay");
  normal.video.emit("loadeddata");
  normal.window.emit("pageshow");
  normal.document.hidden = true;
  normal.document.emit("visibilitychange");
  normal.document.hidden = false;
  normal.document.emit("visibilitychange");
  normal.motion.emit("change");
  assert.equal(normal.video.paused, true, "Preserve manual pause after buffering, tab changes, or preference events");
  assert.equal(normal.video.autoplay, false, "Disable native autoplay after manual pause as well");
  assert.equal(normal.button.attributes["aria-label"], "Play animation");
  assert.equal(normal.button.dataset.playing, "false");
  normal.button.emit("click");
  assert.equal(normal.video.paused, false);
  normal.document.hidden = true;
  normal.document.emit("visibilitychange");
  assert.equal(normal.video.paused, true, "Pause in a hidden tab");
  assert.equal(normal.video.autoplay, false);
  normal.document.hidden = false;
  normal.document.emit("visibilitychange");
  assert.equal(normal.video.paused, false);
  assert.equal(normal.video.autoplay, true);

  normal.video.pause();
  normal.window.emit("pageshow");
  assert.equal(normal.video.paused, false, "Recover interrupted playback when restoring a page");

  const native = setup({ alreadyPlaying: true });
  native.video.emit("loadeddata");
  native.video.emit("canplay");
  assert.equal(native.video.playCalls, 0, "Enhance already-playing native autoplay without restarting it");
  assert.equal(native.button.attributes["aria-label"], "Pause animation");
  assert.equal(setup({ duration: Number.NaN }).video.paused, false, "Missing duration metadata cannot prevent playback");

  const background = setup({ hidden: true });
  assert.equal(background.video.playCalls, 0);
  background.document.hidden = false;
  background.document.emit("visibilitychange");
  assert.equal(background.video.paused, false, "Start when the page is brought to the foreground");

  const reduced = setup({ reduced: true });
  reduced.video.emit("canplay");
  assert.equal(reduced.video.playCalls, 1, "The research video starts regardless of OS decorative-motion settings");
  assert.equal(reduced.video.paused, false);
  reduced.button.emit("click");
  reduced.video.emit("canplay");
  reduced.video.emit("loadeddata");
  reduced.motion.emit("change");
  reduced.window.emit("pageshow");
  assert.equal(reduced.video.paused, true, "Manual pause remains authoritative on reduced-motion PCs too");
  assert.equal(reduced.video.autoplay, false);
  reduced.button.emit("click");
  assert.equal(reduced.video.paused, false);

  const blocked = setup({ rejectPlay: true });
  await Promise.resolve();
  assert.equal(blocked.button.attributes["aria-label"], "Play animation");
  assert.equal(blocked.button.hidden, false);
  assert.equal(blocked.video.dataset.playbackError, "NotAllowedError", "Expose browser policy rejection for diagnosis, not silent failure");
  assert.equal(blocked.video.dataset.playbackState, "paused");

  normal.mediaSource.emit("error");
  assert.equal(normal.button.hidden, false);
  assert.equal(normal.button.attributes["aria-label"], "Retry animation");
  assert.equal(normal.annotations.hidden, true, "Hide overlays if the video cannot be displayed");
  assert.equal(normal.video.controls, false, "Never replace the button with native controls or a separate link");
  normal.button.emit("click");
  assert.equal(normal.video.loadCalls, 1, "Retry loading within the same player");
  normal.video.emit("canplay");
  assert.equal(normal.annotations.hidden, false);
  assert.equal(normal.video.paused, false);
  assert.equal(normal.button.attributes["aria-label"], "Pause animation");
  normal.video.emit("error");
  normal.video.emit("canplay");
  assert.equal(normal.video.paused, false, "A recovered media load must not permanently disable autoplay");

  const initialFailure = setup({ initialError: true });
  assert.equal(initialFailure.button.attributes["aria-label"], "Retry animation");
  assert.equal(initialFailure.video.playCalls, 0);
  const missedSourceError = setup({ noSource: true });
  assert.equal(missedSourceError.video.error, false);
  assert.equal(missedSourceError.button.attributes["aria-label"], "Retry animation", "Recognize source errors that occurred before initialization");
  assert.equal(missedSourceError.annotations.hidden, true);
  assert.equal(missedSourceError.video.playCalls, 0);
  missedSourceError.button.emit("click");
  assert.equal(missedSourceError.video.loadCalls, 1, "Reload even when the failed source has no MediaError object");
  missedSourceError.video.emit("canplay");
  assert.equal(missedSourceError.video.paused, false);
  assert.equal(missedSourceError.annotations.hidden, false);
  assert.equal(missedSourceError.button.attributes["aria-label"], "Pause animation");

  const rejectedSource = setup({ rejectPlay: true });
  rejectedSource.video.networkState = 3;
  await Promise.resolve();
  assert.equal(rejectedSource.button.attributes["aria-label"], "Retry animation", "Distinguish an exhausted source from a blocked autoplay policy");

  const lateSourceError = setup();
  lateSourceError.video.networkState = 3;
  lateSourceError.button.emit("click");
  assert.equal(lateSourceError.video.loadCalls, 1, "Recheck the source state when the button is activated");

  const layout = fs.readFileSync(path.join(__dirname, "../_layouts/about.liquid"), "utf8");
  assert.ok(!layout.includes("Open the animation") && !layout.includes("bisto-fallback"));
  assert.ok(layout.includes("bisto-legend") && !layout.includes("bisto-leaders"), "Use clean legend overlay without moving leader arrows");
  assert.ok(layout.includes('preload="auto"'));
  const videoTag = layout.match(/<video\b[^>]*id="bisto-video"[^>]*>/)?.[0];
  for (const attribute of ["autoplay", "muted", "playsinline", "loop", "controls"]) {
    assert.ok(new RegExp(`\\s${attribute}(?:\\s|>)`).test(videoTag), `Keep native ${attribute} available before JavaScript loads`);
  }
  const playerScript = layout.match(/<script\b[^>]*about-bisto\.js[^>]*>/)?.[0];
  assert.ok(playerScript?.includes(" async "), "Initialize the player without waiting for unrelated parser-blocking footer scripts");
  assert.ok(!playerScript.includes(" defer "));
  assert.ok(layout.indexOf(playerScript) > layout.indexOf('class="bisto-toggle"'), "Async initialization must follow the player DOM");

  vm.runInNewContext(source, { document: { getElementById: () => null, querySelector: () => null } });
  console.log(
    "About media OK: clean legend, dynamic pacing, stage/progress sync, native muted autoplay, manual pause, page restoration, policy rejection, and source recovery."
  );
}

check().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
