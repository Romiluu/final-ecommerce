import { Box, Flex, Text, Link, Icon } from "@chakra-ui/react";
import { FaGithub, FaInstagram, FaLinkedin} from "react-icons/fa";

const Footer = () => {
    return (
      <Box bgGradient="linear(to-r, purple.500, pink.700)" py={4} mt={4} textAlign="center">
        <Flex justify="center" gap={6} mb={2}>
          <Link href="https://github.com/Romiluu" isExternal>
            <Icon as={FaGithub} boxSize={6} color="white" />
          </Link>
          <Link href="https://www.instagram.com/romiiluuu/" isExternal>
            <Icon as={FaInstagram} boxSize={6} color="white" />
          </Link>
          <Link href="https://www.linkedin.com/in/romina-luna04/" isExternal>
            <Icon as={FaLinkedin} boxSize={6} color="white" />
          </Link>
        </Flex>
  
        <Text fontSize="sm" color="white">
          © 2024 Mi Ecommerce. Todos los derechos reservados.
        </Text>
      </Box>
    );
  };
  
  export default Footer;
  