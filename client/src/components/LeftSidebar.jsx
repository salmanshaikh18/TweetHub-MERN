import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile, getOtherUsers, getUser } from "@/redux/slices/userSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";

const LeftSidebar = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    console.log(isMobileView);
  }, [isMobileView, setIsMobileView]);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${USER_API_ENDPOINT}/logout`);
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
      toast.success(response.data.message);
      navigate("/auth");
      console.log("Resonse in side handleLogout: ", response);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error inside handleLogout: ", error);
    }
  };
  return (
    <div className="w-full md:w-[20%] border-r-[1px] border-zinc-700 px-4 flex flex-col items-center">
      <div className="mb-6 md:mb-10 mt-6 text-xl font-bold text-zinc-200 text-center">
        {/* <img
            className="ml-5"
            width={"24px"}
            src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png"
            alt="twitter-logo"
          /> */}
        <h1 className="text-purple-500 text-3xl absolute top-2 left-2 md:relative">
          TweetHub
        </h1>
      </div>
      <div className="__mobileview md:hidden">
        <div className="absolute top-2 right-2">
          {isMobileView ? (
            <IoCloseOutline
              onClick={() => setIsMobileView((prev) => !prev)}
              className="text-4xl cursor-pointer font-bold"
            />
          ) : (
            <RxHamburgerMenu
              onClick={() => setIsMobileView((prev) => !prev)}
              className="text-3xl cursor-pointer"
            />
          )}
        </div>
       <div className="relative">
           {isMobileView && (
          <div className="w-[95vw] relative bg-slate-900 z-20">
            <div className="md:hidden block">
              <div className="my-4 flex flex-col justify-center items-center">
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
                  to={`/profile/${user?._id}`}
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
                {/* <button className="px-4 py-2 border-none text-md bg-slate-800 hover:bg-slate-700 rounded-full text-zinc-200 font-bold transition-all ease-in-out duration-300">
                Post
              </button> */}
              </div>
            </div>
          </div>
        )}
       </div>
      </div>
      <div className="hidden md:block">
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
            to={`/profile/${user?._id}`}
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
      {/* <div className="absolute bottom-4 flex justify-between items-center gap-4"> */}
      {/* <div className="h-10 w-10 bg-green-500 rounded-full"> */}
      {/* <img src="" alt="" /> */}
      {/* </div> */}
      {/* <div> */}
      {/* <h1 className="text-white font-bold">Username</h1> */}
      {/* <p className="text-zinc-300">Email</p> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default LeftSidebar;
