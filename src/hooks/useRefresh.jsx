import { axiosPrivate } from "../axios/axios";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "./useProductContext";
import { useToast } from "./useToast";

export const useRefresh = () => {
  const { setAuthState } = useAuth();
  const { dispatch } = useProductContext();
  const navigate = useNavigate();
  const showToast = useToast();

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
      dispatch({ type: "USER-LOGOUT", payload: [] });
      navigate("/");
      showToast("Login again", "fail");
      //show toast saying to login to continue action
    }
    return newAccessToken;
  };

  return refresh;
};
