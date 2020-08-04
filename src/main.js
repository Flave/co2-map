import App from "./App.svelte";
import * as PIXI from "pixi.js";

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;

const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

window.app = app;

export default app;
