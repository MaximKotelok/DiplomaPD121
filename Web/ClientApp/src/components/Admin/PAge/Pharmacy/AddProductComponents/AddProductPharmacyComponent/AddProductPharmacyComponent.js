import React, { useEffect, useState, useContext } from "react";
import styles from "./AddProductPharmacyComponent.module.css";
import AutoCompleteInput from "../../../../../Common/AutoCompleteInputComponent/AutoCompleteInput ";
import BtnWarningModal from "./components/BtnEditStatusModalUser/BtnWarningModal";
import { GetProductByTitle, getProductForPharmacyById } from "../../../../../../services/product"
import { ApiPath, Success } from "../../../../../../utils/Constants"
import { addConcreteProductAsync } from "../../../../../../services/concreteProduct"
import { toast } from "react-toastify";


export const AddProductPharmacyComponent = () => {

    const [data, setData] = useState({
        price: null,
        quantity: null,
    });

    const [product, setProduct] = useState({
        shortDescription: null,
        pathToPhoto: null,
        manufacturer: null,
        title: null,
    });

    const [id, setId] = useState(null);

    useEffect(() => {
        if(id != null)
            initProduct();
    }, [id])

    async function initProduct() {
        let res = await getProductForPharmacyById(id);
        setProduct(res.data);
    }

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmit = async (e) => {
        console.log({ quantity: parseInt(data.quantity), price: parseInt(data.price), productId: id });
        let res = await addConcreteProductAsync({ quantity: parseInt(data.quantity), price: parseInt(data.price), productId: id });
        if (res.status === Success) {
            toast.success(`Операція пройшла успішно`);
        } else {
            toast.error(`Помилка ${res.error.response.status}`);
        }
    };

  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} row`}>
        <divv className="">
          <h6 className={`col-12 ${styles["header-text-add"]}`}>
            Оберіть товар
          </h6>
            <AutoCompleteInput
                className="searchbar"
                getData={(title) => GetProductByTitle(title)}
                onResultClick={(id) => { setId(id);  }}
            />
        </divv>
        <div
          className="row"
          style={{
            height: "max-content",
            border: "2px solid rgba(240, 240, 240, 1)",
            padding: "20px 16px",
            borderRadius: "16px",
          }}
        >
          <div className={`col-4 d-flex flex-column  `}>
            <label className={`${styles["label-head"]}`}>Товар</label>
            <img
              src={`${ApiPath}${product.pathToPhoto}`}
              className={` mt-auto ${styles["img-product"]}`}
            />
          </div>
          <div className={`col-5 `}>
            <div className="mb-3">
              <label className={`${styles["label-head"]}`}>Назва</label>
                          <p className={`${styles["text-opus"]}`}>{product.title ? product.title : ""}</p>
            </div>

            <div className="mb-3">
              <label className={`${styles["label-head"]}`}>Опис</label>
                          <p className={`${styles["text-opus"]}`}>{product.shortDescription ? product.shortDescription : ""}</p>
            </div>

            <div className="mb-3">
              <label className={`${styles["label-head"]}`}>Виробник</label>
                          <p className={`${styles["text-opus"]}`}>{product.manufacturer ? product.manufacturer : ""}</p>
            </div>
          </div>
          <div className={`col-3`}>
            <div className="mb-3">
              <label className={`${styles["label-head"]}`}>Ціна</label>
              <input
                className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                placeholder="Вкажіть ціну товару"
                type="text"
                              name="price"
                              onChange={handleInputChange}
                              value={data.price}
              />
            </div>
            <div className="mb-3">
              <label className={`${styles["label-head"]}`}>Кількість</label>
              <input
                className={`input-text-form  mb-2 ${styles["my-input-text-form"]}`}
                placeholder="Вкажіть кількість товару на складі"
                type="text"
                              name="quantity"
                              onChange={handleInputChange}
                              value={data.quantity}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div>
            <BtnWarningModal onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
