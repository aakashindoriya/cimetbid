import React from 'react';
import { Box, Image, Text, Divider, Flex, MenuItem } from '@chakra-ui/react';

const ProductNotification = ({el,navigate}) => {
  

  return (
   <MenuItem onClick={()=>navigate("product/"+el._id)}>
   <Box>
   <Text textAlign={"center"}>new product added</Text>
    <Flex
      minW={"200"}
      p={4}
      borderWidth={1}
      borderRadius="lg"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="md"
    >
      <Image 
        src={el.photos[0]} 
        alt={el.title} 
        boxSize="50px" 
        objectFit="cover" 
        borderRadius="md" 
      />
      <Divider orientation="vertical" mx={4} />
      <Box>
        <Text fontWeight="bold">{el.title}</Text>
        <Text color="green.500">${el.startingPrice}</Text>
      </Box>
    </Flex>
   </Box>
   </MenuItem>
  );
};

export default ProductNotification ;
