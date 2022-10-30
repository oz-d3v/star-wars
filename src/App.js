import React, { useEffect, useState } from "react";
import "./App.css";
import moment from "moment/moment";

export const App = () => {
  const [apiData, setApiData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDesciption] = useState({
    title: null,
    description: null,
    releaseDate: null,
  });

  useEffect(() => {
    fetch("https://swapi.py4e.com/api/films")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setApiData(data.results);
      });
  }, []);

  const handleClick = (index) => {
    // console.log("checkkksafd", index.target.outerText);
    const title = index.target.outerText;
    let descriptiveIndex;
    for (let i = 0; i < apiData.length; i++) {
      if (title === apiData[i].title) {
        descriptiveIndex = i;
      }
    }
    setDesciption({
      title: apiData[descriptiveIndex].title,
      description: apiData[descriptiveIndex].opening_crawl,
      releaseDate: apiData[descriptiveIndex].release_date,
    });
  };

  return (
    <div className="star_wars_app">
      {isLoading ? (
        <div className="loading">
          <p> loading</p>
        </div>
      ) : (
        <>
          <div className="movies_title_container">
            {apiData.map((data, index) => {
              return (
                <>
                  <div key={index}>
                    <p
                      className="movies_item"
                      onClick={(args) => handleClick(args)}
                    >
                      {data.title}
                    </p>
                  </div>
                </>
              );
            })}
          </div>

          <div
            className="details_container"
            style={
              description != null ? { display: "block" } : { display: "none" }
            }
          >
            <div className="title">{description.title}</div>
            <div className="description">{description.description}</div>
            <div
              className="releaseDate"
              style={
                description.releaseDate == null
                  ? { display: "none" }
                  : { display: "block" }
              }
            >
              {moment(description.releaseDate).format("MM/DD/YYYY")}
            </div>
            {/* wrap this with moment mm/dd/yyyy*/}
          </div>
        </>
      )}
    </div>
  );
};

export default App;

//
