import { createContext, useContext, useState } from "react";

// Creamos el contexto
const CartContext = createContext();

// Hook personalizado para usar el carrito
export const useCart = () => useContext(CartContext);

// Proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Estado del carrito

  // Función para agregar cursos al carrito
  const addToCart = (course) => {
    const existingCourse = cart.find((item) => item.id === course.id);
    if (existingCourse) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === course.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...course, quantity: 1 }]);
    }
  };

  // Función para eliminar un curso del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Vaciar carrito
  const clearCart = () => setCart([]);

  // Calcular el total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
