import {
  Box,
  Image,
  Text,
  Badge,
  VStack,
  HStack,
  Button,
  Heading,
} from "@chakra-ui/react";
import SingleBidCard from "../components/SingleBidCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../redux/actions/productAction";
import { useEffect } from "react";


const ProductDetails = () => {
  const {id} =useParams()
  const dispatch=useDispatch()
  const {selectedProduct} =useSelector(store=>store.product)
  const product=selectedProduct
  useEffect(()=>{
    dispatch(getProductById(id))
  },[])

  return (
    <Box p={4} mx="auto" maxW="3xl">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        boxShadow="md"
        mb={6}
      >
        {product?.photos&&product.photos?.[0] && (
          <Image
            src={product?.photos?.[0]}
            alt={product.title}
            boxSize="100%"
            objectFit="cover"
            mb={4}
          />
        )}

        <VStack align="start" spacing={2}>
          <HStack justify="space-between" width="100%">
            <Heading size="lg">{product?.title}</Heading>
            <Badge
              colorScheme={product?.status === "available" ? "green" : "red"}
            >
              {product?.status}
            </Badge>
          </HStack>

          <Text fontSize="sm" color="gray.600">
            {product?.type === "property"
              ? product.address
              : `${product?.vehicleType} | ${product?.number}`}
          </Text>
          <Text noOfLines={2}>{product?.description}</Text>

          <Text fontWeight="bold" fontSize="lg">
            Starting Price: ${product?.startingPrice}
          </Text>
        </VStack>
      </Box>

      <Heading size="md" mb={4}>
        Bids
      </Heading>
      {product?.bids?.length > 0 ? (
        product?.bids.map((bid) => <SingleBidCard key={bid._id} bid={bid} />)
      ) : (
        <Text>No bids yet.</Text>
      )}
    </Box>
  );
};

export default ProductDetails;
