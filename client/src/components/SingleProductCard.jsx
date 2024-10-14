import { Box, Image, Text, Badge, VStack, HStack, Button } from "@chakra-ui/react";
import BidForm from "./BidForm";
import { useNavigate } from "react-router-dom";

const SingleProductCard = ({ product }) => {
const navigate=useNavigate()
  return (
    <Box
      minW={"70%"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      w={{ base: "100%", sm: "100%", md: "45%", lg: "30%" }}
      mx="auto"
    >
      {product.photos?.[0] && (
        <Image
          _hover={{cursor:"pointer"}}
          onClick={()=>{navigate("product/"+product._id)}}
          src={product.photos[0]}
          alt={product.title}
          
          mb={4}
        />
      )}
      <VStack align="start" spacing={2} >
        <HStack justify="space-between" width="100%">
          <Text fontWeight="bold" fontSize="xl">
            {product.title}
          </Text>
          <Badge colorScheme={product.status === "available" ? "green" : "red"}>
            {product.status}
          </Badge>
        </HStack>
        <Text fontSize="sm" color="gray.600">
          {product.type === "property" ? product.address : `${product.vehicleType} | ${product.number}`}
        </Text>
        <Text noOfLines={2}>{product.description}</Text>
        <Text fontWeight="bold" fontSize="lg">
          Starting Price: ${product.startingPrice}
        </Text>
        <BidForm productId={product._id} />
      </VStack>
    </Box>
  );
};

export default SingleProductCard;
