import React, { useState } from "react";
import axios from "axios";
import Style from "./ForgetPass.module.css";

function ForgetPass() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://cloudgazer-weatherapp.onrender.com/api/user/forget",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className={Style.forget}>
      <div className={Style.forget_box}>
        <form onSubmit={handleSubmit}>
          <h2>Şifremi Unuttum</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className={Style.forget_box_sifre}>
            <button type="submit">Şifre Sıfırlama Bağlantısı Gönder</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default ForgetPass;
