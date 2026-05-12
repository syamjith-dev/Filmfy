import { createContext, useState } from "react";

export const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {

    const [urlId, setUrlId] = useState("");

    return (
        <PlayerContext.Provider value={{ urlId, setUrlId }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerProvider;