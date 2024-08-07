import React from "react";
import { IoSettingsOutline } from "react-icons/io5";

const Feed = () => {
  return (
    <div className="h-full w-full sm:w-[55%] p-4">
      <div className="flex justify-between">
        <div className="flex justify-between w-[80%]">
          <h1 className="font-bold text-lg hover:border-b-2 transition-all ease-in cursor-pointer duration-200 border-blue-500 pb-1">For You</h1>
          <h1 className="font-bold text-lg hover:border-b-2 transition-all ease-in cursor-pointer duration-200 border-blue-500 pb-1">Following</h1>
        </div>
        <div className="flex justify-center">
          <IoSettingsOutline className="font-bold text-2xl cursor-pointer mt-1" />
        </div>
      </div>
    </div>
  );
};

export default Feed;
