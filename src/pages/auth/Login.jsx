import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Input, Button, FormLabel, FormControl, Heading, Text, useToast } from "@chakra-ui/react";

const Login = () => {
  const { login, signInWithGoogle, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (user) navigate("/");
    
    if (location.state?.from) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para ver el carrito.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [user, navigate, location, toast]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box 
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt="100px"
      bg="white"
    >
      <Heading color="purple.600" fontSize="3xl" fontWeight="bold" mb="6" textAlign="center">
        Inicia Sesión
      </Heading>

      <Box 
        width="400px" 
        minH="450px"
        p="10"
        bg="white"
        borderRadius="12px"
        boxShadow="0px 4px 12px rgba(128, 0, 128, 0.4)"
        textAlign="center"
      >
        <Text fontSize="lg" fontWeight="bold" mb="6">
          Ingresa a tu cuenta
        </Text>
        <form onSubmit={handleLogin}>
          <FormControl mb="4" textAlign="left">
            <FormLabel>Email</FormLabel>
            <Input 
              type="email"
              placeholder="tucorreo@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              borderRadius="8px"
              bg="#F8F8F8"
            />
          </FormControl>
          <FormControl mb="4" textAlign="left">
            <FormLabel>Contraseña</FormLabel>
            <Input 
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              borderRadius="8px"
              bg="#F8F8F8"
            />
          </FormControl>
          <Button 
            type="submit" 
            bg="purple.600" 
            color="white" 
            width="100%" 
            borderRadius="8px"
            _hover={{ bg: "purple.700" }}
          >
            Iniciar sesión
          </Button>
        </form>
        <Button 
          onClick={signInWithGoogle} 
          bg="purple.500" 
          color="white" 
          width="100%" 
          mt="4"
          borderRadius="8px"
          _hover={{ bg: "purple.700" }}
        >
          Iniciar sesión con Google
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
