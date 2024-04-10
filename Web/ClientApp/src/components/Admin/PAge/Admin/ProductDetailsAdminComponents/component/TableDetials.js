import React from "react";
import styles from "./TableDetials.module.css";

export const TableDetials = ({ data }) => {
  return (
    <div>
      <table className="w-100">
        <tbody className={`${styles["table-details"]}`} >
          {
            data && data.map && data.map((item,index) => {
              return (
                <tr key={index}>
                  <td
                    className={`${styles["text-table"]} ${styles["text-table-left"]}`}
                    style={{ padding: "10px 0" }}
                  >
                    {item.name}
                  </td>
                  <td
                    className={`${styles["text-table"]} ${styles["text-table-right"]}`}
                  >
                    {item.value}
                  </td>
                </tr>
              )
            })
          }

        </tbody>
      </table>
    </div>
  );
};
