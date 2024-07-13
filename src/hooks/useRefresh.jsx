import { axiosPrivate } from "../axios/axios";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "./useProductContext";
import { useCallback } from "react";

export const useRefresh = () => {
  const { setAuthState, setPersist } = useAuth();
  const { dispatch } = useProductContext();
  const navigate = useNavigate();

  const refresh = useCallback(async () => {
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
      setPersist(false);

      setAuthState(() => {
        return "";
      });
      dispatch({ type: "USER-LOGOUT", payload: [] });

      navigate("/login", {
        state: { location: location.pathname },
        replace: true,
      });
    }
    return newAccessToken;
  }, []);

  return refresh;
};
