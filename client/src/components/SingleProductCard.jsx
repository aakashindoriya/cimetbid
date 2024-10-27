import {
  Box,
  Image,
  Text,
  Badge,
  VStack,
  HStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import BidForm from "./BidForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Delete from "./Delete";

const SingleProductCard = ({ product }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <Box
      minW={"90%"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="lg"
      w={{ base: "100%", sm: "100%", md: "45%", lg: "30%" }}
      mx="auto"
      bg={bgColor}
      display={"grid"}
      alignItems={"center"}
    >
      {product.photos?.[0] && (
        <Box pos="relative">
          <Image
          _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
          onClick={() => navigate("product/" + product._id)}
          src={product.photos[0]}
          alt={product.title}
          m="auto"
          mb={4}
          borderRadius="md"
          boxSize="275px"
          objectFit="cover"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "/path/to/placeholder.jpg"; 
          }}
        />
        <Badge pos="absolute" top="3%" left="3%" fontSize={"9px"} bg={useColorModeValue("green.100", "green.900")} color={useColorModeValue("black", "white")} colorScheme={product.status === "available" ? "green" : "red"}>
            {product.status}
          </Badge>
        </Box>
      )}
      <VStack align="start" spacing={3}>
        <HStack justify="space-between" width="100%">
          <Text fontWeight="bold" fontSize="lg">
            {product.title[0].toUpperCase()+product.title.slice(1,14)}{product.title.length>=15?"...":""}
          </Text>
          
        </HStack>
        
        <Text fontSize="sm" color="gray.600">
          {product.type === "property"
            ? product.address
            : `${product.vehicleType} | ${product.number}`}
        </Text>
        
        <Text fontWeight="bold" fontSize="m">
          Starting Price: ${product.startingPrice}
        </Text>
        {!user && <Text fontSize={"sm"} color={"red.400"}>Please log in to place a bid</Text>}
        {user && user?.role !== "admin" && <BidForm productId={product._id} />}
        {user?.role === "admin" && (
          <HStack w="100%" alignItems={"center"} justifyContent={"center"} >
            <Button
              colorScheme="black"
              variant={"outline"}
              width={"full"}
              fontSize={"sm"}
              onClick={() =>
                navigate("/admin/create-product?id=" + product._id)
              }
            >
              Edit Product
            </Button>
            <Delete productId={product._id} />
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default SingleProductCard;