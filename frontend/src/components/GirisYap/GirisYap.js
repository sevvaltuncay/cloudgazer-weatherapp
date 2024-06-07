import React, { useState } from "react";
import Style from "./GirisYap.module.css";
import { FaLock } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { useLogin } from "../../hooks/useLogin";

const GirisYap = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login({ email, password });
  };

  return (
    <div className={Style.girisyap}>
      <form onSubmit={handleSubmit}>
        <div className={Style.girisyap_box}>
          <h1>Giriş Yap</h1>
          <div className={Style.girisyap_box_email}>
            <MdMail className={Style.girisyap_box_icon} />
            <input
              type="email"
              placeholder="Email adresinizi giriniz"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={Style.girisyap_box_sifre}>
            <FaLock className={Style.girisyap_box_sifre_icon} />
            <input
              type="password"
              placeholder="Şifrenizi giriniz"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={Style.girisyap_box_remember}>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Beni Hatırla
            </label>
            <a href="/giris-yap/forget-password">Şifrenizi mi unuttunuz?</a>
          </div>
          <button disabled={isLoading} type="submit">
            Giriş Yap
          </button>
          <div className={Style.girisyap_box_register}>
            <p>
              Hesabınız yok mu? <a href="/uye-ol">Şimdi üye olun.</a>
            </p>
          </div>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default GirisYap;
