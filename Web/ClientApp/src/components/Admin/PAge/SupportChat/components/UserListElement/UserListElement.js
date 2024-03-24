import React from "react";
import styles from "./UserListElement.module.css";
import { ReactComponent as Ellipse } from "./Ellipse.svg";
import { CheckedBox } from "../../../../Common/CheckedBoxComponent/CheckedBox";

export const UserListElement = () => {
  return (
    <div className={` d-flex  justify-content-between  ${styles["element-user-perent"]} `}>
      <div className="d-flex ">
        <CheckedBox />
        <div className={`${styles["top-container"]} d-flex align-items-center`}>
          <img
            src="https://cdn.vox-cdn.com/thumbor/2E78dg_Cpbdh3nv6z0KKhOhYs6c=/0x0:1100x580/1200x800/filters:focal(520x151:696x327)/cdn.vox-cdn.com/uploads/chorus_image/image/71921482/bkq6gtrpcnw43vsm5zm62q3z.0.png"
            alt="Avatar"
            className={`rounded-circle mr-3 ${styles["avatar-chat"]}`}
            // style={{ width: "50px", height: "50px" }}
          />
          <div style={{ gap: "4px" }}>
            <div
              className={`font-weight-bold font-size-lg text-dark ${styles["nikname-text-chat"]}`}
            >
              Сергій
            </div>
            <div className={`font-size-sm  ${styles["email-text"]}`}>
              Адміністратор
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center">
        <p className={`${styles["time-chat"]}`}>22.04.2024</p>
       {/* Робити перевірку на нове чи не нове смс */}
        <Ellipse className={`ms-3`} />
      </div>
    </div>
  );
};
