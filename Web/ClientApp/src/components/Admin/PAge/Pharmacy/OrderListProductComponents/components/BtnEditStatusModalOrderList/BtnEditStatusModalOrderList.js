import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as ImgBtn } from "../../../../../../../assets/images/btnZayavkModal.svg";
import styles from "./BtnEditStatusModalOrderList.module.css";
import { CheckedBox } from "../../../../../Common/CheckedBoxComponent/CheckedBox";
import { changeStatus } from "../../../../../../../services/product";
import { Success } from "../../../../../../../utils/Constants";

function BtnEditStatusModalOrderList({
  id,
  statusId,
  statuses,
  changeStatusProduct,
}) {
  const [show, setShow] = useState(false);
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
          width: "538px",
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
          <h6 className={`${styles["text-pidsumok"]}`}>Підсумок</h6>
          <p className={`${styles["text-data"]}`}>12/04/2024</p>
          <div className="p-3">
            <div className={`d-flex mt-3`}>
              <img
                src="https://root.tblcdn.com/img/goods/8d1aab55-2c38-11ec-bacc-0050569aacb6/1/img_0.jpg?v=AAAAAAmKo34"
                className={`${styles["img-product"]} me-3`}
              />
              <div>
                <h4 className={`${styles["text-title-row"]}`}>
                  Протеїн Optimum Nutrition Whey Gold Standard
                </h4>
                <h5 className={`${styles["text-description-row"]}`}>
                  Optimum Nutrition
                </h5>

                <div className={`d-flex justify-content-between`}>
                  <p className={`${styles["text-counter"]}`}>2 упаковки </p>
                  <p
                    className={`${styles["text-counter"]}`}
                    style={{ textAlign: "end" }}
                  >
                    80.30 грн{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className={`d-flex mt-3`}>
              <img
                src="https://root.tblcdn.com/img/goods/8d1aab55-2c38-11ec-bacc-0050569aacb6/1/img_0.jpg?v=AAAAAAmKo34"
                className={`${styles["img-product"]} me-3`}
              />
              <div>
                <h4 className={`${styles["text-title-row"]}`}>
                  Протеїн Optimum Nutrition Whey Gold Standard
                </h4>
                <h5 className={`${styles["text-description-row"]}`}>
                  Optimum Nutrition
                </h5>

                <div className={`d-flex justify-content-between`}>
                  <p className={`${styles["text-counter"]}`}>2 упаковки </p>
                  <p
                    className={`${styles["text-counter"]}`}
                    style={{ textAlign: "end" }}
                  >
                    80.30 грн{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <h5 className={`${styles["tect-count-price"]}`}>Загальна сума</h5>
            <h5 className={`${styles["text-number-count"]}`}>534.30 грн</h5>
          </div>
          <div className="d-flex justify-content-between">
            <h5 className={`${styles["tect-count-price"]}`}>
              Загальна кількість
            </h5>
            <h5 className={`${styles["text-number-count"]}`}>3 упаковки</h5>
          </div>
          <div className="mt-3">
            <h6 className={`${styles["status-text"]}`}>Статус</h6>

            <div className={`d-flex flex-wrap justify-content-evenly`}>
              {/* {statuses &&
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
                })} */}

              <div className={`${styles["parent-radio-div"]}`}>
                <input
                  type="radio"
                  className={`btn-check ${styles["btn-check"]}`}
                  name="options-base"
                  id="option2"
                  autoComplete="off"
                />
                <label
                  className={`  ${styles["labale-radio"]}  ${styles["labale-radio-color1"]}`}
                  htmlFor="option2"
                >
                  <div
                    className={`${styles["div-text-radio"]} ${styles["bg-color1"]}`}
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
                  id="option4"
                  autoComplete="off"
                />
                <label
                  className={`  ${styles["labale-radio"]}  ${styles["labale-radio-color2"]}`}
                  htmlFor="option4"
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
                  id="option5"
                  autoComplete="off"
                />
                <label
                  className={`  ${styles["labale-radio"]}  ${styles["labale-radio-color3"]}`}
                  htmlFor="option5"
                >
                  <div
                    className={`${styles["div-text-radio"]} ${styles["bg-color3"]}`}
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
                  id="option6"
                  autoComplete="off"
                />
                <label
                  className={`  ${styles["labale-radio"]}  ${styles["labale-radio-color4"]}`}
                  htmlFor="option6"
                >
                  <div
                    className={`${styles["div-text-radio"]} ${styles["bg-color4"]}`}
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
                  id="option7"
                  autoComplete="off"
                />
                <label
                  className={`  ${styles["labale-radio"]}  ${styles["labale-radio-color5"]}`}
                  htmlFor="option7"
                >
                  <div
                    className={`${styles["div-text-radio"]} ${styles["bg-color5"]}`}
                  >
                    Radio
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-6 ps-2 pe-2">
              <button
                className={`brn-form ${styles["card-btn-primary"]}  w-100`}
                // onClick={updateStatus}
              >
                Надіслати
              </button>
            </div>
            <div className="col-6 ps-2 pe-2">
              <button
                className={` brn-form ${styles["card-btn-primary-500"]} w-100  `}
              >
                Відміна
              </button>
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

export default BtnEditStatusModalOrderList;
