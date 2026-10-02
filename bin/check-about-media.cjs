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

function setup({ reduced = false, hidden = false, rejectPlay = false, frameCallback = false, initialError = false, noSource = false } = {}) {
  const mediaSource = eventTarget();
  const video = eventTarget({
    paused: true,
    controls: true,
    playCalls: 0,
    loadCalls: 0,
    currentTime: 0,
    error: initialError,
    NETWORK_NO_SOURCE: 3,
    networkState: noSource ? 3 : 1,
  });
  let frame;
  if (frameCallback) video.requestVideoFrameCallback = (callback) => (frame = callback);
  video.querySelector = () => mediaSource;
  video.play = () => {
    video.playCalls++;
    if (rejectPlay) return Promise.reject(new Error("Autoplay blocked"));
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
  const annotations = { dataset: { solidPhase: "initial" } };
  const motion = eventTarget({ matches: reduced });
  const document = eventTarget({
    hidden,
    getElementById: () => video,
    querySelector: (selector) => ({ ".bisto-toggle": button, ".bisto-annotations": annotations })[selector],
  });
  const window = { matchMedia: () => motion };
  const context = { document, window };
  vm.runInNewContext(source, context);
  return { video, button, annotations, motion, document, mediaSource, frame: (time) => frame(0, { mediaTime: time }) };
}

async function check() {
  const normal = setup();
  assert.equal(normal.annotations.dataset.solidPhase, "initial", "The initial frame points to the solid shell, not fluid");
  normal.video.currentTime = 2;
  normal.video.emit("timeupdate");
  assert.equal(normal.annotations.dataset.solidPhase, "initial");
  normal.video.currentTime = 2.1;
  normal.video.emit("timeupdate");
  assert.equal(normal.annotations.dataset.solidPhase, "evolved", "Point to the black cutaway only once solid has formed");
  normal.video.currentTime = 0;
  normal.video.emit("seeked");
  assert.equal(normal.annotations.dataset.solidPhase, "initial", "Reset the pointer after seeking or looping");
  const synced = setup({ frameCallback: true });
  synced.frame(10);
  assert.equal(synced.annotations.dataset.solidPhase, "evolved");
  synced.frame(0);
  assert.equal(synced.annotations.dataset.solidPhase, "initial", "Synchronize the pointer with the displayed frame at loop boundaries");
  assert.equal(normal.video.playCalls, 1, "Start immediately without waiting for a viewport observer");
  assert.equal(normal.video.paused, false);
  assert.equal(normal.button.attributes["aria-label"], "Pause animation");
  assert.equal(normal.button.dataset.playing, "true");
  assert.equal(normal.video.muted, true);
  assert.equal(normal.video.controls, false, "Only show the custom play/pause button");
  normal.button.emit("click");
  normal.video.emit("canplay");
  normal.document.hidden = true;
  normal.document.emit("visibilitychange");
  normal.document.hidden = false;
  normal.document.emit("visibilitychange");
  normal.motion.emit("change");
  assert.equal(normal.video.paused, true, "Preserve manual pause after buffering, tab changes, or preference events");
  assert.equal(normal.button.attributes["aria-label"], "Play animation");
  assert.equal(normal.button.dataset.playing, "false");
  normal.button.emit("click");
  assert.equal(normal.video.paused, false);
  normal.document.hidden = true;
  normal.document.emit("visibilitychange");
  assert.equal(normal.video.paused, true, "Pause in a hidden tab");
  normal.document.hidden = false;
  normal.document.emit("visibilitychange");
  assert.equal(normal.video.paused, false);

  const background = setup({ hidden: true });
  assert.equal(background.video.playCalls, 0);
  background.document.hidden = false;
  background.document.emit("visibilitychange");
  assert.equal(background.video.paused, false, "Start when the page is brought to the foreground");

  const reduced = setup({ reduced: true });
  reduced.video.emit("canplay");
  assert.equal(reduced.video.playCalls, 0, "No autoplay with reduced motion");
  reduced.button.emit("click");
  reduced.video.emit("canplay");
  assert.equal(reduced.video.paused, false, "Explicit playback is still available");
  reduced.motion.emit("change");
  assert.equal(reduced.video.paused, true);

  const blocked = setup({ rejectPlay: true });
  await Promise.resolve();
  assert.equal(blocked.button.attributes["aria-label"], "Play animation");
  assert.equal(blocked.button.hidden, false);

  normal.mediaSource.emit("error");
  assert.equal(normal.button.hidden, false);
  assert.equal(normal.button.attributes["aria-label"], "Retry animation");
  assert.equal(normal.annotations.hidden, true, "Hide pointers if the video cannot be displayed");
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
  assert.ok(layout.includes('preload="auto"'));

  vm.runInNewContext(source, { document: { getElementById: () => null, querySelector: () => null } });
  console.log(
    "About media OK: immediate autoplay, synchronized annotations, play/pause, reduced motion, visibility, autoplay rejection, early/late source recovery, and no fallback link."
  );
}

check().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
