import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import HavaDurumu from "./components/HavaDurumu/HavaDurumu";
import GeriBildirim from "./components/GeriBildirim/GeriBildirim";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import UyeOl from "./components/UyeOl/UyeOl";
import GirisYap from "./components/GirisYap/GirisYap";
import HeroSection from "./components/HeroSection/HeroSection";
import ForgetPass from "./components/forgetPassword/ForgetPass";
import { useAuthContext } from "./hooks/useAuthContext";
import ResetPassword from "./components/ResetPassword/ResetPassword";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route
            path="/weather-forecast"
            element={user ? <HavaDurumu /> : <Navigate to="/giris-yap" />}
          />
          <Route path="/geri-bildirim" element={<GeriBildirim />} />
          <Route
            path="/uye-ol"
            element={!user ? <UyeOl /> : <Navigate to="/" />}
          />
          <Route
            path="/giris-yap"
            element={!user ? <GirisYap /> : <Navigate to="/" />}
          />
          <Route path="/giris-yap/forget-password" element={<ForgetPass />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
