import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as ImgBtn } from "../../../../../../../assets/images/btnZayavkModal.svg";
import styles from "./BtnEditStatusModal.module.css";
import { CheckedBox } from "../../../../../Common/CheckedBoxComponent/CheckedBox";
import { changeStatus } from "../../../../../../../services/product";
import { Success } from "../../../../../../../utils/Constants";

function BtnEditStatusModal({id,statusId, statuses, changeStatusProduct }) {
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [changeStatusId, setChangeStatusId] = useState(statusId);  
  const handleRadioChange = () => {
    setIsActive(!isActive);
  };

  const updateStatus = async ()=>{
    let res = await changeStatus(id, changeStatusId);
    if(res.status === Success){
      let index = statuses.findIndex(a=>a.id===changeStatusId);
      changeStatusProduct(statuses[index]);
      setShow(false);
    }
  }
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

        
            <div className={`d-flex flex-wrap`}>
            {statuses && statuses.map &&
          statuses.map(a=>{
            return (
              <div className={`${styles["parent-radio-div"]}`}>
              <input
                type="radio"
                className={`btn-check ${styles["btn-check"]}`}
                name="options-base"
                id={`option${a.id}`}
                defaultChecked={changeStatusId === a.id}
                onChange={()=>{
                  setChangeStatusId(a.id);
                }}
              />
              <label
                className={`${styles["labale-radio"]}`}
                style={{border: `2px solid ${a.color}`}}
                htmlFor={`option${a.id}`}
              >
                <div
                  className={`${styles["div-text-radio"]}`}
                  style={{backgroundColor: a.color}}
                >
                  {a.status}
                </div>
              </label>
            </div>

            )

          })
        }
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

            <div className="row mt-3">
              <div className="col-6 ps-2 pe-2">
                <button
                  className={`brn-form ${styles["card-btn-primary"]} btn w-100`}
                  onClick={updateStatus}
                >
                  Оновити Статус
                </button>
              </div>
              <div className="col-6 ps-2 pe-2">
                <button
                  className={`btn brn-form ${styles["card-btn-primary-500"]} w-100  `}
                >
                  Продовжити підбір в цій аптеці
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BtnEditStatusModal;
