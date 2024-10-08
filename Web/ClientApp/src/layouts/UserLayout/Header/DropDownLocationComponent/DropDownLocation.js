import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./DropDownLocation.module.css";
import BtnCity from "./BtnCityComponent/BtnCity";
import { getAllCities } from "../../../../services/city";
import { Success } from "../../../../utils/Constants";
// import MenuComponentModal from "./MenuComponent/MenuComponentModal";
// import Content from "./ContentComponent/Content";
// const cities = [
//   "Вінниця",
//   "Тернопіль",
//   "Полтава",
//   "Кропивницький",
//   "Чернівці",
//   "Харків",
//   "Луцьк",
//   "Львів",
//   "Івано-Франківськ",
//   "Ужгород",
//   "Одеса",
//   "Київ",
//   "Суми",
//   "Миколаїв",
//   "Чернігів",
//   "Черкаси",
//   "Рівне",
//   "Дніпро",
//   "Хмельницький",
// ];

function DropDownLocation({ iconPath, text }) {
  const [show, setShow] = useState(false);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    init();
  }, []);
  async function init() {
    let res = await getAllCities();
    if (res.status === Success) {
      setCities(res.data.map((a) => a.nameCity));
      setFilteredCities(res.data.map((a) => a.nameCity));
    }
  }

  function filter(e) {
    return setFilteredCities(
      cities.filter((a) => a.startsWith(e.target.value))
    );
  }

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className={`btn d-flex align-items-center ${
          show ? styles["btn-style-active"] : styles["btn-style-hover"]
        } `}
      >
        <img
          src={iconPath}
          alt="Icon"
          className="mr-2"
          style={{ width: "28px", height: "28px", marginRight: "8px" }}
        />
        <span className="text-center flex-grow-1">{text}</span>
      </button>

      <Modal
        // className={` ${styles["custom-modal"]}`}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "370px",
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
          <h5 className={` ${styles["text-header-modal"]}`}>
            Оберіть ваше місто
          </h5>
          <div className="mb-2">
            <input
              className={`input-text-form input-text-secondary-form mb-2 ${styles["my-input-text-form"]}`}
              placeholder="Вкажіть назву населеного пункту"
              onChange={filter}
              type="text"
              // name="email"
              // value={formData.email}
              // onChange={handleInputChange}
              // required
            />
          </div>
          <div className=" d-flex justify-content-between flex-wrap ">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <BtnCity key={city} NameCity={city} />
              ))
            ) : (
              <p>Міст не знайдено</p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DropDownLocation;
