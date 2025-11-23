import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { FaHeart } from "react-icons/fa";
import { FaEllipsisH } from "react-icons/fa";

export default function Display() {
  const { songData, backendUrl } = useContext(PlayerContext);

  return (
    <div className="fixed top-4 right-4 w-96 max-h-[calc(100vh-2rem)] bg-gradient-to-r from-black to-gray-700 text-white rounded-xl p-4 overflow-y-auto shadow-2xl">
      <div className="flex flex-row justify-between items-center mb-4">
        <h1 className="font-bold text-lg">Top Streams</h1>
        <div className="flex flex-row items-center space-x-2">
          <p className="bg-red-500 text-white rounded-lg px-3 py-1 text-sm">
            Local
          </p>
          <p className="text-white px-3 py-1 text-sm cursor-pointer hover:bg-gray-700 rounded-lg">
            Global
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {songData.slice(0, 5).map((song, index) => (
          <div
            key={song._id}
            className="flex flex-row items-center justify-between p-2 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex flex-row items-center space-x-3">
              <p className="text-gray-400 text-sm w-4">{index + 1}</p>
              <img
                src={`${backendUrl}/${song.imageFilePath}`}
                alt={song.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{song.title}</p>
                <p className="text-xs text-gray-400 truncate">{song.artist}</p>
              </div>
            </div>
            <div className="flex flex-row items-center space-x-3 ml-2">
              <FaHeart className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
              <FaEllipsisH className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
