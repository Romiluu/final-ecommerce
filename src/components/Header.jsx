import { Link } from "react-router-dom";
import { Flex, Box, Spacer, Button, Icon, Badge } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";


const Header = () => {
  return (
    <Flex
      as="nav"
      bgGradient="linear(to-r, purple.500, pink.700)" // Degradado violeta a magenta
      p={4}
      align="center"
      boxShadow="md"
      borderBottom="2px solid pink.600"
    >
      {/* Logo o Home - Sin hover */}
      <Box>
        <Link to="/">
          <Button
            variant="ghost"
            fontSize="xl"
            fontWeight="bold"
            color="white"
            _hover={{ bg: "transparent" }} 
            _active={{ bg: "transparent" }} 
          >
            CodeMaster Academy
          </Button>
        </Link>
      </Box>

      {/* Links de navegación - Hover igual a "Registrarse" */}
      <Flex gap={4} ml="auto">
        <Link to="/">
          <Button variant="ghost" color="white" _hover={{ bg: "pink.600", color: "white" }}>
            Home
          </Button>
        </Link>
        <Link to="/courses">
          <Button variant="ghost" color="white" _hover={{ bg: "pink.600", color: "white" }}>
            Lista de Cursos
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="outline" colorScheme="whiteAlpha" _hover={{ bg: "pink.600", color: "white" }}>
            Iniciar Sesión
          </Button>
        </Link>
        <Link to="/register">
          <Button colorScheme="whiteAlpha">Registrarse</Button>
        </Link>
      </Flex>

      {/* Icono del carrito */}
      <Box position="relative" ml={4}>
        <Link to="/carrito">
          <Button variant="ghost" color="white" _hover={{ bg: "pink.600", color: "white" }}>
            <Icon as={FaShoppingCart} boxSize={6} />
            <Badge
              colorScheme="red"
              borderRadius="full"
              position="absolute"
              top="-2px"
              right="-2px"
              fontSize="xs"
              px={2}
            >
              3 {/* Cambiar esto por el estado del carrito */}
            </Badge>
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;
