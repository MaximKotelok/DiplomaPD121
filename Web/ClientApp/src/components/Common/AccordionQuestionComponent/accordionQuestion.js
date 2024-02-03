import React, { useEffect, useState } from "react";
import "./accordionQuestion.css";
import setupAccordion from "./jqueryAccordion.js";
import $ from "jquery"

const accordionQuestion = ({ id, title, content }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setupAccordion();

    return () => {
      // eslint-disable-next-line no-undef
      $(".toggleButton").off("click");
    };
  }, []);

  return (    

    <div className="my-accordion-item">
      <div className="d-flex align-items-center">
        <img
          width="32px"
          height="32px"
          // src="C:\Users\Dimka\Pictures\20221025_215935.jpg"

          className="m-3"
        />

        <div className="accordion-header" style={{ width: "100%" }}>
          <button
            data-bs-target={id}
            className={`toggleButton text-header-victorina btn-togle-victorina ${
              isOpen ? "" : "collapsed"
            }`}
            type="button"
            onClick={toggleAccordion}
            aria-expanded={isOpen}
            aria-controls={`collapse-${title.replace(/\s+/g, "")}`}
          >
            {title}
          </button>
          <div
            id={`collapse-${title.replace(/\s+/g, "")}`}
            className={`accordion-collapse collapse text-body-victorina ${
              isOpen ? "show" : ""
            }`}
          >
            <p className="text-body-victorina">{content}</p>
          </div>
        </div>
        <button
          data-bs-target={id}
          className="toggleButton collapsed btn-togle-victorina"
          type="button"
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls={`collapse-${title.replace(/\s+/g, "")}`}
        >
          <svg
            data-bs-target={id}
            className="svg-victorina"
            width="18"
            height="18"
            style={{ margin: "10px" }}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="12"
              y1="5"
              x2="12"
              y2="19"
              stroke="black"
              strokeWidth="2"
            />
            <line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default accordionQuestion;





