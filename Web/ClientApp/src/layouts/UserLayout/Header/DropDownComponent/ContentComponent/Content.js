import React, { useState, useEffect } from "react";
import { GetByIdForMenu } from "../../../../../services/category";
import {  
  Link
} from 'react-router-dom';
import styles from "./Content.module.css"
const Content = ({ selectedMenu }) => {
  const COUNT_OF_SUBCATEGORIES = 4;

  const [generatedData, setGeneratedData] = useState([]);

  useEffect(() => {
    // Генерація нових даних залежно від вибраного меню
    generateData(selectedMenu);
  }, [selectedMenu]);

  const generateData = async (menuId) => {
    // Логіка генерації даних на основі вибраного меню
    
    setGeneratedData((await GetByIdForMenu(menuId)).data);
  };
if(generatedData && generatedData.subCategories)

  return (
    <div className="row">
      {
      generatedData && generatedData.subCategories &&
      generatedData.subCategories.map(a=>{
        
        return <div className="col-4">
                   <Link className={`${styles["head-category-text"]}`} to={`category/${a.id}`}>{a.title}</Link>
                   <div>
                    {
                      a.subCategories && a.subCategories.slice(0,COUNT_OF_SUBCATEGORIES).map(b=>
                        {
                          return <div className="my-2">
                            <Link className={`${styles["body-category-text"]}`} to={`category/${b.id}`}>{b.title}</Link>
                          </div>
                        }
                        )
                    }
                    {a.subCategories.length>COUNT_OF_SUBCATEGORIES&&(
                      <div className="my-2">
                            <Link className={`${styles["body-category-text"]}`} to={`category/${a.id}`}>Показати більше</Link>
                          </div>
                    )}
                   </div>
               </div>

      })}
      
    </div>
  );
};

export default Content;
