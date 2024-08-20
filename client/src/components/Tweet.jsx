import React, { useEffect } from "react";
import { FaRegBookmark, FaRegComment, FaRegHeart } from "react-icons/fa6";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { handleError } from "@/utils/handleError";
import { TWEET_API_ENDPOINT, timeSince } from "@/utils/constants";
import { toast } from "react-toastify";
import { getRefresh } from "@/redux/slices/tweetSlice";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";

const Tweet = () => {
  const dispatch = useDispatch();
  const { tweets } = useSelector((store) => store.tweet);
  const { user } = useSelector((store) => store.user);

  const handleLikeOrDislike = async (tweetId) => {
    try {
      const response = await axios.put(
        `${TWEET_API_ENDPOINT}/like/${tweetId}`,
        {
          userId: user._id,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      handleError(error, "handleLikeOrDislike");
    }
  };

  const handleDeleteTweet = async (tweetId) => {
    try {
      const response = await axios.delete(
        `${TWEET_API_ENDPOINT}/delete/${tweetId}`,
        {
          data: {
            userId: user?._id, // Include userId in the request body
          },
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      console.log("Response inside handleDeleteTweet: ", response);
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      handleError(error, "handleDeleteTweet");
    }
  };
  
  return (
    <>
      {tweets?.map((tweet) => {
        return (
          <div
            key={tweet._id}
            className="__top flex flex-col gap-3 bg-slate-700 rounded-xl justify-between p-4 w-full"
          >
            <div className="flex">
              <Avatar name={tweet?.userDetails[0].name} size={40} round={true} />
              <div className="flex flex-col ml-[10px]">
                <div className="flex gap-2">
                  <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
                  <p className="text-zinc-400">
                    @{tweet?.userDetails[0]?.userName}.
                  </p>
                  <p className="text-zinc-400">
                    {timeSince(tweet?.createdAt)}
                  </p>
                </div>
                <p>{tweet?.description}</p>
              </div>
            </div>
            <div className="flex justify-between px-4 items-center">
              {/* <div className="__comment flex justify-center items-center gap-1">
                <FaRegComment className="cursor-pointer text-lg hover:scale-x-110 transition-all ease-in-out duration-300 text-zinc-400" />
                <p>0</p>
              </div> */}
              <div
                onClick={() => handleLikeOrDislike(tweet?._id)}
                className="__like flex justify-center items-center gap-1"
              >
                <FaRegHeart className="text-lg cursor-pointer hover:scale-x-110 transition-all ease-in-out duration-300 text-zinc-400" />
                <p>{tweet?.like?.length}</p>
              </div>
              <div className="__save flex justify-center items-center gap-1">
                <FaRegBookmark className="text-[16px] cursor-pointer hover:scale-x-110 transition-all ease-in-out duration-300 text-zinc-400" />
                <p>0</p>
              </div>
              {user?._id === tweet?.userId && (
                <div
                  onClick={() => handleDeleteTweet(tweet?._id)}
                  className="__save flex justify-center items-center gap-1"
                >
                  <MdOutlineDelete className="text-xl cursor-pointer hover:scale-x-110 transition-all ease-in-out duration-300 text-zinc-400" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Tweet;
