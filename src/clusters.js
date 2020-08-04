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
      x: 100,
      y: 100,
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
      x: 500,
      y: 500,
    },
  },
];

export default clusters.map((cluster) => {
  const magnitude = Math.pow(10, cluster.pow);
  const markSize = Math.sqrt(magnitude);
  return { ...cluster, magnitude, markSize };
});
