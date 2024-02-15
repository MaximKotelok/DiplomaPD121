import { NavigationDetailsComponent } from "../../../../Common/NavigationDetailsComponent/NavigationDetailsComponent";
import styles from "./ListProductItemComponent.module.css"

import {ReactComponent as Geo} from "../../../../../../assets/images/geo.svg"
import { addToCart } from "../../../../../../services/cartService";
import { toast } from "react-toastify";

const ListProductItemComponent = ({id, pharmacyId, isSelected, price, title, productTitle, manufacturer, address, timeClosed, timeOpen, onClick,lon,lat }) => {

    
    function isPharmacyOpen(timeOpen, timeClosed) {
        const now = new Date();
      
      
        now.toLocaleString('en-US', { timeZone: 'Europe/Kiev' });
      
        const openingDate = new Date(now);
        const closingDate = new Date(now);
      

        const [openingHour, openingMinute] = timeOpen.split(':').map(Number);
        const [closingHour, closingMinute] = timeClosed.split(':').map(Number);
      
      
        openingDate.setHours(openingHour, openingMinute, 0, 0);
        closingDate.setHours(closingHour, closingMinute, 0, 0);
      
        
        return now >= openingDate && now < closingDate;
      }   

    let isOpen = isPharmacyOpen(timeOpen,timeClosed);

      const handleReserve = () => {        
        addToCart(pharmacyId, id)
        toast.success("Товар додано до кошика");
        };

    return (
        <div onClick={onClick} className={`${styles["card"]} ${(isSelected&&styles["active"])}`}>        
            <p className={`${styles["pharma-name"]}`}>{title} <i className={`bi bi-info-circle ${styles["info-icon"]}`}></i></p>            
            <div className={`${styles["pharma-info"]}`}>
                <p>
                {isOpen?`Відкрито до ${timeClosed}`:`Буде відкрито з ${timeOpen}`}
                </p>
                <p>
                {address}
                </p>
            </div>
            <button className={`btn ${styles["geo"]} my-3`} onClick={() => {
                const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}&z=15&t=m`;
                window.open(mapsUrl, '_blank');
            }}>Маршрут <Geo className="geo-icon"/></button>

            <hr/>
            <div className="row">

            <div className="col-8">
                <p className={`${styles["product-title"]}`}>{productTitle}</p>
                <p className={`${styles["manufacturer"]}`}>{manufacturer}</p>
            </div>
            <div className="col-4 d-flex align-items-end flex-column">
                <p className={`${styles["price"]}`}>{Number(price).toFixed(2)}</p>
                <button className={`btn ${styles["reserve"]}`} onClick={() => { handleReserve() }}>Забронювати</button>
            </div>
            </div>
            </div>
    )

};
export default ListProductItemComponent;