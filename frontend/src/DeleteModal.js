import React, { useState, useContext } from 'react'
import { MyContext } from './Collection';
import "./EntryModal.css";
import XIcon from './Icons/XIcon';

export function DeleteModal({movieToDelete}) {

    function handleSubmit() {
        let valueToAdd = JSON.stringify({
            id: movieToDelete.id
          });
          
          const xhr = new XMLHttpRequest();
          xhr.open('POST', "http://localhost:8080/movies/deleteEntry");
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(valueToAdd);
    }

    const deleteText = "Are you sure you want to delete this entry?\nThere's no turning back!!!!"

    return (
        <div className="entry-modal-container">
            <div className="entryModal">
                <div className="ModalXContainer"><XIcon /></div>
                <text>{deleteText}</text>
                <form>
                    <div className="formGroup">
                        <label htmlFor="title">Title: {movieToDelete.title}</label>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="year">Year: {movieToDelete.year}</label>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="runtime">Runtime: {movieToDelete.runtime}</label>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="format">Format: {movieToDelete.format}</label>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="genre">Genre: {movieToDelete.genre}</label>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="genre">Seen: {movieToDelete.seen === true ? "yes" : "no"}</label>
                    </div>
                    <button onClick={handleSubmit} className="btn">Submit</button>
                </form>
            </div>
        </div>
    )
}