import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as ImgBtn } from "../../../../../../../../assets/images/btnZayavkModal.svg";
import styles from "./BtnEditBrandModal.module.css";
import { deleteBrand, getBrandById } from "../../../../../../../../services/brand";
import { Success } from "../../../../../../../../utils/Constants";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function BtnEditPharmacyModal({id}) {
  const [show, setShow] = useState(false);
  const [brand, setBrand] = useState(null);

  useEffect(()=>{
    if(show)
      init();
  },[show]);

  async function init(){
    let res = await getBrandById(id);
    if(res.status === Success){
        setBrand(res.data);
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
          width: "811px",
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
              to={`/admin/UpdateBrand/${id}`}>
                Оновити
            </Link>
            <button className="btn btn-danger" onClick={async ()=>{
              let res = await deleteBrand(id);
              if(res.status === Success){
                 //toast.success("Успіх!");
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
    </>
  );
}

export default BtnEditPharmacyModal;
