import { getOtherUsers } from "@/redux/slices/userSlice";
import { USER_API_ENDPOINT } from "@/utils/constants";
import { handleError } from "@/utils/handleError";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// const { USER_API_ENDPOINT } = require("@/utils/constants")

const useGetUsers = (userId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const response = await axios.get(
          `${USER_API_ENDPOINT}/other-users/${userId}`,
          {
            withCredentials: true,
          }
        );
        console.log("Response inside fetchOterhUsers: ", response)
        dispatch(getOtherUsers(response.data.otherUsers));
      } catch (error) {
        handleError(error, "useGetProfile");
      }
    };
    fetchOtherUsers();
  }, []);
};

export default useGetUsers;
