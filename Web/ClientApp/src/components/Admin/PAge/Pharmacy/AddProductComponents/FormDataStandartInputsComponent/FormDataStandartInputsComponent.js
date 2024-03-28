import React, { useState } from "react";
import styles from "./FormDataStandartInputsComponent.module.css";
import ReactQuill from "react-quill";
import InputForProductComponent from "../../../../../Common/InputForProductComponent/InputForProductComponent";
import CustomSelectComponent from "../../../../../Common/CustomSelectComponent/CustomSelectComponent";

const FormDataStandartInputsComponent = ({
  formData,
  setFormData,
  listData,
}) => {
  return (
    <div>
      <InputForProductComponent
        className="margin-bottom"
        label="Назва товару"
        placeholder="Введіть назву товару"
        type="text"
        name="title"
        value={formData.title}
        onChange={(a) => {
          setFormData(a.target.name, a.target.value);
        }}
      />
      <InputForProductComponent
        className="margin-bottom"
        label="Короткий опис"
        placeholder="Введіть короткий опис"
        type="text"
        name="shortDescription"
        value={formData.shortDescription}
        onChange={(a) => {
          setFormData(a.target.name, a.target.value);
        }}
      />
      <div className="margin-bottom select-div">
        <CustomSelectComponent
          selectedId={formData.manufacturerID}
          className="me-1"
          name="manufacturerID"
          placeholder="Виробник"
          options={listData.manufacturers.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          onChange={(a) => {
            setFormData("manufacturerID", a.value);
          }}
        />
        <CustomSelectComponent
          selectedId={formData.brandID}
          className="ms-1"
          name="brandID"
          placeholder="Бренд"
          options={listData.brands.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          onChange={(a) => {
            setFormData("brandID", a.value);
          }}
        />
      </div>
      <div>
        {listData.mainAttribute &&
          listData.mainAttribute.map &&
          listData.mainAttribute.map((a, index) => {
            if (a.list.length > 0)
              return (
                <div key={index} className="margin-bottom">
                  <CustomSelectComponent
                    selectedId={formData[a.name]}
                    name={a.name}
                    options={a.list.map((item) => ({
                      value: item.id,
                      label: item.title,
                    }))}
                    onChange={(b) => {
                      setFormData(a.name, b.value);
                    }}
                    placeholder={a.description}
                    isSearchable={true}
                  />
                </div>
              );
          })}
      </div>
    </div>
  );
};

export default FormDataStandartInputsComponent;
