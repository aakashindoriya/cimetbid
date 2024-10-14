import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { createBid } from "../redux/actions/bidAction"

export default function BidForm({productId}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [bid,setBid]=useState("")
    const dispatch=useDispatch()
    return (
      <>
        <Button onClick={onOpen}>Place Bid</Button>
  
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter amount</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Input  placeholder="enter your bid"  value={bid} onChange={(e)=>setBid(e.target.value)} />
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={()=>{
                dispatch(createBid({productId ,bid}))
              }}>
                place
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }