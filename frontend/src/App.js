//Acts as entry point to program
import React, { useState } from "react"

import CollectionEntryPoint from "./Collection";
import MainMenuEntryPoint from "./MainMenu";

//create contetxtt;

export default function AppEntryPoint() {

    const [isMainMenu, setIsMainMenu] = useState(true);

    if(isMainMenu)
    {
        return <MainMenuEntryPoint setIsMainMenu={setIsMainMenu}/>;
    } else {
        return <CollectionEntryPoint />
    }
}