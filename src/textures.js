import { Texture } from "pixi.js";

const size = 2048;

const canvas = document.createElement("canvas");
canvas.width = size;
canvas.height = size;
const x = 0;
const y = 0;
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect(x, y, size, size);
ctx.fill();

export default Texture.from(canvas);
