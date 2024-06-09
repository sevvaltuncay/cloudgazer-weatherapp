import React, { useState } from "react";
import Style from "./UyeOl.module.css";
import { ImAddressBook } from "react-icons/im";
import { FaRegUser, FaLock } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { useRegister } from "../../hooks/useRegister";

const UyeOl = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ name, lastname, email, password });
  };

  return (
    <div className={Style.uyeol}>
      <form className={Style.uyeol_box} onSubmit={handleSubmit}>
        <h1>Üye Ol</h1>
        <div className={Style.uyeol_name_lastname}>
          <div className={Style.uyeol_name}>
            <input
              type="name"
              placeholder="Ad"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FaRegUser className={Style.uyeol_name_icon} />
          </div>
          <div className={Style.uyeol_lastname}>
            <input
              type="lastname"
              placeholder="Soyad"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <ImAddressBook className={Style.uyeol_lastname_icon} />
          </div>
        </div>
        <div className={Style.uyeol_email}>
          <input
            type="email"
            placeholder="Email adresinizi giriniz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MdMail className={Style.uyeol_email_icon} />
        </div>
        <div className={Style.uyeol_sifre}>
          <input
            type="password"
            placeholder="Şifrenizi giriniz"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className={Style.uyeol_sifre_icon} />
        </div>
        <div className={Style.uyeol_condition}>
          <label>
            <input type="checkbox" required />
            Şartlar ve koşullarımızı kabul ediyorsunuz.
          </label>
        </div>
        <button disabled={isLoading}>Üye Ol</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default UyeOl;
