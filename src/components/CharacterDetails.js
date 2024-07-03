import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Image, Text, Table, Tbody, Tr, Td, Stack, Heading, Button, VStack, Link, Divider } from '@chakra-ui/react';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
      setCharacter(response.data);

      const filmRequests = response.data.films.map(url => axios.get(url));
      const filmResponses = await Promise.all(filmRequests);
      setFilms(filmResponses.map(res => res.data.title));
    };
    fetchCharacter();
  }, [id]);

  if (!character) return <Text>Loading...</Text>;

  return (
    <>
    <Box p="6" bg="gray.100" borderRadius="lg" boxShadow="md">

     <div className="flex flex-row justify-between">
         <Stack direction={{ base: 'column', md: 'row' }} spacing="8" align="flex-start">
        <Box>
          <Image
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
            alt={character.name}
            borderRadius="md"
            boxShadow="lg"
            maxH="400px"
            objectFit="cover"
          />
        </Box>
        <Box>
          <Stack spacing="4">
            <Heading fontSize="3xl">{character.name}</Heading>
            <Table variant="unstyled">
              <Tbody>
                <Tr>
                  <Td fontWeight="bold">Height:</Td>
                  <Td>{character.height} cm</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Mass:</Td>
                  <Td>{character.mass} kg</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Hair Color:</Td>
                  <Td>{character.hair_color}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Skin Color:</Td>
                  <Td>{character.skin_color}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Eye Color:</Td>
                  <Td>{character.eye_color}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Birth Year:</Td>
                  <Td>{character.birth_year}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Gender:</Td>
                  <Td>{character.gender}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Stack>
        </Box>
        </Stack>

        
        
       <div className="mr-40">
       <Box mt="8">
            <Heading fontSize="xl" mb="4">Films Appeared in:</Heading>
            <VStack align="flex-start" spacing="8" mt="8">
            {films.map(film => (
                <Link key={film} href="#" color="teal.500">
                {film}
                </Link>
            ))}
            </VStack>
        </Box>
       </div>

     </div>
    </Box>

        <div className="flex justify-center items-center">
            {/* <Button 
                className="flex justify-center items-center"
                mt="8" 
                colorScheme="teal" 
                size="sm" 
                as="a" 
                href="/"
                >
                Back to Characters
            </Button> */}
        </div>

    </>
  );
};

export default CharacterDetail;
