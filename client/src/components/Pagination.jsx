import { Box, Button, HStack } from "@chakra-ui/react";
export const Pagination = ({ changePage ,totalpages, page}) => {

  return (
    <Box w="100%" m="5">
      <HStack w="40%" m="auto">
        <Button
          colorScheme="black"
          variant="outline"
          disabled={page == 1}
          onClick={() => changePage(page - 1)}>
          Prev
        </Button>
        <Button colorScheme="green">{page}</Button>
        {totalpages > page + 1 && (
          <Button
            colorScheme="black"
            variant="outline"
            onClick={() => changePage(page + 1)}>
            {page + 1}
          </Button>
        )}
        {totalpages > page + 2 && (
          <Button colorScheme="black" variant="outline" disabled="true">
            ...
          </Button>
        )}
        {totalpages >= page + 1 && (
          <Button
            colorScheme="black"
            
            onClick={() => changePage(totalpages)}>
            {totalpages}
          </Button>
        )}
        <Button
          colorScheme="black"
          variant="outline"
          disabled={page == totalpages}
          onClick={() => changePage(page + 1)}>
          Next
        </Button>
      </HStack>
    </Box>
  );
};
