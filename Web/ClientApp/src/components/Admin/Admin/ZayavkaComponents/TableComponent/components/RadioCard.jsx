import { Box, useRadio } from "@chakra-ui/react";
import { useState, useEffect } from "react";

function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getRadioProps();
  const [isChecked, setIsChecked] = useState(props.isChecked || false);

  useEffect(() => {
    setIsChecked(props.isChecked || false);
  }, [props.isChecked]);


  return (
    <Box as='label'>
      <input {...input} checked={isChecked} onChange={() => {}} />
      <Box
        borderRadius="100px"
        padding="6px 8px"
        borderWidth="2px"
        borderColor="transparent"
        {...checkbox}
        _checked={{
          borderWidth: "2px",
          borderColor: props.color,
        }}
        onClick={props.handleClick}
      >
        <Box
          width="120px"
          textAlign="center"
          lineHeight="18px"
          {...checkbox}
          cursor='pointer'
          borderRadius="100px"
          padding="6px 10px"
          fontSize="13px"
          fontWeight="500"
          bg={props.color}
          color="white"
          _hover={{
            backgroundColor: props.color, // Add hover effect if needed
          }}
          _active={{
            backgroundColor: props.color, // Add active effect if needed
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
}

export default RadioCard;
