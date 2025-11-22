import { IoIosAddCircle } from "react-icons/io";
import { IoIosMusicalNotes } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import music from "../assets/music.png";

export default function SideBarAdmin() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-t from-black to-gray-500 min-h-screen space-y-16 p-[1vw]  flex flex-col">
      <img
        src={music}
        onClick={() => navigate("/")}
        className="mt-1 w-24 hidden md:block cursor-pointer"
      />
      <img
        src={music}
        onClick={() => navigate("/")}
        className="mt-1 w-12 md:hidden block cursor-pointer"
      />

      <div className="flex items-center flex-col gap-5  py-2 px-2">
        <NavLink
          to={"/add-music"}
          className="flex items-center gap-2 text-white text-sm font-medium rounded-xl cursor-pointer hover:bg-gray-700 px-3 py-3"
        >
          <IoIosAddCircle className="w-12 h-12 text-xl font-medium" />
          <p>Add Music </p>
        </NavLink>
      </div>
      <div className="flex items-center flex-col gap-5  py-2 px-2 ">
        <NavLink
          to={"/list-songs"}
          className="flex items-center gap-2 text-white text-sm font-medium rounded-xl cursor-pointer hover:bg-gray-700 px-3 py-3"
        >
          <IoIosMusicalNotes className="w-12 h-12 text-xl font-medium " />
          <p>List of Songs </p>
        </NavLink>
      </div>
    </div>
  );
}
