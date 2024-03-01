import { useState,useEffect } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./DropDown.css";
import MenuComponentModal from "./MenuComponent/MenuComponentModal";
import Content from "./ContentComponent/Content";
import { getFirstNItemMainCategories } from "../../../../services/category";
function DropDown({ iconPath }) {
  const [show, setShow] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  

  useEffect(()=>{
    initCategories();
  },[]);

  async function initCategories() {
    setCategories((await getFirstNItemMainCategories(9)).data);
  }

  const handleMenuSelect = (menuId) => {
    setSelectedMenu(menuId);
  };
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
        style={{
          width: "84%",
          margin: "0 8%",
          borderRadius: "20px",
        }}
        show={show}
        onHide={() => setShow(false)}
        // dialogClassName="modal-90w"  webpack://./node_modules/bootstrap/scss/_modal.scss
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <div className="row">
            <div
              className="col-4 pe-5"
              style={{ borderRight: "2px solid rgba(0, 122, 255, 1)" }}
            >
              <MenuComponentModal categories={categories} onSelect={handleMenuSelect} />
            </div>
            <div className="col-8 ps-5 pe-5">
              <Content selectedMenu={selectedMenu} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DropDown;
