import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/FireBaseConfig";
import { Box, Center, Heading, Image, SimpleGrid, Text, VStack, Flex } from "@chakra-ui/react";  
import CodeMasterImage from "../assets/CodeMaster.png";
import AboutImage from "../assets/about.jpg"; 
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Box minHeight="100vh" p={{ base: 4, md: 8, lg: 10 }} pt={0} mt={0}>
      {/* Sección de Introducción */}
      <Center>
        <VStack spacing={6} textAlign="center" maxWidth="800px" mx="auto">
        <Image 
          src={CodeMasterImage} 
          alt="CodeMaster" 
          maxWidth={{ base: "90%", md: "70%", lg: "70%" }} 
          height="auto"
        />
        <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="purple.600">
          CONOCE NUESTROS CURSOS
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" maxWidth="700px" fontWeight="normal">
          Explora nuestra selección de cursos diseñados para brindarte las mejores habilidades en programación y tecnología. 
          Ya sea que busques iniciarte en la programación o mejorar tus conocimientos, tenemos opciones para ti.
        </Text>

        {/* Botón "Ver Cursos Disponibles" */}
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
      </VStack>
      </Center>

      {/* Grid de Cursos */}
      <Center mt={10}>
        <SimpleGrid 
          columns={{ base: 1, sm: 2, md: 2, lg: 3 }} 
          spacing={{ base: 4, md: 6 }} 
          w="100%" 
          maxW="1200px"
        >
          {courses.map((course) => (
            <Box 
              key={course.id} 
              borderWidth="1px" 
              borderRadius="lg" 
              overflow="hidden" 
              p={{ base: 4, lg: 3 }} 
              maxW={{ base: "100%", md: "400px", lg: "250px" }}  
              boxShadow="0px 4px 10px rgba(255, 105, 180, 0.5)"
            >
              <Image src={course.image_url} alt={course.name} borderRadius="md" />
              <VStack align="start" spacing={3} mt={4}>
                <Heading as="h3" size="md">{course.name}</Heading>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Center>

      {/* Sección Sobre Nosotros */}
      <Box mt={20} p={{ base: 6, md: 12 }}>
        <Flex 
          direction={{ base: "column", md: "column", lg: "row" }} 
          align="center" 
          justify="center" 
          gap={12}
        >
          <Image 
            src={AboutImage} 
            alt="Sobre Nosotros" 
            borderRadius="md" 
            boxShadow="xl" 
            maxWidth={{ base: "90%", md: "500px" }} 
            height="auto"
          />
          <Box maxWidth="800px" textAlign="center">
            <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="purple.600">
              Sobre Nosotros
            </Heading>
            <Text fontSize="xl" mt={6}>
              ¿Quiénes somos?
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} fontWeight="normal" color="gray.600" mt={4}>
              En CodeMaster Academy, nos apasiona ofrecer formación de calidad en tecnología. Nuestro objetivo es ayudarte a adquirir habilidades en programación, desarrollo web y otras tecnologías clave para mejorar tu carrera profesional.
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} fontWeight="normal" color="gray.600" mt={4}>
              Nuestros cursos son accesibles, flexibles y están diseñados para que puedas aprender a tu propio ritmo. Desde los fundamentos hasta los niveles más avanzados, tenemos opciones para todos.
            </Text>
          </Box>
        </Flex>
      </Box>

    </Box>
  );
};

export default Home;
