

import { Box, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./style.css"

const StatusCell = ({ status, color }) => {


  return (
   <Box className="bage-status" > 
   <Text className="block-status bg-color-bage" style={{ backgroundColor: color }}>
   {status}
   </Text>
   
   </Box>
  );
};
export default StatusCell;

