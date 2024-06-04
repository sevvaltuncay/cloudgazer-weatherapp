import { createContext, useReducer } from "react";

export const WeatherContext = createContext();

export const weatherReducer = (state, action) => {
  switch (action.type) {
    case "SET_WEATHERS":
      return {
        ...state,
        weathers: action.payload,
      };
    case "CREATE_WEATHER":
      return {
        ...state,
        weathers: [action.payload, ...state.weathers],
      };
    case "DELETE_WEATHER":
      return {
        ...state,
        weathers: state.weathers.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_WEATHER":
      return {
        ...state,
        weathers: state.weathers.map((weather) =>
          weather._id === action.payload._id ? action.payload : weather
        ),
      };
    case "LIKE_WEATHER":
      return {
        ...state,
        weathers: state.weathers.map((w) =>
          w._id === action.payload._id ? { ...w, likes: w.likes + 1 } : w
        ),
      };
    default:
      return state;
  }
};

// Context provider bileşeni oluşturma
export const WeatherContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, {
    weathers: [],
  });

  return (
    <WeatherContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};
