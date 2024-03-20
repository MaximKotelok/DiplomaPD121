import React, { useEffect, useState } from "react";
import styles from "./CategoryPathDetailsComponent.module.css";
import { Element } from "react-scroll";
import { toTwoDigitsNumber } from "../../../../../../utils/Functions";
// import setupAccordion from "./AccordionSideMenuJQ";
// import $ from "jquery";

const CategoryPathDetailsComponent = ({ data }) => {
  return (
    <div style={{ marginBottom: "30px" }}>
      <p className={styles["path"]}>
        {data.map((a, index) => (
          <span>
            {index != 0 && <span className={styles["separator"]} />}
            <a style={{ color: "#0E3E75" }} href={`/category/${a.id}`}>
              {a.title}
            </a>
          </span>
        ))}
      </p>
    </div>
  );
};

export default CategoryPathDetailsComponent;
