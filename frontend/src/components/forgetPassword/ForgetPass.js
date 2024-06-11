// components/forgetPassword/ForgetPass.js
import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <h2>Şifremi Unuttum</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Şifre Sıfırlama Bağlantısı Gönder</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgetPass;
