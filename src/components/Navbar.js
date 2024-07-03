import React from 'react';
import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box bg="teal.500" p={4} boxShadow="md">
      <Flex alignItems="center">
        <Heading color="white" size="md">
          Star Wars Characters
        </Heading>
        <Spacer />
        <Button 
          as={Link} 
          to="/" 
          colorScheme="teal" 
          variant="solid" 
          bg="white"
          color="teal.500"
          mx={2}
        >
          Home
        </Button>
        <Button 
          as={Link} 
          to="/favorites" 
          colorScheme="teal" 
          variant="solid" 
          bg="white"
          color="teal.500" 
          mx={2}
        >
          Favorites
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
