import React from "react";
import "../styles/NewsCard.css";
import Loader from "./loader";
export default function NewsCard(props) {
  const { info } = props;
  if (!info) {
    // console.log("ENTERED NEWS");
    // return <div>Loading...</div>
    return <Loader />;
  }
  return (
    <>
      <div className="news-container">
        {info.map((newsItem, index) => (
          <div className="card-container" key={newsItem.id}>
            <a href={newsItem.url}>
              <h2>{newsItem.headline}</h2>
            </a>
            <div className="card-summary">
              <img
                src={newsItem.image}
                alt={newsItem.headline}
                width={110}
                height={130}
              />
              <p>{newsItem.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
