import React, { useEffect, useContext } from "react";
import StatusImage from "../../assets/images/new404.svg";
import styles from "./Status404.module.css";
import { LayoutProviderValues } from "../../utils/Constants";
import LayoutContext from "../../layouts/LayoutContext";

const Status404 = () => {
    // const { onComponentMount, onComponentUnmount } = useContext(LayoutContext);

    // useEffect(() => {    
    //     onComponentMount(LayoutProviderValues.DISABLE_FOOTER);
    //     return () => {    
    //       onComponentUnmount();
    //     };
        
    //   }, [onComponentMount, onComponentUnmount]);


    return (
    <div className={`${styles["my-10"]} container text-center d-flex flex-column align-items-center`}>
        <img className="w-100" src={StatusImage} />
        <p className={`${styles["oops"]}`}>Упс... щось пішло не так</p>
        <button className={`btn ${styles["to-main"]}`} onClick={()=>{window.location.href = "";}}>На головну</button>
    </div>
    )
};

export default Status404;
