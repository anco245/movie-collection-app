import React from 'react'
import "./Modal.css";

export const Modal = () => {
    return (
        <div className="modal-container">
            <div className="modal">
                <form>
                    <div className="formGroup">
                        <label htmlFor="title">Title</label>
                        <input name="title" />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="year">Year</label>
                        <input name="year" />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="runtime">Runtime</label>
                        <input name="runtime" />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="format">Format</label>
                        <select name="format">
                            <option value="bluray">Bluray</option>
                            <option value="dvd">DVD</option>
                            <option value="bluray">Movies Anywhere</option>
                        </select>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="genre">Genre</label>
                        <input name="genre" />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="seen">Watched<input type="radio" value="watched" checked/></label>
                        <label htmlFor="seen">Not Yet<input type="radio" value="notYet" /></label>
                    </div>
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        </div>
    )
}