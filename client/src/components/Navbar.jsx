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
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  Heading,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/authAction";
import { useEffect, useState } from "react";
import Notification from "./Notification";


export default function Navbar({notification}) {
  const [show,setShow]=useState(false)

  const { user, token } = useSelector((store) => store.auth);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    setShow(notification.length?true:false)
  },[notification])
  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        position="sticky"
        top="0px"
        zIndex={"10"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <NavLink to="/">Logo</NavLink>
          </Box>
          { user?.role==="admin"&&<Text>Admin panal</Text>}
          
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Notification show={show} setShow={setShow} notification={notification} />
    
              <Button onClick={toggleColorMode}>
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
