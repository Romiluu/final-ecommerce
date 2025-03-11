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
      const coursesCollection = collection(db, "courses"); // Asegúrate que la colección se llama 'courses'
      const coursesSnapshot = await getDocs(coursesCollection);
      const courseList = coursesSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Usa 'doc.id' en lugar de 'doc.uid'
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
            key={course.uid}
            maxW={{ base: "100%", sm: "xs" }}
            borderWidth="1px"
            borderColor="blue.500"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="xl"
            bg="white"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "lg",
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
              <Heading size="md" color="blue.700">
                {course.name}
              </Heading>
            </CardBody>

            <CardFooter justify="space-between" flexDirection="row" p={4}>
              <Link to={`/course/${course.uid}`}>
                <Button colorScheme="blue" width="full">
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
