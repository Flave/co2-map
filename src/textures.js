import { Texture } from "pixi.js";

const size = 6;

//const textures = Array.from({ length: Math.log2(maxSize) + 1 }).map((d, i) => {
const canvas = document.createElement("canvas");
//const size = Math.pow(2, i);
canvas.width = size;
canvas.height = size;
const x = 0;
const y = 0;
//const r = x;
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect(x, y, size, size);
ctx.fill();
// ctx.beginPath();
// ctx.moveTo(x, y);
// ctx.arc(x, y, r, 0, 2 * Math.PI);
// ctx.fill();
//});

export default Texture.from(canvas);
