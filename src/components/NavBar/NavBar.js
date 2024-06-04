import Style from "./Navbar.module.css";
import logo3 from "../../assets/logo3.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import UyeOlma from "../UyeOlma/uyeOlma";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  const HomeClick = () => {
    window.location.href = "/";
  };
  const [uyeOl, setUyeOl] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const openMenu = (e) => {
    setUyeOl((prevUyeOl) => !prevUyeOl);
  };

  // kayan menü
  const openSideBar = () => {
    setOpenSideMenu((prevOpenSideMenu) => !prevOpenSideMenu);
  };

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <img
              src={logo3}
              alt="Logo"
              width={170}
              height={70}
              onClick={HomeClick}
            />
          </div>
        </div>
        <div className={Style.navbar_container_right}>
          <div className={Style.navbar_container_right_weather}>
            <Link
              to={"/weather-forecast"}
              className={Style.navbar_container_right_weather_link}
            >
              Hava Durumu
            </Link>
          </div>
          <div className={Style.navbar_container_right_geriBildirim}>
            <Link
              to={"/geri-bildirim"}
              className={Style.navbar_container_right_weather_link}
            >
              Geri Bildirim
            </Link>
          </div>
          {user && (
            <div className={Style.navbar_container_right_logout}>
              <span>{user.email}</span>
              <button onClick={handleClick}>Çıkış Yap</button>
            </div>
          )}
          {!user && (
            <div className={Style.navbar_container_right_uyeOl}>
              <p
                onClick={(e) => openMenu(e)}
                className={Style.navbar_container_right_weather_link}
              >
                Üye Ol
              </p>
              {uyeOl && (
                <div className={Style.navbar_container_right_uyeOl_box}>
                  <UyeOlma />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
