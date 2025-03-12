import { useAuth } from "../context/AuthContext"; // Importa el contexto de autenticación
import { Box, Text, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const MisDatos = () => {
  const { user } = useAuth(); // Obtener datos del usuario
  const navigate = useNavigate();

  if (!user) {
    return <Text>No estás autenticado.</Text>; // Si no hay usuario, muestra un mensaje
  }

  // Formatear la fecha de creación
  const creationDate = new Date(user.metadata.creationTime).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Box 
      maxW="500px" 
      mx="auto" 
      p={6} 
      mt={6} 
      borderWidth={1} 
      borderRadius="lg" 
      boxShadow="0px 4px 10px rgba(255, 105, 180, 0.4)" // Sombra rosa
    >
      <Heading size="lg" mb={4} color="purple.600" fontWeight="medium">
        Mis Datos
      </Heading>

      <Text fontSize="lg" fontWeight="medium">
        Nombre: <Text as="span" fontWeight="normal" color="gray.500">{user.displayName || "No registrado"}</Text>
      </Text>
      <Text fontSize="lg" fontWeight="medium">
        Email: <Text as="span" fontWeight="normal" color="gray.500">{user.email}</Text>
      </Text>
      <Text fontSize="lg" fontWeight="medium">
        Fecha de creación de cuenta: <Text as="span" fontWeight="normal" color="gray.500">{creationDate}</Text>
      </Text>

      <Button mt={4} colorScheme="purple" onClick={() => navigate("/")}>
        Volver al inicio
      </Button>
    </Box>
  );
};

export default MisDatos;
