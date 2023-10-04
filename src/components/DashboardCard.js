import React from 'react'
import '../styles/DashboardCard.css'
export default function DashboardCard(props) {
    const {stockName,data}=props;
  return (
    <>
        <div className="dashboard-card">
          <div className="stock-name">
            <h2>{stockName}</h2>
          </div>
          <div className="stock-data">
            
          </div>
        </div>
    
    </>
  )
}
