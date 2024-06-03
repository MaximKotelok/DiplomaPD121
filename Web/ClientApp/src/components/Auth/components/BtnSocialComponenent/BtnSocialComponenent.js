import React from "react";
import styles from "./BtnSocila.module.css";
import { Link } from "react-router-dom";

const BtnSocialComponenent = ({ icon, text, href }) => {
  const handleLogin = () => {
    const googleLoginWindow = window.open(href, "mozillaWindow", 'popup');
    
    const interval = setInterval(() => {
      if (googleLoginWindow.closed) {
        clearInterval(interval);
        const urlParams = new URLSearchParams(googleLoginWindow.location)
      }
    }, 1000);
  };
  

  return (
    <div role="button" className={`${styles["btn-socal"]} mb-3`} onClick={handleLogin}>
      <img  className={`${styles["icon-container-socal"]}`}  src={icon} />
      <div className="text-dark">{text}</div>
    </div>
  );
};

export default BtnSocialComponenent;
