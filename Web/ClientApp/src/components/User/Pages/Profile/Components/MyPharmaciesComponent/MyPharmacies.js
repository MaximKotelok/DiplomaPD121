import React, { useState, useEffect } from "react";
import MyPharmacie from "./MyPharmacie/MyPharmacieComponent";
import AccordionComponent from "../../../../../Common/AccordionQuestionComponent/accordionComponent";
import srcImg from "../../../../../../assets/images/authPage.png";
import {
  getFavsPharmaciesWithSupInfo,
  removeFavouritePharmacy,
} from "../../../../../../services/favPharmacies";
import { toast } from "react-toastify";

import styles from "./MyPharmacies.module.css";
import { BackButton } from "../../../../Common/BackButton/BackButton";
import useWindowSize from "../../UseWindowSize.js";

const MyPharmacies = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    let res = await getFavsPharmaciesWithSupInfo();
    setPharmacies(res);
  }

  const handleRemovePharmacy = (pharmacyIdToRemove) => {
    setPharmacies((prevPharmacies) =>
      prevPharmacies.filter((pharmacy) => pharmacy.id !== pharmacyIdToRemove)
    );
    removeFavouritePharmacy(pharmacyIdToRemove);
    toast.success("Ви успішно видалили аптеку з улюблених!");
  };

  return (
    <div>
      {isMobile && <BackButton text={"Мої аптеки"} />}
      <h4 className={`mb-3 mt-3 ${styles["title-edit-page"]}`}>
        Мої збережені аптеки
      </h4>

      {pharmacies.length === 0 ? (
        <div>
          <h5
            style={{
              fontFamily: "var(--standart-font)",
              fontWeight: 700,
              fontSize: "16px",
            }}
          >
            Список "Мої аптеки" порожній
          </h5>
          <AccordionComponent
            header="Навіщо додавати аптеки в список?"
            title="Додавайте аптеки для швидкого доступу до інформації про них."
            id="1"
          />
          <img src={srcImg} style={{ width: "100%", height: "auto" }} />
        </div>
      ) : (
        <div className="d-flex row">
          {/* Render each pharmacy from the 'pharmacies' array */}
          {pharmacies.map((pharmacy, index) => (
            <MyPharmacie
              key={index}
              pharmacy={pharmacy}
              onRemoveClick={handleRemovePharmacy}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPharmacies;

{
  /* <h5
        style={{
          fontFamily: "var(--standart-font)",
          fontWeight: 700,
          fontSize: "16px",
        }}
      >
        Список "Мої аптеки" порожній{" "}
      </h5> */
}

{
  /* Якщо масив пустий */
}

{
  /*
        <AccordionComponent
          header="Навіщо додавати аптеки в список?"
          title="Додавайте аптеки для швидкого доступу до інформації про них."
          id="1"
        />
        <img src={srcImg} style={{ width: "100%", height: "auto" }} /> */
}
