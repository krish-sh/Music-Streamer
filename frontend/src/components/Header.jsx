import React, { useState } from "react";
import NewRealease from "./NewRealease";

export default function Header() {
  const [currentSongImage, setCurrentSongImage] = useState(null);
  const [currentSongTitle, setCurrentSongTitle] = useState(null);
  const [currentSongArtist, setCurrentSongArtist] = useState(null);

  return (
    <>
      <header
        className="relative bg-cover bg-no-repeat bg-center h-96 flex items-center justify-center text-white"
        style={{
          backgroundImage: currentSongImage
            ? `url(${currentSongImage})`
            : "none",
          backgroundColor: "#1a1a1a",
        }}
      >
        {currentSongImage && (
          <div
            className="absolute inset-0 hidden md:block"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
          ></div>
        )}

        <div className="relative z-10 hidden md:block">
          {currentSongTitle && (
            <>
              <h1 className="text-3xl font-bold">{currentSongTitle}</h1>
              <p className="text-lg mt-2">{currentSongArtist}</p>
            </>
          )}
        </div>
      </header> 
      <NewRealease
        setCurrentSongImage={setCurrentSongImage}
        setCurrentSongTitle={setCurrentSongTitle}
        setCurrentSongArtist={setCurrentSongArtist}
      />
    </>
  );
}
