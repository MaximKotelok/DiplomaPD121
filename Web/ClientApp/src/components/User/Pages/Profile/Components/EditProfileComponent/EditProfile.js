import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import google from "../../../../../../assets/images/google.svg";
import faceboo from "../../../../../../assets/images/Facebook.svg";
import BtnSocialComponenent from "../../../../../Auth/components/BtnSocialComponenent/BtnSocialComponenent";
import stylesAuth from "../../../../../Auth/AuthPage.module.css";
import { ReactComponent as BtnClose } from "./BtnClose.svg";
import styles from "./EditProfile.module.css";
import "./EditPro.css";
// import stylesAuth from "../AuthPage.module.css";
const EditProfile = () => {
  const [show, setShow] = useState(false);
  // const [showEmail, setShowEmail] = useState(false);

  return (
    <>
      <div className="row">
        <div className={`col-md-7`}>
          <h3 className="mb-3">Особисті дані</h3>

          <form>
            {/* <form onSubmit={handleLogin}> */}
            <div className="mb-2">
              {/* <input className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`} placeholder='Email' type="text" name="email" value={formData.email} onChange={handleInputChange} required/> */}
              <input
                className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`}
                placeholder="Пошта"
                type="text"
                name="email"
                required
              />
            </div>
            <div className="mb-2">
              {/* <input className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`} placeholder='Password' type="password" name="password" value={formData.password} onChange={handleInputChange} required/> */}
              <input
                className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`}
                placeholder="Пароль"
                type="password"
                name="password"
                required
              />
            </div>
            <div className="mb-2">
              <input
                className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`}
                placeholder="Мобільний номер"
                type="text"
                name="phoneNumber"
                required
              />
            </div>
            <div className="mb-2">
              <input
                className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`}
                placeholder="Email"
                type="Email"
                name="Email"
                required
              />
            </div>

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

            <button className="brn-form brn-primary-form mb-2" type="submit">
              Вхід
            </button>
          </form>
        </div>
        <div className={`col-md-5`}>
          <h3 className="mb-3">Зв’язати з соцмережею</h3>
          <BtnSocialComponenent icon={google} text={"Вхід через Google"} />
          <BtnSocialComponenent icon={faceboo} text={"Вхід через Facebook"} />
        </div>
      </div>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Body className="test">
          <div className={`d-flex justify-content-end mb-3`}>
            <div style={{ cursor: "pointer" }} onClick={() => setShow(false)}>
              <BtnClose />
            </div>
          </div>
          <form>
            {/* <form onSubmit={handleLogin}> */}
            <div className="mb-2">
              {/* <input className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`} placeholder='Email' type="text" name="email" value={formData.email} onChange={handleInputChange} required/> */}
              <input
                className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`}
                placeholder="Введіть пароль"
                type="password"
                name="email"
                required
              />
            </div>
            <div className="mb-4">
              {/* <input className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`} placeholder='Password' type="password" name="password" value={formData.password} onChange={handleInputChange} required/> */}
              <input
                className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`}
                placeholder="Продублюйте пароль"
                type="password"
                name="confirmPassword"
                required
              />
            </div>

            <button className="brn-form brn-primary-form mb-3 " type="submit">
              Зберегти
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* <Modal show={showEmail} onHide={() => setShowEmail(false)} centered>
        <Modal.Body className="test">
          <div className={`d-flex justify-content-end mb-3`}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setShowEmail(false)}
            >
              <BtnClose />
            </div>
          </div>
          <form>
            <div className="mb-2">
              <input
                className={`input-text-form input-text-secondary-form mb-2 ${stylesAuth["my-input-text-form"]}`}
                placeholder="Змініть Email"
                type="email"
                name="email"
                required
              />
            </div>

            <button className="brn-form brn-primary-form mb-3 " type="submit">
              Зберегти
            </button>
          </form>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default EditProfile;
