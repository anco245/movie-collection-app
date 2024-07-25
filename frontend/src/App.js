import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Graph from './graphs';

function SidePanelContainer({url, setUrl, currentDisplay, setDisplay}) {

  const [currentAdd, setAdd] = useState("physical");

  return (
    <div className="sidePanel">
      <IconAndTitle url={url} setUrl={setUrl} />
      <SearchContainer url={url} setUrl={setUrl} />
      <FiltersContainer url={url} setUrl={setUrl} />
      <AddEntryContainer currentAdd={currentAdd} setAdd={setAdd}/>
      <GraphButton currentDisplay={currentDisplay} setDisplay={setDisplay} />
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
        <p id="p1">Movie Collection</p>
      </div>
    </div>
  )
}

function SearchContainer({url, setUrl}) {
  const [inputValue, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value)
    
    url = "http://localhost:8080/movies/titleOfMovie/" + inputValue;
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

function AddEntryContainer({currentAdd, setAdd}) {
  return (
    <div className="addEntry">
      <ChooseType currentAdd={currentAdd} setAdd={setAdd} />
      <AddEntry currentAdd={currentAdd} setAdd={setAdd} />
    </div>
  );
}

function ChooseType({currentAdd, setAdd}) {

  const [selectedOption, setSelectedOption] = useState('physical');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setAdd(event.target.value);
  }
    
  return (
    <div className="radioSelect">
      <label><input type="radio" className="typeOfMedia" name="typeOfMedia" value="physical" checked={selectedOption === 'physical'} onChange={handleOptionChange} />Physical</label>
      <label><input type="radio" className="typeOfMedia" name="typeOfMedia" value="usb" checked={selectedOption === 'usb'} onChange={handleOptionChange}/>USB</label>
    </div>
  );
}

function AddEntry({currentAdd, setAdd}) {

  const [titleValue, setTitle] = useState("");
  const [formatValue, setFormat] = useState("");
  const [packValue, setPack] = useState("");
  const [editionValue, setEdition] = useState("");
  const [yearValue, setYear] = useState("");
  const [directorValue, setDirector] = useState("");
  const [runtimeValue, setRuntime] = useState("");
  const [genreValue, setGenre] = useState("");
  const [seenValue, setSeen] = useState(true);
  const [countryValue, setCountry] = useState("USA");
  const [typeValue, setType] = useState("Movie");

  const [qualityValue, setQuality] = useState("");
  const [usbValue, setUsb] = useState("");


  function handleSubmit() {
    let url = "";

    if(currentAdd === "physical") {
      url = "http://localhost:8080/movies/addPhysicalEntry/title=" + titleValue + "?format=" + formatValue + "?pack=" + packValue +
              "?edition=" + editionValue + "?year=" + yearValue + "?director=" + directorValue + "?runtime=" + runtimeValue +
              "?genre=" + genreValue + "?seen=" + seenValue + "?country=" + countryValue + "?type=" + typeValue;
    } else if (currentAdd === "usb") {
      url = "http://localhost:8080/movies/addUsbEntry/title=" + titleValue + "?quality=" + qualityValue + 
              "?usb=" + usbValue + "?director=" + directorValue + "?year=" + yearValue + "?runtime=" + runtimeValue + "?genre=" + 
              genreValue + "?seen=" + seenValue + "?type=" + typeValue;
    }
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onload = function() {
      if (xhr.status === 200) {
        JSON.parse(xhr.responseText);
      }
    };

    xhr.send();
  }

  //Make info box appear when sucessfully submitted


  //make button or radio button
  //<input type="text" placeholder="Watched..." spellCheck="false" value={seenValue} onChange={(e) => setSeen(e.target.value)}/>

  if(currentAdd === 'physical') {
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
  } else if (currentAdd === "usb") {
    return (
      <div className="mediaTypeDisplay">
        <input type="text" placeholder="Title..." spellCheck="false" value={titleValue} onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" placeholder="Quality..." spellCheck="false" value={qualityValue} onChange={(e) => setQuality(e.target.value)}/>
        <input type="text" placeholder="Usb..." spellCheck="false" value={usbValue} onChange={(e) => setUsb(e.target.value)}/>
        <input type="text" placeholder="Director..." spellCheck="false" value={directorValue} onChange={(e) => setDirector(e.target.value)}/>
        <input type="text" placeholder="Year Released..." spellCheck="false" value={yearValue} onChange={(e) => setYear(e.target.value)}/>
        <input type="text" placeholder="Runtime..." spellCheck="false" value={runtimeValue} onChange={(e) => setRuntime(e.target.value)}/>
        <input type="text" placeholder="Genre..." spellCheck="false" value={genreValue} onChange={(e) => setGenre(e.target.value)}/>
        <input type="text" placeholder="Watched..." spellCheck="false" value={seenValue} onChange={(e) => setSeen(e.target.value)}/>
        <input type="text" placeholder="Type..." spellCheck="false" value={typeValue} onChange={(e) => setType(e.target.value)}/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  }
}

function GraphButton ({currentDisplay, setDisplay}) {

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

function MainContainer({url, setUrl, currentDisplay, setDisplay}) {

  if(currentDisplay === "collection") {
    return (
      <div className="collection">
        <Collection url={url} setUrl={setUrl}/>
      </div>
    );
  } else if (currentDisplay === "graph") {
    return (
    <div className="collection">
      <Graph />
    </div>
    );
  }
}

export default function RootContainer() {
  const [url, setUrl] = useState("http://localhost:8080/movies");
  const [currentDisplay, setDisplay] = useState("collection");

  return (
    <>
      <SidePanelContainer url={url} setUrl={setUrl} currentDisplay={currentDisplay} setDisplay={setDisplay}/>
      <MainContainer url={url} setUrl={setUrl} currentDisplay={currentDisplay} setDisplay={setDisplay}/>
    </>
  )
}