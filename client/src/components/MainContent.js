import React,{useEffect,useState} from 'react'
import '../styles/MainContent.css'
import GraphCard from './GraphCard'
import DashboardCard from './DashboardCard';
import NewsCard from './NewsCard';
import axios from 'axios';
import WatchlistContent from './WatchlistContent';
import Loader from './loader';
const url = "http://localhost:5003"
function formatDollar(value) {
    const roundedValue = parseFloat(value).toFixed(2);
    return parseFloat(roundedValue).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
  }
  function formatDecimal(value){
      return(value).toFixed(2);
  }
export default function MainContent({watchlistData,setWatchlistData}) {
  const[activeButton,setactiveButton]=useState('dashboard');  
  const[info,setInfo]=useState([]);
  // New Dashboard
  const[stockYahoo1,setStockYahoo1]=useState([]);
  const[stockYahoo2,setStockYahoo2]=useState([]);
  const[stockYahoo3,setStockYahoo3]=useState([]);
  const[symData1,setSymData1]=useState([]);
  const[symData2,setSymData2]=useState([]);
  const[symData3,setSymData3]=useState([]);
  const[rightData,setRightData]=useState([]);
  useEffect(()=>{
    axios.get(`${url}/api/market-news`).then((response) => {
        setInfo(response.data);
    });
    axios.get(`${url}/api/trending`).then((res)=>{
        setStockYahoo1(res.data['^DJI']);
        setStockYahoo2(res.data['^IXIC']);
        setStockYahoo3(res.data['^GSPC']);
    })
    axios.get(`${url}/api/quote`).then((res)=>{
        setSymData1(res.data['^DJI']);
        setSymData2(res.data['^IXIC']);
        setSymData3(res.data['^GSPC']);
    });
    axios.get(`${url}/api/trend`).then((res)=>{
        setRightData(res.data);
    });
  },[]);
//   if(!info || !stockYahoo3 || !symData3 || !rightData){
//     return <Loader/>
//   }
  return (
    <>
        <div className="main-container">
            <div className="left-side-menu">
                <div className="nav-container">
                    
                    <button id="dashboard" onClick={()=>{setactiveButton('dashboard')}}>
                        <img className='leftIcons' src="./images/home-white.png" alt="home-icon" />
                    </button>
                    <button id="Graph" onClick={()=>{setactiveButton('graph')}}>
                        <img className='leftIcons' id='graph-icon' src="./images/bar-chart-white.png" alt="graph-icon" /> 
                    </button>
                    <button id="watchlist" onClick={()=>{setactiveButton('watchlist')}}>
                        <img className='leftIcons' src="./images/file-white.png" alt="watchlist-icon" />
                    </button>
                    
                </div>
            </div>
            <div className="main-content">
                {activeButton==='dashboard'&&(
                    <>
                        <div className="dashboard-card-container">
                            <DashboardCard stockName='Dow Jones' Data={stockYahoo1} tickerSym={symData1}/>
                            <DashboardCard stockName='NASDAQ' Data={stockYahoo2} tickerSym={symData2}/>
                            <DashboardCard stockName='S&P 500' Data={stockYahoo3} tickerSym={symData3}/>
                        </div>
                        <div className="news-header">
                            <h2>News</h2>
                        </div>
                        <div className='news-container'>
                            <NewsCard info={info} />
                        </div>
                    </>
                )}
                {activeButton==='graph' && (
                    <div className="graph-container">
                        <div className="graph-card">
                            <GraphCard/>
                        </div>
                    </div>
                )}
                {activeButton==='watchlist'&&(
                    <div className="watchlist-card">
                        <WatchlistContent setWatchlistData={setWatchlistData} watchlistData ={watchlistData} />
                    </div>
                )}
            </div>
            <div className="right-side-menu">
                <h2 className='right-side-header'>Trending</h2>
                {!rightData ? (<Loader/>):(
                    <div className="right-card">
                        {rightData.map((obj,index)=>{
                            return(
                                <>
                                    <div className={index%2===1 ? 'small-cardb':'small-cardl'}>
                                        <div className='small-header'>
                                            <h3>{obj.symbol}</h3>
                                            <p>{obj.data.price.shortName}</p>
                                        </div>
                                        <div className="small-info">
                                            <p id="regularprice">{formatDollar(obj.data.price.regularMarketPrice)}</p>
                                            <p className={obj.data.price.regularMarketChange < 0 ? 'colorRed':'colorGreen'} id='regularchange'>{formatDecimal(obj.data.price.regularMarketChange)}</p>
                                            <p className={obj.data.price.regularMarketChangePercent < 0 ? 'colorRed':'colorGreen'}id="changepercentage">{formatDecimal(obj.data.price.regularMarketChangePercent*100)}%</p>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    </>
  )
}
//<div> Icons made by <a href="https://www.flaticon.com/authors/dave-gandy" title="Dave Gandy"> Dave Gandy </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>