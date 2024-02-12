

import { Box, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./style.css"

const StatusCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);


  return (
   <Box className="bage-status" > 
   <Text className="block-status bg-color-bage">
   {value}
   </Text>
   
   </Box>
  );
};
export default StatusCell;

