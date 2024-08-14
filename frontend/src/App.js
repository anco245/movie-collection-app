import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Graph from './graphs';

function SidePanelContainer({url, setUrl, currentDisplay, setDisplay, data, setData}) {

  const [currentAdd, setAdd] = useState("physical");

  return (
    <div className="sidePanel">
      <IconAndTitle url={url} setUrl={setUrl} />
      <SearchContainer url={url} setUrl={setUrl} data={data} setData={setData} />
      <FiltersContainer url={url} setUrl={setUrl} />
      <AddEntryContainer currentAdd={currentAdd} setAdd={setAdd} data={data} setData={setData} setDisplay={setDisplay}/>
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

function SearchContainer({url, setUrl, data, setData}) {
  const [inputValue, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value)

    if(event.target.value !== "")
    {
      url = "http://localhost:8080/movies/titleOfMovie/" + inputValue;
    } else {
      url = "http://localhost:8080/movies";
    }

    setUrl(url);

    getMovies(setData, url);
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

function AddEntryContainer({currentAdd, setAdd, data, setData, setDisplay}) {
  return (
    <div className="addEntry">
      <ChooseType currentAdd={currentAdd} setAdd={setAdd} />
      <AddEntry currentAdd={currentAdd} setAdd={setAdd} data={data} setData={setData} setDisplay={setDisplay}/>
    </div>
  );
}

function ChooseType({currentAdd, setAdd}) {

  const handleOptionChange = (event) => {
    setAdd(event.target.value);
  }
    
  return (
    <div className="radioSelect">
      <label><input type="radio" className="typeOfMedia" name="typeOfMedia" value="physical" checked={currentAdd === 'physical'} onChange={handleOptionChange} />Physical</label>
      <label><input type="radio" className="typeOfMedia" name="typeOfMedia" value="other" checked={currentAdd === 'other'} onChange={handleOptionChange}/>Other</label>
    </div>
  );
}

function AddEntry({currentAdd, setAdd, data, setData, setDisplay}) {

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

  const [qualityValue, setQuality] = useState("");
  const [otherFormatValue, setOtherFormat] = useState("");

  function handleSubmit() {
    let url = "";

    if(currentAdd === "physical") {
      url = "http://localhost:8080/movies/addPhysicalEntry/title=" + titleValue + "&format=" + formatValue + "&pack=" + packValue +
              "&edition=" + editionValue + "&year=" + yearValue + "&director=" + directorValue + "&runtime=" + runtimeValue +
              "&genre=" + genreValue + "&seen=" + seenValue + "&country=" + countryValue + "&type=" + typeValue;

      setTitle("");
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

    } else if (currentAdd === "other") {
      url = "http://localhost:8080/movies/addUsbEntry/title=" + titleValue + "&quality=" + qualityValue + 
              "&usb=" + otherFormatValue + "&director=" + directorValue + "&year=" + yearValue + "&runtime=" + runtimeValue + "&genre=" + 
              genreValue + "&seen=" + seenValue + "&type=" + typeValue;
    }
  
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        JSON.parse(xhr.responseText);
      }
    };
    xhr.send();

    refreshTemp();

    //getMovies(setData, "http://localhost:8080/movies");
    setDisplay("addEntryNotice");
  }

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
  } else if (currentAdd === "other") {
    return (
      <div className="mediaTypeDisplay">
        <input type="text" placeholder="Title..." spellCheck="false" value={titleValue} onChange={(e) => setTitle(e.target.value)}/>
        <input type="text" placeholder="Quality..." spellCheck="false" value={qualityValue} onChange={(e) => setQuality(e.target.value)}/>
        <input type="text" placeholder="Non-physical format..." spellCheck="false" value={otherFormatValue} onChange={(e) => setOtherFormat(e.target.value)}/>
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

function refreshTemp() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', "http://localhost:8080/movies/createTemp");
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText));
    }
  };
  xhr.send();
}


function Collection({url, setUrl, data, setData}) {

  /*
    useCallback is necessary in order to efficently update what has been changed
    without rerendering the entire page.
  */
  const getInfo = useCallback(() => {
    getMovies(setData, url);
  }, [setData, url]);

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

function AddEntryNotice({setDisplay}) {

  function handleClick() {
    setDisplay("collection");
  }

  return (
    <div>
      <p>Sucessfully Submitted New Entry</p>
      <button onClick={handleClick}>Go Back</button>
    </div>
  )
}

function MainContainer({url, setUrl, currentDisplay, setDisplay, data, setData}) {

  if(currentDisplay === "collection") {
    return (
      <div className="collection">
        <Collection url={url} setUrl={setUrl} data={data} setData={setData}/>
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
        <AddEntryNotice setDisplay={setDisplay}/>
      </div>
    );
  }
}

export default function RootContainer() {
  const [url, setUrl] = useState("http://localhost:8080/movies");
  const [currentDisplay, setDisplay] = useState("collection");
  const [data, setData] = useState([]);

  return (
    <>
      <SidePanelContainer url={url} setUrl={setUrl} currentDisplay={currentDisplay} setDisplay={setDisplay} data={data} setData={setData}/>
      <MainContainer url={url} setUrl={setUrl} currentDisplay={currentDisplay} setDisplay={setDisplay} data={data} setData={setData}/>
    </>
  )
}