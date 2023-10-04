import React,{useEffect,useState} from 'react'
import '../styles/MainContent.css'
import GraphCard from './GraphCard'
import DashboardCard from './DashboardCard';
import NewsCard from './NewsCard';

const finKey = process.env.REACT_APP_API_KEY;

export default function MainContent() {
  const[activeButton,setactiveButton]=useState('dashboard');  
  const[info,setInfo]=useState([]);
  useEffect(()=>{
    const finnhub = require('finnhub');

    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = finKey;
    const finnhubClient = new finnhub.DefaultApi()

    finnhubClient.marketNews("general", {}, (error, data, response) => {
    console.log(data)
    setInfo(data.slice(0,10));
    });
  },[]);
  return (
    <>
        <div className="main-container">
            <div className="left-side-menu">
                <div className="nav-container">
                    <button id="dashboard" onClick={()=> {setactiveButton('dashboard')}}>
                        <img src="./images/home.png" alt="home" />
                    </button>
                    <button id="Graph" onClick={()=>{setactiveButton('graph')}}>
                        {/* <img src="./images/bar-chart.png" alt="graph-icon" /> */}
                    </button>
                    <button id="watchlist" onClick={()=>{setactiveButton('watchlist')}}>
                        {/* <img src="./images/file.png" alt="watchlist-icon" /> */}
                    </button>
                    
                </div>
            </div>
            <div className="main-content">
                {activeButton==='dashboard'&&(
                    <>
                        <div className="dashboard-card-container">
                            <DashboardCard stockName='Tesla'/>
                            <DashboardCard stockName='Apple'/>
                            <DashboardCard stockName='Google'/>
                        </div>
                        <div className="news-header">
                            <h2>News</h2>
                        </div>
                        <div className='news-container'>
                            <NewsCard info={info} />
                        </div>
                    </>
                )}
                <div className="graph-container">
                    {activeButton==='graph' && (
                        <div className="graph-card">
                            <GraphCard/>
                        </div>
                    )}
                </div>
                {activeButton==='watchlist'&&(
                    <div className="watchlist-card">
                        
                    </div>
                )}
            </div>
            <div className="right-side-menu">
                <div className="right-card">
                    
                </div>
            </div>
        </div>
    </>
  )
}
