// import React from "react";
// import styles from "./AcordeonDetailsHistory.module.css";

// export const AcordeonDetailsHistory = () => {
//   return (
//     <div>

//     </div>
//   );
// };

import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import styles from "./AcordeonDetailsHistory.module.css";
import { ReactComponent as Ellipse } from "./Ellipse.svg";
import { Description } from "../../../../../../User/Pages/Details/Component/DescriptionComponent/Description";

const Accordion = withStyles({
  root: {
    // marginTop: "26px",
    // border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // backgroundColor: 'rgba(0, 0, 0, .03)',
    borderTop: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export const AcordeonDetailsHistory = ({description}) => {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  
  if(description.length && !(description.length > 0))
    return description;

  return <div className="mt-3">
  {description.map((item, index)=>{

    return  <Accordion
      square
      expanded={expanded === `panel${item.id}${index}`}
      onChange={handleChange(`panel${item.id}${index}`)}
    >
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <h6 className={`${styles["text-acordeon-header"]}`}>
          {item.name}
        </h6>
      </AccordionSummary>
      <AccordionDetails>
        <div dangerouslySetInnerHTML={{__html: item.content}}>
          
        </div>
      </AccordionDetails>
    </Accordion>
  })}
  </div>

  // return (
  //   <div className="mt-3">
  //     <Accordion
  //       square
  //       expanded={expanded === "panel1"}
  //       onChange={handleChange("panel1")}
  //     >
  //       <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
  //         <h6 className={`${styles["text-acordeon-header"]}`}>
  //           Collapsible Group Item #1
  //         </h6>
  //       </AccordionSummary>
  //       <AccordionDetails>
  //         <ul>
  //           {items.map((item, index) => (
  //             <li
  //               key={index}
  //               style={{
  //                 listStyle: "none",
  //                 marginBottom: "8px",
  //               }}
  //               className={`d-flex `}
  //             >
  //               <div
  //                 style={{
  //                   marginRight: "14px",
  //                   // marginBottom: "9px",
  //                 }}
  //               >
  //                 <Ellipse />
  //               </div>{" "}
  //               <p className={`${styles["text-acordeon-show"]}`}>{item}</p>
  //             </li>
  //           ))}
  //         </ul>
  //       </AccordionDetails>
  //     </Accordion>

  //     <Accordion
  //       square
  //       expanded={expanded === "panel3"}
  //       onChange={handleChange("panel3")}
  //     >
  //       <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
  //         <h6 className={`${styles["text-acordeon-header"]}`}>
  //           Collapsible Group Item #1
  //         </h6>
  //       </AccordionSummary>
  //       <AccordionDetails>
  //         <ul>
  //           {items.map((item, index) => (
  //             <li
  //               key={index}
  //               style={{
  //                 listStyle: "none",
  //                 marginBottom: "8px",
  //               }}
  //               className={`d-flex `}
  //             >
  //               <div
  //                 style={{
  //                   marginRight: "14px",
  //                   // marginBottom: "9px",
  //                 }}
  //               >
  //                 <Ellipse />
  //               </div>{" "}
  //               <p className={`${styles["text-acordeon-show"]}`}>{item}</p>
  //             </li>
  //           ))}
  //         </ul>
  //       </AccordionDetails>
  //     </Accordion>
  //   </div>
  // );
};
