import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
// import { ReactComponent as ImgBtn } from "./BtnPickerData.svg";
import styles from "./BtnEditSeriaModal.module.css";
import "./BtnEditSeriaModal.css";
import { CheckedBox } from "../../../../../Common/CheckedBoxComponent/CheckedBox";
import { changeStatus } from "../../../../../../../services/product";
import { Success } from "../../../../../../../utils/Constants";
import CustomImgComponent from "../../../../../../Common/CustomImgComponent/CustomImgComponent";

import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import BtnModalDataPicker from "./BtnModalDataPicker";

function BtnEditSeriaModal({ id, statusId, statuses, changeStatusProduct }) {
  const [show, setShow] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <>
        <button
          onClick={() => setShow(true)}
          className={`${styles["btn-ceru-seria"]}`}
        >
          Керувати серіями
        </button>

        <Modal
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "505px",
            height: "auto",
            margin: "0",
            padding: "32px",
            borderRadius: "32px",
            border: "none",
          }}
          size="xl"
          show={show}
          onHide={() => setShow(false)}
        >
          <Modal.Body>
            <div className={`${styles["div-top-product"]} d-flex`}>
              <CustomImgComponent
                className={`${styles["img-product"]}`}
                // src={`${ApiPath}${item.pathToPhoto}`}
              />
              <div className="ps-3">
                <h6 className={`${styles["text-head"]}`}>
                  Діазолін-Дарниця таблетки
                </h6>
                <h6 className={`${styles["text-pid-head"]}`}>
                  Діазолін Дарниця
                </h6>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-3">
                <label className={`${styles["label-head"]}`}>Вирішення</label>
                <input
                  className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                  placeholder="Вилучення з обігу шляхом знищення"
                  type="text"
                  name=""
                />
              </div>
              <div className="mb-3">
                <label className={`${styles["label-head"]}`}>Причина</label>
                <textarea
                  className={` ${styles["input-text-form"]}  `}
                  placeholder="Офіційно не ввозились на територію України, з
                маркуванням іноземною мовою."
                  rows="2"
                  name=""
                />
              </div>

              <div className="mb-3">
                <label className={`${styles["label-head"]}`}>
                  Дата заборони
                </label>
                {/* <div>
                  <MobileDatePicker
                    defaultValue={dayjs()}
                    className={`${styles["customMobileDatePicker"]}`}
                  />
                </div> */}
                {/* <div
                  className={`input-group  center ${styles["back-serach-bar"]}  ${styles["my-input-text-form"]} `}
                >
                  <input
                    type="text"
                    className={`${styles["my-search-bar"]}`}
                    placeholder="Пошук..."
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                  />
                  <button
                    className="social-btn"
                    type="button"
                    onClick={handleButtonClick}
                  >
                  </button>
               
              </div> */}

                <BtnModalDataPicker />
              </div>

              <div className="mb-5">
                <label className={`${styles["label-head"]}`}>Серія</label>
                <input
                  className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                  placeholder="Вилучення з обігу шляхом знищення"
                  type="text"
                  name=""
                />
              </div>

              <div className="row mt-5 pt-1">
                <div className="col-6 ps-2 pe-2">
                  <button
                    className={`brn-form ${styles["card-btn-primary"]}  w-100`}
                  >
                    Надіслати
                  </button>
                </div>
                <div className="col-6 ps-2 pe-2">
                  <button
                    className={` brn-form ${styles["card-btn-primary-500"]} w-100  `}
                  >
                    Відмінити
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {show && (
          <div
            className={styles["modal-backdrop"]}
            onClick={() => setShow(false)}
          ></div>
        )}
      </>
    </LocalizationProvider>
  );
}

export default BtnEditSeriaModal;
