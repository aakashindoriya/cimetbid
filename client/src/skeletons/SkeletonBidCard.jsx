import { Box, VStack, HStack, Skeleton, Badge } from "@chakra-ui/react";

const SkeletonBidCard = () => {
  return (
    <Box
    maxW="50%"
    minW="50%"
    margin={"auto"}
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    p={4}
    boxShadow="md"
    >
      <VStack align="start" spacing={2}>
        <HStack justify="space-between" width="100%">
          <Skeleton height="20px" width="40%" />
          <VStack gap={"20px"}>
            <Skeleton height="20px" width="20px" borderRadius="full" />
            <Badge>
              <Skeleton height="20px" width="50%" />
            </Badge>
          </VStack>
        </HStack>
        <Skeleton height="15px" width="60%" />
        <Skeleton height="15px" width="30%" />
      </VStack>
    </Box>
  );
};

export default SkeletonBidCard;
