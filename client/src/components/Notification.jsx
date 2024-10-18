import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import BidNotification from "./BidNotification";
import ProductNotification from "./ProductNotification";
const Notification = ({ show, setShow, notification,type }) => {
  const navigate = useNavigate();

  return (
    <Menu
      as={Button}
      rounded={"full"}
      variant={"link"}
      cursor={"pointer"}
      minW={0}
      onClose={() => setShow(false)}
    >
      <MenuButton>
        <Box
          pos={"relative"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <IoIosNotificationsOutline size={20} />
          {show && (
            <Box
              pos={"absolute"}
              zIndex={"10"}
              border={"1px solid red"}
              width={"2"}
              h="2"
              bg="red"
            ></Box>
          )}
        </Box>
      </MenuButton>
      <MenuList>
        <Heading textAlign={"center"} fontSize={"sm"}>
          Notifications
        </Heading>
        <MenuDivider />
        {notification?.length &&
          notification.map((el) => {
            if(type==="newBid")return <BidNotification el={el} navigate={navigate}/>
            if(type==="newProduct")return <ProductNotification el={el} navigate={navigate} />
          }
          )}
      </MenuList>
    </Menu>
  );
};

export default Notification;
