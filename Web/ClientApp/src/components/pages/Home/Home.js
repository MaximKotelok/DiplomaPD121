import React, { Component, useEffect, useState } from 'react';
import ProductCardComponent from '../../ProductCard/ProductCardComponent';
import CarouselListComponent from '../../HomeComponent/CarouselList/CarouselListComponent';
import { GetAllProductsFromIdArray, GetRecomendedBrands, GetMainCategories, ApiPath, GetRecomendedCategoryById, GetRecomendedCategory } from '../../../utils/Constants';
import { getFromServer, getProducts, postToServer } from '../../../utils/Queries';
import { getRecentlyViewedProductsIds, getRecomendedRandomCategory, setRecomendedRandomCategory } from '../../../utils/SessionStorage';
import VitaminCardComponnent from '../../HomeComponent/VitaminCard/VitaminCardComponnent';
import MoreLink from '../../HomeComponent/MoreLink/MoreLink';
import PopularButtonComponnent from '../../HomeComponent/PopularButton/PopularButtonComponnent';
import CircleCard from '../../HomeComponent/CircleCard/CircleCard';
import CustomList from '../../HomeComponent/CustomList/CustomList';
import AccordionComponnent from "../../HomeComponent/AccordionQuestion/accordionComponnent";
import MiniProductCardComponent from '../../HomeComponent/MiniProductCard/MiniProductCardComponent';
import homePageImg from "../../../styles/images/homePageImg.png";
import AdaptiveContainerComponent from '../../AdaptiveContainerComponent/AdaptiveContainerComponent';

import "./Home.css"
export const Home = () => {
  var displayName = Home.name;

  const [products, setProducts] = useState({});
  const [recently, setRecently] = useState({});
  const [categories, setCategories] = useState({});
  const [brands, setBrands] = useState({});
  const [pngCards, setPngCards] = useState({});

  async function initPngCards() {
    let id = getRecomendedRandomCategory("PNG")
    const count = 5;
    if (id) {
      
      let pngCards = await getFromServer(GetRecomendedCategoryById, { id: id, count: count });
      setPngCards(pngCards.data.result);
    }
    else {
      let pngCards = await getFromServer(GetRecomendedCategory, { typeOfPhoto: "PNG", count: count });
      setRecomendedRandomCategory("PNG",pngCards.data.id);
      setPngCards(pngCards.data.result);
    }
  }

  async function initProducts() {

    setProducts(await getProducts("Product", { count: 8 }, getFromServer))
  } 
  async function initCategories() {
    setCategories(await getFromServer(GetMainCategories, { count: 9 }))
  }

  async function initRecentlyViewed() {
    let ids = getRecentlyViewedProductsIds();
    if (ids.length == 0)
      return;

    setRecently(await getProducts(GetAllProductsFromIdArray, ids, postToServer))
  }

  async function initBrands() {
    setBrands(await getFromServer(GetRecomendedBrands, { count: 7 }))
  }

  useEffect(() => {
    initProducts();
    initRecentlyViewed();
    initCategories();
    initBrands();
    initPngCards();
    
  }, [])

  return (<>
    <div className="row">
      <img src={homePageImg} />


      <div
        className="row"

      >
        <div
          className="col-4"

        >
          <CustomList data={categories.data} />
          <MoreLink link="." />
        </div>

        <div className="col-8">
          <div
            className="row"
            style={{ margin: 0, padding: 0 }}
          >
            <div >
              <div className='d-flex justify-content-between'>

                <h3 className="text-title">Пропозиції</h3>
                <MoreLink link="." />
              </div>
              <CarouselListComponent>
                {products.data&&products.data.map?products.data.map((a) => (
                        <MiniProductCardComponent
                            key={a.id}
                            id={a.id}
                            title={a.title}
                            description={a.shortDescription}
                            minPrice={a.minPrice}
                            countOfPharmacies={a.count}
                            manufacturer={a.manufacturer}
                            imageUrl={a.pathToPhoto}
                        />
                    )):new Array(15).fill(null).map((_, index) => (
                        <MiniProductCardComponent key={index}/>))
                        }

                </CarouselListComponent>
              
            </div>
          </div>
          <div
            className="row"
            style={{ margin: 0, padding: 0 }}
          >
            {recently.data &&
              <div>
                <h3 className="text-title">Нещодавно переглянуті товари</h3>
                <CarouselListComponent>
                {recently.data&&recently.data.map?recently.data.map((a) => (
                        <MiniProductCardComponent
                            key={a.id}
                            id={a.id}
                            title={a.title}
                            description={a.shortDescription}
                            minPrice={a.minPrice}
                            countOfPharmacies={a.count}
                            manufacturer={a.manufacturer}
                            imageUrl={a.pathToPhoto}
                        />
                    )):new Array(15).fill(null).map((_, index) => (
                        <MiniProductCardComponent key={index}/>))
                        }

                </CarouselListComponent>
              </div>}
          </div>
        </div>
      </div>

      <div className="col-12" >
        <div className='d-flex justify-content-between'>
          <h3 className="text-title">Бренд</h3>
          <MoreLink link="." />
        </div>
        <div className="flex-container d-flex">
          
          {
            brands.data && brands.data.map ?
              brands.data.map(a => {
                return <CircleCard
                  key={a.id}
                  text={a.name}
                  imageUrl={`${ApiPath}${a.pathToPhoto}`}
                />
              })
              : new Array(7).fill(null).map((_, index) => {
                return <CircleCard
                  key={index}
                  text="Name"
                />
              })
          }

        </div>

      </div>
      <div className="col-12">
        <div className='d-flex justify-content-between'>
          <h3 className="text-title">Популярні товари</h3>
          <MoreLink link="." />
        </div>
        <div className="d-flex justify-content-start">
          <PopularButtonComponnent text="Вітаміни" />
          <PopularButtonComponnent text="Вітаміни" />
          <PopularButtonComponnent text="Вітаміни" />
          <PopularButtonComponnent text="Вітаміни" />
        </div>
        <CarouselListComponent xlDisplayCount={6}>
          {new Array(10).fill(null).map((_, index)=>{
            return <MiniProductCardComponent key={index}></MiniProductCardComponent>
          })}

        </CarouselListComponent>

      </div>
      <div className="col-12 baner-bottom"></div>

    </div>

    {pngCards && pngCards.map &&
      <div className="col-12">
        <div className=' d-flex justify-content-between'>
          <h3 className="text-title">Вітаміни та мінерали</h3>
          <MoreLink link="." />
        </div>

        <AdaptiveContainerComponent>
          {pngCards.map(a => {

            return (<VitaminCardComponnent
              key={a.id}
              imageUrl={`${ApiPath}${a.pathToPhoto}`}
              text={a.title} color="#E0E0E0"
            />)
          }
          )
        }
        </AdaptiveContainerComponent>
      </div>}



    <div
      className="row "
      style={{ margin: 0, padding: 0 }}
    >
      <div className="col-12 col-md-6">
        <AccordionComponnent />
      </div>

      <div className="col-12 col-md-6">
        7
      </div>
    </div>


  </>

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