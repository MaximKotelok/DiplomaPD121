import React, { useEffect, useState } from "react";
// import Modal from "react-bootstrap/Modal";
import google from "../../../../../../assets/images/google.svg";
import faceboo from "../../../../../../assets/images/Facebook.svg";
import BtnSocialComponenent from "../../../../../Auth/components/BtnSocialComponenent/BtnSocialComponenent";
import stylesAuth from "../../../../../Auth/AuthPage.module.css";
import styles from "./EditProfile.module.css";
import "./EditPro.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { getMyInfo, updateUser } from "../../../../../../services/user";
import { ApiPath, Success } from "../../../../../../utils/Constants";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ChangePasswordComponent from "../ChangePasswordComponent/ChangePasswordComponent";
import CustomImgComponent from "../../../../../Common/CustomImgComponent/CustomImgComponent";
import BtnEditPhotoModal from "../AvataComponent/BtnEditPhotoModal/BtnEditPhotoModal";
// import stylesAuth from "../AuthPage.module.css";
import useWindowSize from "../../UseWindowSize.js";
import { NavLink, useLocation } from "react-router-dom";
import { BackButton } from "../../../../Common/BackButton/BackButton.js";

import DefaultUserPhoto from "../../../../../../assets/images/user/user-photo-default.svg"
const EditProfile = () => {
  const [show, setShow] = useState(false);
  const [pathToPhoto, setPathToPhoto] = useState("");

  // const [showEmail, setShowEmail] = useState(false);
  const [formData, setFormData] = useState({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phoneNumber: undefined,
  });

  useEffect(() => {
    init();
  }, []);
  // const location = useLocation();
  // const { pathname } = location;
  // const isProfilePage = pathname !== "/profile";

  async function init() {
    let res = await getMyInfo();
    if (res.status == Success) {
      let userData = res.data;
      Object.keys(userData).forEach(function (key) {
        if (userData[key] === null) {
          userData[key] = "";
        }
      });
      setFormData(userData);
      setPathToPhoto(res.data.pathToPhoto);
    }
    
  }

  async function submit() {
    let res = await updateUser(formData);
    if (res.status == Success) {
      Swal.fire("Success!", res.data, "success");
    } else {
      toast.error("Помилка");
    }
  }

  const setFormDataAttribute = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange = (e) => {
    setFormDataAttribute(e.target.name, e.target.value);
  };

  const { width } = useWindowSize();
  const isMobile = width <= 768;

  return (
    <>
      <div className="row">
        <div className={`col-md-7`}>
          {isMobile ? (
            <BackButton text={"Особисті дані"} />
          ) : (
            <h3 className={`mb-3 ${styles["title-edit-page"]}`}>
              Особисті дані
            </h3>
          )}

          <form>
            <div className="mb-3">
              <div className="d-flex  align-items-center">
                <CustomImgComponent
                  alt="Avatar"
                  className={` ${styles["circle-avatar"]}  me-3`}
                  src={`${ApiPath}${pathToPhoto}`}
                  defaultSrc={DefaultUserPhoto}
                />
                <BtnEditPhotoModal pathToPhoto={`${pathToPhoto}`} defaultSrc={DefaultUserPhoto}/>
              </div>
            </div>
            {/* <form onSubmit={handleLogin}> */}
            <div className="mb-2">
              <input
                className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`}
                placeholder="Ім'я"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <input
                className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`}
                placeholder="Фамілія"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-2">
              <PhoneInput
                defaultCountry="ua"
                name="phoneNumber"
                className={`mb-2`}
                value={formData.phoneNumber}
                placeholder="Мобільний номер"
                onChange={(e) => setFormDataAttribute("phoneNumber", e)}
                required
              />
            </div>
            <div className="mb-2">
              {/* <input className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`} placeholder='Email' type="text" name="email" value={formData.email} onChange={handleInputChange} required/> */}
              <input
                className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`}
                placeholder="Пошта"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-2"></div>

            {/* <div className="input-group mb-1">
              <input
                type="text"
                className={`form-control input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`}
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button
                className={`${styles["btn-form-control"]}`}
                type="button"
                id="button-addon2"
                onClick={() => setShowEmail(true)}
              >
                змінити
              </button>
            </div> */}
            <button
              onClick={() => setShow(true)}
              className={`${styles["btn-zmina"]}`}
              type="button"
            >
              Змінити пароль
            </button>

            <button
              className="brn-form brn-primary-form mb-2"
              onClick={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              Зберегти
            </button>
          </form>
        </div>
        <div className={`col-md-5`}>
          <h3 className={`mb-3 ${styles["title-edit-page"]}`}>
            Зв’язати з соцмережею
          </h3>
          <BtnSocialComponenent icon={google} text={"Вхід через Google"} />
          <BtnSocialComponenent icon={faceboo} text={"Вхід через Facebook"} />
        </div>
      </div>
      <ChangePasswordComponent show={show} setShow={setShow} />
    </>
  );
};

export default EditProfile;
