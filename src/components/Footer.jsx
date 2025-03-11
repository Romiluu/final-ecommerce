import { Box, Flex, Text, Link, Icon } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
      <Box bgGradient="linear(to-r, purple.500, pink.700)" py={4} mt={4} textAlign="center">
        <Flex justify="center" gap={6} mb={2}>
          <Link href="#" isExternal>
            <Icon as={FaFacebook} boxSize={6} color="white" />
          </Link>
          <Link href="#" isExternal>
            <Icon as={FaInstagram} boxSize={6} color="white" />
          </Link>
          <Link href="#" isExternal>
            <Icon as={FaTwitter} boxSize={6} color="white" />
          </Link>
        </Flex>
  
        <Text fontSize="sm" color="white">
          © 2024 Mi Ecommerce. Todos los derechos reservados.
        </Text>
      </Box>
    );
  };
  
  export default Footer;
  