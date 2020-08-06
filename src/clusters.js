import OneKwH from "./Clusters/OneKwH";
const clusters = [
  {
    id: "gram",
    value: 1,
    pow: 0,
    visual: {},
    meta: {
      title: "One Gram",
      x: 3,
      y: 3,
    },
    x: 0,
    y: 0,
  },
  {
    value: 1,
    pow: 3,
    visual: {},
    meta: {
      title: "One Kilogram",
      x: 15,
      y: 5,
    },
    x: 170,
    y: 170,
  },
  {
    value: 1,
    pow: 6,
    visual: {},
    meta: {
      title: "One Ton",
      x: 3,
      y: 3,
    },
    x: 300,
    y: 300,
  },
  {
    value: 1,
    pow: 9,
    visual: {},
    meta: {
      title: "One Kiloton",
      x: 3,
      y: 3,
    },
    x: 5000,
    y: 5000,
  },
  {
    value: 1,
    pow: 12,
    visual: {},
    meta: {
      title: "One Megaton",
      x: 3,
      y: 3,
    },
    x: 50000,
    y: 50000,
  },
  {
    value: 1,
    pow: 15,
    visual: {},
    meta: {
      title: "One Gigaton",
      x: 3,
      y: 3,
    },
    x: 1500000,
    y: 1500000,
  },
  OneKwH,
];

export default clusters.map((cluster) => {
  const magnitude = Math.pow(10, cluster.pow);
  const markSize = Math.sqrt(magnitude);
  return { ...cluster, magnitude, markSize };
});
