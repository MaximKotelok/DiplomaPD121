import { useEffect, useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import BtnEditProfile from "../../../../../../../assets/images/profile/camera.svg";
import styles from "./BtnEditPhotoModal.module.css";
import LineArro from "./LineArrow.svg";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CustomImgComponent from "../../../../../../Common/CustomImgComponent/CustomImgComponent";
import { ApiPath, Success } from "../../../../../../../utils/Constants";
import { postPhotoToServer } from "../../../../../../../services/photo";
import { updateUserPhoto } from "../../../../../../../services/user";
import { toast } from "react-toastify";

// const VisuallyHiddenInput = styled("input")({
//   clip: "rgba(229, 229, 234, 1)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

// const StyledButton = styled(Button)({
//   width: "250px",
//   height: "42px",
//   color: "rgba(122, 122, 122, 1)",
//   backgroundColor: "rgba(229, 229, 234, 1)",
//   borderRadius: "16px",
//   // padding: "12px 12px",
//   fontSize: "16px",
//   fontWeight: "700",
//   fontFamily: "var(--sans-serif)",
//   // marginLeft: "50px",
//   margin: "0 auto",
//   "&:hover": {
//     color: "rgba(122, 122, 122, 1)", // Колір тексту при наведенні
//     backgroundColor: "rgba(229, 229, 234, 1)", // Колір фону при наведенні
//   },
// });

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const StyledButton = styled(Button)({
  width: "250px",
  height: "42px",
  color: "rgba(122, 122, 122, 1)",
  backgroundColor: "rgba(229, 229, 234, 1)",
  borderRadius: "16px",
  fontSize: "16px",
  fontWeight: "700",
  fontFamily: "var(--sans-serif)",
  margin: "0 auto",
  "&:hover": {
    color: "rgba(122, 122, 122, 1)",
    backgroundColor: "rgba(229, 229, 234, 1)",
  },
});

function BtnEditPhotoModal({pathToPhoto, defaultSrc}) {
  const [image, setImage] = useState(BtnEditProfile);
  const [file, setFile] = useState(null);

  const [show, setShow] = useState(false);

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();

      reader.onload = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const submit = async () => {
    let path = "";
    if (file) {
        if (pathToPhoto.startsWith("/") || pathToPhoto.startsWith("\\")) 
            path = await postPhotoToServer(
                "Photo/Update",
                pathToPhoto.replace(/[\/\\]images[\/\\]/g, ""),
                file
            );
        else path = await postPhotoToServer("Photo/Add", "user", file);
        if (path.status === Success) {
            path = `/images/user/${path.data}`;
        }
        if((await updateUserPhoto(path)).status === Success){
          toast.success("Успіх");
          window.location.reload();
        }
    } 
    else{
      toast.error("Помилка")
    }

    
  }
  

  return (
    <>
      <p
        className={`${styles["btn-edit-photo"]}`}
        onClick={() => setShow(true)}
      >
        Змінити фото
      </p>

      <Modal
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "385px",
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
          {/* <CustomImgComponent /> */}
          {/* <img src={BtnEditProfile}  /> */}
          <div className="d-flex justify-content-center">
            <img
              className={`${styles["img-style-circle"]}`}
              src={image}
              alt="Edit Profile"
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            />
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          <h3 className={`${styles["text-center"]} mb-3 mt-3`}>
            Натисніть на іконку камери для зміни фотографії
          </h3>

          <div
            className={`d-flex align-items-center justify-content-center mb-3`}
          >
            <CustomImgComponent className={`${styles["img-sm"]}`} src={`${ApiPath}${pathToPhoto}`} defaultSrc={defaultSrc} />
            <img src={LineArro} />
            <img className={`${styles["img-sm"]}`} src={image} />
            {/* СТАРЕ ФОТО */}
          </div>
          <button
            className={` mt-3 brn-form brn-primary-form mt-auto me-4 ${styles["card-btn-primary"]}`}
            onClick={submit}
          >
            Застосувати зміни
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BtnEditPhotoModal;
