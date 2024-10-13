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
const product={
  "type": "property",
  "title": "Luxury Villa",
  "description": "A beautiful villa located in the heart of the city with modern amenities and a spacious garden.",
  "startingPrice": 500000,
  "status": "available",
  "bids": [
    {
      "product": "6512d4f093f1f0bde1f7a67c",
      "user": { "name": "John Doe", "_id": "6512d4f093f1f0bde1f7a67b" },
      "amount": 550000,
      "status": "pending",
      "createdAt": "2024-10-10T10:00:00.000Z",
      "_id": "6512d4f093f1f0bde1f7a67d"
    },
    {
      "product": "6512d4f093f1f0bde1f7a67c",
      "user": { "name": "Jane Smith", "_id": "6512d4f093f1f0bde1f7a67e" },
      "amount": 600000,
      "status": "accepted",
      "createdAt": "2024-10-11T14:00:00.000Z",
      "_id": "6512d4f093f1f0bde1f7a67f"
    }
  ],
  "address": "123 Ocean Drive, Miami, FL",
  "photos": ["https://plus.unsplash.com/premium_photo-1689609950112-d66095626efb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D"],
  "number": "",
  "details": "5 bedrooms, 4 bathrooms, 2 garages",
  "vehicleType": ""
}

const ProductDetails = () => {
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
        {product.photos?.[0] && (
          <Image
            src={product.photos[0]}
            alt={product.title}
            boxSize="100%"
            objectFit="cover"
            mb={4}
          />
        )}

        <VStack align="start" spacing={2}>
          <HStack justify="space-between" width="100%">
            <Heading size="lg">{product.title}</Heading>
            <Badge
              colorScheme={product.status === "available" ? "green" : "red"}
            >
              {product.status}
            </Badge>
          </HStack>

          <Text fontSize="sm" color="gray.600">
            {product.type === "property"
              ? product.address
              : `${product.vehicleType} | ${product.number}`}
          </Text>
          <Text noOfLines={2}>{product.description}</Text>

          <Text fontWeight="bold" fontSize="lg">
            Starting Price: ${product.startingPrice}
          </Text>
          <Button colorScheme="blue" size="sm">
            Place Bid
          </Button>
        </VStack>
      </Box>

      <Heading size="md" mb={4}>
        Bids
      </Heading>
      {product.bids.length > 0 ? (
        product.bids.map((bid) => <SingleBidCard key={bid._id} bid={bid} />)
      ) : (
        <Text>No bids yet.</Text>
      )}
    </Box>
  );
};

export default ProductDetails;
