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
  resizeObserver = true,
} = {}) {
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
  const geometry = {
    svg: { left: 0, top: 0, width: 884, height: 620 },
    solid: { left: 30, top: 30, width: 100, height: 42 },
    fluid: { left: 30, top: 555, width: 100, height: 40 },
  };
  const box = (name) => ({
    getBoundingClientRect() {
      const rect = geometry[name];
      return { ...rect, right: rect.left + rect.width, bottom: rect.top + rect.height };
    },
  });
  const leaders = { ...box("svg"), viewBox: { baseVal: { width: 884, height: 620 } } };
  const paths = Object.fromEntries(
    [".bisto-solid-initial path", ".bisto-solid-evolved path", ".bisto-fluid-leader path"].map((selector) => [
      selector,
      Array.from({ length: 2 }, () => ({
        attributes: {},
        setAttribute(name, value) {
          this.attributes[name] = value;
        },
      })),
    ])
  );
  const annotations = {
    dataset: { solidPhase: "initial" },
    querySelector: (selector) =>
      ({ ".bisto-leaders": leaders, ".bisto-callout-solid": box("solid"), ".bisto-callout-fluid": box("fluid") })[selector],
    querySelectorAll: (selector) => paths[selector] || [],
  };
  const motion = eventTarget({ matches: reduced });
  const document = eventTarget({
    hidden,
    getElementById: () => video,
    querySelector: (selector) => ({ ".bisto-toggle": button, ".bisto-annotations": annotations })[selector],
  });
  const resizeCallbacks = [];
  const observed = [];
  const window = eventTarget({ matchMedia: () => motion });
  if (resizeObserver) {
    window.ResizeObserver = class {
      constructor(callback) {
        resizeCallbacks.push(callback);
      }
      observe(element) {
        observed.push(element);
      }
    };
  }
  const context = { document, window };
  vm.runInNewContext(source, context);
  return {
    video,
    button,
    annotations,
    motion,
    document,
    mediaSource,
    geometry,
    paths,
    observed,
    window,
    resize: () => resizeCallbacks.forEach((callback) => callback()),
    frame: (time) => frame(0, { mediaTime: time }),
  };
}

async function check() {
  const normal = setup();
  const coordinates = (state, selector) => state.paths[selector][0].attributes.d.match(/-?\d+(?:\.\d+)?/g).map(Number);
  assert.deepEqual(coordinates(normal, ".bisto-solid-initial path").slice(0, 2), [130, 72], "Solid starts at its label's bottom-right corner");
  assert.deepEqual(coordinates(normal, ".bisto-solid-evolved path").slice(0, 2), [130, 72], "Both solid phases use the same label anchor");
  assert.deepEqual(
    coordinates(normal, ".bisto-fluid-leader path").slice(0, 4),
    [130, 575, 255, 575],
    "Fluid exits horizontally from the right-edge midpoint"
  );
  assert.equal(normal.observed.length, 3, "Observe the SVG and both labels so viewport/font changes remain attached");
  normal.geometry.svg = { left: 20, top: 15, width: 442, height: 310 };
  normal.geometry.solid = { left: 35, top: 30, width: 64, height: 30 };
  normal.geometry.fluid = { left: 35, top: 280, width: 64, height: 26 };
  normal.resize();
  assert.deepEqual(coordinates(normal, ".bisto-solid-initial path").slice(0, 2), [158, 90], "Recalculate the corner in SVG coordinates after resize");
  assert.deepEqual(coordinates(normal, ".bisto-fluid-leader path").slice(0, 4), [158, 556, 255, 556]);
  for (const group of Object.values(normal.paths))
    assert.equal(group[0].attributes.d, group[1].attributes.d, "Keep the halo and visible leader aligned");
  assert.deepEqual(coordinates(normal, ".bisto-solid-initial path").slice(-2), [260, 240]);
  assert.deepEqual(coordinates(normal, ".bisto-solid-evolved path").slice(-2), [320, 285]);
  assert.deepEqual(coordinates(normal, ".bisto-fluid-leader path").slice(-2), [360, 345], "Preserve the scientific target positions");
  normal.geometry.solid.width = 100;
  normal.geometry.fluid.width = 130;
  normal.resize();
  assert.ok(
    coordinates(normal, ".bisto-solid-initial path")[2] > coordinates(normal, ".bisto-solid-initial path")[0],
    "Solid's first segment must exit to the right even with a wide mobile label"
  );
  assert.ok(coordinates(normal, ".bisto-fluid-leader path")[2] > coordinates(normal, ".bisto-fluid-leader path")[0]);
  normal.geometry.svg.width = 0;
  normal.resize();
  assert.ok(!normal.paths[".bisto-fluid-leader path"][0].attributes.d.includes("Infinity"), "Ignore hidden or zero-size SVGs");
  const resizeFallback = setup({ resizeObserver: false });
  resizeFallback.geometry.solid.width = 120;
  resizeFallback.window.emit("resize");
  assert.equal(coordinates(resizeFallback, ".bisto-solid-initial path")[0], 150, "Support resize without ResizeObserver");
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
  const playerScript = layout.match(/<script\b[^>]*about-bisto\.js[^>]*>/)?.[0];
  assert.ok(playerScript?.includes(" async "), "Initialize the player without waiting for unrelated parser-blocking footer scripts");
  assert.ok(!playerScript.includes(" defer "));
  assert.ok(layout.indexOf(playerScript) > layout.indexOf('class="bisto-toggle"'), "Async initialization must follow the player DOM");

  vm.runInNewContext(source, { document: { getElementById: () => null, querySelector: () => null } });
  console.log(
    "About media OK: responsive label anchors, synchronized annotations, immediate autoplay, play/pause, reduced motion, visibility, autoplay rejection, source recovery, and no fallback link."
  );
}

check().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
