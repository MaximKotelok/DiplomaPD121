import React, { useEffect, useState, useContext } from "react";
import styles from "./AddProductPharmacyComponent.module.css";
import AutoCompleteInput from "../../../../../Common/AutoCompleteInputComponent/AutoCompleteInput ";
import {
  GetProductByTitle,
  getProductForPharmacyById,
} from "../../../../../../services/product";
import { ApiPath, Success } from "../../../../../../utils/Constants";
import { addConcreteProductAsync, getConcreteProduct } from "../../../../../../services/concreteProduct";
import { toast } from "react-toastify";
import BtnWarningModal from "../../../../Common/BtnWarningModal/BtnWarningModal";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CustomImgComponent from "../../../../../Common/CustomImgComponent/CustomImgComponent";
import { useParams } from "react-router";
const VisuallyHiddenInput = styled("input")({
  clip: "rgba(229, 229, 234, 1)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const StyledButton = styled(Button)({
  width: "250px",
  height: "42px",
  color: "rgba(122, 122, 122, 1)",
  backgroundColor: "rgba(229, 229, 234, 1)",
  borderRadius: "16px",
  // padding: "12px 12px",
  fontSize: "16px",
  fontWeight: "700",
  fontFamily: "var(--sans-serif)",
  // marginLeft: "50px",
  margin: "0 auto",
  "&:hover": {
    color: "rgba(122, 122, 122, 1)", // Колір тексту при наведенні
    backgroundColor: "rgba(229, 229, 234, 1)", // Колір фону при наведенні
  },
});

export const AddProductPharmacyComponent = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const { concreteProductId } = useParams();
  
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setImageSrc(reader.result);
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  const [data, setData] = useState({
    id: null,
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
    if (id != null) initProduct(id);
    
  }, [id]);
  useEffect(() => {
    if(concreteProductId){
      init(concreteProductId);
    }
    
  }, []);

  async function initProduct(id) {
    let res = await getProductForPharmacyById(id);
    setProduct(res.data);
  }

  async function init() {
    let res = await getConcreteProduct(concreteProductId);
    setId(res.data.productID);
    initProduct(res.data.productID) ;
    setData({
      id: id,
      price: res.data.price,
      quantity: res.data.quantity
    });
  }

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    let res = await addConcreteProductAsync({
      quantity: parseInt(data.quantity),
      price: parseInt(data.price),
      productId: id,
      id: concreteProductId
    });
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
            onResultClick={(id) => {
              setId(id);
            }}
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
            <div className={`d-flex flex-column  justify-content-center `}>
              <CustomImgComponent
                src={`${ApiPath}${product.pathToPhoto}`}
                alt="no photo"
                className={`${styles["img-product"]} mb-2`}
              />
             
            </div>
          </div>

          <div className={`col-5 `}>
            <div className="mb-3">
              <label className={`${styles["label-head"]}`}>Назва</label>
              <p className={`${styles["text-opus"]}`}>
                {product.title ? product.title : ""}
              </p>
            </div>

            <div className="mb-3">
              <label className={`${styles["label-head"]}`}>Опис</label>
              <p className={`${styles["text-opus"]}`}>
                {product.shortDescription ? product.shortDescription : ""}
              </p>
            </div>

            <div className="mb-3">
              <label className={`${styles["label-head"]}`}>Виробник</label>
              <p className={`${styles["text-opus"]}`}>
                {product.manufacturer ? product.manufacturer : ""}
              </p>
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
            <BtnWarningModal text={"а шо а нічо"} onConfirm={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
