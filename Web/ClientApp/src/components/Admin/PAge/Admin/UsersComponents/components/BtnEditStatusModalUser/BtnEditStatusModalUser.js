import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as ImgBtn } from "../../../../../../../assets/images/btnZayavkModal.svg";
import styles from "./BtnEditStatusModalUser.module.css";
import { CheckedBox } from "../../../../../Common/CheckedBoxComponent/CheckedBox";
import { changeStatus } from "../../../../../../../services/product";
import { Success } from "../../../../../../../utils/Constants";
import { banOrUnban } from "../../../../../../../services/user";
import { toast } from "react-toastify";
import { formatDateForEmailSend } from "../../../../../../../utils/Functions";

function BtnEditStatusModalUser({
  id,
  statusId,
  statuses,
  changeStatus,
  email
}) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [description, setDescription] = useState("");
  const [changeStatusId, setChangeStatusId] = useState(statusId);
  const handleRadioChange = (value) => {
    setIsActive(value);
  };

  const updateStatus = async () => {
    let res = await banOrUnban(id, changeStatusId, isActive?description:"");
    
    if (res.status === Success) {
      changeStatus(changeStatusId);
      setShow(false);
      toast.success("Успіх!");
    }else{
      toast.error("Помика!");
    }
  };

  const currentDate = useRef(new Date());


  return (
    <>
      <ImgBtn
        onClick={() => setShow(true)}
        className={`${styles["btn-hover"]}`}
      />

      <Modal
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "811px",
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
          <textarea
            className={`${styles["text-area-zayavka"]}`}
            rows={8}
            placeholder="Напишіть тут свій коментар..."
            value={description}
            onChange={(e)=>{
              setDescription(e.target.value);
              setIsActive(e.target.value != "");
            }}
          />
          <p className={`${styles["text-data"]}`}>{formatDateForEmailSend(currentDate.current)}</p>
          <div className={`d-flex`}>
            <CheckedBox
              className={`${styles["text-email"]}`}
              value={isActive}
              onChange={handleRadioChange}
              text="Надіслати лист на"
            />
            <span className={` ps-1 pt-2 ${styles["text-email-dashed"]}`}>
              {email}
            </span>
          </div>
          <div className="mt-3">
            <h6 className={`${styles["status-text"]}`}>Статус</h6>

            <div className={`d-flex flex-wrap`}>
              {statuses &&
                statuses.map &&
                statuses.map((a) => {
                  return (
                    <div className={`${styles["parent-radio-div"]}`}>
                      <input
                        type="radio"
                        className={`btn-check ${styles["btn-check"]}`}
                        name="options-base"
                        id={`option${a.id}`}
                        defaultChecked={changeStatusId === a.id}
                        onChange={() => {
                          setChangeStatusId(a.id);
                        }}
                      />
                      <label
                        className={`${styles["labale-radio"]}`}
                        style={{ border: `2px solid ${a.color}` }}
                        htmlFor={`option${a.id}`}
                      >
                        <div
                          className={`${styles["div-text-radio"]}`}
                          style={{ backgroundColor: a.color }}
                        >
                          {a.status}
                        </div>
                      </label>
                    </div>
                  );
                })}
              {/*          
              <div className={`${styles["parent-radio-div"]}`}>
                <input
                  type="radio"
                  className={`btn-check ${styles["btn-check"]}`}
                  name="options-base"
                  id="option2"
                  autoComplete="off"
                />
                <label
                  className={`  ${styles["labale-radio"]}  ${styles["labale-radio-color2"]}`}
                  htmlFor="option2"
                >
                  <div
                    className={`${styles["div-text-radio"]} ${styles["bg-color2"]}`}
                  >
                    Radio
                  </div>
                </label>
              </div>

              <div className={`${styles["parent-radio-div"]}`}>
                <input
                  type="radio"
                  className={`btn-check ${styles["btn-check"]}`}
                  name="options-base"
                  id="option3"
                  autoComplete="off"
                />
                <label
                  className={`  ${styles["labale-radio"]}  ${styles["labale-radio-color3"]} `}
                  htmlFor="option3"
                >
                  <div
                    className={`${styles["div-text-radio"]} ${styles["bg-color3"]}`}
                  >
                    Radio
                  </div>
                </label>
              </div> */}
        
</div>


            {/* <p className={`${styles["text-block-user"]} mt-3`}> */}
              {/* Виводимо лише коли статус заблокований і час блокування статичний там на місяць блокуєм чи скліьки */}
              {/* Заблоковано 05.04.2024 до 01.06.2024 */}
            {/* </p> */}
            {/* ------------------------ На даний момент в нас бан працює по іншому, але можна переробити */}

            <div className="row mt-3">
              <div className="col-6 ps-2 pe-2">
                <button
                  className={`brn-form ${styles["card-btn-primary"]}  w-100`}
                  onClick={updateStatus}
                >
                  Оновити Статус
                </button>
              </div>
              <div className="col-6 ps-2 pe-2">
                <button
                  className={` brn-form ${styles["card-btn-primary-500"]} w-100  `}
                  onClick={()=>setShow(false)}
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
        />
      )}
    </>
  );
}

export default BtnEditStatusModalUser;
