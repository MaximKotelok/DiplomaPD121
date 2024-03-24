import { Box, Text} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./style.css"



const TextCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  return (

    <Box className="text-style-cell" >
      <Text>
      {value}
      </Text>
    </Box>
   
  );
};
export default TextCell;
