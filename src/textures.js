import { Texture } from "pixi.js";

const maxSize = 2048;

const textures = Array.from({ length: Math.log2(maxSize) + 1 }).map((d, i) => {
  const canvas = document.createElement("canvas");
  const size = Math.pow(2, i);
  canvas.width = size;
  canvas.height = size;
  const x = size / 2;
  const y = size / 2;
  const r = x;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000000";
  ctx.fillRect(x, y, size, size);
  ctx.fill();
  // ctx.beginPath();
  // ctx.moveTo(x, y);
  // ctx.arc(x, y, r, 0, 2 * Math.PI);
  // ctx.fill();
  return Texture.from(canvas);
});

const getTexture = (size) => {};

export default textures[11];
