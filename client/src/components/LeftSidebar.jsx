import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { USER_API_ENDPOINT } from "@/utils/constants";
import axios from "axios";
import { toast } from "react-toastify";

const LeftSidebar = () => {
  const navigate = useNavigate()
  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(`${USER_API_ENDPOINT}/logout`)
      toast.success(response.data.message)
      navigate("/auth")
      console.log("Resonse in side handleLogout: ", response)
    } catch (error) {
      console.log("Error inside handleLogout: ", error)
    }
  }
  return (
    <div className="w-full sm:w-[20%] border-r-[1px] border-zinc-700 px-4 flex flex-col items-center">
      <div className="mb-10 mt-4 text-xl font-bold text-zinc-200 text-center">
        {/* <img
            className="ml-5"
            width={"24px"}
            src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png"
            alt="twitter-logo"
          /> */}
        <h1>Social Media</h1>
        <h1>Platform</h1>
      </div>
      <div>
        <div className="my-4">
          <NavLink
            to="/"
            className="flex items-center my-2 px-4 py-2 transition-all ease-in-out duration-300 hover:bg-slate-700 hover:cursor-pointer rounded-full"
          >
            <div>
              <CiHome size="24px" />
            </div>
            <h1 className="font-bold text-[16px] ml-2">Home</h1>
          </NavLink>
          <div className="flex items-center my-2 px-4 py-2 transition-all ease-in-out duration-300 hover:bg-slate-700 hover:cursor-pointer rounded-full">
            <div>
              <CiHashtag size="24px" />
            </div>
            <h1 className="font-bold text-[16px] ml-2">Explore</h1>
          </div>
          <div className="flex items-center my-2 px-4 py-2 transition-all ease-in-out duration-300 hover:bg-slate-700 hover:cursor-pointer rounded-full">
            <div>
              <IoIosNotificationsOutline size="24px" />
            </div>
            <h1 className="font-bold text-[16px] ml-2">Notifications</h1>
          </div>
          <NavLink
            to={`/profile/`}
            className="flex transition-all ease-in-out duration-300 items-center my-2 px-4 py-2 hover:bg-slate-700 hover:cursor-pointer rounded-full"
          >
            <div>
              <CiUser size="24px" />
            </div>
            <h1 className="font-bold text-[16px] ml-2">Profile</h1>
          </NavLink>
          <div className="flex transition-all ease-in-out duration-300 items-center my-2 px-4 py-2 hover:bg-slate-700 hover:cursor-pointer rounded-full">
            <div>
              <CiBookmark size="24px" />
            </div>
            <h1 className="font-bold text-[16px] ml-2">Bookmarks</h1>
          </div>
          <div
            onClick={handleLogout}
            className="flex transition-all ease-in-out duration-300 items-center my-2 px-4 py-2 hover:bg-slate-700 hover:cursor-pointer rounded-full"
          >
            <div>
              <AiOutlineLogout size="24px" />
            </div>
            <h1 className="font-bold text-16px ml-2">Logout</h1>
          </div>
          <button className="px-4 py-2 border-none text-md bg-slate-800 hover:bg-slate-700 w-full rounded-full text-zinc-200 font-bold transition-all ease-in-out duration-300">
            Post
          </button>
        </div>
      </div>
      <div className="absolute bottom-4 flex justify-between items-center gap-4">
        <div className="h-10 w-10 bg-green-500 rounded-full">
          {/* <img src="" alt="" /> */}
        </div>
        <div>
          <h1 className="text-white font-bold">Username</h1>
          <p className="text-zinc-300">Email</p>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
