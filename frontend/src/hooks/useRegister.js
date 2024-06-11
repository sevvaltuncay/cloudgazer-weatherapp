import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate(); // useNavigate hook'u kullanımı

  const register = async ({ name, lastname, email, password }) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://cloudgazer-weatherapp.onrender.com/api/user/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, lastname, email, password }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      navigate("/giris-yap");
    }
  };

  return { register, isLoading, error };
};
