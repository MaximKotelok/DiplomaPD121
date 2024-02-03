import React, { Component } from 'react';
import styles from "./CharacteristicTableComponent.module.css";

export function CharacteristicTableComponent({ data }) {
    return (
        <div>
            {data.map(a=>{

                return <div className={`${styles["table-row"]} row`}>
                    <p className={`col-6 ${styles["name"]}`}>{a.name}</p>
                    <p className={`col-6 ${styles["value"]}`}>{a.value}</p>
                </div>
            })}
        </div>
    )

}

