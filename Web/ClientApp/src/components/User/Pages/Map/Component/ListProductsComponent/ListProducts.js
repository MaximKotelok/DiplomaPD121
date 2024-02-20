import { NavigationDetailsComponent } from "../../../../Common/NavigationDetailsComponent/NavigationDetailsComponent";
import ChangeCityComponent from "../ChangeCityComponent/ChangeCityComponent";
import ListProductItemComponent from "../ListProductItemComponent/ListProductItemComponent";
import styles from "./ListProduct.module.css"

const ListPharmacies = (props) => {
    
    return (
        <div className="map-left  p-3">
              <div className='mx-3'>

                <p className={styles["product-title"]}>{props.product.title} {props.product.shortDescription} ціна у {props.city}</p>
                <NavigationDetailsComponent id={props.product.id} />
                <div className="my-3">
                    <ChangeCityComponent city={props.city}/>
                </div>
            <p className={`${styles["found-in"]}`}>Знайдено у {props.townProducts.length} аптеках</p>
            {props.townProducts.map((product,index) => 
            <ListProductItemComponent             
                key={index}
                pharmacyId={product.pharmacy.id}
                id={product.id}
                isSelected={props.selectedProduct && props.selectedProduct.id == product.id}
                price={product.price}
                lon={product.pharmacy.longitude}
                lat={product.pharmacy.latitude} 
                title={product.pharmacy.pharmaCompany.title} 
                productTitle={`${product.product.title} ${props.product.shortDescription}`}                
                address={product.pharmacy.address}
                manufacturer={product.product.manufacturer.name}
                timeClosed="20:00"
                timeOpen="09:00"
                onClick={() => { 
                    props.onProductClick(product)
                    if (props.onMapSelect) {
                        props.onMapSelect(product);
                    }
                }}
            /> 
            )}
            </div>
            {/* <ul>
                {props.townProducts.map(product => (
                    <li
                        key={product.id}
                        style={{
                            border: '2px solid #000',
                            padding: '10px',
                            color: props.selectedProduct && props.selectedProduct.id === product.id ? 'red' : 'black'
                        }}
                        onClick={() => { 
                            props.onProductClick(product)
                            if (props.onMapSelect) {
                                props.onMapSelect(product);
                            }
                        }}
                    >
                        <p>{product.pharmacy.address}, {product.pharmacy.longitude},{product.pharmacy.latitude}</p>
                        <p>{product.product.title}, {product.price}</p>
                        <p>{product.product.manufacturer.name}</p>
                        <button onClick={() => {
                            const mapsUrl = `https://www.google.com/maps?q=${product.pharmacy.longitude},${product.pharmacy.latitude}&z=15&t=m`;
                            window.open(mapsUrl, '_blank');
                        }}>Open Map</button>
                        <button onClick={() => { handleReserve(product.id) }}>Reserve</button>
                    </li>
                ))}
            </ul> */}
        </div>
    );
};
export default ListPharmacies;