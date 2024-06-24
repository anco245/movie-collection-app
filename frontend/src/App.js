import React, { useState } from 'react';
import './App.css';

function SearchContainer() {
  return (
    <div className="search">
      <input type="text" placeholder="Search for a movie" spellCheck="false" />
      <button></button>
    </div>
  )
}

function SidePanelContainer() {
  return (
    <div className="sidePanel">
      <IconAndTitle />
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

function CollectionContainer() {
  return (
    <div className="collection">
      <DisplayCollection />
    </div>
  );
}

function DisplayCollection() {
  const [data, setData] = useState(null);

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

  return (
    <div>
      {getInfo()}
      {data ? <div>{JSON.stringify(data)}</div> : <div>Loading...</div>}
    </div>
  );
}

export default function RootContainer() {
  return (
    <>
      <SearchContainer />
      <SidePanelContainer />
      <CollectionContainer />
    </>
  )
}