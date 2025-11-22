import music from "../assets/music.png";
import { IoMdHome } from "react-icons/io";
import { BsGrid1X2 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { CiHeadphones } from "react-icons/ci";

function SideBar() {
  return (
    <div className="bg-gradient-to-l from-black to-gray-700">
      <div className="mt-3 p-2">
        <img src={music} className="mt-1 w-24 hidden md:block cursor-pointer" />
        <img src={music} className="mt-1 w-12 md:hidden block cursor-pointer" />
      </div>
      <div className="flex flex-row items-center justify-center gap-5 p-2 ">
        <div className="bg-red-500 w-full flex flex-row items-center justify-center gap-2 p-2 rounded-lg cursor-pointer">
          <IoMdHome className="text-2xl text-white " />
          <p className="text-lg font-semibold hidden md:block text-white">
            Home
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-5 p-2 ">
        <div className="hover:bg-red-500 w-full flex flex-row items-center justify-center gap-2 p-2 rounded-lg cursor-pointer">
          <BsGrid1X2 className="text-2xl text-white " />
          <p className="text-lg font-semibold hidden md:block text-white">
            Browser
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-5 p-2 ">
        <div className="hover:bg-red-500 w-full flex flex-row items-center justify-center gap-2 p-2 rounded-lg cursor-pointer">
          <CiHeart className="text-2xl text-white " />
          <p className="text-lg font-semibold hidden md:block text-white">
            Favorites
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-5 p-2 ">
        <div className="hover:bg-red-500 w-full flex flex-row items-center justify-center gap-2 p-2 rounded-lg cursor-pointer">
          <CiHeadphones className="text-2xl text-white " />
          <p className="text-lg font-semibold hidden md:block text-white">
            Library
          </p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
