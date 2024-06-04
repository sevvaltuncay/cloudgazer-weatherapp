import React from "react";
import UyeOlma from "../UyeOlma/uyeOlma";
import Style from "./Footer.module.css";
import logo3 from "../../assets/logo3.png";
import { FaFacebook, FaLinkedin, FaInstagram, FaReddit } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_left}>
          <img src={logo3} width={175} height={80} alt="logo" />
          <p>
            Cloudgazer, ayrıntılı bir şekilde hava durumunu görüntülemek için
            meteorolojiden anlık alınan verilerle hizmet verir.
          </p>
          <div className={Style.footer_left_icons}>
            <a href="https://www.facebook.com">
              <FaFacebook />
            </a>
            <a
              href="https://www.x.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/sevval-tuncay/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.reddit.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaReddit />
            </a>
          </div>
        </div>
        <div className={Style.footer_mid}>
          <h1>Üye Ol</h1>
          <UyeOlma />
        </div>
        <div className={Style.footer_right}>
          <h2>Abone Ol</h2>
          <div className={Style.footer_right_box}>
            <input type="email" placeholder="Email adresinizi giriniz" />
            <RiSendPlaneFill className={Style.icon} />
          </div>
        </div>
      </div>
      <div className={Style.footer_end}>
        <p>Copright © 2024 Cloudgazer. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
