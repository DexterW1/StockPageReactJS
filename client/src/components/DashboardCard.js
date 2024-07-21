import React from "react";
import "../styles/DashboardCard.css";
import ChartCard from "./ChartCard";
import SymbolInfo from "./SymbolInfo";
import Loader from "./loader";
function formatYAxisLabel(value) {
  const roundedValue = parseFloat(value).toFixed(2);
  return parseFloat(roundedValue).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
export default function DashboardCard(props) {
  const { stockName, Data, tickerSym } = props;
  if (!Data || !Data.quotes || Data.quotes.length === 0) {
    // Data is not available yet or doesn't have quotes, you can return a loading indicator or handle this case.
    // return <div>Loading...</div>;
    return <Loader />;
  }
  const findStartandEnd = () => {
    let startCount = 0;
    let endCount = Data.quotes.length - 1;
    while (Data.quotes[startCount].close === null) {
      startCount++;
    }
    while (Data.quotes[endCount].close === null) {
      endCount--;
    }
    return { startCount, endCount };
  };
  const { startCount, endCount } = findStartandEnd();
  return (
    <>
      <div className="dashboard-card">
        <div className="stock-name">
          <h2>{stockName}</h2>
          <h3
            className={
              Data.quotes[startCount].close < Data.quotes[endCount].close
                ? "greencolor"
                : "redcolor"
            }
          >
            {formatYAxisLabel(Data.meta.regularMarketPrice)}
          </h3>
        </div>
        <div className="stock-data">
          <ChartCard SymbolData={Data} />
        </div>
        <div className="stock-info">
          <SymbolInfo StockName={tickerSym} />
        </div>
      </div>
    </>
  );
}
