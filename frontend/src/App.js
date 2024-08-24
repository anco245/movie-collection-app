//Acts as entry point to program
import React, { useState } from "react"

import CollectionEntryPoint from "./Collection";
import MainMenuEntryPoint from "./MainMenu";

export default function AppEntryPoint() {

    const [isMainMenu, setIsMainMenu] = useState(true);

    if(isMainMenu)
    {
        return <MainMenuEntryPoint />;
    } else {
        return <CollectionEntryPoint />
    }
}