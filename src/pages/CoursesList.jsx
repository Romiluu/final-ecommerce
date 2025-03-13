import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Image,
  Heading,
  Card,
  CardBody,
  CardFooter,
  SimpleGrid,
  Select, // Importa el Select para el filtro
} from "@chakra-ui/react";
import { db } from "../firebase/FireBaseConfig";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [sortOption, setSortOption] = useState(""); // Estado para la opción de orden

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = collection(db, "courses");
      const coursesSnapshot = await getDocs(coursesCollection);
      const courseList = coursesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCourses(courseList);
    };

    fetchCourses();
  }, []);

  // Función para ordenar los cursos según la opción seleccionada
  const handleSort = (option) => {
    let sortedCourses = [...courses];

    if (option === "price-asc") {
      sortedCourses.sort((a, b) => a.price - b.price); // Ordena por precio ascendente
    } else if (option === "price-desc") {
      sortedCourses.sort((a, b) => b.price - a.price); // Ordena por precio descendente
    } else if (option === "name-asc") {
      sortedCourses.sort((a, b) => a.name.localeCompare(b.name)); // Ordena por nombre A-Z
    } else if (option === "name-desc") {
      sortedCourses.sort((a, b) => b.name.localeCompare(a.name)); // Ordena por nombre Z-A
    }

    setCourses(sortedCourses);
    setSortOption(option);
  };

  return (
    <Box p={10} mt={{ base: "50px", md: "30px" }}>
  {/* Contenedor del filtro */}
  <Box mb={4} textAlign="right">
  <Select
  placeholder="Ordenar por"
  onChange={(e) => handleSort(e.target.value)}
  mb={4}
  maxW="300px"
  boxShadow="0 0 5px purple"
  borderColor="purple.500"
  _hover={{ bg: "purple.200" }}
  _focus={{ borderColor: "purple.300", boxShadow: "0 0 5px purple" }}
  sx={{
    option: {
      bg: "purple.200", // Color de fondo normal
      color: "black", // Color del texto
      _hover: { bg: "purple.300", color: "white" }, // Color al pasar el mouse
    },
  }}
>
  <option value="price-asc">Precio: Menor a Mayor precio</option>
  <option value="price-desc">Precio: Mayor a Menor precio</option>
  <option value="name-asc">Nombre: A-Z</option>
  <option value="name-desc">Nombre: Z-A</option>
</Select>

  </Box>

  {/* Cards de cursos */}
  <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing={6}>
    {courses.map((course) => (
      <Card
        key={course.id}
        maxW={{ base: "100%", sm: "sm" }}
        borderWidth="1px"
        borderColor="purple.300"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="0px 4px 10px rgba(255, 105, 180, 0.5)"
        bg="white"
        _hover={{
          transform: "scale(1.02)",
          boxShadow: "0px 6px 15px rgba(255, 105, 180, 0.7)",
          cursor: "pointer",
        }}
        transition="transform 0.3s ease, box-shadow 0.3s ease"
      >
        <Image
          src={course.image_url}
          alt={course.name}
          objectFit="contain"
          height={{ base: "180px", sm: "250px", md: "280px" }}
          width="100%"
        />

        <CardBody p={4}>
          <Heading size="md" color="purple.700">
            {course.name}
          </Heading>
        </CardBody>

        <CardFooter justify="space-between" flexDirection="row" p={4}>
          <Link to={`/courses/${course.id}`}>
            <Button colorScheme="purple" width="full">
              Ver Curso
            </Button>
          </Link>
        </CardFooter>
      </Card>
    ))}
  </SimpleGrid>
</Box>

  );
};

export default CoursesList;
