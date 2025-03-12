import errorImage from "../assets/notfound.jpg";
import { Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      textAlign="center"
      p={8}
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading as="h1" size="2xl" color="red.500" mb={0}>
        404 NOT FOUND
      </Heading>
      <Text fontSize="xl" color="gray.600" mb={0}>
        Lo sentimos, la página que buscas no existe.
      </Text>

      <Image
        src={errorImage}
        alt="Error 404"
        boxSize="500px"
        objectFit="contain"
        mb={0}
      />

      <Link to="/">
        <Button colorScheme="purple">Volver a la página principal</Button>
      </Link>
    </Box>
  );
};

export default NotFound;
