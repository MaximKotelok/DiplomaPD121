import { Box, useRadio } from "@chakra-ui/react";

function RadioCard(props) {
    const { getInputProps, getRadioProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getRadioProps()
  
    return (
        <Box as='label' 
        >

        <input {...input} />
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
      

        >
          {props.children}
        </Box>
        </Box>

      </Box>
    )
  }

   export default RadioCard;