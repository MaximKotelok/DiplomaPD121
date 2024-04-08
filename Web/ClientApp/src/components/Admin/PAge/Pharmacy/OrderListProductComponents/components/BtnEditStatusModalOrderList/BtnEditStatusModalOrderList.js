import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as ImgBtn } from "../../../../../../../assets/images/btnZayavkModal.svg";
import styles from "./BtnEditStatusModalOrderList.module.css";
import { CheckedBox } from "../../../../../Common/CheckedBoxComponent/CheckedBox";
import { changeStatus } from "../../../../../../../services/product";
import { ApiPath, Success } from "../../../../../../../utils/Constants";
import { getReservation, setOrderStatus } from "../../../../../../../services/reservation";

function BtnEditStatusModalOrderList({
  id,
  statuses,
  changeStatus,
}) {

  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [changeStatusId, setChangeStatusId] = useState(null);
  useEffect(() => {
    if (show) {
      init();
    }
  }, [show]);

  async function init() {
    let res = await getReservation(id);
    if (res.status === Success) {
      setData(res.data);
      console.log(res.data.status)
      setChangeStatusId(res.data.status);
    }
  }

  async function updateStatus(){
    let res = await setOrderStatus(id, changeStatusId);
    if (res.status === Success) {      
      changeStatus(changeStatusId);
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
          <p className={`${styles["text-data"]}`}>{data?data.reservedTime:""}</p>
          <div className="p-3">
            {data && data.reservationItems && data.reservationItems.map(
              a => {

                return (<div className={`d-flex mt-3`}>
                  <img
                    src={`${ApiPath}${a.concreteProduct.product.pathToPhoto}`}
                    className={`${styles["img-product"]} me-3`}
                  />
                  <div>
                    <h4 className={`${styles["text-title-row"]}`}>
                      {a.concreteProduct.product.title}
                    </h4>
                    <h5 className={`${styles["text-description-row"]}`}>
                      {a.concreteProduct.product.shortDescription}
                    </h5>

                    <div className={`d-flex justify-content-between`}>
                      <p className={`${styles["text-counter"]}`}>{a.quantity} упаковки </p>
                      <p
                        className={`${styles["text-counter"]}`}
                        style={{ textAlign: "end" }}
                      >
                        {a.concreteProduct.price.toFixed(2)} грн{" "}
                      </p>
                    </div>
                  </div>
                </div>

                );
              }
            )}

          </div>
          <div className="d-flex justify-content-between">
            <h5 className={`${styles["tect-count-price"]}`}>Загальна сума</h5>
            <h5 className={`${styles["text-number-count"]}`}>{(data?data.reservationItems.reduce((acc,a)=>acc+=a.quantity*a.concreteProduct.price,0):0).toFixed(2)} грн</h5>
          </div>
          <div className="d-flex justify-content-between">
            <h5 className={`${styles["tect-count-price"]}`}>
              Загальна кількість
            </h5>
            <h5 className={`${styles["text-number-count"]}`}>{data?data.reservationItems.reduce((acc,a)=>acc+=a.quantity,0):0} упаковки</h5>
          </div>
          <div className="mt-3">
            <h6 className={`${styles["status-text"]}`}>Статус</h6>

            <div className={`d-flex flex-wrap justify-content-evenly`}>
              
              {
                statuses.map(a => {
                  return (
                    <div className={`${styles["parent-radio-div"]}`}>
                      <input
                        type="radio"
                        className={`btn-check ${styles["btn-check"]}`}
                        name="options-base"
                        id={`option${a.id}`}
                        onChange={() => {
                          setChangeStatusId(a.id);                          
                        }}
                        autoComplete="off"                        
                        defaultChecked={data && a.id == data.status}
                      />
                      <label
                        style={{ border: `2px solid ${a.color}` }}
                        className={`  ${styles["labale-radio"]}`}
                        htmlFor={`option${a.id}`}
                      >
                        <div
                          style={{ background: `${a.color}` }}
                          className={`${styles["div-text-radio"]}`}
                        >
                          {a.status}
                        </div>
                      </label>
                    </div>
                  )
                })
              }

            </div>
          </div>

          <div className="row mt-3">
            <div className="col-6 ps-2 pe-2">
              <button
                disabled={!data}
                className={`brn-form ${styles["card-btn-primary"]}  w-100`}
                onClick={updateStatus}
              >
                Надіслати
              </button>
            </div>
            <div className="col-6 ps-2 pe-2">
              <button
                onClick={() => setShow(false)}
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
