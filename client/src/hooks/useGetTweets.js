import { getAllTweets } from "@/redux/slices/tweetSlice";
import { TWEET_API_ENDPOINT } from "@/utils/constants";
import { handleError } from "@/utils/handleError";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useGetTweets = (userId) => {
  const { refresh } = useSelector((store) => store.tweet);
  const dispatch = useDispatch();
  const { isActive } = useSelector((store) => store.tweet);

  const fetchTweets = async () => {
    try {
      const response = await axios.get(
        `${TWEET_API_ENDPOINT}/all-tweets/${userId}`,
        {
          withCredentials: true,
        }
      );
      console.log("Response inside useGetTweets: ", response.data.tweets);
      dispatch(getAllTweets(response.data.tweets));
    } catch (error) {
      handleError(error, "useGetTweets");
    }
  };
  const fetchFollowingUserTweets = async () => {
    try {
      const response = await axios.get(
        `${TWEET_API_ENDPOINT}/following-users/tweets/${userId}`, {withCredentials: true}
      );
      console.log("Response inside fetchFollowingUserTweets: ", response)
      dispatch(getAllTweets(response.data.tweets))
    } catch (error) {
        toast.error(error.response.data.message)
      handleError(error, "fetchFollowingTweets");
    }
  };
  useEffect(() => {
    if (isActive) {
      fetchTweets();
    } else {
      fetchFollowingUserTweets();
    }
  }, [userId, refresh, isActive]);
};

export default useGetTweets;
