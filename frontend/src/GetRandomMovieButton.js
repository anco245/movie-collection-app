import React from 'react';

export default function GetRandomMovieButton({url, setUrl}) {
    return <button onClick={() => setUrl("http://localhost:8080/movies/getRandomMoviehandleClick")}>Press for Random Movie</button>;
}