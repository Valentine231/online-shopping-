import React, { useState, useEffect, useContext } from 'react';
import {CartContext} from './Cartcontext';
import Navbar from './Navbar';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Navigate,  useNavigate } from 'react-router-dom';
import Shoppingcard from './Shoppingcard';
import { saveCartToLocalStorage } from './utilisstorage';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const {cart, setCart} = useContext(CartContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [totalItems, setTotalItems] = useState(0);
    const [quantities, setQuantities] = useState({});
    const BASE_URL = 'http://localhost:9000';
    const navigate = useNavigate()



    const totalPages = Math.ceil(totalItems / itemsPerPage);
 
    useEffect(()=>{
        const fetchproduct = async()=>{
            setLoading(true)
            try{
            const response = await axios.get(`${BASE_URL}/products?page=${currentPage}&limit=${itemsPerPage}`)
            const products = response.data;
            setProducts(products)
            setTotalItems(products.length);
            }catch{
                setError(HandleError(error.response))
            }finally{
                setLoading(false)
            }
           
        }
        fetchproduct()
    },[currentPage])

    useEffect(() => {
        // Load cart from localStorage when the component mounts
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, [setCart]);

   
    const currentProducts = products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

  const HandleError = (response) => {
   if (response) {
        switch (response.status) {
            case 404:
                return '404 Not Found';
        case 500:
                return '500 Server Error';
            case 403:
                return '403 Forbidden';
            case 400:
                return '400 Bad Request';
            case 401:
                return '401 Unauthorized';
            default:
                return 'An error occurred. Please try again later.';
        }
    }
    return 'Network error. Please check your connection.';
};


const handleAddToCart = (product) => {
    setCart((prevCart) => {
        const updatedCart = {
            ...prevCart,
            items: {
                ...prevCart.items,
                [product.id]: {
                    ...product,
                    quantity: (prevCart.items[product.id]?.quantity || 0) + 1,
                },
            },
        };
        saveCartToLocalStorage(updatedCart);
        return updatedCart;
    });
    navigate(`/Cart/${product.id}`);
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
  
      // Save the updated cart to localStorage
      saveCartToLocalStorage(updatedCart);
  
      return updatedCart;
    });
  };
  

    
    return(
        <div>
                <Navbar />
               {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 mx-8 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                            {currentProducts.length > 0 ? (
                                currentProducts.map((product) => (
                                    <ProductCard
                                    product={product}
                                    key={product.id}
                                    onadd={handleAddToCart}
                                    addQuantity={handleQuantityChange}
                                    quantities={quantities}
                                    />
                                ))
                            ) : (
                                <p>No products available.</p>
                            )}

                           
                        </div>


                        {totalPages > 1 && (
                    <div className="pagination flex justify-center mt-6">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`pagination-button mx-1 px-3 py-1 rounded ${
                                    currentPage === index + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-black'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                        )}
                     </>
                )}

            </div>
    );
};


export default Shop; 

