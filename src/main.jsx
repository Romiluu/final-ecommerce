import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider>
      <AuthProvider>
        <CartProvider>
            <App />
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  </BrowserRouter>
);
