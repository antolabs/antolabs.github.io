const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "../assets/js/project-gallery.js"), "utf8");

async function setup({ reduced = false, rejectPlay = false, count = 2 } = {}) {
  let ready;
  let motionChange;
  let keydown;
  const attributes = {};
  const image = {
    alt: "Temperature comparison",
    clicks: 0,
    click() {
      this.clicks++;
    },
    setAttribute: (name, value) => (attributes[name] = value),
    addEventListener: (name, callback) => {
      if (name === "keydown") keydown = callback;
    },
  };
  const videos = Array.from({ length: count }, () => ({
    plays: 0,
    pauses: 0,
    play() {
      this.plays++;
      return rejectPlay ? Promise.reject(new Error("Autoplay blocked")) : Promise.resolve();
    },
    pause() {
      this.pauses++;
    },
  }));
  vm.runInNewContext(source, {
    document: {
      addEventListener: (name, callback) => (ready = callback),
      querySelectorAll: (selector) => (selector === "video[data-project-animation]" ? videos : [image]),
    },
    window: {
      matchMedia: () => ({
        matches: reduced,
        addEventListener: (name, callback) => (motionChange = callback),
      }),
    },
  });
  ready();
  await Promise.resolve();
  assert.equal(image.tabIndex, 0);
  assert.equal(attributes["aria-label"], "Enlarge figure: Temperature comparison");
  for (const key of ["Enter", " "]) keydown({ key, preventDefault() {} });
  assert.equal(image.clicks, 2);
  assert.ok(videos.every((video) => video.plays === (reduced ? 0 : 1)));
  if (count) {
    motionChange({ matches: true });
    assert.ok(videos.every((video) => video.pauses === 1));
    motionChange({ matches: false });
    assert.ok(
      videos.every((video) => video.plays === (reduced ? 0 : 1)),
      "Do not override a user's pause choice"
    );
  }
}

(async () => {
  await setup();
  await setup({ reduced: true });
  await setup({ rejectPlay: true });
  await setup({ count: 0 });
  console.log("PASS: project animation autoplay, reduced motion, blocked autoplay, and keyboard image zoom");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
