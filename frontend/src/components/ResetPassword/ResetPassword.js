import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Style from "./ResetPassword.module.css";
import { RiLockPasswordFill } from "react-icons/ri";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = searchParams.get("token");
    try {
      const response = await axios.post(
        "https://cloudgazer-weatherapp.onrender.com/api/user/reset",
        {
          token,
          newPassword: password,
        }
      );
      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/giris-yap");
      }, 3000);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className={Style.forget}>
      <div className={Style.forget_box}>
        <form onSubmit={handleSubmit}>
          <h2>Şifre Sıfırlama</h2>
          <input
            type="password"
            placeholder="Yeni Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className={Style.forget_box_sifre}>
            <button type="submit">Şifreyi Sıfırla</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
