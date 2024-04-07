import { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./DropDown.module.css";

import MenuComponentModal from "./MenuComponent/MenuComponentModal";
import Content from "./ContentComponent/Content";
import { getFirstNItemMainCategories } from "../../../../services/category";
import { Provider, useDispatch, useSelector } from "react-redux";
import catalogueStore from "../../../../reducers/stores/catalogueStore";
function DropDown({ iconPath }) {
  const [show, setShow] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    initCategories();
  }, []);

  async function initCategories() {
    setCategories((await getFirstNItemMainCategories(9)).data);
  }

  const handleMenuSelect = (menuId) => {
    setSelectedMenu(menuId);
  };
  return (
    <div className="">
      <button
        onClick={() => setShow(true)}
        className={`btn d-flex align-items-center  ${
          show ? styles["btn-style-active"] : styles["btn-style-hover"]
        }`}
      >
        <img
          src={iconPath}
          alt="Icon"
          className="mr-2"
          style={{ width: "28px", height: "28px", marginRight: "8px" }}
        />
        <span className="text-center  text-white flex-grow-1">Каталог</span>
      </button>

      <Modal
        style={{
          width: "84%",
          margin: "0 8%",
          borderRadius: "20px",
        }}
        size="xl"
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Body>
          <div className="row">
            <div
              className="col-4 pe-5"
              style={{ borderRight: "2px solid rgba(0, 122, 255, 1)" }}
            >
              <MenuComponentModal
                categories={categories}
                onSelect={handleMenuSelect}
                closeMenu={()=>{setSelectedMenu(null); setShow(false);}}
              />
            </div>
            <div className="col-8 ps-5 pe-5">
              <Provider store={catalogueStore}>
                <Content selectedMenu={selectedMenu} closeMenu={()=>{setSelectedMenu(null); setShow(false);}}/>
              </Provider>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DropDown;
