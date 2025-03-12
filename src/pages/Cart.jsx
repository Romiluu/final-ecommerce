import { useCart } from "../context/CartContext";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Image,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importar el contexto de autenticación

const Cart = () => {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const { user } = useAuth(); // Obtener el usuario del contexto de autenticación
  const toast = useToast();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <Box textAlign="center" p={10}>
        <Heading size="xl" mb={6} color="purple.600">🛒 Carrito vacío</Heading>
        <Text>No tienes cursos en el carrito.</Text>
        <Link to="/courses">
          <Button bg="purple.500" color="white" _hover={{ bg: "purple.700" }} mt={4}>
            Volver a la tienda
          </Button>
        </Link>
      </Box>
    );
  }

  // Función para manejar la finalización de la compra
  const handleCheckout = () => {
    toast({
      title: "Compra Finalizada",
      description: "¡Tu compra ha sido realizada con éxito!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    clearCart();
    navigate("/");
  };

  return (
    <Box p={10} maxW="800px" mx="auto">
      <Heading size="xl" mb={6} color="purple.600">Carrito de Compras</Heading>

      <VStack spacing={4} align="start" width="100%" >
        {cart.map((course) => (
          <Box 
            key={course.id} 
            p={4} 
            borderWidth="1px" 
            borderRadius="lg" 
            width="100%"
            boxShadow="0 4px 8px rgba(236, 72, 153, 0.5)"
            borderColor="pink.400"
          >
            <VStack align="center" spacing={3}>
              {course.image_url && (
                <Image src={course.image_url} alt={course.name} boxSize="150px" borderRadius="md" />
              )}
              <Heading as="h3" size="md" color="purple.700">{course.name}</Heading>
              <Text>Precio: <strong>${course.price}</strong></Text>
              <Text>Cantidad: {course.quantity}</Text>
              <Button 
                bg="pink.500" 
                color="white" 
                size="sm" 
                _hover={{ bg: "pink.700" }}
                onClick={() => removeFromCart(course.id)}
              >
                Eliminar
              </Button>
            </VStack>
          </Box>
        ))}

        <Divider my={4} borderColor="pink.400" />

        <Heading size="lg" color="purple.700">Total: ${total}</Heading>

        <VStack spacing={3} width="100%">
          <Button 
            bgGradient="linear(to-r, pink.500, purple.600)" 
            color="white" 
            width="100%" 
            _hover={{ bgGradient: "linear(to-r, pink.600, purple.700)" }}
            onClick={handleCheckout} // Solo ejecutará la compra si el usuario está autenticado
          >
            Finalizar Compra
          </Button>
          <Button 
            bg="purple.500" 
            color="white" 
            width="100%" 
            _hover={{ bg: "purple.700" }} 
            onClick={clearCart}
          >
            Vaciar Carrito
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Cart;
