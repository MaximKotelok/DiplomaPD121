import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as ImgBtn } from "../../../../../../../assets/images/btnZayavkModal.svg";
import styles from "./BtnModalPharmaCompanyModal.module.css";
import { changeStatus } from "../../../../../../../services/product";
import { ApiPath, Success } from "../../../../../../../utils/Constants";
import { getReservation, setOrderStatus } from "../../../../../../../services/reservation";
import { BrowserRouter as Router, Route, Link, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { deletePharmaCompany } from "../../../../../../../services/pharmaCompany";

function BtnModalPharmaCompanyModal({
  id
}) {

  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [changeStatusId, setChangeStatusId] = useState(null);
  useEffect(() => {
    if (show) {
      init();
    }
  }, [show]);

  async function init() {
    let res = await getReservation(id);
    if (res.status === Success) {
      setData(res.data);
      console.log(res.data.status)
      setChangeStatusId(res.data.status);
    }
  }

  async function updateStatus(){
    let res = await setOrderStatus(id, changeStatusId);
    if (res.status === Success) {      
      changeStatus(changeStatusId);
      setShow(false);
    }
  }
  return (
    <>
      <ImgBtn
        onClick={() => setShow(true)}
        className={`${styles["btn-hover"]}`}
      />

      <Modal
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "538px",
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
        <div className={`d-flex`}>
            <Link 
              className="btn btn-primary" 
              to={`/admin/UpdatePharmaCompany/${id}`}>
                Оновити
            </Link>
            <Link 
              className="btn btn-warning" 
              to={`/admin/AddPharmacy/${id}`}>
                Додати аптеку
            </Link>
            <button className="btn btn-danger" onClick={async ()=>{
              let res = await deletePharmaCompany(id);
              if(res.status === Success){
                window.location.reload();
              }else{
                toast.error("Помилка");
              }
            }}>
              Видалити  
              </button>
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

export default BtnModalPharmaCompanyModal;
