import React, { useState, useEffect } from "react";
import { GetByIdForMenu } from "../../../../../services/category";
import {
  Link
} from 'react-router-dom';
import styles from "./Content.module.css"
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../../../../reducers/reducers";
import { Success } from "../../../../../utils/Constants";
import showMore from "../../../../../assets/images/layout-User/show-more.svg"
const Content = ({ selectedMenu, closeMenu }) => {
  const COUNT_OF_SUBCATEGORIES = 3;

  const [generatedData, setGeneratedData] = useState([]);


  const dispatch = useDispatch();
  const { catalogue } = useSelector((state) => state.catalogue);

  useEffect(() => {
    // Генерація нових даних залежно від вибраного меню
    generateData(selectedMenu);
  }, [selectedMenu]);

  const generateData = async (menuId) => {
    // Логіка генерації даних на основі вибраного меню
    let dataIndex = catalogue.findIndex(a => a.id === menuId);
    if (dataIndex === -1) {
      let data = (await GetByIdForMenu(menuId));
      if (data.status === Success) {
        dispatch(addCategory(data.data));
        setGeneratedData(data.data);
      }
    } else {
      setGeneratedData(catalogue[dataIndex]);
    }
  };
  if (generatedData && generatedData.subCategories)

    return (
      <div className="row">
        {
          generatedData && generatedData.subCategories &&
          generatedData.subCategories.map(a => {

            return <div className={`col-4 ${styles["block"]}`}>
              <Link className={`${styles["head-category-text"]}`} onClick={closeMenu} to={`category/${a.id}`}>{a.title}</Link>
              <div className={`d-flex flex-column justify-content-between ${styles["block"]}`}>
                <div>

                  {
                    a.subCategories && a.subCategories.slice(0, COUNT_OF_SUBCATEGORIES).map(b => {
                      return <div className="my-2">
                        <Link className={`${styles["body-category-text"]}`} onClick={closeMenu} to={`category/${b.id}`}>{b.title}</Link>
                      </div>
                    }
                    )
                  }
                </div>
                {a.subCategories.length > COUNT_OF_SUBCATEGORIES && (
                  <div className={`${styles["show-more"]} mb-2`}>
                    <Link className={`${styles["body-category-text"]}`} onClick={closeMenu} to={`category/${a.id}`}>
                      Показати більше
                      <img className="ms-1" src={showMore} />
                    </Link>
                  </div>
                )}
              </div>
            </div>

          })}

      </div>
    );
};

export default Content;
