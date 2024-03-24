import React, { useState } from "react";

import CustomSelectComponent from "../../../../../Common/CustomSelectComponent/CustomSelectComponent";

const TypeAndCategoryComboboxComponent = ({
  categories,
  types,
  typeId,
  categoryId,
  setCategory,
  setType,
  isDisabled,
}) => {
  if (!(categories && types)) return <></>;

  return (
    <div className="w-50 row">
      <div className="col-6">
        <CustomSelectComponent
          className="w-100 mx-1"
          selectedId={categoryId}
          name="category"
          options={categories.map((item) => ({
            value: item.id,
            label: item.title,
          }))}
          onChange={(a) => {
            setCategory(a.value);
          }}
          placeholder="Категорія товару"
          isSearchable={true}
          isDisabled={isDisabled}
        />
      </div>
      <div className="col-6">
        <CustomSelectComponent
          className="w-100 mx-1"
          selectedId={typeId}
          name="productAttributeGroupID"
          options={types.map((item) => ({ value: item.id, label: item.name }))}
          isDisabled={isDisabled}
          onChange={(a) => setType(a.value)}
          placeholder="Тип товару"
          isSearchable={true}
        />
      </div>
    </div>
  );
};

export default TypeAndCategoryComboboxComponent;
