import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function SearchContainer() {
  return (
    <div className="search">
      <input type="text" placeholder="Search for a movie" spellCheck="false" />
      <button></button>
    </div>
  )
}

function SidePanelContainer() {
  return (
    <div className="sidePanel">
      <IconAndTitle />
    </div>
  );
}

function IconAndTitle() {
  return (
    <div className="iconandtitle">
      <div className="icon">
        <img src="https://www.e-cookietins.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/s/1s_115_movie_reel.png" alt="minimal film reel" height="50px" width="50px" />
      </div>

      <div className="title">
        <p id="p1">John's Movie Collection</p>
      </div>
    </div>
  )
}

function CollectionContainer() {
  return (
    <div className="collection">
      <Display1080Movies />
    </div>
  );
}

function Display1080Movies() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
      // Make an HTTP GET request to the backend
      axios.get('http://localhost:5000/api/get1080UsbMovies')
          .then(response => {
              // Set the users state with the response data
              setUsers(response.data);
          })
          .catch(error => {
              console.error('There was an error fetching the users!', error);
          });
  }, []);

  console.log(users);
}

export default function RootContainer() {
  return (
    <>
      <SearchContainer />
      <SidePanelContainer />
      <CollectionContainer />
    </>
  )
}