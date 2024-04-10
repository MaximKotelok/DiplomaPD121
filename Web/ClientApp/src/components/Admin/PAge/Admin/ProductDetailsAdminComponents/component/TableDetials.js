import React from "react";
import styles from "./TableDetials.module.css";

export const TableDetials = () => {
  return (
    <div>
      <table className="w-100">
        <tbody className={`${styles["table-details"]}`} >
          <tr   >
            <td
              className={`${styles["text-table"]} ${styles["text-table-left"]}`}
              style={{ padding: "10px 0" }}
            >
              leftText
            </td>
            <td
              className={`${styles["text-table"]} ${styles["text-table-right"]}`}
            >
              rightText
            </td>
          </tr>
          <tr    >
            <td
              className={`${styles["text-table"]} ${styles["text-table-left"]}`}
              style={{ padding: "10px 0" }}
            >
              leftText
            </td>
            <td
              className={`${styles["text-table"]} ${styles["text-table-right"]}`}
            >
              rightText
            </td>
          </tr>
          <tr   >
            <td
              className={`${styles["text-table"]} ${styles["text-table-left"]}`}
              style={{ padding: "10px 0" }}
            >
              leftText
            </td>
            <td
              className={`${styles["text-table"]} ${styles["text-table-right"]}`}
            >
              rightText
            </td>
          </tr>
          <tr   >
            <td
              className={`${styles["text-table"]} ${styles["text-table-left"]}`}
              style={{ padding: "10px 0" }}
            >
              leftText
            </td>
            <td
              className={`${styles["text-table"]} ${styles["text-table-right"]}`}
            >
              rightText
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
