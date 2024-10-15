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
    >
      {product.photos?.[0] && (
        <Image
          _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
          onClick={() => navigate("product/" + product._id)}
          src={product.photos[0]}
          alt={product.title}
          mb={4}
          borderRadius="md"
          boxSize="275px"  
          objectFit="cover"  
        />
      )}
      <VStack align="start" spacing={3}>
        <HStack justify="space-between" width="100%">
          <Text fontWeight="bold" fontSize="xl">
            {product.title}
          </Text>
          <Badge colorScheme={product.status === "available" ? "green" : "red"}>
            {product.status}
          </Badge>
        </HStack>
        <Text fontSize="sm" color="gray.600">
          {product.type === "property"
            ? product.address
            : `${product.vehicleType} | ${product.number}`}
        </Text>
        <Text fontWeight="bold" fontSize="lg">
          Starting Price: ${product.startingPrice}
        </Text>
        {!user && <Text>Please log in to place a bid</Text>}
        {user && user?.role !== "admin" && <BidForm productId={product._id} />}
        {user?.role === "admin" && (
          <Button
            colorScheme="teal"
            onClick={() => navigate("/admin/create-product?id=" + product._id)}
          >
            Edit Product
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default SingleProductCard;
