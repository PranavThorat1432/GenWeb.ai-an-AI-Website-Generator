import { useEffect } from "react"
import axios from 'axios';
import { serverUrl } from "../App";
import { useDispatch } from 'react-redux'
import { setUserData } from "../Redux/Slices/userSlice";

const useGetCurrentUser = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/get-user`, {
                    withCredentials: true
                });
                dispatch(setUserData(result.data));

            } catch (error) {
                console.log(error);
                dispatch(setUserData(null));
            }
        };

        getCurrentUser();
    }, [dispatch]);
}

export default useGetCurrentUser
