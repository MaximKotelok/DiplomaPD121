import React from "react";
import styles from "./ProductComponent.module.css";
import CustomImgComponent from "../../../../Common/CustomImgComponent/CustomImgComponent";
const ProductComponent = ({title, shortDescription, image, quantity, price = 0}) => {
  return (
    <div className={`d-flex mb-4 `} style={{ height: "92px" }}>
      <CustomImgComponent 
        src={image} 
        style={{ width: "92px", height: "92px", objectFit: "cover" }}
        alt="product"
        />
      <div className={`ms-4 w-100 d-flex justify-content-between flex-column`}>
        <h5 className={`${styles["text-title"]}`}>{title}</h5>
        <h6 className={`${styles["text-linyika"]}`}>{shortDescription}</h6>
        <div className={` d-flex justify-content-between`}>
          <p className={`${styles["text-sum-count"]}`}>{quantity} упаковка</p>{" "}
          <p
            className={`${styles["text-sum-count"]}`}
            style={{ fontWeight: "700" }}
          >
            {price.toFixed(2)}{" "}
            <span style={{ fontSize: "12px", fontWeight: "500" }}>грн</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProductComponent;
