import React, { useState } from "react";
import send from "./Send.svg";
import styles from "./SupportChat.module.css";
import AvatarComponennt from "../../../../layouts/AdminLayout/AvatarComponent/AvatarComponennt";
import SearchComponent from "../../../Common/SearchComponent/SearchComponent";
import { CheckedBox } from "../../Common/CheckedBoxComponent/CheckedBox";
import { UserListElement } from "./components/UserListElement/UserListElement";

export const SupportChat = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} row`}>
        <div className={`col-7 `}>
          <SearchComponent />
          <div>
            <div className={`filter-div`}>
              <div
                className={`filter-div pt-3 pb-3 d-flex align-items-center justify-content-between `}
              >
                <CheckedBox text="Всі" />
                <p>Видалити</p>
              </div>
            </div>

            <div className={`users-div`}>
              <UserListElement />
              <UserListElement />
              <UserListElement />
              <UserListElement />
            </div>
          </div>
        </div>
        <div className={`col-5 `}>
          <div className={`${styles["block-chat"]} d-flex flex-column`}>
            <div
              className={`${styles["top-container"]} d-flex align-items-center mb-2`}
            >
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
            <div className={`${styles["div-perepiscka"]} d-flex flex-column `}>
              <div className={`${styles["box-data-perepiscka"]}`}>21:22</div>
              <div className={`${styles["box-left-perepiscka"]}`}>
                Лорем ипсум долор сит амет, цум не юсто регионе?<p>23:21</p>
              </div>
              <div className={`${styles["box-right-perepiscka"]} ms-auto`}>
                Ат яуот фабулас сплендиде.<p>23:21</p>
              </div>
            </div>

            <div className={`mt-auto ${styles["botoom-div-input"]}`}>
              <div
                className={`input-group   center ${styles["back-serach-bar"]} `}
              >
                <input
                  type="text"
                  className={`${styles["my-search-bar"]}`}
                  placeholder="Напишіть повідомлення...."
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
                <button className={`${styles["social-btn"]}`} type="button">
                  <img
                    src={send}
                    width="28px"
                    height="28px"
                    alt="My Icon"
                    className={`${styles["icon"]}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
