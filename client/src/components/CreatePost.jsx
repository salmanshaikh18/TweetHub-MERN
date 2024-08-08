import React from "react";
import Avatar from "react-avatar";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";

const CreatePost = () => {
  return (
    <div className="w-full h-[130px] bg-slate-700 rounded-xl flex flex-col gap-2">
      <div className="__top flex flex-col justify-between p-4 w-full h-full">
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

      <div className="__top flex flex-col gap-4 bg-slate-700 rounded-xl justify-between p-4 w-full">
        <div className="flex">
          <Avatar githubHandle="salmanshaikh18" size={40} round={true} />
          <div className="flex flex-col ml-[10px]">
            <div className="flex gap-2">
              <h1 className="font-bold">Salman</h1>
              <p className="text-zinc-500">salman@gmail.com</p>
            </div>
            <p>Hello developers lets connect and grow together.</p>
          </div>
        </div>
        <div className="flex justify-between px-4 items-center">
         <div className="__comment flex justify-center items-center gap-1">
         <FaRegComment className="cursor-pointer text-lg hover:scale-x-110 transition-all ease-in-out duration-300 text-zinc-400" />
         <p>0</p>
         </div>
         <div className="__like flex justify-center items-center gap-1">
         <FaRegHeart className="text-lg cursor-pointer hover:scale-x-110 transition-all ease-in-out duration-300 text-zinc-400" />
         <p>0</p>
         </div>
         <div className="__save flex justify-center items-center gap-1">
         <FaRegBookmark className="text-lg cursor-pointer hover:scale-x-110 transition-all ease-in-out duration-300 text-zinc-400" />
         <p>0</p>
         </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
