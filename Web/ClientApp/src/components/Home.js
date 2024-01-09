import React, { Component, useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import ProductCardComponent from './ProductCard/ProductCardComponent';
import ProductsListComponent from './ProductsList/ProductsListComponent';
import { GetSupInfoForProductInYourCity } from '../utils/Constants';
import { Success } from '../utils/Constants';
import { getFromServer } from '../utils/Queries';

export const Home = ()=> {
  var displayName = Home.name;

  const [products, setProducts] = useState({});

  async function initProducts() {
    let getProducts = (await getFromServer("Product", {count: 4}));    
    await Promise.all(getProducts.data.map(async a=>{
      var res = await getFromServer(GetSupInfoForProductInYourCity, {city: "Львів", id: a.id});
      if(res.status === Success){
        a.count = res.data.count;
        a.minPrice = res.data.minPrice;
      }else{
        console.error("Error");
      }
    }));
    setProducts(getProducts)
  }  

  useEffect(()=>{
    initProducts();    
  },[])

    
    return (
      products.data&& <ProductsListComponent 
      caption="Пропозиції / Нещодавно переглянуті товари" 
      products={products.data} 
      />
      // <>
      //   <ProductCardComponent
      //     title="Алохол"
      //     description="таблетки, вкриті плівковою оболонкою блістер у пачці, №50"
      //     manufacturer='ПАО НПЦ "Борщаговский ХФЗ"'
      //     countOfPharmacies={1204}
      //     minPrice={285.51}
      //     imageUrl="https://img.zdorovi.ua/500-375/png/11189-alohol-tabl-v-o-50-10h5.png"
      //   />
      //   <ProductCardComponent
      //     title='Аскорбінка-КВ'
      //     description='таблетки зі смак. полун. по 25 мг №10 в етикет. лалалалалалалалалалла'
      //     manufacturer='АТ «КИЇВСЬКИЙ ВІТАМІННИЙ ЗАВОД».'
      //     minPrice={7.46}
      //     countOfPharmacies={375}
      //     imageUrl='https://www.add.ua/media/catalog/product/cache/0cb86aa621afec2b43f6f8736c54c157/_/-/_-_-__2_33_1.jpg'
      //   ></ProductCardComponent>
      //   <ProductCardComponent isFavorite={true}></ProductCardComponent>
      // </>
    )

    // return (
    //   <div>
    //     <h1>Hello, world!</h1>
    //     <p>Welcome to your new single-page application, built with:</p>
    //     <ul>
    //       <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
    //       <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
    //       <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
    //     </ul>
    //     <p>To help you get started, we have also set up:</p>
    //     <ul>
    //       <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
    //       <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
    //       <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
    //     </ul>
    //     <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
    //   </div>
    // );

}
