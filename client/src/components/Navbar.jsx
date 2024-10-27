"use client";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {  NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/authAction";
import { useEffect, useState } from "react";
import Notification from "./Notification";


export default function Navbar({notification,type}) {
  const logoColor = useColorModeValue("gray.900", "gray.400")
  const [show,setShow]=useState(false)
  const { user } = useSelector((store) => store.auth);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    setShow(notification.length?true:false)
  },[notification])
  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        px={10}
        position="sticky"
        top="0px"
        zIndex={"10"}
        minH="80px"
        display="grid"
        alignItems="center"
        borderBottom="0.5px solid"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Flex align="center" _hover={{ transform: "scale(1.05)", transition: "0.3s" ,cursor:"pointer"}} onClick={()=>navigate("/")}>
            <Box
              bg={logoColor}
              w="10"
              h="10"
              rounded="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr={2}
            >
              <Text fontSize="xl" fontWeight="bold" color="white">
                M
              </Text>
            </Box>
            <Text fontSize="lg" fontWeight="bold" color={logoColor}>
              Maruti Tech
            </Text>
          </Flex>
          { user?.role==="admin"&&<Text>Admin Dashboard</Text>}
          
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Notification show={show} setShow={setShow} notification={notification} type={type}/>
    
              <Button onClick={toggleColorMode} variant={"outline"} colorScheme="black" rounded={"full"}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    name={user?.username || "user name"}
                    border={"2px solid"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"xl"}
                      border={"2px solid"}
                      name={user?.username || "user name"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user?.username || "user name"}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={()=>{
                    navigate("/my-bids")
                  }}>My bids</MenuItem>
                  {user?.role==="admin" && (
                    <MenuItem onClick={() => navigate("/admin/create-product")}>
                      create product
                    </MenuItem>
                  )}
                  {!user?.username && (
                    <MenuItem onClick={() => navigate("/login")}>
                      Login / Register
                    </MenuItem>
                  )}
                  {user?.username && (
                    <MenuItem onClick={() => dispatch(logoutUser())}>
                      Logout
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
