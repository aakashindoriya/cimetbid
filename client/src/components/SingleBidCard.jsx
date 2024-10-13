import { Box, Text, Badge, VStack, HStack } from "@chakra-ui/react";

const SingleBidCard = ({ bid }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      boxShadow="md"
      w="100%"
      mb={4}
    >
      <VStack align="start" spacing={2}>
        <HStack justify="space-between" width="100%">
          <Text fontWeight="bold" fontSize="lg">
            {bid.user.name}
          </Text>
          <Badge
            colorScheme={
              bid.status === "accepted"
                ? "green"
                : bid.status === "rejected"
                ? "red"
                : "yellow"
            }
          >
            {bid.status}
          </Badge>
        </HStack>
        <Text fontSize="sm" color="gray.600">
          Bid Amount: ${bid.amount}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {new Date(bid.createdAt).toLocaleString()}
        </Text>
      </VStack>
    </Box>
  );
};

export default SingleBidCard;
