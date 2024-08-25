/* eslint-disable no-octal-escape */
import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import Graph from './graphs';

export const MyContext = createContext();

function SidePanelContainer() {

  console.log("SidePanelContainer rendered");

  return (
    <div className="sidePanel">
      <IconAndTitle />
      <SearchContainer />
      <FiltersContainer />
      <AddEntryContainer />
      <GraphButton />
      <GetRandomMovieButton />
    </div>
  );
}

function IconAndTitle() {

  console.log("IconAndTitle rendered");

  const{setUrl} = useContext(MyContext);

  const handleClick = () => {
    setUrl("http://localhost:8080/movies")
  }

  return (
    <div className="iconandtitle">
      <div className="icon">
        <img onClick={handleClick} src="https://www.e-cookietins.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/s/1s_115_movie_reel.png" alt="minimal film reel" height="50px" width="50px" />
      </div>

      <div className="title">
        <p id="p1">Movie Collection</p>
      </div>
    </div>
  )
}

function SearchContainer() {
  
  console.log("SearchContainer rendered");

  const {setUrl} = useContext(MyContext);
  
  const [inputValue, setInput] = useState("");
  let newUrl = "http://localhost:8080/movies";

  const handleInputChange = (event) => {
    let newValue = event.target.value;
    setInput(newValue);

    if(newValue !== "")
    {
      newUrl = newUrl + "/titleOfMovie/" + newValue;
    }

    setUrl(newUrl);
  }

  return (
    <div className="search">
      <input type="text" placeholder="Search title..." spellCheck="false" value={inputValue} onChange={handleInputChange}/>
    </div>
  )
}

function FiltersContainer() {
  console.log("FiltersContainer rendered");
  
  return (
    <div className="filters">
      {/*<BlurayFilter*/}
    </div>
  );
}

function BlurayFilter() {
  console.log("BlurayFilter rendered");

  const [checkBoxValue, setValue] = useState(false);
  const {setUrl} = useContext(MyContext);
  let {url} = useContext(MyContext);

  const handleChange = (event) => {
    setValue(event.target.checked);

    if(!checkBoxValue)
    {
      url = "http://localhost:8080/movies/bluray";
      setUrl(url);
    } else if (checkBoxValue) {
      url = "http://localhost:8080/movies";
      setUrl(url);
    }
  }

  return (
    <div className="checkBox">
      <input type="checkbox" id="blurayCheck" name="blurayCheck" checked={checkBoxValue} onChange={handleChange}/>
      <label htmlFor="blurayCheck">Bluray</label>
    </div>
  );
}

function AddEntryContainer() {
  
  console.log("AddEntryContainer rendered");

  return (
    <div className="addEntry">
      <AddEntry />
    </div>
  );
}

function AddEntry() {

  console.log("AddEntry rendered");

  const {setDisplay, setData} = useContext(MyContext);

  const [titleValue, setTitle] = useState("");
  const [formatValue, setFormat] = useState("");
  const [packValue, setPack] = useState(undefined);
  const [editionValue, setEdition] = useState(undefined);
  const [yearValue, setYear] = useState("");
  const [directorValue, setDirector] = useState(undefined);
  const [runtimeValue, setRuntime] = useState("");
  const [genreValue, setGenre] = useState("");
  const [seenValue, setSeen] = useState(true);
  const [countryValue, setCountry] = useState("USA");
  const [typeValue, setType] = useState("Movie");

  function handleSubmit() {

    let valuesToAdd = JSON.stringify({
      title: titleValue,
      format: formatValue,
      pack: packValue,
      edition: editionValue,
      year: yearValue,
      director: directorValue,
      runtime: runtimeValue,
      genre: genreValue,
      seen: seenValue,
      country: countryValue,
      type: typeValue
    });

    console.log("here");
    setTitle("");
    setFormat("");
    setPack(undefined);
    setEdition(undefined);
    setYear("");
    setDirector("");
    setRuntime("");
    setGenre("");
    setSeen(true);
    setCountry("USA");
    setType("Movie");
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', "http://localhost:8080/movies/addPhysicalEntry");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(valuesToAdd);

    getMovies(setData, "http://localhost:8080/movies")
    setDisplay("addEntryNotice");
  }

  return (
    <div className="mediaTypeDisplay">
      <input type="text" placeholder="Title..." spellCheck="false" value={titleValue} onChange={(e) => setTitle(e.target.value)}/>
      <input type="text" placeholder="Format..." spellCheck="false" value={formatValue} onChange={(e) => setFormat(e.target.value)}/>
      <input type="text" placeholder="Pack..." spellCheck="false" value={packValue} onChange={(e) => setPack(e.target.value)}/>
      <input type="text" placeholder="Edition..." spellCheck="false" value={editionValue} onChange={(e) => setEdition(e.target.value)}/>
      <input type="text" placeholder="Year Released..." spellCheck="false" value={yearValue} onChange={(e) => setYear(e.target.value)}/>
      <input type="text" placeholder="Director..." spellCheck="false" value={directorValue} onChange={(e) => setDirector(e.target.value)}/>
      <input type="text" placeholder="Runtime..." spellCheck="false" value={runtimeValue} onChange={(e) => setRuntime(e.target.value)}/>
      <input type="text" placeholder="Genre..." spellCheck="false" value={genreValue} onChange={(e) => setGenre(e.target.value)}/>
      <input type="text" placeholder="Watched..." spellCheck="false" value={seenValue} onChange={(e) => setSeen(e.target.value)}/>
      <input type="text" placeholder="Country..." spellCheck="false" value={countryValue} onChange={(e) => setCountry(e.target.value)}/>
      <input type="text" placeholder="Type..." spellCheck="false" value={typeValue} onChange={(e) => setType(e.target.value)}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

function GraphButton() {

  console.log("GraphButton rendered");

  const {currentDisplay, setDisplay} = useContext(MyContext);

  const handleButton = (event) => {
    if(currentDisplay === "graph")
    {
      setDisplay("collection");
    } else if (currentDisplay === "collection") {
      setDisplay("graph");
    }
  }

  return (
    <button id="switchToGraphs" onClick={handleButton}>{currentDisplay === "collection" ? "Switch to Graph" : "Switch to Collection"}</button>
  )
}

function GetRandomMovieButton() {

  console.log("GetRandomMovieButton rendered");

  const {setUrl} = useContext(MyContext);

  function handleClick() {
    const randomEntryUrl = 'http://localhost:8080/movies/getRandomMovie';
    const uniqueUrl = `${randomEntryUrl}?t=${new Date().getTime()}`;
    setUrl(uniqueUrl);
  }

  return (
      <div className="getRandomMovieButton">
          <button onClick={handleClick}>Press for Random Movie</button>
      </div>
  );
}

function getMovies(setData, url) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    if (xhr.status === 200) {
      setData(JSON.parse(xhr.responseText));
    }
  };
  xhr.send();
}


function Collection() {

  console.log("Collection rendered");

  const {url, data, setData} = useContext(MyContext);
  const [isTextBox, setToTextBox] = useState(false);

  useEffect(() => {
    getMovies(setData, url);
  }, [setData, url]);

  const changeToTextBox = () => {
    setToTextBox(true);
  }

  return (
    <div id="movie-container">
      <table className="movie-table">
        <thead>
            <tr>
                <th>Title</th>
                <th>Year</th>
                <th>Runtime</th>
                <th>Format</th>
                <th>Genre</th>
                <th>Seen</th>
            </tr>
        </thead>

        <tbody>
          {data.map((movie, index) => {
            if(isTextBox)
            {
              return (
                <tr key={index} onClick={changeToTextBox}>
                  <td id="title"><input type="text" placeholder={movie.title} spellCheck="false" value={movie.title}/></td>
                  <td id="year">{movie.year}</td>
                  <td id="runtime">{movie.runtime}</td>
                  <td id="format">{movie.format}</td>
                  <td id="genre">{movie.genre}</td>
                  <td id="seen">{movie.seen===1 ? "yes" : "no"}</td>
                </tr>
            )
            } else {
              return (
                <tr key={index} onClick={changeToTextBox}>
                  <td id="title">{movie.title}</td>
                  <td id="year">{movie.year}</td>
                  <td id="runtime">{movie.runtime}</td>
                  <td id="format">{movie.format}</td>
                  <td id="genre">{movie.genre}</td>
                  <td id="seen">{movie.seen===1 ? "yes" : "no"}</td>
                </tr>
            )
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

function AddEntryNotice() {

  const {setDisplay} = useContext(MyContext);

  console.log("AddEntryNotice rendered");
  
  function handleClick() {
    setDisplay("collection");
  }

  return (
    <div className="entryNotice">
      <p id="p1">The Code Abides</p>
      <p id="p2">Movie Has Been Sucessfully Added!</p>
      <button onClick={handleClick}>Go Back</button>
    </div>
  )
}

function MainContainer() {

  const {currentDisplay} = useContext(MyContext);

  console.log("MainContainer rendered");

  if(currentDisplay === "collection") {
    return (
      <div className="collection">
        <Collection />
      </div>
    );
  } else if (currentDisplay === "graph") {
    return (
    <div className="collection">
      <Graph />
    </div>
    );
  } else if (currentDisplay === "addEntryNotice") {
    return (
      <div className="collection">
        <AddEntryNotice />
      </div>
    );
  }
}

export default function CollectionEntryPoint() {
  const [url, setUrl] = useState("http://localhost:8080/movies");
  const [currentDisplay, setDisplay] = useState("collection");
  const [data, setData] = useState([]);

  console.log("Entry Point rendered");

  return (
    <MyContext.Provider value={{ url, setUrl, currentDisplay, setDisplay, data, setData }}>
      <SidePanelContainer />
      <MainContainer />
    </MyContext.Provider>
  )
}