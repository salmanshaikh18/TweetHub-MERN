import React, { useState } from "react";
import Avatar from "react-avatar";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

import Tweet from "./Tweet";
import { handleError } from "@/utils/handleError";
import { TWEET_API_ENDPOINT } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { getRefresh } from "@/redux/slices/tweetSlice";

const CreatePost = () => {
  const dispatch = useDispatch()
  const [description, setDescription] = useState("")
  const {user} = useSelector(store => store.user)

  const handleCreateTweet = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${TWEET_API_ENDPOINT}/create`, {
        description: description,
        userId: user._id
      }, {
        withCredentials: true
      })
      dispatch(getRefresh())
      if (response.data.success) {
        toast.success(response.data.message)
      }
      console.log("Response inside handleCreateTweet: ", response)
    } catch (error) {
      toast.error(error.response.data.message)
      handleError(error, "handleCreateTweet")
    } finally {
      setDescription("")
    }
  }
  return (
    <div className="w-full h-[70vh] md:h-[130px] bg-slate-900 md:bg-slate-700 rounded-xl flex flex-col gap-1">
      <div className="__top flex mb-[2px] bg-slate-700 md:bg-none rounded-xl flex-col justify-between p-4 w-full h-full">
        <div className="flex">
          <Avatar name={user?.userName} size={40} round={true} />
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write something here about post..."
            className=" px-4 py-2 h-18 resize-none bg-slate-700 w-[90%] border-none outline-none"
          />
        </div>
        <div className="flex justify-between px-4 items-center">
          <MdOutlinePhotoSizeSelectActual className="text-xl hover:scale-x-110 transition-all ease-in-out duration-300 text-zinc-400 cursor-pointer" />
          <button onClick={handleCreateTweet} className="px-4 py-1 text-[16px] bg-blue-700 hover:bg-blue-800 transition-all ease-in-out duration-300 rounded-2xl">
            Post
          </button>
        </div>
      </div>

      <Tweet />
    </div>
  );
};

export default CreatePost;
