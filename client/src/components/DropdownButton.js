import React,{useState,useRef} from 'react'
import '../styles/DropdownButton.css'
export default function DropdownButton() {
    const [buttonText,setButtonText]=useState('Sort by Name');
    const [isDropDownOpen,setDropDownOpen]=useState(false);
    function toggleDropDown(){
        setDropDownOpen(!isDropDownOpen);
    }
  return (
    <>
        <div className="dropdown-wrapper">
            <div className="btnicon-header" onClick={toggleDropDown}>
                <ion-icon name="arrow-up-outline"></ion-icon>
                <button className='ButtonHeader'>{buttonText}</button>
            </div>
            {isDropDownOpen && (
                <div className="filter-options">
                    <p>Sort By</p>
                    <ul className="dropdown-options">
                        <li onClick={()=>{setButtonText('Sort by Name'); toggleDropDown()}}>Name</li>
                        <li onClick={()=>{setButtonText('Sort by Symbol');toggleDropDown()}}>Symbol</li>
                        <li onClick={()=>{setButtonText('Sort by Price');toggleDropDown()}}>Price</li>
                        <li onClick={()=>{setButtonText('Sort by Day Change');toggleDropDown()}}>Day Change</li>
                        <li onClick={()=>{setButtonText('Sort by Day % Change');toggleDropDown()}}>Day % Change</li>
                    </ul>
                </div>
            )}
        </div>
    
    </>
  )
}
