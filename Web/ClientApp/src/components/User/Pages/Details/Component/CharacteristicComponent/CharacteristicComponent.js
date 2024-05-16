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

export function CharacteristicComponent({ data }) {
  console.log(data);
  return (
    <div
      className={`${styles["characteristic"]} d-flex   align-items-center  justify-content-center w-100`}
    >
      <div className="container p-3 d-flex align-content-start flex-wrap">
        <AcordeonTransformer id={1} />
        <AcordeonTransformer id={2} />
        <AcordeonTransformer id={3} />
        <AcordeonTransformer id={4} />
        <AcordeonTransformer  last="true" id={5} />
        {/* <div className='row h-100'>
                    {
                        data.slice(0, 7).map((a, index) => {
                            return (<div key={index} className='col-3'>
                            <div className='d-flex align-items-center justify-content-center'>
                          
                              <div className={`d-flex align-items-center justify-content-center m-3 ${styles["characteristic-card"]} mx-auto`}>
                          
                                <div className={styles["image-box"]}>
                                  <CustomImgComponent src={a.pathToPhoto} defaultSrc={category} styles={{
                                    width: "18.67px",
                                    height: "24px"
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
                        })


                    }
                    {
                        (data.length > 7 &&
                            <div className='col-3 d-flex align-items-center justify-content-center align-content-center'>
                                <div className='d-flex h-100 align-items-center justify-content-center'>
                                    <MoreLink />
                                </div>
                            </div>
                        )
                    }
                </div> */}
      </div>
    </div>
  );
}
