import { NavigationDetailsComponent } from "../../../../Common/NavigationDetailsComponent/NavigationDetailsComponent";
import styles from "./ListProductItemComponent.module.css";
import externalLink from "../../../../../../assets/images/tabler-icon-external-link.svg";
import { ReactComponent as Geo } from "../../../../../../assets/images/geo.svg";
import { addToCart } from "../../../../../../services/cartService";
import { toast } from "react-toastify";
import { isPharmacyOpen } from "../../../../../../utils/Functions";
import SearchComponent from "../../../../../Common/SearchComponent/SearchComponent";
import ConreteProductSearchComponent from "../ConreteProductSearchComponent/ConreteProductSearchComponent";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PharmacySearchProductAutoCompleteInputComponent from "../../../../../Common/PharmacySearchProductAutoCompleteInputComponent/PharmacySearchProductAutoCompleteInputComponent";
import { getProductByTitleFromPharmacy } from "../../../../../../services/pharmacy";

const ListPharmaciesItemComponent = ({
  id,
  isSelected,
  title,
  address,
  timeClosed,
  timeOpen,
  onClick,
  lon,
  lat,
}) => {
  let isOpen = isPharmacyOpen(timeOpen, timeClosed);

  return (
    <div
      id={`pharmacy${id}`}
      onClick={onClick}
      className={`${styles["card"]} ${isSelected && styles["active"]}`}
    >
      <p className={`${styles["pharma-name"]}`}>
        {title} <i className={`bi bi-info-circle ${styles["info-icon"]}`}></i>
      </p>
      <div className="my-2">
        <Link
          className={`${styles["pharma-info-link"]}`}
          to={`/PharmacyInfo/${id}`}
        >
          Інформація про аптеку{" "}
          <img src={externalLink} height={14} width={14} />
        </Link>
      </div>
      <div className={`${styles["pharma-info"]}`}>
        <p>
          {isOpen ? `Відкрито до ${timeClosed}` : `Буде відкрито з ${timeOpen}`}
        </p>
        <p>{address}</p>
      </div>
      <button
        className={`btn ${styles["geo"]} my-3`}
        onClick={() => {
          const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}&z=15&t=m`;
          window.open(mapsUrl, "_blank");
        }}
      >
        Маршрут <Geo className="geo-icon" />
      </button>

      <hr />
      <div className="row">
        <div className="d-flex justify-content-center p-0">
                  <PharmacySearchProductAutoCompleteInputComponent pharmacyId={id} getData={(search)=>getProductByTitleFromPharmacy(id,search)} />
          {/* <ConreteProductSearchComponent pharmacyId={id} className={styles["search"]}/> */}
        </div>
      </div>
    </div>
  );
};
export default ListPharmaciesItemComponent;
