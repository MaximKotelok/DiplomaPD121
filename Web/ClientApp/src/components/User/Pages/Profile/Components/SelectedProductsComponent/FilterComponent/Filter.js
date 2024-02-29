import React from "react";
import styles from "../SelectedProducts.module.css";
import { ReactComponent as FilterIcon } from "../../../../../../../assets/images/VectorFilter.svg";

const Filter = () => {
  return (
    <div>
      <span className="d-flex align-items-center">
        <FilterIcon />
        <p className={`${styles["text-data-filter"]} ms-2`}>Фільтр</p>
      </span>
    </div>
  );
};

export default Filter;
