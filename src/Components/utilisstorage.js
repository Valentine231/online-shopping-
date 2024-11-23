export const getCartFromLocalStorage = () => {
  try {
    const savedData = localStorage.getItem('cart');
    const parsedData = savedData ? JSON.parse(savedData) : {};

    // Ensure 'items' is always in the cart structure
    return parsedData.items ? parsedData : { items: {} };  // If no 'items' key exists, create it

  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return { items: {} }; // Default to empty 'items' object if there's an error
  }
};

export const saveCartToLocalStorage = (cart) => {
  try {
    // Ensure cart is always saved with the correct structure
    const dataToSave = {
      items: { ...cart.items }, // Ensure we save the items correctly
    };
    
    localStorage.setItem('cart', JSON.stringify(dataToSave)); // Save cart with 'items' structure
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};
