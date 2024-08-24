import React, {useContext} from "react"
import './App.css';
import { MyContext } from "./App";

function NewCollection() {

    const handleClick = () => {
    }

    return (
            <button className="newCollectionButton" type="button" onClick={handleClick}>New Collection</button>
    );
}

function LoadCollection() {
    const {setIsMainMenu} = useContext(MyContext);

    const handleClick = () => {
        setIsMainMenu(false);
    }

    return (
        <button className="loadCollectionButton" type="button" onClick={handleClick}>Load Collection</button>
    );
}

function MainMenuContainer() {

    return (
        <div className="menuOptions">
            <NewCollection />
            <LoadCollection />
        </div>
    );
}

export default function MainMenuEntryPoint() {

    return (
        <div className="mainMenu">
            <MainMenuContainer />
        </div>
    );
}