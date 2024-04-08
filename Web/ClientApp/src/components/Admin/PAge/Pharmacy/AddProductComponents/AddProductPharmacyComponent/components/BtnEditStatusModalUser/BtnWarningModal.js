import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./BtnWarningModal.module.css";

function BtnWarningModal() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className={`brn-form ${styles["card-btn-primary"]}  `}
      >
        Додати товар до аптеки
      </button>

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
        <Modal.Body>
          <h2 className={`mb-5 ${styles["text-modal"]}`}>
            Ви дійсно хочете додати цей товар до аптеки ?
          </h2>
          <div className="row mt-3">
            <div className="col-6 ps-2 pe-2">
              <button
                className={`brn-form ${styles["card-btn-primary"]}  w-100`}
              >
                Так
              </button>
            </div>
            <div className="col-6 ps-2 pe-2">
              <button
                onClick={() => setShow(false)}
                className={` brn-form ${styles["card-btn-primary-500"]} w-100  `}
              >
                Ні
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

export default BtnWarningModal;
