import React,{useState,useRef} from 'react'
import '../styles/DropdownButton.css'
export default function DropdownButton({setFilterDirection,setFilterVariable}) {
    const [buttonText,setButtonText]=useState("Sort by Name");
    const [selectedItem,setSelectedItem]=useState(0);
    const [sortDirection,setSortDirection]=useState(0);
    const [isDropDownOpen,setDropDownOpen]=useState(false);
    const [ascCheckMark,setAscCheckMark]=useState(6);

    const sortList = ["Name","Symbol","Price","Day Change","Day % Change"]
    function handleOptionClick(index,btnText){
        if(selectedItem===index){
            setSelectedItem(null);
        }
        else{
            setSelectedItem(index);
        }
        setDropDownOpen(!isDropDownOpen);
        setButtonText("Sort by "+btnText);
        setFilterVariable(btnText);

    }
    function handleOrderClick(index,btnText){
        if(ascCheckMark===index){
            setAscCheckMark(null);
        }
        else{
            setAscCheckMark(index);
        }
        setDropDownOpen(!isDropDownOpen);
        if(btnText==="Ascending (A-Z)"){
            setSortDirection(0);
            setFilterDirection(0);
        }
        else{
            setSortDirection(1);
            setFilterDirection(1);
        }
    }
    function toggleDropDown(){
        setDropDownOpen(!isDropDownOpen);
    }
  return (
    <>
        <div className="dropdown-wrapper">
            <div className="btnicon-header" onClick={toggleDropDown}>
                {sortDirection === 0 ? (
                    <ion-icon name="arrow-up-outline"></ion-icon>
                ) : (
                    <ion-icon name="arrow-down-outline"></ion-icon>
                )}
                <button className='ButtonHeader'>{buttonText}</button>
            </div>
            {isDropDownOpen && (
                <div className="filter-options">
                    <p>Sort By</p>
                    <ul className="dropdown-options">
                        {sortList.map((item,index)=>(
                            <li key={index} onClick={()=>{handleOptionClick(index,item)}} className={selectedItem===index?'selected':''}>{selectedItem === index && (
                                <span className="checkmark">✔</span>
                              )}{item}</li>
                        ))}
                    </ul>
                    <p>Sort Direction</p>
                    <ul className='dropdown-direction'>
                        <li key={6} onClick={()=>{handleOrderClick(6,'Ascending (A-Z)')}}>{ascCheckMark===6 &&(<span className="checkmark">✔</span>)}Ascending (A-Z)</li>
                        <li key={7} onClick={()=>{handleOrderClick(7,'Descending (Z-A)')}}>{ascCheckMark===7 &&(<span className="checkmark">✔</span>)}Descending (Z-A)</li>
                    </ul>
                </div>
            )}
        </div>
    
    </>
  )
}
