import React from "react";
import MyPharmacie from "./MyPharmacie/MyPharmacieComponent";
import AccordionComponent from "../../../../../Common/AccordionQuestionComponent/accordionComponent";
// import srcImg from "../../../../../../assets/images/placeholder.png";
import srcImg from "../../../../../../assets/images/authPage.png";

const MyPharmacies = () => {
  return (
    <div>
      {/* Якщо масив пустий*/}

      {/* <h5
        style={{
          fontFamily: "var(--standart-font)",
          fontWeight: 700,
          fontSize: "16px",
        }}
      >
        Список "Мої аптеки" порожній{" "}
      </h5> */}

      <h4>Мої аптеки</h4>

      <div className="d-flex row ">
        {/* Якщо масив не пустий  */}
        <MyPharmacie />

        <MyPharmacie />
        <MyPharmacie />
        <MyPharmacie />
        <MyPharmacie />
        <MyPharmacie />

        {/* Якщо масив пустий */}

        {/*
        <AccordionComponent
          header="Навіщо додавати аптеки в список?"
          title="Додавайте аптеки для швидкого доступу до інформації про них."
          id="1"
        />
        <img src={srcImg} style={{ width: "100%", height: "auto" }} /> */}
      </div>
    </div>
  );
};

export default MyPharmacies;
