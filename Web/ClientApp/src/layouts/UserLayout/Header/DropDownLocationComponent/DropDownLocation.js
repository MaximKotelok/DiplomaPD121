import { useState } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./DropDownLocation.module.css";
import BtnCity from "./BtnCityComponent/BtnCity";
// import MenuComponentModal from "./MenuComponent/MenuComponentModal";
// import Content from "./ContentComponent/Content";
const cities = [
  "Вінниця",
  "Тернопіль",
  "Полтава",
  "Кропивницький",
  "Чернівці",
  "Харків",
  "Луцьк",
  "Львів",
  "Івано-Франківськ",
  "Ужгород",
  "Одеса",
  "Київ",
  "Суми",
  "Миколаїв",
  "Чернігів",
  "Черкаси",
  "Рівне",
  "Дніпро",
  "Хмельницький",
];

function DropDownLocation({ iconPath }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="btn d-flex align-items-center"
      >
        <img
          src={iconPath}
          alt="Icon"
          className="mr-2"
          style={{ width: "28px", height: "28px", marginRight: "8px" }}
        />
        <span className="text-center flex-grow-1">Каталог</span>
      </button>

      <Modal
        // className={` ${styles["custom-modal"]}`}
        style={{
          width: "370px",
          margin: "10% 40%",
          padding: "32px",
          borderRadius: "32px",
          border: "none",
        }}
        size="xl"
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Body>
          <h5 className={` ${styles["text-header-modal"]}`}>
            Оберіть ваше місто
          </h5>
          <div className="mb-2">
            <input
              className={`input-text-form input-text-secondary-form mb-2 ${styles["my-input-text-form"]}`}
              placeholder="Вкажіть назву населеного пункту"
              type="text"
              // name="email"
              // value={formData.email}
              // onChange={handleInputChange}
              // required
            />
          </div>
          <div className=" d-flex justify-content-between flex-wrap ">
            {cities.map((city) => (
              <BtnCity key={city} NameCity={city} />
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DropDownLocation;
