import { useContext, useRef, useState } from "react";
import { FaBalanceScale, FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { PlayerContext } from "../context/PlayerContext";

export default function NewRealease({
  setCurrentSongImage,
  setCurrentSongTitle,
  setCurrentSongArtist,
}) {
  const { songData, backendUrl } = useContext(PlayerContext);
  const [playingSong, setPlayingsong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio());

  const handlePauseClick = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingsong(null);

      setCurrentSongImage(null);
      setCurrentSongArtist(null);
      setCurrentSongTitle(null);
    }
  };

  const handlePlayClick = (song) => {
    if (playingSong?._id === song._id) {
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current.src = `${backendUrl}/${song.filePath}`;
    audioRef.current.play();
    setPlayingsong(song);

    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration);
    };

    audioRef.current.ontimeupdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const imageUrl = `${backendUrl}/${song.imageFilePath}`.replace(/\\/g, "/");

    
    setCurrentSongImage(imageUrl);
    setCurrentSongTitle(song.title);
    setCurrentSongArtist(song.artist);
  };

  const handleVolumeChange = (e) => {
    const volume = e.target.value;
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current) {
      const progressBar = e.target;
      const newTime =
        ((e.clientX - progressBar.getBoundingClientRect().left) /
          progressBar.offsetWidth) *
        duration;
      audioRef.current.currentTime = newTime;
    }
  };
  return (
    <div className="mt-3 p-2 mb-16">
      <div className="flex flex-row justify-between items-center text-white ">
        <h1 className="text-lg font-bold">New Releases</h1>
        <p className="text-sm text-red-500 hover:text-white mr-2 cursor-pointer">
          See more
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {songData.map((release) => (
          <div key={release._id} className="relative group">
            <img
              src={`${backendUrl}/${release.imageFilePath}`}
              className="w-full h-40 object-cover object-top  rounded-lg "
            />
            <div className="absolute h-40 w-full inset-0 flex items-end p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <button
                className="bg-red-500 p-3 rounded-full text-white hover:bg-red-600 "
                onClick={() =>
                  playingSong?._id === release._id
                    ? handlePauseClick()
                    : handlePlayClick(release)
                }
              >
                {playingSong?._id === release._id ? <FaPause /> : <FaPlay />}
              </button>
            </div>
            <div className="mt-2 ">
              <p className="text-white font-semibold">{release.title}</p>
              <p className="text-gray-400 text-sm">{release.artist}</p>
            </div>

            {playingSong?._id === release._id && (
              <div className="bottom-4 w-full flex items-center justify-between z-10">
                <label htmlFor="volume" className="text-white ">
                  Volume
                </label>
                <input
                  type="range"
                  id="volume"
                  min="0"
                  max="100"
                  onChange={handleVolumeChange}
                  defaultValue="100"
                  className="w-16 h-0.5 "
                />
              </div>
            )}
            {playingSong?._id === release._id && (
              <div
                onClick={handleProgressClick}
                className="w-full mt-2 h-0.5 cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #ff0000 ${
                    (currentTime / duration) * 100
                  }%, #fff 0% )`,
                }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
