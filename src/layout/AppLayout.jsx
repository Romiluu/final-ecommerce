import { Grid, GridItem } from "@chakra-ui/react";
 import Footer from "../components/Footer";
 
 const AppLayout = () => {
   return (
     <Grid
       templateAreas={`"main" "footer"`}
       gridTemplateRows={"80px 1fr 50px"}
       gridTemplateColumns={"1fr"}
       gap="1"
       fontWeight="bold"
       minHeight="100vh"
       bg="#FFDFEF">
 
         {/* main */}
         <GridItem area="main">
             <Text color="black">Este es el contenido principal</Text>
         </GridItem>
 
       {/* Footer */}
       <GridItem area="footer">
       <Text color="black">Hola, esto es un footer de prueba</Text>
         <Footer />
       </GridItem>
     </Grid>
   );
 };
 
 export default AppLayout;