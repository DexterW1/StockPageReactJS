import React,{useState,useEffect,useRef} from 'react';
import '../styles/TopBar.css';

const nasdaqTicker = './tickerData/nasdaq_tickers.json';
const nyseTicker = '/tickerData/nyse_tickers.json';
const nasdaqFull = './tickerData/nasdaq_full_tickers.json';
const nyseFull = './tickerData/nyse_full_tickers.json';


export default function TopBar() {
  const [searchInput,setSearchInput]= useState('');
  const [combinedSymb, setCombinedSymb] = useState([]);
  const [combinedFull, setCombinedFull] = useState([]);
  const [autocompleteData, setAutocompleteData] = useState([]);
  const inputRef=useRef(null);

  useEffect(()=>{
    async function fetchData(){
      const resNas = await fetch(nasdaqTicker);
      const dataNas = await resNas.json();
      const resNyse = await fetch(nyseTicker);
      const dataNyse = await resNyse.json();
      const combinedData = dataNas.concat(dataNyse);
      setCombinedSymb(combinedData);
    }
    fetchData();
  },[]);
  useEffect(()=>{
    async function fetchData() {
      const resNas = await fetch(nasdaqFull);
      const dataNas = await resNas.json();
      const resNyse = await fetch(nyseFull);
      const dataNyse = await resNyse.json();
      const combinedData = dataNas.concat(dataNyse);
      setCombinedFull(combinedData);
    }
    fetchData();
  },[]);
  useEffect(()=>{
    if(!searchInput){
      setAutocompleteData([]);
      return;
    }
    const updatedData = updateResult(searchInput);
    setAutocompleteData(updatedData);
    // console.log(updatedData);
  },[searchInput]);

  function updateResult(userInput){
    return combinedFull.filter((symbol)=>symbol.symbol.includes(userInput.toUpperCase())).slice(0,10);
  }

  useEffect(() => {
    // Event listener to close autocomplete results when clicking outside the input
    function handleClickOutside(event) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        !document.querySelector('.autocomplete-result').contains(event.target)
      ) {
        setAutocompleteData([]); // Hide autocomplete results
      }
    }

    // Add the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <>
        <div className='header-container'>
            <header>
                <div className='logo-container'>
                    <img src="./images/stock-exchange-app.png" alt="logo" />
                </div>
                <div className="search-container">
                  <div className="control-search">
                    <input type="search" id="search" name="search" autoComplete='off' placeholder='Search Stock...' ref={inputRef} onChange={(e)=>{setSearchInput(e.target.value);}} value={searchInput} />
                    <div className="autocomplete-result">
                    <ul className="autocomplete-list">
                      {autocompleteData.map((obj)=>(
                        <li key={obj.symbol} onClick={()=>{
                          setSearchInput(obj.symbol+': '+obj.name);
                          setAutocompleteData([]);
                        }}
                      >
                        <strong>{obj.symbol}: {obj.name}</strong>
                      </li>
                      ))}
                    </ul>
                  </div>
                  </div>
                </div>
            </header>
        </div>

    </>
  )
}