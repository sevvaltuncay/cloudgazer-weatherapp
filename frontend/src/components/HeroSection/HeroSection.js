import React from "react";
import Style from "./HeroSection.module.css";
import { WiDayRainMix } from "react-icons/wi";

const HeroSection = () => {
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>Cloudgazer Hava Durumu Takibi</h1>
          <p>Anlık hava durumu tahminleri</p>
          <div className={Style.button}>
            <a href="/giris-yap" className="button">
              <WiDayRainMix className={Style.button_icon} />
              Hava Durumunu Takip Et
            </a>
          </div>
        </div>
        <div className={Style.weatherMap}>
          <iframe
            src="https://embed.windy.com/embed2.html?lat=50.4&lon=14.3&detailLat=50.4&detailLon=14.3&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=12&pressure=true&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
            frameBorder="0"
            title="Weather Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
