import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { addToRecentlyViewedProduct } from '../../../../utils/SessionStorage';
import "./Details.css";
import { Link } from 'react-router-dom';
import { Description } from "../../../../components/DetailsComponents/Description";
import { getFromServer } from '../../../../utils/Queries';
import { GetProduct, Success } from '../../../../utils/Constants';

export const Details = ()=> {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    addToRecentlyViewedProduct(id);
    useEffect(()=>{

        init();
    },[])

    async function init(){
        const res = await getFromServer(GetProduct, {id:id});
        if(res.status == Success){
            if(res.data.product)
                setProduct(res.data.product)
            else
                setProduct(res.data)
            console.log(res.data)
        }
    }

    return (<div>
        <Link to={`/map/${id}`}>
            Порівняння цін
        </Link>
        {product && <Description 
        separeteBy={product.description.includes("h1")?"h1":""} 
        >{product.description}</Description>}

        <hr/>
        {product && product.properties.map &&
        product.properties.map(a=><p key={a.id}>{a.name}: {a.value}</p>)
        }

        
    </div>);
}
