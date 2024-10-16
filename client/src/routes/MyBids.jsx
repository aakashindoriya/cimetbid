import React, { useEffect, useState } from 'react'
import {
    Box,
    Image,
    Text,
    VStack,
    HStack,
    Badge,
    Divider,
    Heading,
  } from '@chakra-ui/react';
import axios from "axios"
async function getData(){
    try {
        const {data} = await axios.get(`${import.meta.env.VITE_BASEURL}/bid/my-bids`,{
            headers:{
              Authorization:JSON.parse(localStorage.getItem("auth"))?.token||""
            }
          });
          return data;
    } catch (error) {
        return error
    }
}
const MyBids = () => {
    const [bids,setBids]=useState([])
    useEffect(()=>{
        getData().then((res)=>{
            setBids(res)
        }).catch(()=>{
            alert("somthing went wrong")
        })
    },[])
  return (
    <VStack spacing={4} align="stretch">
        {
            !bids.length &&(<Heading size={"xl"} textAlign={"center"} m="3">No bids yet</Heading>)
        }
      {bids.length && bids?.map((bid) => (
        <Box
          maxW="50%"
          minW="50%"
          margin={"auto"}
          key={bid._id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          boxShadow="md"
        >
          {bid.product ? (
            <>
              <HStack spacing={4}>
                <Image
                  src={bid.product.photos[0]}
                  alt={bid.product.title}
                  boxSize="100px"
                  objectFit="cover"
                />
                <VStack align="start">
                  <Text fontWeight="bold" fontSize="lg">
                    {bid.product.title}
                  </Text>
                  <Text>Type: {bid.product.type}</Text>
                  <Text>Starting Price: ${bid.product.startingPrice}</Text>
                  <Badge colorScheme="green">{bid.status}</Badge>
                </VStack>
              </HStack>
              <Divider my={2} />
              <Text>Bid Amount: ${bid.amount}</Text>
              <Text>Created At: {new Date(bid.createdAt).toLocaleString()}</Text>
            </>
          ) : (
            <Text fontStyle="italic" color="red.500">
              Product deleted
            </Text>
          )}
        </Box>
      ))}
    </VStack>
  )
}

export default MyBids