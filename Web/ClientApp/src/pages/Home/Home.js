import React, { Component, useEffect, useState } from "react";
import ProductCardComponent from "../../components/ProductCard/ProductCardComponent";
import ProductsListComponent from "../../components/ProductsList/ProductsListComponent";
import {
  GetAllProductsFromIdArray,
  GetSupInfoForProductInYourCity,
} from "../../utils/Constants";
import { Success } from "../../utils/Constants";
import { getFromServer, postToServer } from "../../utils/Queries";
import { getRecentlyViewedProductsIds } from "../../utils/SessionStorage";
import "./Home.css";
import MoreLink from "../../components/HomeComponent/MoreLink ";
import CustomList from "../../components/HomeComponent/CustomList";
import AccordionComponnent from "../../components/HomeComponent/AccordionQuestion/accordionComponnent";
import CircleCard from "../../components/HomeComponent/CircleCard";
import PopularButtonComponnent from "../../components/HomeComponent/PopularButtonComponnent";
import VitaminCardComponnent from "../../components/HomeComponent/VitaminCardComponnent";

export const Home = () => {
  var displayName = Home.name;

  const [products, setProducts] = useState({});
  const [recently, setRecently] = useState({});

  async function initProducts() {
    let getProducts = (await getFromServer("Product", { count: 4 }));
    await Promise.all(getProducts.data.map(async a => {
      var res = await getFromServer(GetSupInfoForProductInYourCity, { city: getCookie("city"), id: a.id });
      if (res.status === Success) {
        a.count = res.data.count;
        a.minPrice = res.data.minPrice;
      } else {
        console.error("Error");
      }
    }));
    console.log(getProducts);
    setProducts(getProducts);
  }
  async function initRecentlyViewed() {
    let ids = getRecentlyViewedProductsIds();
    if (ids.length == 0) return;
    let getProducts = await postToServer(GetAllProductsFromIdArray, ids);

    await Promise.all(
      getProducts.data.map(async (a) => {
        var res = await getFromServer(GetSupInfoForProductInYourCity, {
          city: "Львів",
          id: a.id,
        });
        if (res.status === Success) {
          a.count = res.data.count;
          a.minPrice = res.data.minPrice;
        } else {
          console.error("Error");
        }
      })
    );
    setRecently(getProducts);
  }

  useEffect(() => {
    initProducts();
    initRecentlyViewed();
  }, []);

  return (
    <div className="row">
      <div style={{ backgroundColor: "red" }} className="col-12 baner-top">
        1
      </div>

      <div
        className="row"
        style={{ backgroundColor: "violet", margin: 0, padding: 0 }}
      >
        <div
          className="col-4"
          style={{ backgroundColor: "yellow", padding: "20px" }}
        >
          <CustomList />
          <MoreLink link="." />
        </div>

        <div className="col-8" style={{ backgroundColor: "gray" }}>
          <div
            className="row"
            style={{ backgroundColor: "Highlight", margin: 0, padding: 0 }}
          >
            <div className="flex-container">
              <h3 className="text-title">Вітаміни та мінерали</h3>
              <MoreLink link="." />
            </div>
          </div>
          <div
            className="row"
            style={{ backgroundColor: "darkcyan", margin: 0, padding: 0 }}
          >
            <div className="flex-container">
              <h3 className="text-title">Вітаміни та мінерали</h3>
              <MoreLink link="." />
            </div>
          </div>
        </div>
      </div>

      <div className="col-12" style={{ backgroundColor: "gold" }}>
        <h3 className="text-title">Бренд</h3>
        <div className="flex-container">
          <CircleCard
            imageUrl="data:image/jpeg;base64,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"
            text="ASP"
          />
        </div>
        <MoreLink link="." />
      </div>
      <div className="col-12" style={{ backgroundColor: "blue" }}>
        <h1 className="text-title">Вітаміни та мінерали</h1>
        <div className="d-flex justify-content-start">
          <PopularButtonComponnent text="Вітаміни" />
          <PopularButtonComponnent text="Вітаміни" />
          <PopularButtonComponnent text="Вітаміни" />
          <PopularButtonComponnent text="Вітаміни" />
        </div>
        <MoreLink link="." />
      </div>
      <div
        className="col-12 baner-botton"
        style={{ backgroundColor: "orange" }}
      >
        5
      </div>
      <div className="col-12" style={{ backgroundColor: "GrayText" }}>
          <h3 className="text-title">Вітаміни та мінерали</h3>
        <div className="flex-container">
        <VitaminCardComponnent imageUrl="https://content.rozetka.com.ua/goods/images/big/262512727.png" text="Текст" />
        </div>
          <MoreLink link="." />

        <div>CARUSEL</div>
      </div>

      <div
        className="row "
        style={{ backgroundColor: "black", margin: 0, padding: 0 }}
      >
        <div className="col-12 col-md-6" style={{ backgroundColor: "red" }}>
          <AccordionComponnent />
        </div>

        <div className="col-12 col-md-6" style={{ backgroundColor: "pink" }}>
          7
        </div>
      </div>
    </div>

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
  );

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
};
