import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./ModalTostarStatusModal.module.css";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../../../assets/images/adminAssets/AnimationStatusGood.json";
import deletAnimatiom from "../../../../assets/images/adminAssets/AnimationDeletErorr.json";

function ModalTostarStatusModal({
  id,
  show = false,
  onClose = () => {},
  text = "Додавання пройшло успішно!",
}) {
  const [isVisible, setIsVisible] = useState(show);
  const [animation, setAnimation] = useState(groovyWalkAnimation);

  useEffect(() => {
    setAnimation(id === 2 ? deletAnimatiom : groovyWalkAnimation);
    setIsVisible(show);
  }, [show]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };
  return (
    <Modal
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "400px",
        height: "auto",
        margin: "0",
        padding: "32px",
        borderRadius: "32px",
        border: "none",
      }}
      size="xl"
      show={isVisible}
      onHide={handleClose}
    >
      <Modal.Body onClick={handleClose}>
        <div
          style={{ height: "240px" }}
          className="d-flex justify-content-center align-items-end"
        >
          <Lottie
            className={`${
              id === 2
                ? styles["svg-gif-animation-delet"]
                : styles["svg-gif-animation"]
            }`}
            // className={`${styles["svg-gif-animation"]}`}
            animationData={animation}
            loop={false}
          />
          <h4
            className={`${styles["text-style-modal-status"]} ${
              id === 2 && styles["text-color-modal-status-delet"]
            }`}
          >
            {text}
          </h4>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default ModalTostarStatusModal;
