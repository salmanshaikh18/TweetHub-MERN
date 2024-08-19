import React from "react";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RightSidebar = () => {
  const { otherUsers } = useSelector((store) => store.user);
  console.log("OtherUsers from RightSideBar: ", otherUsers);
  return (
    <div className="p-4 border-l-[1px] border-zinc-700 hidden sm:flex flex-col gap-4 w-full sm:w-[30%]">
      <div className="w-full flex justify-center items-center">
        <CiSearch className="text-zinc-200 font-bold p-2  text-sm w-10 bg-slate-600 h-10 rounded-l-[20px]" />
        <input
          placeholder="Search"
          type="text"
          className="px-2 bg-slate-600 w-[90%] py-2 rounded-r-[20px] border-none outline-none text-white"
        />
      </div>
      <div className="w-full bg-slate-700 p-4 rounded-xl flex flex-col justify-center items-start gap-1">
        <h1>Subscribe To Premium</h1>
        <p className="text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia,
          quasi.
        </p>
        <button className="px-4 py-2 mt-2 bg-slate-500 hover:bg-slate-600 transition-all ease-in duration-300 text-white rounded-2xl text-sm">
          Subscribe
        </button>
      </div>
      <div className="w-full bg-slate-700 p-4 rounded-xl flex flex-col justify-center items-start gap-3">
        <h1 className="font-bold text-lg mb-4">Who To Follow</h1>

        {otherUsers?.map((user) => {
          return (
            <div
              key={user?._id}
              className="flex justify-between items-center w-full"
            >
              <div className="flex justify-center items-center gap-2">
                <div className="h-10 w-10 rounded-full">
                  <Avatar
                    name={user?.userName}
                    size="40"
                    round={true}
                  />
                </div>
                <div>
                  <h1>{user?.name}</h1>
                  <p>@{user?.userName}</p>
                </div>
              </div>
              <Link to={`/profile/${user?._id}`}>
                <button className="px-4 relative py-2 mt-2 bg-slate-500 hover:bg-slate-600 transition-all ease-in duration-300 text-white rounded-2xl text-sm">
                  Profile
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightSidebar;
