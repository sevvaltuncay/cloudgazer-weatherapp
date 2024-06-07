import { WeatherContext } from "../context/WeatherContext";
import { useContext } from "react";

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw Error(
      "useWeatherContext must be used inside an WeatherContextProvider"
    );
  }

  return context;
};
