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
} from "@chakra-ui/react";
import { db } from "../firebase/FireBaseConfig";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = collection(db, "courses");
      const coursesSnapshot = await getDocs(coursesCollection);
      const courseList = coursesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Aquí obtenemos el id correcto
      }));
      setCourses(courseList);
    };

    fetchCourses();
  }, []);

  return (
    <Box p={10} mt={{ base: "130", md: "50px" }}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3 }} spacing={6}>
        {courses.map((course) => (
          <Card
            key={course.id} // Usamos id en lugar de uid
            maxW={{ base: "100%", sm: "xs" }}
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
              boxSize="auto"
              objectFit="cover"
              height={{ base: "200px", sm: "300px" }}
              width="100%"
            />

            <CardBody p={4}>
              <Heading size="md" color="purple.700">
                {course.name}
              </Heading>
            </CardBody>

            <CardFooter justify="space-between" flexDirection="row" p={4}>
              <Link to={`/courses/${course.id}`}> {/* Se corrige la ruta */}
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
