import { useAuthContext } from "./useAuthContext";
import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: weathersDispatch } = useContext(WeatherContext);

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    weathersDispatch({ type: "SET_WEATHERS", payload: null });
  };

  return { logout };
};
