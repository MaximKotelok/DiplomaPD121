import React from "react";
import styles from "./UpsertActiveSubstanceComponents.module.css";
import { InpurtStandart } from "../../../Common/InpurtStandart/InpurtStandart";
import { TextAreaStandart } from "../../../Common/TextAreaStandart/TextAreaStandart";
import { CheckedBox } from "../../../Common/CheckedBoxComponent/CheckedBox";
import { useParams } from "react-router-dom";
export const UpsertActiveSubstanceComponents = () => {
  const { id } = useParams();

  // const titleText = id
  //   ? "Редагування діючу речовину"
  //   : "Додавання діючої речовину";

  return (
    <div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]}  d-flex flex-column`}>
        {/* Коли будиш підключати цю сторінку викорситай підхід який ми брали на asp 1 форма для едіт і адд і відштовхуючи від шляху зміни текст в h4 */}
        <div>
          <h4 className={`${styles["head-h4"]} mb-4`}>Редагування діючу речовину</h4>

          <InpurtStandart label={"Назва"} placholder={"Ведіть назву ..."} />

          <CheckedBox text="Неактивний" />
        </div>

        <div>
          <h6 className={`${styles["text-block-product"]}`} cl>
            Товари з цією діючою речовиною
          </h6>
          {/* виводимо лише 3 товара  */}
          <div className={`d-flex mb-2`}>
            <img
              src="https://root.tblcdn.com/img/goods/4d140e4a-d7ce-4610-90cf-553b564d028b/1/img_0.jpg?v=AAAAAAueZxo"
              className={`${styles["img-product"]}`}
            />
            <div className="ms-3">
              <h5 className={`${styles["top-text-row"]}`}>
                Протеїн Optimum Nutrition Whey Gold Standard
              </h5>
              <p className={`${styles["bottom-text-row"]}`}>
                Optimum Nutrition
              </p>
            </div>
          </div>

          <div className={`d-flex mb-2`}>
            <img
              src="https://root.tblcdn.com/img/goods/4d140e4a-d7ce-4610-90cf-553b564d028b/1/img_0.jpg?v=AAAAAAueZxo"
              className={`${styles["img-product"]}`}
            />
            <div className="ms-3">
              <h5 className={`${styles["top-text-row"]}`}>
                Протеїн Optimum Nutrition Whey Gold Standard
              </h5>
              <p className={`${styles["bottom-text-row"]}`}>
                Optimum Nutrition
              </p>
            </div>
          </div>

          <div className={`d-flex mb-3`}>
            <img
              src="https://root.tblcdn.com/img/goods/4d140e4a-d7ce-4610-90cf-553b564d028b/1/img_0.jpg?v=AAAAAAueZxo"
              className={`${styles["img-product"]}`}
            />
            <div className="ms-3">
              <h5 className={`${styles["top-text-row"]}`}>
                Протеїн Optimum Nutrition Whey Gold Standard
              </h5>
              <p className={`${styles["bottom-text-row"]}`}>
                Optimum Nutrition
              </p>
            </div>
          </div>
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
