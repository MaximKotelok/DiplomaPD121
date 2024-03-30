import { Box, Image, Text} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./style.css"



const IconTextCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  return (

    <Box  className="cell-comb">
<Image className="icon-text-cell"  src={require('../../../../../assets/images/BrandTmp.png')}  alt="ФОТО" />
      <Text  className="text-style-cell-icon">
      {value}
      </Text>
    </Box>

  );
};
export default IconTextCell;
