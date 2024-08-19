import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import CreatePost from "../components/CreatePost";
import { useSelector } from "react-redux";
// import useGetTweets from "@/hooks/useGetTweets";
// import useGetUsers from "@/hooks/useGetUsers";
import useGetTweets from "@/hooks/useGetTweets";
import useGetUsers from "@/hooks/useGetUsers";


const Home = () => {

  const {user} = useSelector(store => store.user)
  // useGetUsers(user?._id)
  useGetTweets(user?._id)

  return (
    <div className="max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-700 mb-2 w-full sm:w-[50%] p-4">
      <div className="flex h-10 pb-2 justify-between">
        <div className="flex justify-between w-[80%]">
          <h1 className="font-bold text-lg hover:border-b-2 transition-all ease-in cursor-pointer duration-200 border-blue-500 pb-1">
            For You
          </h1>
          <h1 className="font-bold text-lg hover:border-b-2 transition-all ease-in cursor-pointer duration-200 border-blue-500 pb-1">
            Following
          </h1>
        </div>
        <div className="flex justify-center">
          <IoSettingsOutline className="font-bold text-2xl cursor-pointer mt-1" />
        </div>
      </div>

      <CreatePost />
    </div>
  );
};

export default Home;
