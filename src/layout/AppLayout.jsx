import { Grid, GridItem } from "@chakra-ui/react";
import Routing from "../routes/Routing.jsx";
import Header from "../components/Header.jsx";
 import Footer from "../components/Footer";
 import ScrollToTop from "../components/ScrollToTop";
 
const AppLayout = () => {
  return (
    <Grid
    templateAreas={`"header" "main" "footer"`}
    gridTemplateRows={"80px 1fr auto"}
    gridTemplateColumns={"1fr"}
    gap="1"
    fontWeight="bold"
    minHeight="100vh" 
    bg="white"
  >

      {/* Header */}
      <GridItem area="header">
        <Header /> 
      </GridItem>

      {/* Main */}
      <GridItem
      area="main"
      bg="transparent"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center" 
      flexShrink={1} // Evita que crezca demasiado
      paddingBottom="20px"
      p="4"
    >
        <ScrollToTop />
        <Routing />
      </GridItem>

      {/* Footer */}
      <GridItem area="footer" alignSelf="flex-end">

        <Footer />
      </GridItem>
    </Grid>
  );
};

export default AppLayout;