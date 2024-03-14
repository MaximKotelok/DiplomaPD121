import React, {useState,useEffect} from "react";
import AccordionComponent from "../../../../../Common/AccordionQuestionComponent/accordionComponent";
import CardHistory from "./CardHistory/CardHistoryComponent";
import srcImg from "../../../../../../assets/images/authPage.png";
import { getReservations } from "../../../../../../services/reservation";
import { Success } from "../../../../../../utils/Constants";

const MineBookeds = () => {
  const [reservs, setReservs] = useState([]);
  
  useEffect(()=>{
    init(reservs);    
  },[])
  async function init(){    
    let res = await getReservations();
    if(res.status === Success){
      setReservs(res.data);
    }
  }

  console.log(reservs)

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
      <h6
        className="mb-4 mt-2"
        style={{ color: "rgba(122, 122, 122, 1)", fontSize: "14px" }}
      >
        грудень 23
      </h6>

      <div className=" ">
        {/* Якщо історія не пуста  */}

        {reservs.length > 0 && reservs.map(a=>(
          <CardHistory name={a.name} number={a.id} price={a.total} address={a.pharmacy.address} date={a.reservedTime}/>
        ))}
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
