import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import google from "../../../../../../assets/images/google.svg";
import faceboo from "../../../../../../assets/images/Facebook.svg";
import BtnSocialComponenent from "../../../../../Auth/components/BtnSocialComponenent/BtnSocialComponenent";
import stylesAuth from "../../../../../Auth/AuthPage.module.css";
import { ReactComponent as BtnClose } from "./BtnClose.svg";
//import styles from "./EditProfile.module.css";
//import "./EditPro.css";
import { PhoneInput } from "react-international-phone";
import { changePassword, getMyInfo, updateUser } from "../../../../../../services/user";
import { Success } from "../../../../../../utils/Constants";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
// import stylesAuth from "../AuthPage.module.css";
const ChangePasswordComponent = ({show, setShow}) => {
  const [formData, setFormData] = useState({
    currentPassword:"",
    newPassword:""
  });

  
  const setFormDataAttribute = (name, value) => {

    setFormData({
        ...formData,
        [name]: value,
    });

  }

  const handleInputChange = (e) => {
    setFormDataAttribute(e.target.name, e.target.value);

  };

  
  async function submit(e){
    e.preventDefault();
    //console.log(formData)
    let res = await changePassword(formData); 
    if(res.status == Success){
      Swal.fire('Success!', res.data, 'success');      
    }else{
      toast.error("Помилка");
    }
  }

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Body className="test">
          <div className={`d-flex justify-content-end mb-3`}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setShow(false)}
            >
              <BtnClose />
            </div>
          </div>
          <form>
            <div className="mb-2">
              <p>Підтвердіть свою особистість</p>
              <input
                className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`}
                placeholder="Уведіть старий пароль"
                type="password"
                name="currentPassword"
                onChange={handleInputChange}
                required
              />
              <p>Новий пароль</p>
              <input
                className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`}
                placeholder="Уведіть новий пароль"
                type="password"
                name="newPassword"
                onChange={handleInputChange}
                required
              />
            </div>

            <button className="brn-form brn-primary-form mb-3 " onClick={submit}>
              Зберегти
            </button>
          </form>
        </Modal.Body>
      </Modal> 
  )
};

export default ChangePasswordComponent;
