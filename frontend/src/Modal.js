import React, { useState, useContext } from 'react'
import { MyContext } from './Collection';
import "./Modal.css";

function XIcon() {

    const {setShowModal} = useContext(MyContext);

    function handleClick() {
        setShowModal(false);
    }

    return (
        <div className="XIcon" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>
        </div>
    );
}

export function Modal({movieToChange}) {

    const [title, setTitle] = useState(movieToChange.title);
    const [year, setYear] = useState(movieToChange.year);
    const [runtime, setRuntime] = useState(movieToChange.runtime);
    const [format, setFormat] = useState(movieToChange.format);
    const [genre, setGenre] = useState(movieToChange.genre);
    const [seen, setSeen] = useState(movieToChange.seen);

    function handleSubmit() {
        let valuesToAdd = JSON.stringify({
            id: movieToChange.id,
            title: title,
            year: year,
            runtime: runtime,
            format: format,
            genre: genre,
            seen: seen
          });
          
          const xhr = new XMLHttpRequest();
          xhr.open('POST', "http://localhost:8080/movies/updateEntry");
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(valuesToAdd);
    }

    function handleCheckChange() {

    }

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="ModalXContainer"><XIcon /></div>
                <text>Edit Entry</text>
                <form>
                    <div className="formGroup">
                        <label htmlFor="title">Title</label>
                        <input name="title" placeholder={movieToChange.title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="year">Year</label>
                        <input name="year" placeholder={movieToChange.year} onChange={(e) => setYear(e.target.value)}/>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="runtime">Runtime</label>
                        <input name="runtime" placeholder={movieToChange.runtime} onChange={(e) => setRuntime(e.target.value)}/>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="format">Format</label>
                        <select name="format">
                            <option value="bluray">Bluray</option>
                            <option value="dvd">DVD</option>
                            <option value="moviesAnywhere">Movies Anywhere</option>
                        </select>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="genre">Genre</label>
                        <input name="genre" placeholder={movieToChange.genre} onChange={(e) => setGenre(e.target.value)}/>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="seen">Watched<input type="radio" name="seen" value="watched" checked onChange={handleCheckChange}/></label>
                        <label htmlFor="seen">Not Yet<input type="radio" name="seen" value="notYet" /></label> 
                    </div>
                    <button onClick={handleSubmit} className="btn">Submit</button>
                </form>
            </div>
        </div>
    )
}