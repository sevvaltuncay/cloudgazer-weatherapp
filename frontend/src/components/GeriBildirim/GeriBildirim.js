import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Style from "./GeriBildirim.module.css";

const Feedback = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("Submit");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("...sending");
    const response = await fetch(
      "https://cloudgazer-weatherapp.onrender.com/api/feedback",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phoneNumber, email, description }),
      }
    );
    const json = await response.json();

    if (response.ok) {
      localStorage.setItem("feedback", JSON.stringify(json));
      toast.success("🦄 Geri Bildirim için teşekkürler!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setName("");
      setPhoneNumber("");
      setEmail("");
      setDescription("");
    }
    if (!response.ok) {
      toast.error("Beklenmeyen bir hata oluştu!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setButtonText("Submit");
  };

  return (
    <div className={Style.feedback_form}>
      <div className={Style.feedback_box}>
        <h1>Geri Bildirim</h1>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className={Style.feedback_name}>
            <p>Ad</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="name"
              placeholder="Enter your name"
              required
            />
          </div>
          {/* Phone */}
          <div className={Style.feedback_phone}>
            <p>Telefon Numarası</p>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="phone"
              placeholder="Enter your phone number"
              required
            />
          </div>
          {/* email */}
          <div className={Style.feedback_email}>
            <p>Email Adresi</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
              required
            />
          </div>
          {/* text area */}
          <div className={Style.feedback_desc}>
            <p>Açıklama</p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              value={description}
              rows={6}
              cols={50}
              required
            />
          </div>
          <div className={Style.feedback_button}>
            <button type="submit">{buttonText}</button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Feedback;
