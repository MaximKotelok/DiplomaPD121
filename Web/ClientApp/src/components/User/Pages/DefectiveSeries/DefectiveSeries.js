import React, { useState } from "react";
import styles from "./DefectiveSeries.module.css";
import GoodIcon from "./good.svg";
import { ReactComponent as ZnakOkloko } from "../../../../assets/images/znakOkloko.svg";
import SearchComponent from "../../../Common/SearchComponent/SearchComponent";
import CustomImgComponent from "../../../Common/CustomImgComponent/CustomImgComponent";
import StatusComponent from "../../../Common/StatusComponent/StatusComponent";

export const DefectiveSeries = () => {
  const [selectedOption, setSelectedOption] = useState("option5");

  const options = [
    { id: "option5", label: "За назвою" },
    { id: "option6", label: "За реєстраційним номером" },
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.id);
  };
  const isOption5Selected = selectedOption === "option5";
  return (
    <div className={`d-flex justify-content-center p-5`}>
      <div className={`${styles["div-perent-defect"]}`}>
        <h5 className={`${styles["h5-title-defect"]} mb-5`}>
          Пошук бракованих серій
        </h5>

        <div className={`${styles["bloc-radio"]} w-100 mt-3 mb-3`}>
          {options.map((option) => (
            <React.Fragment key={option.id}>
              <input
                type="radio"
                className={`btn-check ${styles["btn-check"]}`}
                name="options-base"
                id={option.id}
                autoComplete="off"
                checked={selectedOption === option.id}
                onChange={handleOptionChange}
              />
              <label
                className={`${styles["labale-radio"]} w-50`}
                htmlFor={option.id}
              >
                {option.label}
              </label>
            </React.Fragment>
          ))}
        </div>

        <hr className={`${styles["hr-style"]}`} />
        {isOption5Selected ? (
          <SearchComponent className={`${styles["pading-serach"]}`} />
        ) : (
          <div class={`input-group mb-3 ${styles["perent-component"]}`}>
            <span
              style={{ width: "58px" }}
              className={`${styles["span-palka"]} d-flex align-items-center justify-content-center `}
            >
              UA /
            </span>
            <input
              className={`input-text-form ${styles["input-text-seria"]} `}
              type="text"
              placeholder="..."
              aria-label="..."
              style={{ width: "42%" }}
            />
            <span
              style={{ width: "30px" }}
              className={`${styles["span-palka"]} d-flex align-items-center justify-content-center`}
            >
              /
            </span>
            <input
              className={`input-text-form ${styles["input-text-seria"]} `}
              type="text"
              placeholder="..."
              aria-label="..."
              style={{ width: "13%" }}
            />
            <span
              style={{ width: "30px" }}
              className={`${styles["span-palka"]}  d-flex align-items-center justify-content-center`}
            >
              /
            </span>
            <input
              className={`input-text-form ${styles["input-text-seria"]} `}
              type="text"
              placeholder="..."
              aria-label="..."
              style={{ width: "13%" }}
            />
            <button
              className={`ms-auto ${styles["btn-group-style"]}`}
              type="button"
              id="button-addon2"
            >
              Змінити
            </button>
          </div>
        )}
        <div className={`${styles["block-explanation"]} mt-3`}>
          <h5 className={`${styles["h5-title-defect2"]}  mb-3`}>
            Що таке браковані серії?
          </h5>
          <div className={`d-flex justify-content-between `}>
            <div className="d-flex">
              <CustomImgComponent
                src={
                  "https://root.tblcdn.com/img/goods/fdc0a9e0-beb7-11eb-bac9-0050569aacb6/1/img_0.jpg?v=AAAAAAjaDwc"
                }
                className={`${styles["img-row"]} me-3`}
              />
              <div>
                <h5 className={`${styles["title-row"]}`}>
                  Протеїн Biotech Iso Whey Zero white chocolate, 500 г
                </h5>
                <h6 className={`${styles["text-row"]}`}>
                  Biotech Iso Whey Zero
                </h6>
              </div>
            </div>

            <div>
              <StatusComponent
                color="green"
                text="Все добре"
                pathToPhoto={GoodIcon}
              />
            </div>
          </div>
        </div>

        <div className={`${styles["block-explanation"]} mt-3`}>
          <h5 className={`${styles["h5-title-defect2"]}  me-2`}>
            Що таке браковані серії?
            <span className="ps-2">
              <ZnakOkloko />
            </span>
          </h5>
          <p className={`${styles["text-explanation"]} mt-3`}>
            При виявленні неякісного чи фальсифікованого лікарського засобу,
            органи державної влади видають відповідний припис щодо заборони
            реалізації в цілому або деяких його серій. В приписі зазначено
            причину заборони та відповідні дії суб’єктів господарювання.
          </p>
        </div>

        <div className={`${styles["block-explanation"]} mt-3`}>
          <h5 className={`${styles["h5-title-defect2"]}  me-2`}>
            Як перевірити чи є браковані серії?
            <span className="ps-2">
              <ZnakOkloko />
            </span>
          </h5>
          <p className={`${styles["text-explanation"]} mt-3`}>
            Можна шукати за назвою лікарського засобу або за реєстраційним
            номером
          </p>
        </div>
      </div>
    </div>
  );
};
