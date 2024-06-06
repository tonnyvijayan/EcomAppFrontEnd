// import axios from "../axios/axios";
import { axiosPrivate } from "../axios/axios";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

export const useRefresh = () => {
  const { setAuthState } = useAuth();
  const navigate = useNavigate();

  const refresh = async () => {
    let newAccessToken = "";

    try {
      const response = await axiosPrivate.get("/user/refresh");

      if (response.status === 201) {
        newAccessToken = response.data.accessToken;
        setAuthState(() => {
          return newAccessToken;
        });
      }
    } catch (error) {
      setAuthState(() => {
        return "";
      });
      navigate("/");
      //show toast saying to login to continue action
    }
    return newAccessToken;
  };

  return refresh;
};
