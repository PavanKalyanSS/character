import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Button, Flex, useToast, Text, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import CharacterCard from './CharacterCard ';

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true); // State to manage loading state
  const toast = useToast();

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true); // Set loading to true when fetching data
      const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
      setCharacters(response.data.results);
      setLoading(false); // Set loading to false after data is fetched
      window.scrollTo(0, 0); // Scroll to top when page changes
    };
    fetchCharacters();
  }, [page]);

  const handleFavorite = (character) => {
    // Check if the character is already in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorited = favorites.some(fav => fav.url === character.url);

    if (isAlreadyFavorited) {
      toast({
        title: 'Character already favorited',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } else {
      // Add character to favorites
      const updatedFavorites = [...favorites, character];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      // Update state or trigger a re-render to reflect the change
      toast({
        title: 'Character added to favorites',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      {loading ? ( // Display spinner while loading
        <Flex justify="center" align="center" minHeight="200px">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
            {characters.map(character => (
              <CharacterCard
                key={character.url}
                character={character}
                onFavorite={handleFavorite}
                showRemoveButton={false}
                // Adjusting card width and margin
                minWidth="250px"
                width="100%"
                margin="auto"
              />
            ))}
          </SimpleGrid>
          <Flex mt={8} justifyContent="center" alignItems="center">
            <Button 
              colorScheme="teal" 
              onClick={() => setPage(page - 1)} 
              disabled={page === 1}
              mx={2}
            >
              Previous
            </Button>
            <Text mx={4}>Page {page}</Text>
            <Button 
              colorScheme="teal" 
              onClick={() => setPage(page + 1)} 
              mx={2}
            >
              Next
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default CharactersList;
