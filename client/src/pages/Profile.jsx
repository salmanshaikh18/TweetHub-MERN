import React from "react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import myBanner from "../assets/myBanner.png";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import useGetProfile from "@/hooks/useGetProfile";

const Profile = () => {
  const {user} = useSelector((store) => store.user)
  useGetProfile(user?._id)
  return (
    <div className="w-[50%] h-screen p-4">
      <div className="__top flex gap-4">
        <MdOutlineKeyboardDoubleArrowLeft className="text-3xl cursor-pointer" />
        <div>
          <h1 className="font-bold">Salman</h1>
          <p className="text-sm text-zinc-400">10 post</p>
        </div>
      </div>
      <div className="my-3">
        <img src={myBanner} alt="" className="rounded-xl border-transparent" />
        <div className="rounded-full absolute top-40 ml-3 border-2 border-zinc-200">
          <Avatar githubHandle="salmanshaikh18" size={120} round={true} />
        </div>
      </div>
      <div className="text-end">
        <button className="bg-slate-700 text-sm px-3 py-2 hover:bg-slate-800 transition-all ease-in-out duration-300 font-medium rounded-full border-[1px] border-zinc-500">
          Edit Profile
        </button>
      </div>
      <div className="mt-4 ml-4 flex flex-col gap-2">
        <div className=" leading-tight">
          <h1 className="font-bold">Salman Shaikh</h1>
          <p className="text-sm text-slate-500">@salman1234.com</p>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, dolor.</p>
      </div>
    </div>
  );
};

export default Profile;
