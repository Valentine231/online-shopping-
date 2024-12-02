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


  
  const addQuantity = (productId, change) => {
    setCart((prevCart) => {
      const product = prevCart[productId];
      if (!product) return prevCart;

      const newQuantity = (product.quantity || 1) + change;
      if (newQuantity < 1) {
        const { [productId]: _, ...remainingCart } = prevCart;
        return remainingCart;
      }

      const updatedCart = {
        ...prevCart,
        [productId]: {
          ...product,
          quantity: newQuantity,
        },
      };

      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: newQuantity,
      }));

      return updatedCart;
    });
  };

    return (
        <Shopping.Provider value={{ handleAddToCart,addQuantity,cart, quantities }}>
            {children}
        </Shopping.Provider>
    )
    
}

