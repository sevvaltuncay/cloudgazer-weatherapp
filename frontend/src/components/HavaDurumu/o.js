import React, { useContext, useEffect, useState } from "react";
import Style from "./HavaDurumu.module.css";
import { WeatherContext } from "../../context/WeatherContext";
import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import { useAuthContext } from "../../hooks/useAuthContext";

const HavaDurumu = () => {
  const { weathers, dispatch } = useContext(WeatherContext);
  const { user } = useAuthContext();
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [updateCity, setUpdateCity] = useState("");
  const [liked, setLiked] = useState(false);
  const [buttonText, setButtonText] = useState("Detayları Görüntüle");

  const fetchWeathers = async () => {
    try {
      const response = await fetch(
        "https://cloudgazer-weatherapp.onrender.com/api/weather",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WEATHERS", payload: data });
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Server error");
    }
  };

  useEffect(() => {
    if (user) {
      fetchWeathers();
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!user) {
      setError("Giriş yapmalısınız!");
      return;
    }
    try {
      const response = await fetch(
        "https://cloudgazer-weatherapp.onrender.com/api/weather",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ city }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "CREATE_WEATHER", payload: data });
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Server error");
    }
  };

  const handleDelete = async (id) => {
    if (!user) {
      return;
    }
    try {
      const response = await fetch(
        `https://cloudgazer-weatherapp.onrender.com/api/weather/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        dispatch({ type: "DELETE_WEATHER", payload: { _id: id } });
      } else {
        const data = await response.json();
        console.error("Error deleting weather:", data.error);
      }
    } catch (error) {
      console.error("Error deleting weather:", error);
    }
  };

  const handleLike = async (id) => {
    if (!user) {
      return;
    }
    try {
      const response = await fetch(
        `https://cloudgazer-weatherapp.onrender.com/api/weather/${id}/like`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "LIKE_WEATHER", payload: data });
      } else {
        const data = await response.json();
        console.error("Error liking weather:", data.error);
      }
    } catch (error) {
      console.error("Error liking weather:", error);
    }
  };
  const handleUpdate = async (id) => {
    if (!user) {
      return;
    }
    try {
      const currentDate = new Date();
      const currentTime = currentDate.toLocaleString("tr-TR", {
        timeZone: "Europe/Istanbul",
      });
      const response = await fetch(
        `https://cloudgazer-weatherapp.onrender.com/api/weather/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ city: updateCity, updatedAt: currentTime }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "UPDATE_WEATHER", payload: data });
        console.log(`Weather data for ${updateCity} updated successfully.`); // Konsola başarılı mesajı
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Server error");
    }
  };

  return (
    <div className={Style.havaDurumu}>
      <div className={Style.havaDurumu_box}>
        <div className={Style.havaDurumu_box_input}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Şehir Adı Giriniz"
          />

          <button className={Style.submitbutton} onClick={handleSubmit}>
            Şehir Ekle
          </button>
        </div>

        {error && <p>{error}</p>}
        <div className={Style.havaDurumu_box_info}>
          {weathers &&
            weathers.map((weather) => (
              <div className={Style.havaDurumu_box_info_open} key={weather._id}>
                <h1>{weather.city}</h1>
                <p>Sıcaklık: {weather.temp}°C</p>
                <p>Hissedilen Sıcaklık: {weather.feels_like}°C</p>
                <p>Nem: {weather.humidity}%</p>
                <div>
                  <p>Hava Basıncı: {weather.pressure} hPa</p>
                  <p>Hava Bilgisi: {weather.description}</p>
                  {weather.icon && (
                    <img src={weather.icon} alt="Weather Icon" />
                  )}
                  <div className={Style.button_all}>
                    <div className={Style.date}>
                      <p>
                        {" "}
                        {new Date(weather.updatedAt).toLocaleString("tr-TR", {
                          weekday: "long",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </p>
                    </div>
                    <button
                      className={Style.likebutton}
                      onClick={() => handleLike(weather._id)}
                    >
                      <FaRegHeart className={Style.likeicon} />
                      {weather.likes}
                    </button>
                    <button
                      className={Style.deletebutton}
                      onClick={() => handleDelete(weather._id)}
                    >
                      <RiDeleteBin6Line />
                    </button>
                    <button
                      className={Style.updatebutton}
                      onClick={() => handleUpdate(weather._id)}
                    >
                      <GrUpdate />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default HavaDurumu;
