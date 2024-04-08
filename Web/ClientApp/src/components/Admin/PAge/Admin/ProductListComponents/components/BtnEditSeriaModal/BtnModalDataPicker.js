import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as ImgBtn } from "./BtnPickerData.svg";
import styles from "./BtnEditSeriaModal.module.css";
// import "./BtnEditSeriaModal.css";
import { CheckedBox } from "../../../../../Common/CheckedBoxComponent/CheckedBox";
import { changeStatus } from "../../../../../../../services/product";
import { Success } from "../../../../../../../utils/Constants";
import CustomImgComponent from "../../../../../../Common/CustomImgComponent/CustomImgComponent";

import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
// import { ukUA } from "@mui/material/locale";
import { ukUA } from "@mui/x-date-pickers/locales";
import TextField from "@mui/material/TextField";

function BtnModalDataPicker() {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [show, setShow] = useState(false);
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={
        ukUA.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <>
        <div
          onClick={() => setShow(true)}
          className={`input-group  center ${styles["back-serach-bar"]} ${styles["poiner-picker"]}  ${styles["my-input-text-form"]} `}
        >
          <input
            type="text"
            className={`${styles["my-search-bar"]}`}
            placeholder={`${new Date().getDate()}/${
              new Date().getMonth() + 1
            }/${new Date().getFullYear()}`}
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
            readOnly
            value={selectedDate.format("MM/DD/YYYY")}
          />
          <button className="social-btn" type="button">
            <ImgBtn />
          </button>
        </div>

        {/* <ImgBtn onClick={() => setShow(true)} /> */}
        <Modal
          style={{
            position: "fixed",
            top: "56.8%",
            left: "78.5%",
            transform: "translate(-50%, -50%)",
            width: "auto",
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
            <div>
              {/* <StaticDatePicker
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
              /> */}

              <StaticDatePicker
                okText="OK"
                cancelText="Скасувати"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
                getMonthText={(month, locale) =>
                  month.toLocaleString("uk-UA", { month: "long" })
                }
                getYearText={(year, locale) => year.toString()}
                getDatePickerHeaderText={(date) =>
                  date.toLocaleString("uk-UA", {
                    year: "numeric",
                    month: "long",
                  })
                }
                getDayText={(day) => day.toString()}
              />
            </div>
          </Modal.Body>
        </Modal>
      </>
    </LocalizationProvider>
  );
}

export default BtnModalDataPicker;
