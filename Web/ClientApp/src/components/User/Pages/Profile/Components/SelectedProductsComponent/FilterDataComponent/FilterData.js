import React from "react";
import styles from "../SelectedProducts.module.css";
import { ReactComponent as Filter } from "../../../../../../../assets/images/VectorFilterData.svg";
const FilterData = () => {
  return (
    <div>
      <span className="d-flex  align-items-center">
        <Filter />{" "}
        <p className={`${styles["text-data-filter"]} m-0 ms-2`}>По даті</p>
      </span>
    </div>
  );
};

export default FilterData;
