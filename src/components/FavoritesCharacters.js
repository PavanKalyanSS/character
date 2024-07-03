import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import CharacterCard from './CharacterCard ';

const FavoritesCharacters = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch favorites from localStorage on component mount
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const removeFromFavorites = (characterToRemove) => {
    // Filter out the character to remove from favorites
    const updatedFavorites = favorites.filter(character => character.url !== characterToRemove.url);
    setFavorites(updatedFavorites);
    
    // Update localStorage with updated favorites list
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return <Text p={4}>No favorite characters found.</Text>;
  }

  return (
    <Box p={4}>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
        {favorites.map(character => (
          <CharacterCard
            key={character.url}
            character={character}
            onRemoveFavorite={removeFromFavorites}
            showRemoveButton={true} // Show Remove button for favorites
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default FavoritesCharacters;
