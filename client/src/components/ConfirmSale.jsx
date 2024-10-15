import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useDispatch } from "react-redux";
  import { createBid } from "../redux/actions/bidAction";
  
  export default function ConfirmSale({name,amount,bidId}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const toast = useToast();
    return (
      <>
        <Button
          onClick={onOpen}
          colorScheme="black"
          variant={"outline"}
          width={"full"}
        >
          Sell
        </Button>
  
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Sell Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Text>
                Are you sure you want to sell this product to mr/mrs {name} at price of ${amount}
              </Text>
            </ModalBody>
  
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  dispatch(createBid({  })).then(() => {
                    
                    onClose();
                    
                    toast({
                      title: `Bid placed successfully`,
                      status: "success",
                      duration: 500,
                      isClosable: true,
                      position: "top",
                    });
                  });
                }}
              >
                Confirm
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  