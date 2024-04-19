import React, { useEffect, useState } from "react";
import styles from "./UpsertActiveSubstanceComponents.module.css";
import { InpurtStandart } from "../../../Common/InpurtStandart/InpurtStandart";
import { TextAreaStandart } from "../../../Common/TextAreaStandart/TextAreaStandart";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
import { useNavigate, useParams } from "react-router-dom";
import { getActiveSubstance, getListOfMedicineOfActiveSubstance, updateActiveSubstance } from "../../../../../services/activeSubstance";
import { ApiPath, Success } from "../../../../../utils/Constants";
import CustomImgComponent from "../../../../Common/CustomImgComponent/CustomImgComponent";
import { toast } from "react-toastify";
export const UpsertActiveSubstanceComponents = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({title: "",  isNotActive: false})
  const [products, setProducts] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    init();
  }, [id])

  async function init() {
    let res = await getActiveSubstance(id);
    let resProducts = await getListOfMedicineOfActiveSubstance(id);
    if(res.status === Success && resProducts.status === Success) {
      setFormData({title: res.data.title,  isNotActive: !res.data.isActive});
      setProducts(resProducts.data);
    }
  }
  
  async function submit(){
    let res = await updateActiveSubstance(id, formData.title, !formData.isNotActive);
    if(res.status === Success){
      toast.success("Успіх");
      navigate(-1);
      return;
    }
    toast.error("Помилка");

  }

  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]}  d-flex flex-column`}>
        {/* Коли будиш підключати цю сторінку викорситай підхід який ми брали на asp 1 форма для едіт і адд і відштовхуючи від шляху зміни текст в h4 */}
        
        <div>
          <h4 className={`${styles["head-h4"]} mb-4`}>Редагування діючу речовину</h4>

          <InpurtStandart value={formData.title} label={"Назва"} placholder={"Ведіть назву ..."}
            onChange={(e)=>setFormData({...formData, title:e.target.value})}

          />

          <CheckedBox text="Неактивний" value={formData.isNotActive}
          onChange={(value)=>setFormData({...formData, isNotActive:value})}
          />
        </div>

        <div>
          <h6 className={`${styles["text-block-product"]}`}>
            Товари з цією діючою речовиною не знайдено
          </h6>
          {/* виводимо лише 3 товара  */}
          {(!products?"Ця речовина не має товарів":
          products.map(product=>{
            return (
              <div className={`d-flex mb-2`}>
            <CustomImgComponent
            src={`${ApiPath}${product.pathToPhoto}`}
            className={`${styles["img-product"]}`}
            />
            <div className="ms-3">
              <h5 className={`${styles["top-text-row"]}`}>
                {product.title}
              </h5>
              <p className={`${styles["bottom-text-row"]}`}>
                {product.shortDescription}
              </p>
            </div>
          </div>
            )
          })
          )}
         
        </div>

        <div className={`d-flex mt-auto`}>
          <button
            className={`brn-form brn-primary-form mt-auto me-4 ${styles["btn-save"]}`}
            onClick={submit}
          >
            Зберегти
          </button>

          <button
            className={`brn-form brn-primary-form mt-auto ${styles["btn-abolition"]}`}
            onClick={() => navigate(-1)}
          >
            Відмінити
          </button>
        </div>
      </div>
    </div>
  );
};
