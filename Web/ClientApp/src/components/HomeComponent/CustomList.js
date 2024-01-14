import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomList.css"; // Файл для власних стилів
import placeholder from "../../styles/images/placeholder.png"
const CustomList = ({ data }) => {
  return (
    /// логіка яка data це масив якому є список категорій а категорія на томість має картинку svg і текст це все виводиться масивом

    <ul className="category-list">
      <li className="my-list-group-item">
        <div className="d-flex align-items-center">
          <img className="category-icon" height={24} width={24} src={placeholder}/>          
          <span className="label">Ліки та профілактичні засоби</span>
        </div>
      </li>

      <li className="my-list-group-item">
        <div className="d-flex align-items-center">
          {/* <svg className="icon">SVG код для іншого елементу</svg> */}
          <img className="category-icon" height={24} width={24} src={placeholder}/>          
          <span className="label">Вітаміни та мінерали</span>
        </div>
      </li>

      <li className="my-list-group-item">
        <div className="d-flex align-items-center">
          <img className="category-icon" height={24} width={24} src={placeholder}/>          
          <span className="label">Краса та догляд</span>
        </div>
      </li>

      <li className="my-list-group-item">
        <div className="d-flex align-items-center">
          <img className="category-icon" height={24} width={24} src={placeholder}/>          
          <span className="label">Спорт та здоров'я</span>
        </div>
      </li>

      <li className="my-list-group-item">
        <div className="d-flex align-items-center">
          <img className="category-icon" height={24} width={24} src={placeholder}/>          
          <span className="label">Товари для дітей та мам</span>
        </div>
      </li>
      <li className="my-list-group-item">
        <div className="d-flex align-items-center">
          <img className="category-icon" height={24} width={24} src={placeholder}/>          
          <span className="label">Вироби медичного призначення</span>
        </div>
      </li>
      <li className="my-list-group-item">
        <div className="d-flex align-items-center">
          <img className="category-icon" height={24} width={24} src={placeholder}/>          
          <span className="label">Ортопедія та реабілітація</span>
        </div>
      </li>
      <li className="my-list-group-item">
        <div className="d-flex align-items-center">
          <img className="category-icon" height={24} width={24} src={placeholder}/>          
          <span className="label">Медична техніка</span>
        </div>
      </li>
      <li className="my-list-group-item">
        <div className="d-flex align-items-center">
          <img className="category-icon" height={24} width={24} src={placeholder}/>          
          <span className="label">Товари для тварин</span>
        </div>
      </li>
    </ul>
  );
};

export default CustomList;
