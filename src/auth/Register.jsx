import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, FormLabel, FormControl, Heading, Text } from "@chakra-ui/react";

const Register = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate("/"); // Redirige a home después de registrarse
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
        Regístrate
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
          Crea tu cuenta
        </Text>
        {error && <Text color="red.500">{error}</Text>}
        <form onSubmit={handleRegister}>
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
            Registrarse
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
