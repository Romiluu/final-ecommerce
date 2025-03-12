import { Link, useNavigate } from "react-router-dom";
import { Flex, Box, Button, Icon, Badge } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Importar contexto de autenticación
import { useCart } from "../context/CartContext"; // Importar contexto de carrito

const Header = () => {
  const { user, logout } = useAuth(); // Obtener usuario y función de logout
  const { cart } = useCart(); // Obtener carrito desde el contexto
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirigir al login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  // Calcular la cantidad total de cursos en el carrito
  const totalQuantity = cart.reduce((total, course) => total + course.quantity, 0);

  return (
    <Flex
      as="nav"
      bgGradient="linear(to-r, purple.500, pink.700)" // Degradado violeta a magenta
      p={4}
      align="center"
      boxShadow="md"
      borderBottom="2px solid pink.600"
    >
      {/* Logo o Home */}
      <Box>
        <Link to="/">
          <Button variant="ghost" fontSize="xl" fontWeight="bold" color="white" _hover={{ bg: "transparent" }}>
            CodeMaster Academy
          </Button>
        </Link>
      </Box>

      {/* Links de navegación */}
      <Flex gap={4} ml="auto">
        <Link to="/">
          <Button variant="ghost" color="white" _hover={{ bg: "pink.600" }}>
            Home
          </Button>
        </Link>
        <Link to="/courses">
          <Button variant="ghost" color="white" _hover={{ bg: "pink.600" }}>
            Lista de Cursos
          </Button>
        </Link>

        {user ? (
          // Si el usuario está autenticado, mostrar "Mis Datos" y "Cerrar Sesión"
          <>
            <Link to="/datos">
              <Button variant="outline" colorScheme="whiteAlpha" _hover={{ bg: "pink.600", color: "white" }}>
                Mis Datos
              </Button>
            </Link>
            <Button colorScheme="whiteAlpha" _hover={{ bg: "pink.600", color: "white" }} onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </>
        ) : (
          // Si no está autenticado, mostrar "Iniciar Sesión" y "Registrarse"
          <>
            <Link to="/login">
              <Button variant="outline" colorScheme="whiteAlpha" _hover={{ bg: "pink.600", color: "white" }}>
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/register">
              <Button colorScheme="whiteAlpha">Registrarse</Button>
            </Link>
          </>
        )}
      </Flex>

      {/* Icono del carrito */}
      <Box position="relative" ml={4}>
        <Link to="/cart">
          <Button variant="ghost" color="white" _hover={{ bg: "pink.600" }}>
            <Icon as={FaShoppingCart} boxSize={6} />
            <Badge colorScheme="red" borderRadius="full" position="absolute" top="-2px" right="-2px" fontSize="xs" px={2}>
              {totalQuantity} {/* Mostrar la cantidad total de cursos en el carrito */}
            </Badge>
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;

