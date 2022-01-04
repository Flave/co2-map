const fs = require("fs");
const path = require("path");
const { csvParse } = require("d3-dsv");

const dataPath = path.join(__dirname, "./ages.csv");
let data = csvParse(fs.readFileSync(dataPath, "utf-8"));

const parentAges = data.columns.slice(0, 4);

const entries = [];

const groupBy = (items, key) => {
  return items.reduce((acc, item) => {
    const group = acc[item[key]];
    if (group) group.push(item);
    else acc[item[key]] = [item];
    return acc;
  }, {});
};

data = data.map((row) => {
  return data.columns.reduce((acc, col) => {
    const rawValue = row[col];
    let value = rawValue
      .replace(/\[.+\]/g, "") // Remove references in [] brackets
      .replace(/\*$/, "");
    if (col === "start") {
      value = value.replace(/^~/, "");
      if (value.includes("±")) {
        const values = value.split("±").map((s) => s.trim());
        value = values[0];
        acc[] //TODO - continue here with getting start/end dates
      }
    }
    acc[col] = value;
    return acc;
  }, {});
});

console.log(data[26]);

const groups = groupBy(data, "eon");
//console.log(groups);

// parentAges.forEach((age, i) => {

// });
