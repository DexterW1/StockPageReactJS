import React,{useState,useEffect, useRef} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { format } from 'date-fns-tz';
function formatYAxisLabel(value) {
    // Format the Y-axis label to display cents
    return `$${(value).toFixed(2)}`;
}

export default function ChartCard(props) {
    const {SymbolData} = props;
    if (!SymbolData || !SymbolData.c || !SymbolData.t) {
        // Handle the case where data is not available
        return null; 
    }
    const convertedData = SymbolData.c.map((c, index) => ({
        c,
        t: format(new Date(SymbolData.t[index] * 1000), 'HH:mm', { timeZone: 'America/Los_Angeles' }), 
    }));
    const chartMargin = { top: 0, right: 0, bottom: 0, left: -14 }; // Set all margins to 0
    const lastDataPoint = convertedData[convertedData.length - 1].c;
    const referenceLineY = convertedData[0].c;
    const referenceLineStroke = lastDataPoint > referenceLineY ? 'green' : 'red';
  return (
    <>
        <div className="linechart-container">
                <LineChart width={210} height={130} data={convertedData} margin={chartMargin}>
                    <XAxis dataKey="t" />
                    <YAxis 
                        type="number"
                        domain={['dataMin','dataMax']}
                        tickFormatter={formatYAxisLabel}
                        tick={{fontSize:12}}
                    />
                    <Tooltip />
                    <Line type="monotone" dataKey="c" name="Close Price" stroke={referenceLineStroke} dot={false}/>
                    <ReferenceLine y={convertedData[0].c} stroke="grey" strokeDasharray="5 5" />
                </LineChart>
        </div>
    
    </>
  )
}
