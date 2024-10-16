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
  import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/actions/productAction";
  
  export default function Delete({productId}) {
    console.log(productId)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const toast = useToast();
    return (
      <>
        <Button
          fontSize={"sm"}
          onClick={onOpen}
          colorScheme="black"
          variant={"outline"}
          width={"full"}
        >
          Delete
        </Button>
  
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Text>
                Are you sure you want to delete this product 
              </Text>
            </ModalBody>
  
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  dispatch(deleteProduct({ productId})).then(() => {
                    onClose();
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
  