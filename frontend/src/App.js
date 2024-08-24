//Acts as entry point to program
import React, { useState, createContext } from "react"
import CollectionEntryPoint from "./Collection";
import MainMenuEntryPoint from "./MainMenu";

export const MyContext = createContext();

export default function AppEntryPoint() {

    const [isMainMenu, setIsMainMenu] = useState(true);

    if(isMainMenu)
    {
        return (
            <MyContext.Provider value={{setIsMainMenu}}>
                <MainMenuEntryPoint />;
            </MyContext.Provider>
        );
    } else {
        return (
            <MyContext.Provider value={{setIsMainMenu}}>
                <CollectionEntryPoint />;
            </MyContext.Provider>
        );
    }
}