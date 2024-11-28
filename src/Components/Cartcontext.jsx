import { createContext,useState } from "react";


export const Shopping = createContext();


export const ShoppingProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [quantities, setQuantities] = useState({});


    const handleAddToCart = (product) => {
        if (!product || !product.id) return;
      
        setCart((prevCart) => {
          const updatedCart = {
            ...prevCart,
            [product.id]: {
              ...product,
              quantity: (prevCart[product.id]?.quantity || 0) + 1,
            },
          };
    
          localStorage.setItem('cart', JSON.stringify(updatedCart));
          setCart(updatedCart);

    
          // Return the updated cart to update state
          return updatedCart;
         
        });
        
    };


const handleQuantityChange = (productId, change) => {
    setCart((prevCart) => {
      // Check if the product exists in the cart
      const product = prevCart.items[productId];
      if (!product) return prevCart;
  
      // Calculate the new quantity
      const newQuantity = (product.quantity || 1) + change;
  
      // Ensure quantity is at least 1
      if (newQuantity < 1) return prevCart;
  
      // Update the cart with the new quantity
      const updatedCart = {
        ...prevCart,
        items: {
          ...prevCart.items,
          [productId]: {
            ...product,
            quantity: newQuantity,
          },
        },
      };
  
     
  
      return updatedCart;
    });
  };
  

    return (
        <Shopping.Provider value={{ handleAddToCart,handleQuantityChange,cart }}>
            {children}
        </Shopping.Provider>
    )
    
}

