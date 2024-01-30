import React from "react";
import AccordionItem from "./accordionQuestion";

// const accordionComponnent = () => {
//   return (
//     <div className="accordion" id="accordionExample">
//       <AccordionItem
//         question="Питання 1"
//         answer="Lorem ipsum dolor amet consectetur adipisicing elit. Natus unde, ab autem quis quia sint quod accusamus quas possimus."
//       />
//       <AccordionItem
//         question="Питання 2"
//         answer="Lorem ipsum dolor amet consectetur adipisicing elit. Natus unde, ab autem quis quia sint quod accusamus quas possimus."
//       />
//       <AccordionItem
//         question="Питання 3"
//         answer="Lorem ipsum dolor amet consectetur adipisicing elit. Natus unde, ab autem quis quia sint quod accusamus quas possimus."
//       />
//     </div>
//   );
// };

// export default accordionComponnent;

const AccordionComponent = () => {
  return (
    <div className="accordion">
      <AccordionItem
        id="2"
        title="Питання 2"
        content="Lorem ipsum dolor amet consectetur adipisicing elit..."
      />
      <AccordionItem
      id="3"
        title="Питання 3"
        content="Lorem ipsum dolor amet consectetur adipisicing elit..."
      />
      {/* Add more AccordionItem components as needed */}
    </div>
  );
};

export default AccordionComponent;
