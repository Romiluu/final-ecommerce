import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Button,
  Icon,
  Badge,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Estado del menú móvil
  const isMobile = useBreakpointValue({ base: true, md: false }); 

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const totalQuantity = cart.reduce((total, course) => total + course.quantity, 0);

  return (
    <Flex
      as="nav"
      bgGradient="linear(to-r, purple.500, pink.700)"
      p={4}
      align="center"
      justify="space-between"
      boxShadow="md"
      borderBottom="2px solid pink.600"
    >
      {/* Logo */}
      <Box>
        <Link to="/">
          <Button variant="ghost" fontSize="xl" fontWeight="bold" color="white" _hover={{ bg: "transparent" }}>
            CodeMaster Academy
          </Button>
        </Link>
      </Box>

      {/* Menú de navegación */}
      {isMobile ? (
        <>
          {/* Icono de hamburguesa */}
          <IconButton
            Icon as={FaBars}
            variant="outline"
            color="white"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menú"
          />

          {/* Drawer para móviles */}
          <Drawer isOpen={isOpen} placement="right" onClose={() => setIsOpen(false)}>
            <DrawerOverlay />
            <DrawerContent bg="purple.800">
              <DrawerCloseButton color="white" />
              <DrawerBody>
                <VStack spacing={4} mt={10} align="start">
                  <Link to="/">
                    <Button variant="ghost" color="white" _hover={{ bg: "pink.600" }} onClick={() => setIsOpen(false)}>
                      Home
                    </Button>
                  </Link>
                  <Link to="/courses">
                    <Button variant="ghost" color="white" _hover={{ bg: "pink.600" }} onClick={() => setIsOpen(false)}>
                      Lista de Cursos
                    </Button>
                  </Link>

                  {user ? (
                    <>
                      <Link to="/datos">
                        <Button variant="outline" colorScheme="whiteAlpha" onClick={() => setIsOpen(false)}>
                          Mis Datos
                        </Button>
                      </Link>
                      <Button colorScheme="whiteAlpha" onClick={handleLogout}>
                        Cerrar Sesión
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button variant="outline" colorScheme="whiteAlpha" onClick={() => setIsOpen(false)}>
                          Iniciar Sesión
                        </Button>
                      </Link>
                      <Link to="/register">
                        <Button colorScheme="whiteAlpha" onClick={() => setIsOpen(false)}>
                          Registrarse
                        </Button>
                      </Link>
                    </>
                  )}

                  {/* Icono del carrito */}
                  <Link to="/cart">
                    <Button variant="ghost" color="white" _hover={{ bg: "pink.600" }} onClick={() => setIsOpen(false)}>
                      <Icon as={FaShoppingCart} boxSize={6} />
                      {totalQuantity > 0 && (
                        <Badge colorScheme="red" borderRadius="full" fontSize="xs" px={2} ml={1}>
                          {totalQuantity}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
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

          {/* Icono del carrito */}
          <Box position="relative" ml={4}>
            <Link to="/cart">
              <Button variant="ghost" color="white" _hover={{ bg: "pink.600" }}>
                <Icon as={FaShoppingCart} boxSize={6} />
                {totalQuantity > 0 && (
                  <Badge colorScheme="red" borderRadius="full" position="absolute" top="-2px" right="-2px" fontSize="xs" px={2}>
                    {totalQuantity}
                  </Badge>
                )}
              </Button>
            </Link>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
