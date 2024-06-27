import React, { useState, useEffect } from 'react';
import './App.css';

function SidePanelContainer() {
  return (
    <div className="sidePanel">
      <IconAndTitle />
      <SearchContainer />
    </div>
  );
}

function IconAndTitle() {
  return (
    <div className="iconandtitle">
      <div className="icon">
        <img src="https://www.e-cookietins.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/s/1s_115_movie_reel.png" alt="minimal film reel" height="50px" width="50px" />
      </div>

      <div className="title">
        <p id="p1">John's Movie Collection</p>
      </div>
    </div>
  )
}

function SearchContainer() {

  return (
    <div className="search">
      <input type="text" placeholder="Search title..." spellCheck="false" />
      <button onClick={()=>{alert("Pressed Button")}}></button>
    </div>
  )
}  

const Collection = () => {
  const [data, setData] = useState([]);

  function getInfo() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/movies');

    xhr.onload = function() {
      if (xhr.status === 200) {
        setData(JSON.parse(xhr.responseText));
      }
    };

    xhr.send();
  }

  useEffect(() => {
    getInfo();
  }, []);

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
              <tr key={index}>
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

function CollectionContainer() {
  return (
    <div className="collection">
      <Collection />
    </div>
  );
}

export default function RootContainer() {
  return (
    <>
      <SidePanelContainer />
      <CollectionContainer />
    </>
  )
}