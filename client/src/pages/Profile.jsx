import React from "react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import myBanner from "../assets/myBanner.png";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import useGetProfile from "@/hooks/useGetProfile";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { user, profile } = useSelector((store) => store.user);
  const { userId } = useParams();
  useGetProfile(userId);
  return (
    <div className="w-[50%] h-screen p-4">
      <div className="__top flex gap-4">
        <MdOutlineKeyboardDoubleArrowLeft className="text-3xl cursor-pointer" />
        <div>
          <h1 className="font-bold">{profile?.name}</h1>
          <p className="text-sm text-zinc-400">10 post</p>
        </div>
      </div>
      <div className="my-3">
        <img src={myBanner} alt="" className="rounded-xl border-transparent" />
        <div className="rounded-full absolute top-40 ml-3 border-2 border-zinc-200">
          <Avatar name={profile?.name} size={120} round={true} />
        </div>
      </div>
      <div className="text-end">
        {user?._id === profile?._id ? (
          <button className="bg-slate-700 text-sm px-3 py-2 hover:bg-slate-800 transition-all ease-in-out duration-300 font-medium rounded-full border-[1px] border-zinc-500">
            Edit Profile
          </button>
        ) : (
          <button className="bg-slate-700 text-sm px-3 py-2 hover:bg-slate-800 transition-all ease-in-out duration-300 font-medium rounded-full border-[1px] border-zinc-500">
            Follow
          </button>
        )}
      </div>
      <div className="mt-4 ml-4 flex flex-col gap-2">
        <div className=" leading-tight">
          <h1 className="font-bold">{profile?.name}</h1>
          <p className="text-sm text-slate-500">@{profile?.email}</p>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, dolor.
        </p>
      </div>
    </div>
  );
};

export default Profile;
