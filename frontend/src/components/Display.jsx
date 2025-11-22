import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { FaHeart } from "react-icons/fa";
import { FaEllipsisH } from "react-icons/fa";

export default function Display() {
  const { songData, backendUrl } = useContext(PlayerContext);

  return (
    <div className="fixed top-4 right-4 w-96 h-auto max-h-[80vh] bg-gradient-to-r from-black to-gray-700 text-white rounded-xl p-3 overflow-y-scroll">
      <div className="w-96 h-auto bg-gradient-to-r from-black to-gray-700 text-white rounded-xl p-3  overflow-y-scroll ">
        <div className="flex flex-row justify-between items-center py-2 px-2 mt-3">
          <h1 className="font-bold text-md">Top Streams</h1>
          <div className="flex flex-row items-center gray-400 py-1 px-1 rounded-lg space-x-2 ">
            <p className="bg-red-500 text-white rounded-lg px-2 py-1 ">
              Local{" "}
            </p>
            <p className="text-white px-2 py-1 ">Global</p>
          </div>
        </div>
        <div className="mt-3 overflow-y-scroll ">
          {songData
            .map((song, index) => (
              <div
                key={song._id}
                className="flex flex-row items-center justify-between p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
              >
                <div className="flex flex-row items-center space-x-3 ">
                  <p className="text-gray-400 ">{index + 1}</p>
                  <img
                    src={`${backendUrl}/${song.imageFilePath}`}
                    alt={song.title}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold ">{song.title}</p>
                    <p className="text-sm text-gray-400">{song.artist}</p>
                  </div>
                </div>
                  <div className="flex flex-row items-center space-x-3">
                    <FaHeart className="text-gray-400 hover:text-red-500 cursor-pointer" />
                    <FaEllipsisH className="text-gray-400 cursor-pointer" />
                  </div>
              </div>
            ))
            .slice(0, 5)}
        </div>
      </div>
    </div>
  );
}
