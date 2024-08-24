import React from "react"
import './App.css';

function NewCollection({setIsMainMenu}) {

    const handleClick = () => {
        setIsMainMenu(false);
    }

    return <button type="button" onClick={handleClick}>New Collection</button>;
}

function LoadCollection() {
    return <button type="button">Load Collection</button>;
}

function MainMenuContainer({setIsMainMenu}) {

    return (
        <div>
            <NewCollection setIsMainMenu={setIsMainMenu}/>
            <LoadCollection />
        </div>
    );
}

export default function MainMenuEntryPoint({setIsMainMenu}) {

    return (
        <div className="mainMenu">
            <MainMenuContainer setIsMainMenu={setIsMainMenu}/>
        </div>
    );
}