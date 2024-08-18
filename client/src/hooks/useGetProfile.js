import { getMyProfile } from "@/redux/slices/userSlice"
import { USER_API_ENDPOINT } from "@/utils/constants"
import { handleError } from "@/utils/handleError"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
// const { USER_API_ENDPOINT } = require("@/utils/constants")

const useGetProfile = (userId) => {
    const dispatch = useDispatch()
    useEffect(async () => {
        const fetchMyProfile = async () => {
            try {
                const response = await axios.get(`${USER_API_ENDPOINT}/profile/${userId}`, {
                    withCredentials: true
                })
                dispatch(getMyProfile(response.data.user))
            } catch (error) {
                handleError(error, "useGetProfile")
            }
        }
        fetchMyProfile()
    }, [])
}

export default useGetProfile