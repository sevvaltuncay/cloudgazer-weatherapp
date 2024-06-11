import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>Şifre Sıfırlama</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Yeni Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Şifreyi Sıfırla</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
