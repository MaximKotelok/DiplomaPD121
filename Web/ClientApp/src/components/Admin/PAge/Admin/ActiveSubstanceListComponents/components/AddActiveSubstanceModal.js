import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./AddActiveSubstanceModal.module.css";
import { InpurtStandart } from "../../../../Common/InpurtStandart/InpurtStandart";
import { CheckedBox } from "../../../../Common/CheckedBoxComponent/CheckedBox";

function AddActiveSubstanceModal() {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* <button
        onClick={() => setShow(true)}
        className={`brn-form ${styles["card-btn-primary"]}  `}
      >
        Додати товар до аптеки
      </button> */}
      <div onClick={() => setShow(true)} className={`${styles["btn-add"]}`}>
        Додати
      </div>

      <Modal
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "542px",
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
        <Modal.Body style={{ padding: "16px 32px" }}>
          <h2 className={`mb-3 ${styles["text-modal"]}`}>
            Додавання діючої речовини
          </h2>

          <div className="mb-3">
            <InpurtStandart label={"Назва"} placholder={"Введіть назву"} />
            <CheckedBox text="Неактивний" />
          </div>

          <div className="row mt-5">
            <div className="col-6 ps-2 pe-2">
              <button
                className={`brn-form ${styles["card-btn-primary"]}  w-100`}
              >
                Зберегти
              </button>
            </div>
            <div className="col-6 ps-2 pe-2">
              <button
                onClick={() => setShow(false)}
                className={` brn-form ${styles["card-btn-primary-500"]} w-100  `}
              >
                Відмінити
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

export default AddActiveSubstanceModal;
