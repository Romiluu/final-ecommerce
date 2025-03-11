import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Input, Button, FormLabel, FormControl, Alert, AlertIcon, Heading, Text } from "@chakra-ui/react";
import { password, email } from "../utils/Validation"; // Importar validaciones

const Register = () => {
  const { registerUser, user } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleRegister = async (data) => {
    try {
      await registerUser(data.email, data.password);
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
    >
      <Heading color="purple.600" fontSize="3xl" fontWeight="bold" mb="6" textAlign="center">
        Registrarse
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

        <form onSubmit={handleSubmit(handleRegister)}>
          <FormControl mb="4" isInvalid={errors.email} textAlign="left">
            <FormLabel>Email</FormLabel>
            <Input 
              type="email" 
              placeholder="tucorreo@example.com"
              {...register("email", email)} 
              borderRadius="8px"
              bg="#F8F8F8"
            />
            {errors.email && <Alert status="error" mt="2"><AlertIcon />{errors.email.message}</Alert>}
          </FormControl>

          <FormControl mb="4" isInvalid={errors.password} textAlign="left">
            <FormLabel>Contraseña</FormLabel>
            <Input 
              type="password" 
              placeholder="********"
              {...register("password", password)} 
              borderRadius="8px"
              bg="#F8F8F8"
            />
            {errors.password && <Alert status="error" mt="2"><AlertIcon />{errors.password.message}</Alert>}
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
