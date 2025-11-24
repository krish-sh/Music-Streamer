import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const backendUrl = "https://music-streamer-ekod.onrender.com";

  const [songData, setSongData] = useState([]);

  const fetchSongs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/get-music`);

      setSongData(data.music);
    } catch (error) {
      console.log("Error in Fetch song Context:", error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const values = {
    backendUrl,
    fetchSongs,
    songData,
  };

  return (
    <PlayerContext.Provider value={values}>{children}</PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
