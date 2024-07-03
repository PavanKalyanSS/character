import React from 'react';
import { Box, Image, Text, Button, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const CharacterCard = ({ character, onFavorite, onRemoveFavorite, showRemoveButton }) => {
  const handleFavorite = () => {
    onFavorite(character);
  };

  const handleRemoveFavorite = () => {
    onRemoveFavorite(character);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" bg="white" boxShadow="md" width="340px" height="350px">
      <VStack>
        <Image
          width="160px"
          src={`https://starwars-visualguide.com/assets/img/characters/${character.url.split('/')[5]}.jpg`}
          alt={character.name}
          mb="4"
          borderRadius="md"
          height="160px"
          objectFit="cover"
        />
        <Text fontWeight="bold" fontSize="md" textAlign="center">{character.name}</Text>
        {showRemoveButton && (
          <Button 
            mt="4" 
            colorScheme="red" 
            size="sm" 
            onClick={handleRemoveFavorite}
          >
            Remove from Favorites
          </Button>
        )}
        {!showRemoveButton && (
          <Button 
            mt="4" 
            colorScheme="teal" 
            size="sm" 
            onClick={handleFavorite}
          >
            Add to Favorites
          </Button>
        )}
        {!showRemoveButton && (
          <Button 
            mt="4" 
            colorScheme="blue" 
            size="sm" 
            as={RouterLink} 
            to={`/character/${character.url.split('/')[5]}`}
          >
            More Info
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default CharacterCard;
