import React, { useState, useContext } from 'react'
import { MyContext } from './Collection';
import "./EntryModal.css";
import XIcon from './Icons/XIcon';

export function EditModal({movieToChange}) {

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
        <div className="entry-modal-container">
            <div className="entryModal">
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