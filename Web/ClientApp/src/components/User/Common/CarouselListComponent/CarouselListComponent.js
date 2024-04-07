import React, { useEffect, useLayoutEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "./CarouselListComponent.css";

import Carousel from "nuka-carousel";

import { isWidthDown } from "../../../../utils/Functions";

const CarouselListComponent = ({
  children,
  mdDisplayCount = 1,
  lgDisplayCount = 2,
  xlDisplayCount = 3,
  xxlDisplayCount = 4,
  title,
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

  return (
    <>
      <h3 className="text-title mb-3">{title}</h3>
      <Carousel cellAlign="left" slidesToShow={count}>
        {children}
      </Carousel>
    </>
  );
};

export default CarouselListComponent;
