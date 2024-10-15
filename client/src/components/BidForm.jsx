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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBid } from "../redux/actions/bidAction";
import { useNavigate } from "react-router-dom";

export default function BidForm({ productId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bid, setBid] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="black"
        variant={"outline"}
        width={"full"}
      >
        Place Bid
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter amount</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              placeholder="enter your bid"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                dispatch(createBid({ productId, bid })).then(() => {
                  setBid("");
                  onClose();
                  setTimeout(() => {
                    navigate("product/" + productId);
                  }, 200);
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
              place
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
