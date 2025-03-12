import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/FireBaseConfig";
import { Box, Center, Heading, Image, SimpleGrid, Text, VStack, Flex } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import CodeMasterImage from "../assets/CodeMaster.png";
import AboutImage from "../assets/about.jpg"; // Asegúrate de importar la imagen correcta

const Home = () => {
  const [courses, setCourses] = useState([]);
  const { addToCart } = useCart();

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
    <Box minHeight="100vh" p={10} pt={0} mt={0}>
      <Center>
        <VStack spacing={6} textAlign="center" maxWidth="800px" mx="auto">
          <Image src={CodeMasterImage} alt="CodeMaster" maxWidth="100%" height="auto" />
          <Heading fontSize="3xl" fontWeight="bold" color="purple.600">
            CONOCE NUESTROS CURSOS
          </Heading>
          <Text fontSize="lg" color="gray.600" maxWidth="700px" fontWeight="normal">
          Explora nuestra selección de cursos diseñados para brindarte las mejores habilidades en programación y tecnología. Ya sea que busques iniciarte en la programación o mejorar tus conocimientos, tenemos opciones para ti.
          </Text>
        </VStack>
      </Center>

      {/* Grid de Cursos */}
      <Center mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {courses.map((course) => (
            <Box 
              key={course.id} 
              borderWidth="1px" 
              borderRadius="lg" 
              overflow="hidden" 
              p={4} 
              boxShadow="0px 4px 10px rgba(255, 105, 180, 0.5)">
              <Image src={course.image_url} alt={course.name} borderRadius="md" />
              <VStack align="start" spacing={3} mt={4}>
                <Heading as="h3" size="md">{course.name}</Heading>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Center>

      {/* Sección Sobre Nosotros */}
      <Box mt={20} p={12}>
        <Flex direction={{ base: "column", md: "row" }} align="center" justify="center" gap={12}>
          <Image 
            src={AboutImage} 
            alt="Sobre Nosotros" 
            borderRadius="md" 
            boxShadow="xl" 
            maxWidth="500px" 
          />
          <Box maxWidth="800px">
            <Heading fontSize="3xl" fontWeight="bold" color="purple.600">
              Sobre Nosotros
            </Heading>
            <Text fontSize="xl" mt={6}>
              ¿Quiénes somos?
            </Text>
            <Text fontSize="lg" fontWeight="normal" color="gray.600" mt={4}>
              En CodeMaster Academy, nos apasiona ofrecer formación de calidad en tecnología. Nuestro objetivo es ayudarte a adquirir habilidades en programación, desarrollo web y otras tecnologías clave para mejorar tu carrera profesional.
            </Text>
            <Text fontSize="lg" fontWeight="normal" color="gray.600" mt={4}>
              Nuestros cursos son accesibles, flexibles y están diseñados para que puedas aprender a tu propio ritmo. Desde los fundamentos hasta los niveles más avanzados, tenemos opciones para todos.
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
