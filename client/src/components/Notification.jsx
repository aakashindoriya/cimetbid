import {
  Box,
  Button,
  Divider,
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
const Notification = ({ show, setShow, notification }) => {
    const navigate=useNavigate()

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
          notification.map((el) => (
            <>
              <MenuItem key={el._id} onClick={()=>navigate(`product/${el.product._id}`)}> 
              <HStack spacing={4}>
                <Image
                  src={el.product.photos[0]}
                  alt={el.product.title}
                  boxSize="100px"
                  objectFit="cover"
                />
                <VStack align="start">
                  <Text fontWeight="bold" fontSize="lg">
                    {el.product.title}
                  </Text>
                  <Text>Type: {el.product.type}</Text>
                  <Text>Starting Price: ${el.product.startingPrice}</Text>
                </VStack>
              </HStack>
              
              <Text>Bid Amount: ${el.bid.amount}</Text>
              

              <MenuDivider />
              </MenuItem>
            </>
          ))}
      </MenuList>
    </Menu>
  );
};

export default Notification;
