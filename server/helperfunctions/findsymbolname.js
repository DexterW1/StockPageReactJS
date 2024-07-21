const nasdaqFull = "../data/nasdaq_full_tickers.json";
const nyseFull = "../data/nyse_full_tickers.json";
const fs = require("fs");
const path = require("path");

// Function to read a JSON file
function readJSONFile(relativePath) {
  const filePath = path.resolve(__dirname, relativePath);
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading JSON file at path ${relativePath}:`, err);
    return null;
  }
}
module.exports = function FindSymbolName(name) {
  const nasdaqData = readJSONFile(nasdaqFull);
  const nyseData = readJSONFile(nyseFull);
  const combinedData = [...nasdaqData, ...nyseData];
  const filteredData = combinedData.filter((item) => {
    return item.symbol === name;
  });
  // console.log();
  if (filteredData === null) {
    return "";
  }
  return filteredData[0].name;
};
