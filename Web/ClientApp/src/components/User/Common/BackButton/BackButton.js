import React from "react";
import styles from "./BackButton.module.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "./ArrowLeft.svg";

export const BackButton = ({ text }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <h3 onClick={goBack} className={`mb-3 ${styles["title-edit-page"]}`}>
      <ArrowLeft /> {text}
    </h3>
  );
};
