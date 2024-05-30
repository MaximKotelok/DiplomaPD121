import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as ImgBtn } from "../../../../../../../assets/images/btnZayavkModal.svg";
import styles from "./BtnPharmacyModal.module.css";
import { deletePharmacy, getPharmacyById } from "../../../../../../../services/pharmacy";
import { Success } from "../../../../../../../utils/Constants";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function BtnPharmacyModal({id}) {
  const [show, setShow] = useState(false);
  const [pharmacy, setPharmacy] = useState(null);

  useEffect(()=>{
    if(show)
      init();
  },[show]);

  async function init(){
    let res = await getPharmacyById(id);
    if(res.status === Success){
      setPharmacy(res.data);
      console.log(res.data)    
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
              to={`/admin/UpdatePharmacy/${id}`}>
                Оновити
            </Link>
            <button className="btn btn-danger" onClick={async ()=>{
              let res = await deletePharmacy(id);
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
    </>
  );
}

export default BtnPharmacyModal;
