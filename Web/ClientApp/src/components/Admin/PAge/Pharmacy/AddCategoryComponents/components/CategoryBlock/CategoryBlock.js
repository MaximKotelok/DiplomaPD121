import React from "react";
import styles from "./CategoryBlock.module.css";

export const CategoryBlock = ({ text, id }) => {
  return <div className={`${styles["block-category"]} mt-2 me-2`}>{text}</div>;
};
