import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ReactQuill from "react-quill";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

import {
  upsertProduct,
  getProductById,
  getExistAttributeVariantsList,
  getProductByIdForUpdate,
} from "../../../../../../services/product";
import { postPhotoToServer } from "../../../../../../services/photo";
import { getAllTypes, getGroupById } from "../../../../../../services/group";
import { getAllManufacturers } from "../../../../../../services/manufacture";
import { getAllBrands } from "../../../../../../services/brand";

import {
  StateInfos,
  Success,
  LayoutProviderValues,
  GetCategoriesForProductAdd,
} from "../../../../../../utils/Constants";

import ImageUploaderComponent from "../../../../../Common/ImageUploaderComponent/ImageUploaderComponent";
import InputForProductComponent from "../../../../../Common/InputForProductComponent/InputForProductComponent";

import "./UpsertProductComponent.css";
import styles from "./UpsertProductComponent.module.css";
import UpsertDescriptionComponent from "../UpsertDescriptionComponent/UpsertDescriptionComponent";
import FormDataStandartInputsComponent from "../FormDataStandartInputsComponent/FormDataStandartInputsComponent";

import {
  getAllCategories,
  getAllCategoriesCanHasProducts,
  getFirstNCategoryByTitle,
} from "../../../../../../services/category";
import TypeAndCategoryComboboxComponent from "../TypeAndCategoryComboboxComponent/TypeAndCategoryComboboxComponent";
import {
  listData,
  listDataTemplate,
  productTemplate,
} from "./ProductTemplates";
import { checkFormParamsAreNotEmpty, updateObj } from "../../../../../../utils/Functions";
import LayoutContext from "../../../../../../layouts/LayoutContext";

const UpsertProductComponent = () => {


  const { setAdditionalComponent, clearAdditionalComponent } =
    useContext(LayoutContext);
  const [stateInfo, setStateInfo] = useState(StateInfos.LOADING);

  const navigate = useNavigate();

  const { productId } = useParams();


  const [data, setData] = useState({
    descriptionName: "Опис",
    image: null,
    formData: productTemplate,
    isTypeDisabled: false,
  });

  const [dataFromServer, setDataFromServer] = useState(listDataTemplate);

  const [additionalAttribute, setAdditionalAttribute] = useState([]);
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null);
  const [disableButtonState, setDisableButtonState] = useState(false);

  const setCustomState = (setState, name, updates) => {
    setState((prevState) => updateObj(prevState, name, updates));
  };

  async function getDataOrSetError(getService, setData) {
    if (stateInfo !== StateInfos.ERROR) {
      let res = await getService();
      if (res.status === Success) await setData(res.data);
      else setStateInfo(StateInfos.ERROR);
    }
  }

  //#region init

  async function init() {
    setCustomState(setData, "isHeaderDisabled", false);
    await getDataOrSetError(getAllCategoriesCanHasProducts, async (value) => {
      console.log(value)
      setCustomState(setDataFromServer, "categories", value);
    });
    await getDataOrSetError(getAllTypes, async (value) => {
      setCustomState(setDataFromServer, "types", value);
    });
    if (productId) {
      initAfterConfirm();

    } else {
      setStateInfo(StateInfos.CHOOSE_TYPE_AND_CATEGORY)

    }
  }

  async function initAfterConfirm() {
    setCustomState(setData, "isHeaderDisabled", true);
    setCustomState(setData, "formData", {
      ...data.formData,
      categoryID: category,
      productAttributeGroupID: type,
    });
    let tmpObject;
    try {
      if (productId) {
        await getDataOrSetError(
          async () => await getProductByIdForUpdate(productId),
          async (value) => {

            tmpObject = {
              ...value,
              ...(value.product || {}),
            };
            if (tmpObject.properties) {
              setAdditionalAttribute(
                tmpObject.properties.map((a) => {
                  return {
                    id: a.id,
                    name: a.name,
                    value: a.value,
                  };
                })
              );
            }
          }
        );
      }

      await getDataOrSetError(
        async () => {
          return await getGroupById(
            tmpObject && tmpObject.productAttributeGroupID
              ? tmpObject.productAttributeGroupID
              : type
          );
        },
        async (value) => {
          let tmpMainAttributes = await getExistAttributeVariantsList(
            value.existAttributes
          );
          let newData = { ...data.formData };
          if (!productId) {
            newData = { ...newData, description: value.description };
            newData.categoryID = category;
            newData.productAttributeGroupID = type;
          }
          if (tmpMainAttributes) {
            newData = {
              ...newData,
              ...Object.fromEntries(
                tmpMainAttributes.map((a) => [a.name, undefined])
              ),
            };
            setCustomState(
              setDataFromServer,
              "mainAttribute",
              tmpMainAttributes
            );
          }
          if (tmpObject) {
            setCategory(tmpObject.categoryID);
            setType(tmpObject.productAttributeGroupID);
            console.log(newData)
            console.log(tmpObject)
            newData = fillNullValues(newData, tmpObject);
          }

          setCustomState(setData, "formData", newData);
          if (value.descriptionName) {
            setCustomState(setData, "descriptionName", value.descriptionName);
          }

          if (value.attributesInGroup && value.attributesInGroup.length){

            setCustomState(
              setDataFromServer,
              "attributes",
              value.attributesInGroup
            );
          }
          else
          { setCustomState(setDataFromServer, "attributes", [])};
        }
      );

      await getDataOrSetError(getAllManufacturers, async (value) => {
        setCustomState(setDataFromServer, "manufacturers", value);
      });

      await getDataOrSetError(getAllBrands, async (value) => {
        setCustomState(setDataFromServer, "brands", value);
      });
      if (stateInfo != StateInfos.ERROR) setStateInfo(StateInfos.LOADED);
    } catch (error) {
      console.error("Error in init function:", error);
      setStateInfo(StateInfos.ERROR);
    }
  }
  useEffect(() => {
    if (category && type && !data.isHeaderDisabled) {
      initAfterConfirm();
    }
  }, [category, type]);

  useEffect(() => {
    setAdditionalComponent(
      <TypeAndCategoryComboboxComponent
        typeId={type}
        categoryId={category}
        categories={dataFromServer.categories}
        types={dataFromServer.types}
        setCategory={setCategory}
        setType={setType}
        isDisabled={data.isHeaderDisabled}
      />
    );

    return () => {
      setAdditionalComponent(null);
    }
  }, [dataFromServer]);

  useEffect(() => {
    init();
  }, []);

  function fillNullValues(originalObject, fillObject) {
    const result = { ...originalObject };
    for (const key in originalObject) {
      if (originalObject[key] === undefined && fillObject[key]) {
        result[key] = fillObject[key];
      }
    }

    return result;
  }

  //#endregion

  //#region submit
  const submit = async () => {
    if (additionalAttribute) {
      if (!additionalAttribute.every(attribute => checkFormParamsAreNotEmpty(attribute, []))) {
        toast.error("Не всі додаткові поля заповнені");
        return;
      }
    }
    if (!checkFormParamsAreNotEmpty(data.formData, ["id", "pathToPhoto"])) {
      toast.error("Не всі основні поля заповнені");
      return;
    }

    setDisableButtonState(true);
    let a = "";
    if (data.image) {
      if (data.pathToPhoto)
        a = await postPhotoToServer(
          "Photo/Update",
          data.pathToPhoto.replace(/[\/\\]images[\/\\]/g, ""),
          data.image
        );
      else a = await postPhotoToServer("Photo/Add", "product", data.image);
      a = `/images/product/${a.data}`;
    } else if (data.formData.pathToPhoto) {
      a = data.formData.pathToPhoto;
    }
    data.formData["pathToPhoto"] = a;
    let res = await upsertProduct(data.formData, { additionalAttribute });
    setDisableButtonState(false);
    if (res.status === Success) {
      toast.success(`Операція пройшла успішно`);
      navigate("/admin");
    } else {
      toast.error(`Помилка ${res.error.response.status}`);
    }
  };

  //#endregion

  const setFormDataAttribute = (name, value) => {
    setCustomState(setData, "formData", updateObj(data.formData, name, value));
  };

  //#region OnChanges

  const handleAdditionalChange = (id, name, value) => {
    setAdditionalAttribute((prevData) => {
      const newData = [...prevData];
      let index = newData.indexOf(newData.find((a) => a.id === id));
      if (index !== -1) {
        newData[index] = { id: id, name: name, value: value };
      } else {
        newData.push({ id: id, name: name, value: value });
      }
      return newData;
    });
  };
  function handleAddAdditionalAttribute(id) {
    setAdditionalAttribute((prevData) => {
      let newData = [...prevData];
      let index = newData.indexOf(newData.find((a) => a.id === id));

      if (index === -1) {
        index = dataFromServer.attributes.indexOf(
          dataFromServer.attributes.find((a) => a.id === id)
        );

        if (index !== -1) {
          newData.push({
            id: dataFromServer.attributes[index].id,
            name: dataFromServer.attributes[index].name,
            value: "",
          });
        }
      }
      return newData;
    });
  }

  function handleRemoveAdditionalAttribute(id) {
    setAdditionalAttribute((prevData) => {
      let newData = [...prevData];
      let index = newData.indexOf(newData.find((a) => a.id === id));
      if (index !== -1) {
        newData = newData.slice(0, index).concat(newData.slice(index + 1));
      }
      return newData;
    });
  }

  //#endregion

  if (stateInfo == StateInfos.LOADING)
    return (<div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} `}>Loading</div>
    </div>);
  if (stateInfo == StateInfos.CHOOSE_TYPE_AND_CATEGORY)
    return (<div className={`${styles["row-parent"]}`}>
      <div className={`${styles["box-container"]} `}>Оберіть категорію і тип товару</div>
    </div>);

  // <LayoutAdmin additionalHeader={
  //     <TypeAndCategoryComboboxComponent
  //         typeId={data.formData.productAttributeGroupID}
  //         categoryId={data.formData.categoryID}
  //         categories={dataFromServer.categories}
  //         types={dataFromServer.types}
  //         formData={data.formData}
  //         setFormData={(value) => setCustomState(setData, "formData", value)}
  //         isTypeDisabled={data.isTypeDisabled}
  //     />
  // }></LayoutAdmin>
  return (
    <div className="row upsert-product-main-container m-2">
      <div className="row d-flex">
        <div className="col-8">
          <div className="add-product-left-container">
            <div className="inner-add-product-left-container">
              <UpsertDescriptionComponent
                descriptionName={data.descriptionName}
                description={data.formData.description}
                setDescription={(a) => {
                  setFormDataAttribute("description", a);
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-4 round-white-div p-4 upsert-fields-div">
          <div className="upsert-product-right-container">
            <FormDataStandartInputsComponent
              formData={data.formData}
              setFormData={(name, value) => {
                setCustomState(setData, "formData", {
                  ...data.formData,
                  [name]: value,
                });
              }}
              listData={dataFromServer}
            />

            <div className="margin-bottom">
              <p className="product-label">Додаткове поле</p>
              <Select
                className="additional-input margin-bottom"
                value={null}
                name="additonals"
                placeholder="Вага, смак, колір"
                options={dataFromServer.attributes
                  .filter((a) => {
                    return (
                      !additionalAttribute.length ||
                      !additionalAttribute.map ||
                      !additionalAttribute.map((b) => b.id).includes(a.id)
                    );
                  })
                  .map((item) => ({ value: item.id, label: item.name }))}
                onChange={(selectedOption) => {
                  handleAddAdditionalAttribute(selectedOption.value, true);
                }}
                isSearchable={true}
              />
              {additionalAttribute &&
                additionalAttribute.map((a) => {
                  return (
                    <div
                      key={a.id}
                      className="margin-bottom d-flex align-items-end"
                    >
                      <InputForProductComponent
                        value={a.value}
                        className="additional-input me-2"
                        placeholder={a.name}
                        type="text"
                        name={a.id}
                        onChange={(e) => {
                          handleAdditionalChange(a.id, a.name, e.target.value);
                        }}
                      />
                      <button
                        className="btn cross-button"
                        onClick={(e) => {
                          handleRemoveAdditionalAttribute(a.id);
                        }}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                  );
                })}
              <p className="product-label">Оберіть фото</p>
              <ImageUploaderComponent
                imageUrl={data.formData.pathToPhoto}
                selectedImage={data.image}
                setSelectedImage={(value) =>
                  setCustomState(setData, "image", value)
                }
              />
              <button
                disabled={disableButtonState}
                className="mt-2 btn btn-custom additional-input"
                onClick={() => submit()}
              >
                ЗБЕРЕГТИ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpsertProductComponent;
