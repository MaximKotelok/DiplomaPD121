import React, { Component } from "react";
import {
  splitByClass,
  getTagContentFromString,
  wrapTagIntoDiv,
  toTwoDigitsNumber,
} from "../../../../../../utils/Functions";
import styles from "./CharacteristicComponent.module.css";
import CustomImgComponent from "../../../../../Common/CustomImgComponent/CustomImgComponent";
import category from "../../../../../../assets/images/category.svg";
import MoreLink from "../../../../../Common/MoreLinkComponent/MoreLink";
import { AcordeonTransformer } from "./components/AcordeonTransformer";
import { ApiPath } from "../../../../../../utils/Constants";
import defaultImg from "../../../../../../assets/images/details/category.png"
import { useParams } from "react-router";
import useWindowSize from "../../../Profile/UseWindowSize";
import incstruction from "../../../../../../assets/images/details/incstruction.png";
import questions from "../../../../../../assets/images/details/questions.png";
import stats from "../../../../../../assets/images/details/stats.png";
export function CharacteristicComponent({ data, isHistoryExist }) {

  const { id } = useParams();
  const { width } = useWindowSize();

  const isMobile = width <= 768;
  return (
    <div
      className={`${styles["characteristic"]} d-flex   align-items-center  justify-content-center w-100`}
    >
      <div className="container p-3 d-flex align-content-start flex-wrap">
        {isMobile ?
          <>

            <AcordeonTransformer img={incstruction} text="Інструкція" link={`/product-details/${id}#instruction`} id={1} />
            {isHistoryExist && <AcordeonTransformer img={stats} text="Статистика" id={2} link={`/product-details/${id}#stats`} />}
            <AcordeonTransformer img={questions} text="Часті питання" id={3} link={`/product-details/${id}#questions`} last="true" />
          </> :
          <div className='row h-100'>
            {
              data.slice(0, 7).map((a, index) => {
                return (<div key={index} className='col-3'>
                  <div className='d-flex align-items-center justify-content-center'>

                    <div className={`d-flex align-items-start justify-content-center m-3 ${styles["characteristic-card"]} mx-auto`}>

                      <div className={`${styles["image-box"]}`}>
                        <CustomImgComponent src={a.pathToPhoto && a.pathToPhoto.length > 0 && (a.pathToPhoto[0] == "\\"
                          || a.pathToPhoto[0] == "/") ? ApiPath + a.pathToPhoto : a.pathToPhoto} defaultSrc={defaultImg}
                          style={{
                            width: "32px",
                            height: "32px",
                          }} />
                      </div>
                      <div className={styles["w-90"]}>
                        <p className={styles["name"]}>{a.name}</p>
                        <p className={styles["content"]}>{a.url ? (<a href={a.url}>{a.value}</a>) : a.value}</p>
                      </div>
                    </div>
                  </div>
                </div>

                )
              }
              )




            }
            {
              (7 - data.length > 0 &&
                (Array.apply(null, Array(7 - data.length))).map((a, index) => {
                  return (<div key={index} className='col-3'>
                    <div className='d-flex align-items-center justify-content-center'>

                      <div className={`d-flex align-items-start justify-content-center m-3 ${styles["characteristic-card"]} mx-auto`}>

                        <div className={`${styles["image-box"]}`}>

                        </div>
                        <div className={styles["w-90"]}>

                        </div>
                      </div>
                    </div>
                  </div>)
                })

              )
            }

            {
              (data.length >= 7 &&
                <div className='col-3 d-flex align-items-center justify-content-center align-content-center'>
                  <div className='d-flex h-100 align-items-center justify-content-center'>
                    <MoreLink link={`/product-details/${id}#characteristic`} />
                  </div>
                </div>
              )
            }
          </div>}
      </div>
    </div>
  );
}
