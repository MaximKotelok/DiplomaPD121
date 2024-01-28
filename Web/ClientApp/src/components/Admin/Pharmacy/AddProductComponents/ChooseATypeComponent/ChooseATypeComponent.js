import { useParams } from 'react-router-dom';
import React, { useState } from 'react';

import SearchComponent from '../SearchComponent/SearchComponent';
import { getFromServer } from '../../../../../utils/Queries';
import { ApiPath, GetGroupsForProductAdd } from '../../../../../utils/Constants';
import SquareCardComponent from '../SquareCardComponent/SquareCardComponent';
const ChooseATypeComponent = () => {
    
    const { categoryId } = useParams();

    async function GetTypeByName(title) {
        const resp = await getFromServer(GetGroupsForProductAdd, {title: title, count: 7});        
        return resp.data;        
    }

    function parser(item){
        console.log(item)
            return <SquareCardComponent 
            title={item.name} 
            image={item.pathToPhoto?`${ApiPath}${item.pathToPhoto}`:null}
            linkTo={`/AddProduct/${categoryId}/${item.id}`}
            imageHeight={100}
            />
        
    }

    return (
            <SearchComponent 
            searchTitle="Виберіть тип товару" 
            queryFunction={GetTypeByName}
            parser={parser}
            />
            )        


}
     

export default ChooseATypeComponent;
