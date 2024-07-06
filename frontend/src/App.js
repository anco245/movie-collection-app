import React, { useState, useEffect, useCallback } from 'react';
import GetRandomMovieButton from "./GetRandomMovieButton";
import './App.css';

function SidePanelContainer({url, setUrl}) {
  return (
    <div className="sidePanel">
      <IconAndTitle url={url} setUrl={setUrl} />
      <SearchContainer url={url} setUrl={setUrl}/>
      <GetRandomMovieButton url={url} setUrl={setUrl}/>
    </div>
  );
}

function IconAndTitle({url, setUrl}) {

  const handleClick = () => {
    setUrl("http://localhost:8080/movies")
  }

  return (
    <div className="iconandtitle">
      <div className="icon">
        <img onClick={handleClick} src="https://www.e-cookietins.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/s/1s_115_movie_reel.png" alt="minimal film reel" height="50px" width="50px" />
      </div>

      <div className="title">
        <p id="p1">John's Movie Collection</p>
      </div>
    </div>
  )
}

function SearchContainer({url, setUrl}) {

  const [inputValue, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value)
    url = "http://localhost:8080/movies/" + inputValue;
    setUrl(url);
  }

  return (
    <div className="search">
      <input type="text" placeholder="Search title..." spellCheck="false" value={inputValue} onChange={handleInputChange}/>
    </div>
  )
}

function Collection({url, setUrl}) {
  const [data, setData] = useState([]);

  const getInfo = useCallback(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        setData(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  }, [url]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  return (
    <div id="movie-container">
      <table id="movie-table">
          <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Runtime</th>
              <th>Quality</th>
              <th>Location</th>
              <th>Pack</th>
              <th>Edition</th>
              <th>Genre</th>
              <th>Seen</th>
              <th>Type</th>
          </tr>

          {data.map((movie, index) => {
            return (
              <tr id={"row" + index}>
                <td id="title">{movie.title}</td>
                <td id="year">{movie.year}</td>
                <td id="runtime">{movie.runtime}</td>
                <td id="quality">{movie.quality}</td>
                <td id="location">{movie.Location}</td>
                <td id="pack">{movie.pack}</td>
                <td id="edition">{movie.edition}</td>
                <td id="genre">{movie.genre}</td>
                <td id="seen">{movie.seen===1 ? "yes" : "no"}</td>
                <td id="type">{movie.type}</td>  
              </tr>
            )
          })}
        </table>
    </div>
  );
}

function CollectionContainer({url, setUrl}) {
  return (
    <div className="collection">
      <Collection url={url} setUrl={setUrl}/>
    </div>
  );
}

export default function RootContainer() {
  const [url, setUrl] = useState("http://localhost:8080/movies");

  return (
    <>
      <SidePanelContainer url={url} setUrl={setUrl}/>
      <CollectionContainer url={url} setUrl={setUrl}/>
    </>
  )
}