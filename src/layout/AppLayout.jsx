import { Grid, GridItem } from "@chakra-ui/react";
import Routing from "../routes/Routing.jsx";
import Header from "../components/Header.jsx";
 import Footer from "../components/Footer";
 import ScrollToTop from "../components/ScrollToTop";
 
const AppLayout = () => {
  return (
    <Grid
    templateAreas={`"header" "main" "footer"`}
    gridTemplateRows={"80px 1fr 50px"}
    gridTemplateColumns={"1fr"}
    gap="1"
    fontWeight="bold"
    minHeight="100vh"
    bg="white" // Fondo del contenido principal en blanco
    >
      {/* 🏠 Header */}
      <GridItem area="header">
        <Header /> {/* 👈 Aquí se llama al Header */}
      </GridItem>

      {/* 📌 Main */}
      <GridItem
        area="main"
        minH="100vh"
        bg="transparent"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        paddingBottom="50px"
        p="4"
      >
        <ScrollToTop />
        <Routing />
      </GridItem>

      {/* 📌 Footer */}
      <GridItem area="footer">
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default AppLayout;