import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as ImgBtn } from "../../../../../../../assets/images/btnZayavkModal.svg";
import styles from "./BtnEditSeriaModal.module.css";
import { CheckedBox } from "../../../../../Common/CheckedBoxComponent/CheckedBox";
import { changeStatus } from "../../../../../../../services/product";
import { Success } from "../../../../../../../utils/Constants";
import CustomImgComponent from "../../../../../../Common/CustomImgComponent/CustomImgComponent";

import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";

function BtnEditSeriaModal({ id, statusId, statuses, changeStatusProduct }) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [changeStatusId, setChangeStatusId] = useState(statusId);
  const handleRadioChange = () => {
    setIsActive(!isActive);
  };
  const [selectedDate, handleDateChange] = useState(new Date());

  const updateStatus = async () => {
    let res = await changeStatus(id, changeStatusId);
    if (res.status === Success) {
      let index = statuses.findIndex((a) => a.id === changeStatusId);
      changeStatusProduct(statuses[index]);
      setShow(false);
    }
  };
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
                <label className={`${styles["label-head"]}`}>Вирішення</label>
                <textarea
                  className={` ${styles["input-text-form"]}  `}
                  placeholder="Офіційно не ввозились на територію України, з
                маркуванням іноземною мовою."
                  rows="2"
                  name=""
                />
              </div>
              <div className="mb-3">
                <label className={`${styles["label-head"]}`}>Вирішення</label>
                <input
                  className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                  placeholder="Вилучення з обігу шляхом знищення"
                  type="text"
                  name=""
                />
              </div>
              <div className="mb-5">
                <label className={`${styles["label-head"]}`}>Вирішення</label>
                <input
                  className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                  placeholder="Вилучення з обігу шляхом знищення"
                  type="text"
                  name=""
                />
              </div>
              <div className="mb-5">
                <label className={`${styles["label-head"]}`}>Вирішення</label>
                <StaticDatePicker />
              </div>

              <div className="row mt-5 pt-1">
                <div className="col-6 ps-2 pe-2">
                  <button
                    className={`brn-form ${styles["card-btn-primary"]}  w-100`}
                    onClick={updateStatus}
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

            {/* <textarea
            className={`${styles["text-area-zayavka"]}`}
            rows={8}
            placeholder="Напишіть тут свій коментар..."
          />


          <p className={`${styles["text-data"]}`}>12/04/2024</p>
          <div className={`d-flex`}>
            <CheckedBox
              className={`${styles["text-email"]}`}
              text="Надіслати лист на"
            />
            <span className={` ps-1 pt-2 ${styles["text-email-dashed"]}`}>
              gmail@gmail.com
            </span>
          </div>
          <div className="mt-3">
            <h6 className={`${styles["status-text"]}`}>Статус</h6>

            <div className={`d-flex flex-wrap`}></div>

            <div className="row mt-3">
              <div className="col-6 ps-2 pe-2">
                <button
                  className={`brn-form ${styles["card-btn-primary"]} btn w-100`}
                  onClick={updateStatus}
                >
                  Надіслати
                </button>
              </div>
              <div className="col-6 ps-2 pe-2">
                <button
                  className={`btn brn-form ${styles["card-btn-primary-500"]} w-100  `}
                >
                  Відмінити
                </button>
              </div>
            </div>
          </div> */}
          </Modal.Body>
        </Modal>
      </>
    </LocalizationProvider>
  );
}

export default BtnEditSeriaModal;
