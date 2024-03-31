import React, { useState, useEffect } from "react";
import AccordionComponent from "../../../../../Common/AccordionQuestionComponent/accordionComponent";
import CardHistory from "./CardHistory/CardHistoryComponent";
import srcImg from "../../../../../../assets/images/authPage.png";
import { getReservations } from "../../../../../../services/reservation";
import { Success } from "../../../../../../utils/Constants";
import { formatDate, groupBy, toLocalString } from "../../../../../../utils/Functions";

const MineBookeds = () => {
  const [reservs, setReservs] = useState([]);

  useEffect(() => {
    init();
  }, [])

  async function init() {
    let res = await getReservations();
    if (res.status === Success) {
      let selected = res.data.map(a => {
        return {
          id: a.id,
          name: a.name,
          pharmacy: a.pharmacy,
          status: a.status,
          total: a.total,
          reservedTimeGroup: toLocalString(a.reservedTime),
          reservedTime: formatDate(a.reservedTime)
        }
      })
      console.log(groupBy(selected, "reservedTimeGroup"))
      setReservs(groupBy(selected, "reservedTimeGroup"));
    }
  }

  return (
    <div>
      {/* Якщо масив пустий*/}
      {/* 
      <h5
        style={{
          fontFamily: "var(--standart-font)",
          fontWeight: 700,
          fontSize: "16px",
        }}
      >
        Історія броней порожня
      </h5> */}

      {/* Якщо є історія */}
      <h4>Історія</h4>


      <div className=" ">
        {/* Якщо історія не пуста  */}

        {Object.keys(reservs).length > 0 && Object.keys(reservs).map(date => {    
          return (
            <div>
              <h6
                className="mb-4 mt-2"
                style={{ color: "rgba(122, 122, 122, 1)", fontSize: "14px" }}
              >
                {date}
              </h6>
              {
                reservs[date].map(a =>
                (
                  <CardHistory 
                    name={a.name} 
                    number={a.id} 
                    price={a.total} 
                    address={a.pharmacy.address} 
                    date={a.reservedTimeGroup} 
                    statusText={a.status.status}
                    statusColor={a.status.color} 
                    statusPathToPhoto={a.status.path}
                    />
                )
                )
              }
            </div>
          )
        })
        }
        {/* Якщо історія пуста */}
        {/*  <AccordionComponent
          id="1"
          header="Навіщо бронювати?"
          title="Ви точно будете впевнені, що заброньовані товари вас чекають в аптеці за вказаною ціною."
        />
        <AccordionComponent id="2" header="Як зробити бронь?" title="..." />
        <img src={srcImg} style={{ width: "100%", height: "auto" }} /> */}
      </div>
    </div>
  );
};

export default MineBookeds;
