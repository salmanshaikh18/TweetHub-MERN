import React from "react";
import Avatar from "react-avatar";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

import Tweet from "./Tweet";

const CreatePost = () => {
  return (
    <div className="w-full h-[130px] bg-slate-700 rounded-xl flex flex-col gap-1">
      <div className="__top flex mb-[2px] flex-col justify-between p-4 w-full h-full">
        <div className="flex">
          <Avatar githubHandle="salmanshaikh18" size={40} round={true} />
          <textarea
            type="text"
            placeholder="Write something here about post..."
            className=" px-4 py-2 h-18 resize-none bg-slate-700 w-[90%] border-none outline-none"
          />
        </div>
        <div className="flex justify-between px-4 items-center">
          <MdOutlinePhotoSizeSelectActual className="text-xl hover:scale-x-110 transition-all ease-in-out duration-300 text-zinc-400 cursor-pointer" />
          <button className="px-4 py-1 text-[16px] bg-blue-700 hover:bg-blue-800 transition-all ease-in-out duration-300 rounded-2xl">
            Post
          </button>
        </div>
      </div>

      <Tweet />
      <Tweet />
      <Tweet />
    </div>
  );
};

export default CreatePost;
