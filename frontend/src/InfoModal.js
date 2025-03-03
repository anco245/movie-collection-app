import React, { useState } from 'react'
import "./EntryModal.css";
import XIcon from './Icons/XIcon';

export function InfoModal({movieToView}) {

    const [title, setTitle] = useState(movieToView.title);
    const [year, setYear] = useState(movieToView.year);
    const [runtime, setRuntime] = useState(movieToView.runtime);
    const [format, setFormat] = useState(movieToView.format);
    const [genre, setGenre] = useState(movieToView.genre);
    const [seen, setSeen] = useState(movieToView.seen);

    function handleSubmit() {
        let valuesToAdd = JSON.stringify({
            id: movieToView.id,
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

    function handleCheckChange(e) {
        console.log("value: ", e.target.value)
        setSeen(parseInt(e.target.value));
    }

    function handleFormatChange(e) {
        setFormat(e.target.value);
    }

    return (
        <div className="entry-modal-container">
            <div className="entryModal">
                <div className="ModalXContainer"><XIcon /></div>
                <text>Edit Entry</text>
                <form>
                    <div className="formGroup">
                        <label htmlFor="title">Title</label>
                        <input name="title" placeholder={movieToView.title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="location">Location</label>
                        <input name="location" placeholder={movieToView.title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="year">Year:{movieToView.year}</label>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="runtime">Runtime</label>
                        <input name="runtime" placeholder={movieToView.runtime} onChange={(e) => setRuntime(e.target.value)}/>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="director">Director</label>
                        <input name="director" placeholder={movieToView.director}/>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="format">Format</label>
                        <select name="format" value={format}>
                            <option value="bluray">Bluray</option>
                            <option value="dvd">DVD</option>
                            <option value="Movies Anywhere">Movies Anywhere</option>
                        </select>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="genre">Genre</label>
                        <input name="genre" placeholder={movieToView.genre} />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="seen">Watched<input type="radio" className="seenVal" name="seen" value={1} checked={seen === 1} onChange={handleCheckChange}/></label>
                        <label htmlFor="seen">Not Yet<input type="radio" className="seenVal" name="seen" value={0} checked={seen === 0} onChange={handleCheckChange}/></label> 
                    </div>
                </form>
            </div>
        </div>
    )
}