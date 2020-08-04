import Test from "./Clusters/Test";
import OneGram from "./Clusters/OneGram";

const clusters = [
  OneGram,
  {
    value: 1,
    pow: 3,
    visual: {},
    meta: {
      title: "One Kilogram",
      x: 3,
      y: 3,
    },
    dimensions: {
      x: 70,
      y: 70,
    },
  },
  {
    value: 1,
    pow: 5,
    visual: {},
    meta: {
      title: "One Ton",
      x: 3,
      y: 3,
    },
    dimensions: {
      x: 300,
      y: 300,
    },
  },
  {
    value: 1,
    pow: 7,
    visual: {},
    meta: {
      title: "One Kiloton",
      x: 3,
      y: 3,
    },
    dimensions: {
      x: 1000,
      y: 1000,
    },
  },
  {
    value: 1,
    pow: 9,
    visual: {},
    meta: {
      title: "One Megaton",
      x: 3,
      y: 3,
    },
    dimensions: {
      x: 5000,
      y: 5000,
    },
  },
  {
    value: 1,
    pow: 11,
    visual: {},
    meta: {
      title: "One Gigaton",
      x: 3,
      y: 3,
    },
    dimensions: {
      x: 40000,
      y: 40000,
    },
  },
];

export default clusters.map((cluster) => {
  const magnitude = Math.pow(10, cluster.pow);
  const markSize = Math.sqrt(magnitude);
  return { ...cluster, magnitude, markSize };
});
