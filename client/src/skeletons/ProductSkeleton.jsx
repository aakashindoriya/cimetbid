import { Box, Skeleton, VStack, HStack } from "@chakra-ui/react";

const SkeletonCard = () => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="lg"
      display={"grid"}
      alignItems={"center"}
    >
      <Skeleton height="275px" mb={4} />
      <VStack align="start" spacing={3}>
        <HStack justify="space-between" width="100%">
          <Skeleton height="20px" width="60%" />
          <Skeleton height="20px" width="30%" />
        </HStack>
        <Skeleton height="15px" width="100%" />
        <Skeleton height="20px" width="40%" />
        <Skeleton height="15px" width="100%" />
      </VStack>
    </Box>
  );
};

export default SkeletonCard;
