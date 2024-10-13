import { Box, Button, Heading, Text, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Center height="100vh" flexDirection="column">
      <Box textAlign="center">
        <Heading as="h1" size="2xl" mb={4}>
          404 - Page Not Found
        </Heading>
        <Text fontSize="xl" mb={4}>
          The page you are looking for does not exist.
        </Text>
        <Button colorScheme="teal" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Box>
    </Center>
  );
};

export default NotFound;
