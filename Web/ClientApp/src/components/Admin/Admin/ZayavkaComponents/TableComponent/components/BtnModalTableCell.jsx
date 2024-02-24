import { Box, Text, Button, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Textarea, Checkbox, Stack, Radio, RadioGroup, ChakraProvider, StylesProvider, useRadio, useRadioGroup, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./style.css"


import { ReactComponent as BtnModal } from "../../../../../../assets/images/btnModalTable.svg";
import RadioCard from "./RadioCard";
import { changeStatus } from "../../../../../../services/product";
import { Success } from "../../../../../../utils/Constants";
import { toast } from "react-toastify";


const BtnModalTableCell = ({ statuses, activeStatus,id,updateStatus }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const [activeStatusId, setActiveStatusId] = useState(activeStatus)



  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: console.log,
  })

  const group = getRootProps()
  async function onClickUpdate(){
    let result = await changeStatus(id,activeStatusId);
    if(result.status === Success){
      updateStatus(id, activeStatusId)
      toast.success("Успіх")
      return;
    }

    setActiveStatusId(activeStatus)
    toast.error("Помилка при спробі оновити статус")

  }



  return (


    <>
      <Button _hover={{ bg: 'none' }} className="btn-modal-cell text-style-cell" onClick={handleOpenModal}>
        <BtnModal />
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="md" isCentered>
        <ModalOverlay height="100%" style={{ backgroundColor: "rgba(0, 122, 255, 0.15)", backdropFilter: "blur(10px)" }} />

        <ModalContent
          maxW="55%"
          height="60%"
          bg="white"
          p={5}
          borderRadius="md"
          position="absolute"
          top="17%"
          left="25%"
          className="contnent-modal"
        >

          <Box className="d-flex  ">
            <ModalCloseButton className="btn-close-x ms-auto " _hover={{ bg: 'none' }}

            />


          </Box>
          <ModalBody>

            <Box mb={2} >
              <Textarea placeholder="Введіть текст тут" className='text-area-modal' style={{
                height: "226px",
                border: '1px solid rgba(0, 122, 255, 1)',
                color: 'rgba(14, 62, 117, 1)', fontSize: '14px',
                fontWeight: "400", outline: "none"
              }}
                resize="none" />
            </Box>
            <Box>

              <Box mb={2} className="d-md-flex justify-content-end">
                <Text style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "12.5px",
                  color: "#0E3E75"
                }}>
                  10.12.2024
                </Text>
              </Box>

              <Box mb={3}  >

                <Checkbox size='lg' iconColor='white' colorScheme="yellow" className="" style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "17px"
                }} >
                  Надіслати лист на capsule.apteca@gmail.com  </Checkbox>



              </Box>

              <HStack mb={3} {...group}>
                {statuses.map((option) => {
                  const radio = getRadioProps({ value: option.status });
                  return (
                    <RadioCard key={option.status} {...radio} color={option.color} 
                    isChecked={option.id == activeStatusId}
                    handleClick={()=>{setActiveStatusId(option.id)}}
                    >
                      {option.status}
                    </RadioCard>
                  );
                })}
              </HStack>

              <Box  >
                <div class="d-grid gap-2 d-md-flex ">
                  <button type="button" class=" btn-my-primary w-100"
                  onClick={onClickUpdate}
                  >Оновити</button>
                  <button type="button" class=" btn-my-primary-500 w-100">Large button</button>
                </div>

              </Box>


            </Box>

          </ModalBody>

        </ModalContent>
      </Modal>


    </>


  );
};

export default BtnModalTableCell;


