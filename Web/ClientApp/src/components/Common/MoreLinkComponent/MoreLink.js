import React from "react";
// import { NavLink } from 'react-router-dom';
import { ReactComponent as Arrow } from "./mingcute_arrow-up-line.svg";

const MoreLink = ({ link }) => {
  return (
    <a
      href={link}
      style={{
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        style={{
          marginRight: "5px",
          color: "rgba(0, 122, 255, 1)",
          fontWeight: 600,
          fontSize: "14px",
          fontFamily: "var(--standart-font)",
        }}
      >
        Переглянути більше
      </span>
      <Arrow />
    </a>
  );
};

export default MoreLink;
