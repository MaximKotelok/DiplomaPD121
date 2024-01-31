import styles from "./ChangeCityComponent.module.css"

import {ReactComponent as Geo} from "../../../../../../assets/images/geo.svg"

const ChangeCityComponent = ({city}) => {

    
    return (
        <div className={`${styles["search-city"]}`}>        
            <p>{city}</p>
            <button className={`btn ${styles["change"]}`}>Змінити</button>
        </div>
    )

};
export default ChangeCityComponent;