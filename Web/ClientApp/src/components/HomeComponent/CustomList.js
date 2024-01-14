import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomList.css"; // Файл для власних стилів

const CustomList = ({ data }) => {
  return (
    /// логіка яка data це масив якому є список категорій а категорія на томість має картинку svg і текст це все виводиться масивом

    <ul className="category-list">
      <li className="my-list-group-item">
        <div className="d-flex align-items-center">
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v4h-2zm0 6h2v2h-2z" />
          </svg>
          <span className="label">Item 1</span>
        </div>
      </li>

      <li className="my-list-group-item">
        <div className="d-flex align-items-center">
          <svg className="icon">SVG код для іншого елементу</svg>
          <span className="label">Item 2</span>
        </div>
      </li>
    </ul>
  );
};

export default CustomList;
