import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function SidePanelContainer({url, setUrl}) {
  return (
    <div className="sidePanel">
      <IconAndTitle url={url} setUrl={setUrl} />
      <SearchContainer url={url} setUrl={setUrl} />
      <FiltersContainer url={url} setUrl={setUrl} />
      <GetRandomMovieButton url={url} setUrl={setUrl} />
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

function FiltersContainer({url, setUrl}) {
  return (
    <div className="filters">
      <BlurayFilter url={url} setUrl={setUrl} />
    </div>
  );
}

function BlurayFilter({url, setUrl}) {

  const [checkBoxValue, setValue] = useState(false);

  console.log(checkBoxValue);

  const handleChange = (event) => {

    setValue(event.target.checked);

    if(checkBoxValue === true)
    {
      console.log("in here");
      url = "http://localhost:8080/movies/bluray";
      setUrl(url);
    } else if (checkBoxValue === false) {
      url = "http://localhost:8080/movies";
      setUrl(url);
    }
  }

  return (
    <div className="checkBox">
      <input type="checkbox" id="blurayCheck" name="blurayCheck" onChange={handleChange}/>
      <label htmlFor="blurayCheck">Bluray</label>
    </div>
  );
}

function GetRandomMovieButton({url, setUrl}) {

  function handleClick() {
      setUrl("http://localhost:8080/movies/getRandomMovie")
  }

  return (
      <div className="getRandomMovieButton">
          <button onClick={handleClick}>Press for Random Movie</button>
      </div>
  );
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
      <table className="movie-table">
        <thead>
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
        </thead>

        <tbody>
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
        </tbody>
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