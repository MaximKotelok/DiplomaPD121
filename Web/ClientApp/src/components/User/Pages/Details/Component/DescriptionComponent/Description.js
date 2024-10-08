import React, { Component } from "react";
import {
  splitByClass,
  getTagContentFromString,
  wrapTagIntoDiv,
  toTwoDigitsNumber,
} from "../../../../../../utils/Functions";
import { Link, Element } from "react-scroll";
import DescriptionItemComponent from "../DescriptionItemComponent/DescriptionItemComponent";

import styles from "./Description.module.css";
import useWindowSize from "../../../Profile/UseWindowSize";
export const Description = ({ children, separeteBy }) => {
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  // export const Description({ children, separeteBy }) {
    if (!separeteBy) return <div dangerouslySetInnerHTML={{ __html: children }} />;

  const html = wrapTagIntoDiv(children, separeteBy, "description-item");

  const subContent = splitByClass(html, "description-item");
  const contentsOfB = getTagContentFromString(html, separeteBy);

  const ids = [];

  for (let i = 0; i < contentsOfB.length; i++) {
    const id = `b_${i}_${contentsOfB[i].replace(/\s+/g, "_")}`;
    ids.push({ id: id, name: contentsOfB[i] });
  }

  return (
    <div>
      {!isMobile && (
        <div className={`${styles["description-navigation"]} col-12`}>
          {ids.map((id, index) => (
            <Link
              to={id.id}
              spy={true}
              duration={500}
              className={`${styles["description-navigation-item"]} mt-2`}
            >
              <span>{`.${toTwoDigitsNumber(index + 1)} `}</span>
              {id.name}
            </Link>
          ))}
        </div>
      )}

      {subContent.map((content, index) => (
        <DescriptionItemComponent
          id={ids[index].id}
          number={index + 1}
          title={ids[index].name}
          isActive={false}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </DescriptionItemComponent>
      ))}
    </div>
  );
};

/*
<Element key={ids[index].id}  name={ids[index].id}>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </Element>
                */
