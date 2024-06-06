import { useEffect } from "react";
import { axiosPrivate } from "../axios/axios";
import { useRefresh } from "./useRefresh";
import { useAuth } from "./useAuth";

export const useAxiosPrivate = () => {
  const { authState } = useAuth();
  const refresh = useRefresh();

  useEffect(() => {
    console.log("interceptors being attached");
    const requestInterceptors = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authState}`;
          console.log("attached request interceptors ");
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    const responseInterceptors = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err) => {
        console.log("caught error request interceptors ");
        const previousRequest = err?.config;
        if (err?.response?.status === 403 && !previousRequest?.sent) {
          previousRequest.sent = true;
          let newAccessToken = await refresh();
          previousRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(previousRequest);
        }
        return Promise.reject(err);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptors);
      axiosPrivate.interceptors.response.eject(responseInterceptors);
    };
  }, [authState, refresh]);
  return axiosPrivate;
};