import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/FireBaseConfig"; // Importa la configuración de Firebase
import { Box, Button, Center, Heading, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import CodeMasterImage from "../assets/CodeMaster.png";

const Home = () => {
  const [courses, setCourses] = useState([]); // Estado para almacenar los cursos

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses")); // "courses" es la colección en Firebase
        const coursesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };

    fetchCourses();
  }, []);

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
            to="/courses"
            bg="white"
            color="#AA60C8"
            fontWeight="bold"
            _hover={{ bg: "#AA60C8", color: "white" }}
            _active={{ bg: "#AA60C8", color: "white" }}
            borderRadius="30px"
            px="8"
            py="3"
            border="2px solid #AA60C8"
          >
            Ver Cursos Disponibles
          </Button>

          {/* Grid de Cursos desde Firebase */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={8}>
            {courses.map((course) => (
              <Box key={course.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md">
                <Image src={course.image} alt={course.name} borderRadius="md" />
                <VStack align="start" spacing={3} mt={4}>
                  <Heading as="h3" size="md">{course.name}</Heading>
                  <Text fontSize="lg" fontWeight="bold" color="#AA60C8">{course.price}</Text>
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
