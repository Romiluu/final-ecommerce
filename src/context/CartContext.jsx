import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar un curso al carrito
  const addToCart = (course) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === course.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === course.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...course, quantity: 1 }];
    });
  };

  // Aumentar la cantidad de un curso
  const increaseQuantity = (courseId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === courseId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Disminuir la cantidad de un curso
  const decreaseQuantity = (courseId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === courseId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Elimina el producto si la cantidad llega a 0
    );
  };

  // Eliminar un curso del carrito
  const removeFromCart = (courseId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== courseId));
  };

  // Vaciar carrito
  const clearCart = () => setCart([]);

  // Calcular el total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};
