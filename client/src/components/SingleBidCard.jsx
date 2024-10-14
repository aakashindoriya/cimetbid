import { Box, Text, Badge, VStack, HStack, Button } from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import {useDispatch, useSelector} from "react-redux"
import { deleteBid } from "../redux/actions/bidAction";
const SingleBidCard = ({ bid }) => {
  const dispatch =useDispatch()
  const {user}=useSelector((s)=>s.auth)
 
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
            {bid.user.username}
          </Text>
          <VStack gap={"20px"}>
            {
              bid.user._id===user?._id&&<MdDeleteOutline size={"20px"} onClick={()=>dispatch(deleteBid({ bidId:bid._id, productId:bid.product }))} />

            }
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
          </VStack>
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
