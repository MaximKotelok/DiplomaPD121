import React, { useState, useEffect } from "react";
import styles from "./ProductDetailsAdminComponents.module.css";
import CustomImgComponent from "../../../../Common/CustomImgComponent/CustomImgComponent";
import { TableDetials } from "./component/TableDetials";
import { AcordeonDetailsHistory } from "./component/AcordeonTablle/AcordeonDetailsHistory";
import { ApiPath, StateInfos, Success } from "../../../../../utils/Constants";
import { useLocation, useParams } from "react-router-dom";
import { getProductById, getProductByIdForAdmins } from "../../../../../services/product";
import { getAllPermissions } from "../../../../../services/permissionType";
import { getTagContentFromString, splitByClass, wrapTagIntoDiv } from "../../../../../utils/Functions";
import {

  useNavigate
} from 'react-router-dom';
export const ProductDetailsAdminComponents = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [shortDescription, setShortDescription] = useState(null);
  const [description, setDescription] = useState(null);
  const [loader, setLoader] = useState(StateInfos.LOADING);
  const navigate = useNavigate();
  useEffect(() => {
    init();
  }, []);

  function initDescription(children, separeteBy) {
    if (!separeteBy)
      setDescription(<div>{children}</div>);

    const html = wrapTagIntoDiv(children, separeteBy, "description-item");

    const subContent = splitByClass(html, "description-item");
    const contentsOfB = getTagContentFromString(html, separeteBy);

    const data = [];


    for (let i = 0; i < contentsOfB.length; i++) {
      const id = `b_${i}_${contentsOfB[i].replace(/\s+/g, '_')}`;
      data.push({ id: id, name: contentsOfB[i], content: subContent[i] });
    }
    setDescription(data)
    return true;
  }

  async function init() {
    const res = await getProductByIdForAdmins(productId);
    const resPermissions = await getAllPermissions();
    if (res.status === Success && resPermissions.status === Success) {
      let product;
      let shortDescription = [];
      if (res.data.product) {
        product = res.data.product;
        shortDescription.unshift({
          name: "Діюча Речовина",
          value: res.data.activeSubstance,
          index: 0
        });


        shortDescription = [...shortDescription, ...(res.data.medicineTable.map(a => {
          return {
            name: a.description,
            value: resPermissions.data.find(b => a.id == b.id).title,
            index: 10
          }
        }))]



      } else {
        product = res.data;
      }
      //let path = await getPathToCategory(product.categoryID);


      product.pathToPhoto = `${ApiPath}${product.pathToPhoto}`;
      shortDescription.unshift({
        name: "Виробник",
        value: product.manufacturer,
        index: 1,
      });

      shortDescription.unshift({
        name: "Бренд",
        value: product.brand,
        index: 2,
      });

      setShortDescription(shortDescription.sort(a => a.index));
      setProduct(product);
      if(initDescription(product.description,"h1")){
        
        
        
        setLoader(StateInfos.LOADED);
      }

    } else {
      setLoader(StateInfos.ERROR);
    }

  }


  if (loader === StateInfos.LOADING)
    return "Loading";

  if (loader === StateInfos.ERROR)
    return "Error";

  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} `}>
        <div className="d-flex ">
          <CustomImgComponent
            className={`${styles["img-product"]}`}
            src={`${product.pathToPhoto}`}
          />
          <div className=" ms-3 d-flex flex-column  align-content-between">
            <h5 className={` ${styles["text-header"]}`}>
              {`${product.title}`}
            </h5>
            <p className={` mt-auto ${styles["text-price"]}`}>
              {/* від <span>3099.30</span> до <span>3400.20</span> грн */}
              {product.shortDescription}
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className={`col-6 `}>
            <h5 className={`${styles["head-tablle-text"]}`}>Короткий опис</h5>
            <TableDetials data={shortDescription} />
          </div>
          <div className={`col-6 `}>
            <h5 className={`${styles["head-tablle-text"]}`}>Характеристики</h5>
            <TableDetials data={product.properties} />
          </div>
          <div className={`col-12 mt-5`}>
            <h5 className={`${styles["head-tablle-text"]}`}>Інтсрукція</h5>
            <AcordeonDetailsHistory description={description}/>
          </div>
        </div>

        {/* <div className="d-flex justify-content-center mt-5">
          <button
            className={` me-4 brn-form ${styles["card-btn-primary"]} ${styles["btn-details"]}  `}
          >
            Зберегти
          </button>
          <button
            className={` brn-form ${styles["card-btn-primary-500"]} ${styles["btn-details"]}   `}
            onClick={() => navigate(-1)}
          >
            Вийти
          </button>
        </div> */}
      </div>
    </div>
  );
};
