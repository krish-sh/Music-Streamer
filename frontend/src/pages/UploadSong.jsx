import { createContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";
import uploadMusic from "../assets/arrow.png";
import uploadImage from "../assets/image-.png";

export default function UploadSong() {
  const { backendUrl } = createContext(PlayerContext);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center">
      <form className="flex flex-col max-h-screen gap-8 text-gray-600 w-full max-w-xl mx-auto p-4 sm:6 md:p-8    shadow-sm  rounded-xl shadow-black">
        <div className="flex flex-col md:flex-row gap-6 items-center ">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm md:text-base">Upload Song</p>
            <input type="file" id="song" accept="audio/*" hidden />
            <label htmlFor="song">
              <img
                src={uploadMusic}
                className="w-24 h-24 md:w-32 md:h-32 cursor-pointer object-contain"
              />
            </label>
          </div>
          <div className="flex flex-col items-center gap-2  ">
            <p className="text-sm md:text-base">Upload Image</p>
            <input type="file" id="image" accept="image/*" hidden />
            <label htmlFor="image">
              <img
                src={uploadImage}
                className="w-24 h-24 md:w-32 md:h-32 cursor-pointer object-contain"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="title" className="text-sm md:text-base">
            Song Name
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="bg-transparent w-full p-2.5 rounded-lg outline-none border "
            placeholder="Song name"
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="artist" className="text-sm md:text-base">
            Artist Name
          </label>
          <input
            id="artist"
            type="text"
            name="artist"
            className="bg-transparent w-full p-2.5 rounded-lg outline-none border"
            placeholder="Artist name"
            required
          />
        </div>
        <button
          type="submit"
          className="text-sm md:text-base bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 md:py-3 md:px-8 rounded-lg "
        >
          Add
        </button>
      </form>
    </div>
  );
}


// 1:45