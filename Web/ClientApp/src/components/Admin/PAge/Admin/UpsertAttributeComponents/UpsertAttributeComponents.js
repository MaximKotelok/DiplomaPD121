import React from "react";
import styles from "./UpsertAttributeComponents.module.css";
import { InpurtStandart } from "../../../Common/InpurtStandart/InpurtStandart";
import { TextAreaStandart } from "../../../Common/TextAreaStandart/TextAreaStandart";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
import { useParams } from "react-router-dom";
export const UpsertAttributeComponents = () => {
  const { id } = useParams();

  const titleText = id ? "Редагування атрибуту" : "Додавання атрибуту";

  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]}  d-flex flex-column`}>
        {/* Коли будиш підключати цю сторінку викорситай підхід який ми брали на asp 1 форма для едіт і адд і відштовхуючи від шляху зміни текст в h4 */}
        <div>
          <h4 className={`${styles["head-h4"]} mb-4`}>{titleText}</h4>

          <InpurtStandart label={"Назва"} placholder={"Ведіть назву ..."} />
          <TextAreaStandart
            label={"Опис"}
            placholder={"Ведіть сюди опис ..."}
          />

          <CheckedBox text="Неактивний" />
        </div>

        <div className={`d-flex mt-auto`}>
          <button
            className={`brn-form brn-primary-form mt-auto me-4 ${styles["btn-save"]}`}
          >
            Зберегти
          </button>

          <button
            className={`brn-form brn-primary-form mt-auto ${styles["btn-abolition"]}`}
            type="submit"
          >
            Відмінити
          </button>
        </div>
      </div>
    </div>
  );
};
