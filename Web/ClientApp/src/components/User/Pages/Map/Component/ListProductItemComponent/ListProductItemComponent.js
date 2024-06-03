import styles from "./ListProductItemComponent.module.css";

import { ReactComponent as Geo } from "../../../../../../assets/images/geo.svg";
import { addToCart } from "../../../../../../services/cartService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ListProductItemComponent = ({
  id,
  pharmacyId,
  isSelected,
  price,
  title,
  productTitle,
  manufacturer,
  address,
  timeClosed,
  timeOpen,
  onClick,
  lon,
  lat,
  className
}) => {
  function isPharmacyOpen(timeOpen, timeClosed) {
    const now = new Date();

    now.toLocaleString("en-US", { timeZone: "Europe/Kiev" });

    const openingDate = new Date(now);
    const closingDate = new Date(now);

    const [openingHour, openingMinute] = timeOpen.split(":").map(Number);
    const [closingHour, closingMinute] = timeClosed.split(":").map(Number);

    openingDate.setHours(openingHour, openingMinute, 0, 0);
    closingDate.setHours(closingHour, closingMinute, 0, 0);

    return now >= openingDate && now < closingDate;
  }

  let isOpen = isPharmacyOpen(timeOpen, timeClosed);

  const handleReserve = () => {
    addToCart(pharmacyId, id);
    toast.success("Товар додано до кошика");
  };

  return (
    <div
    id={`product${id}`}
      onClick={onClick}
      className={`${styles["card"]} ${isSelected && styles["active"]} ${className}`}
    >
      <p className={`${styles["pharma-name"]}`}>
        {`${title} `} 
        <Link to={`/PharmacyInfo/${pharmacyId}`}>
         <i className={`bi bi-info-circle ${styles["info-icon"]}`}></i>
         </Link>
      </p>
      <div className={`${styles["pharma-info"]}`}>
        <p>
          {isOpen ? `Відкрито до ${timeClosed}` : `Буде відкрито з ${timeOpen}`}
        </p>
        <p>{address}</p>
      </div>
      <button
        className={`btn ${styles["geo"]} my-3`}
        onClick={() => {
          const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}&z=15&t=m`;
          window.open(mapsUrl, "_blank");
        }}
      >
        Маршрут <Geo className="geo-icon" />
      </button>

      <hr />
      <div className="">
        <div className="d-flex align-items-end justify-content-between">
          {/* <div className="col-8"> */}
          <p className={`${styles["product-title"]}`}>{productTitle} </p>
          <p className={` ${styles["price"]}`}>{Number(price).toFixed(2)}</p>
        </div>
        {/* <p className={`${styles["price"]}`}>{Number(price).toFixed(2)}</p> */}
        {/* </div> */}

        {/* <div className="col-4 d-flex align-items-end flex-column"> */}

        <div className="row">
          <p className={`col-12 col-md-7 ${styles["manufacturer"]}`}>
            {manufacturer}
          </p>

          <button
            className={`btn col-12 col-md-5  ${styles["reserve"]}`}
            onClick={() => {
              handleReserve();
            }}
          >
            Забронювати
          </button>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
};
export default ListProductItemComponent;
