import { Box, Image, Text} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./style.css"



const HdTextCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  return (

    // <Box className="text-style-cell-hd" >
    //   <Text>
    //   {value}
    //   </Text>
    // </Box>

    <Box  className="cell-comb">
    <Image className="icon-text-cell"  src={require('../../../../../../assets/images/BrandTmp.png')}  alt="ФОТО" />
          <Text  className="text-style-cell-icon-hd">
          {value}
          </Text>
        </Box>
    

  );
};
export default HdTextCell;
