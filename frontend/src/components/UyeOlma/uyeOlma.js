import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Style from "./uyeOlma.module.css";
import { BsCloudArrowUp, BsCloudArrowUpFill } from "react-icons/bs";

const UyeOlma = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/"); // Çıkış yaptıktan sonra anasayfaya yönlendirme
  };

  const unauthenticatedLinks = [
    {
      name: "Giriş Yap",
      link: "giris-yap",
      icon: <BsCloudArrowUpFill />,
    },
    {
      name: "Üye Ol",
      link: "uye-ol",
      icon: <BsCloudArrowUp />,
    },
  ];

  return (
    <div>
      {isAuthenticated ? (
        <div className={Style.UyeOlma}>
          <button onClick={handleLogout} className={Style.uyeOlma_link}>
            Çıkış Yap
          </button>
        </div>
      ) : (
        unauthenticatedLinks.map((el, i) => (
          <div key={i} className={Style.UyeOlma}>
            <Link to={`/${el.link}`} className={Style.uyeOlma_link}>
              {el.icon && el.icon}
              {el.name}
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default UyeOlma;
