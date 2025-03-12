import {
    Card as CardChakra,
    CardBody,
    Heading,
    Image,
    Stack,
    Text,
    Button,
    Box,
    useToast,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/FireBaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { getAuth } from "firebase/auth";

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const toast = useToast();
    
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const auth = getAuth();
    const isAuthenticated = auth.currentUser !== null;

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const docRef = doc(db, "courses", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCourse({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError("Curso no encontrado");
                }
            } catch {
                setError("Hubo un problema al cargar el curso");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCourse();
        }
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Text fontSize="2xl">Cargando...</Text>
            </Box>
        );
    }

    if (error) {
        return <Text color="red.500">{error}</Text>;
    }

    if (!course) {
        return <Text>No se encontró el curso.</Text>;
    }

    const { name, description, price, image_url } = course;

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            toast({
                title: "Necesitas iniciar sesión",
                description: "Por favor, inicia sesión para agregar cursos al carrito.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return navigate("/login");
        }

        addToCart({ id: course.id, name, price, image_url });
        toast({
            title: "Curso agregado al carrito",
            description: "¡El curso ha sido agregado con éxito al carrito!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">

            <CardChakra maxW="800px" width="100%" boxShadow="0px 4px 10px rgba(255, 105, 180, 0.5)" margin="auto">
                <CardBody>
                    <Box display="flex" justifyContent="center">
                        <Image
                            src={image_url}
                            alt={name}
                            borderRadius="lg"
                            boxSize="100%"
                            maxWidth="400px"
                            objectFit="cover"
                            mt={4}
                        />
                    </Box>
                    <Stack mt="6" spacing="3" textAlign="center">
                        <Heading color="purple.500" size="md">{name}</Heading>
                        <Text fontWeight="normal" color="gray.600">{description}</Text>
                        <Text color="pink.400" fontSize="2xl" fontWeight="bold">${price}</Text>
                        <Box display="flex" justifyContent="center" gap={4} mt={4}>
                            <Button colorScheme="purple" onClick={() => navigate(-1)}>Atrás</Button>
                            <Button colorScheme="purple" onClick={handleAddToCart} leftIcon={<FaShoppingCart />}>
                                Agregar al carrito
                            </Button>
                        </Box>
                    </Stack>
                </CardBody>
            </CardChakra>
        </Box>
    );
};

export default CourseDetails;
