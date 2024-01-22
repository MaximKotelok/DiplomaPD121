import React, { useState } from 'react';
import SearchComponent from '../SearchComponent/SearchComponent';
import { getFromServer } from '../../../utils/Queries';
import { ApiPath, GetCategoriesForProductAdd } from '../../../utils/Constants';
import SquareCardComponent from '../SquareCardComponent/SquareCardComponent';
const ChooseACategoryComponent = () => {
    
    async function GetCategoryByName(title) {
        const resp = await getFromServer(GetCategoriesForProductAdd, {title: title, count: 7});
        
        return resp.data;        
    }

    function parser(item){
        
            return <SquareCardComponent 
            title={item.title} 
            image={item.pathToPhoto?`${ApiPath}${item.pathToPhoto}`:null}
            linkTo={`/ChooseType/${item.id}`}
            imageHeight={100}
            />
        
    }

    return (
            <SearchComponent 
            searchTitle="Виберіть категорію товару" 
            queryFunction={GetCategoryByName}
            parser={parser}
            />
            )
        
    


}
     

export default ChooseACategoryComponent;
