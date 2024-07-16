import React from 'react';

export default function GetRandomMovieButton({url, setUrl}) {

    function handleClick() {
        setUrl("http://localhost:8080/movies/getRandomMovie")
    }

    return (
        <div id="movieButtonDiv">
            <button id="getRandomMovieButton" onClick={handleClick}>Press for Random Movie</button>
        </div>
    );
}