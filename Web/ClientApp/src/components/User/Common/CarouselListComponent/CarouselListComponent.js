import React, { useEffect, useLayoutEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "./CarouselListComponent.css";

import Carousel from "nuka-carousel";

import { isWidthDown } from "../../../../utils/Functions";
import { useRef } from "react";

const CarouselListComponent = ({
  children,
  className,
  style,
  mdDisplayCount = 2,
  lgDisplayCount = 3,
  xlDisplayCount = 3,
  xxlDisplayCount = 4,
  title,
  disableNavElements = false
}) => {
  const [count, setCount] = useState(1);
  useLayoutEffect(() => {
    function updateSize() {
      let width = window.innerWidth;

      if (isWidthDown("md", width)) {
        setCount(mdDisplayCount);
      } else if (isWidthDown("lg", width)) {
        setCount(lgDisplayCount);
      } else if (isWidthDown("xl", width)) {
        setCount(xlDisplayCount);
      } else {
        setCount(xxlDisplayCount);
      }
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  if(!disableNavElements)
  return (
    <div className={className}
    style={style}>
      <h3 className="text-title mb-3">{title}</h3>
      <Carousel  cellAlign="left" slidesToShow={count}>
        {children}
      </Carousel>
      </div>
  );
else
  return (
    <div className={className}
    style={style}>
      <h3 className="text-title mb-3">{title}</h3>
      <Carousel 
      renderCenterLeftControls={({ previousSlide }) => (
        null
      )}
      renderCenterRightControls={({ nextSlide }) => (
        null
      )}
      renderBottomCenterControls={false}
      cellAlign="left" slidesToShow={count}>
        {children}
      </Carousel>
    </div>
  );
};

export default CarouselListComponent;
