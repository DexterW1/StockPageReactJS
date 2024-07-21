import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { format } from "date-fns-tz";
function formatYAxisLabel(value) {
  const roundedValue = parseFloat(value).toFixed(2);
  return parseFloat(roundedValue).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
function formatDecimal(value) {
  // if(value===null) return 0;
  return value.toFixed(2);
}
function formatTimestamp(timestamp) {
  return format(new Date(timestamp * 1000), "HH:mm", {
    timeZone: "America/Los_Angeles",
  });
}
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload; // Get the data point
    return (
      <div className="custom-tooltip" style={{ margin: 10 }}>
        <p style={{ fontSize: 12 }}>{`Time: ${dataPoint.date}`}</p>
        <p style={{ fontSize: 12 }}>{`Close Price: ${formatYAxisLabel(
          dataPoint.close
        )}`}</p>
      </div>
    );
  }
  return null;
}

export default function ChartCard(props) {
  const { SymbolData } = props;
  // console.log(SymbolData);
  if (!SymbolData || !SymbolData.quotes) {
    // Handle the case where data is not available
    return null;
  }
  const convertedData = SymbolData.quotes
    .filter((item) => item.close !== null) // Filter out items with null values
    .map((item) => ({
      ...item,
      close: formatDecimal(item.close),
      date: formatTimestamp(item.date),
    }));
  const chartMargin = { top: 20, right: 0, bottom: 6, left: 20 }; // Set all margins to 0
  const lastDataPoint = convertedData[convertedData.length - 1].close;
  const referenceLineY = convertedData[0].close;
  const referenceLineStroke = lastDataPoint > referenceLineY ? "green" : "red";
  return (
    <>
      <div className="linechart-container">
        <LineChart
          width={280}
          height={150}
          data={convertedData}
          margin={chartMargin}
        >
          <XAxis dataKey="date" />
          <YAxis
            type="number"
            domain={["dataMin", "dataMax"]}
            tickFormatter={formatYAxisLabel}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            content={CustomTooltip}
            wrapperStyle={{ background: "none" }}
          />
          <Line
            type="monotone"
            dataKey="close"
            name="Close Price"
            stroke={referenceLineStroke}
            dot={false}
          />
          <ReferenceLine
            y={convertedData[0].close}
            stroke="grey"
            strokeDasharray="5 5"
          />
        </LineChart>
      </div>
    </>
  );
}
