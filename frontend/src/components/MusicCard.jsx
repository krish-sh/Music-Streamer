import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { MdDelete } from "react-icons/md";
import { IoMdMicrophone } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";

export default function MusicCard({ music, fetchSongs }) {
  const { backendUrl } = useContext(PlayerContext);

  const musicsrc = `${backendUrl}/${music.filePath}`;
  const imagesrc = `${backendUrl}/${music.imageFilePath}`;
  console.log("Music object:", music);
  console.log("Music src URL:", musicsrc);
  console.log("Image src URL:", imagesrc);

  const handleSubmit = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/admin/delete-music/${id}`
      );
      if (data.success) {
        toast.success("Music deleted successfully");
        fetchSongs();
      }
    } catch (error) {
      toast.error("Error in delete button");
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-500 text-white rounded-lg shadow-lg overflow-hidden transition-transform transform relative">
      <img
        src={imagesrc}
        alt={music.title}
        className="w-full h-40 object-cover object-top hover:scale-105 transition-all duration-300"
      />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold ">{music.title}</h3>{" "}
          <MdDelete
            onClick={() => handleSubmit(music._id)}
            className="text-lg absolute top-4 hover:text-2xl transition-all"
          />
        </div>
        <div className="flex items-center gap-4 justify-start">
          <IoMdMicrophone />
          {music.artist}
        </div>
        <p className="text-sm mt-2">
          <span className="text-white text-xs">Updated at:</span>
          {new Date(music.createdAt).toLocaleString()}
        </p>
        <audio controls className="w-full mt-3 ">
          <source src={musicsrc} />
          Your browser Doesn't support the audio element
        </audio>
      </div>
    </div>
  );
}
