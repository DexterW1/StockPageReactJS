import React,{useState,useEffect} from 'react'
import '../styles/NewsCard.css'
export default function NewsCard(props) {
  const {info}=props;
  return (
    <>
        <div className="news-container">
          {info.map((newsItem, index) => (
            <div className="card-container" key={index}>
              <a href={newsItem.url}><h2>{newsItem.headline}</h2></a>
              <div className="card-summary">
                <img src={newsItem.image} alt={newsItem.headline} width={110} height={130}/>
                <p>{newsItem.summary}</p>
              </div>
            </div>
          ))}
        </div>
    </>
  )
}