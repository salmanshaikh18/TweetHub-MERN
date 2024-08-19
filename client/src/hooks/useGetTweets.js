import { getAllTweets } from "@/redux/slices/tweetSlice"
import { TWEET_API_ENDPOINT } from "@/utils/constants"
import { handleError } from "@/utils/handleError"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useGetTweets = (userId) => {
    const {refresh} = useSelector(store => store.tweet)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchTweets = async () => {
           try {
            const response = await axios.get(`${TWEET_API_ENDPOINT}/all-tweets/${userId}`, {
                withCredentials: true
            })
            console.log("Response inside useGetTweets: ", response.data.tweets)
            dispatch(getAllTweets(response.data.tweets))
           } catch (error) {
            handleError(error, "useGetTweets")
           }
        }
        fetchTweets()
    }, [userId, refresh])
}

export default useGetTweets