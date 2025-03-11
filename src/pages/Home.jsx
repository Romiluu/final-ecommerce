import { Box, Button, Center, Heading, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import CodeMasterImage from "../assets/CodeMaster.png";

const products = [
  { id: 1, name: "curso1", price: "$120.000", image: "/ruta-a-la-imagen-pala.png" },
  { id: 2, name: "curso2", price: "$15.000", image: "/ruta-a-la-imagen-pelotas.png" },
  { id: 3, name: "curso3", price: "$95.000", image: "/ruta-a-la-imagen-zapatillas.png" },
];

const Home = () => {
  return (
    <Box minHeight="100vh" p={10} pt={0} mt={0}>

      <Center>
        <VStack spacing={6} textAlign="center" maxWidth="800px" mx="auto">
          {/* Imagen de CodeMaster */}
          <Image src={CodeMasterImage} alt="CodeMaster" maxWidth="100%" height="auto" />



          <Heading fontSize="3xl" fontWeight="bold" color="purple.600">
            CONOCE NUESTROS CURSOS
          </Heading>

          <Text fontSize="lg" color="gray.600" maxWidth="700px" fontWeight="normal">
            Explora nuestra selección de cursos diseñados para brindarte las mejores habilidades en programación y tecnología. 
            Ya sea que busques iniciarte en la programación o mejorar tus conocimientos, tenemos opciones para ti.
        </Text>


          {/* Botón de Productos */}
          <Button
            as={RouterLink}
            to="/products"
            bg="white"
            color="#AA60C8"
            fontWeight="bold"
            _hover={{ bg: "#AA60C8", color: "white" }}
            _active={{ bg: "#AA60C8", color: "white" }}
            borderRadius="30px"
            px="8"
            py="3"
            border="2px solid #AA60C8">
            Ver Cursos Disponibles
          </Button>

          {/* Grid de Productos */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={8}>
            {products.map((product) => (
              <Box key={product.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md">
                <Image src={product.image} alt={product.name} borderRadius="md" />
                <VStack align="start" spacing={3} mt={4}>
                  <Heading as="h3" size="md">{product.name}</Heading>
                  <Text fontSize="lg" fontWeight="bold" color="#AA60C8">{product.price}</Text>
                  <Button colorScheme="purple">Ver Detalle</Button>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Center>
    </Box>
  );
};

export default Home;
