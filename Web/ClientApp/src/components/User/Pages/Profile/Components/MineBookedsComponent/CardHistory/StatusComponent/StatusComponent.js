import React, { useEffect, useContext } from "react";
import styles from "./Status.module.css";
import { ReactComponent as Palka } from "../../../../../../../../assets/images/palka.svg";

const StatusComponent = ({ color = "rgba(59, 164, 42, 1)" }) => {
  return (
    <div
      className="d-flex align-items-center "
      style={{
        border: `1px solid ${color}`,
        borderRadius: "56px",
        width: "max-content",
        padding: "6px 12px",
      }}
    >
      <div
        style={{
          borderRadius: "100px",
          //   backgroundColor: "Red",
          backgroundColor: `${color}`,
          width: "20px",
          height: "20px",
        }}
        className=" d-flex justify-content-center  align-items-center"
      >
        <Palka />
      </div>

      <p
        className={`ms-2 ${styles["text-status"]}`}
        style={{ color: `${color}` }}
      >
        Викуплено
      </p>
    </div>
  );
};

export default StatusComponent;
