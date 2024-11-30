import React, { useState, useEffect, useContext } from 'react';
import {Shopping} from './Cartcontext';
import Navbar from './Navbar';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Navigate,  useNavigate } from 'react-router-dom';
import Footer from './Footer';



const Shop = () => {
    const [products, setProducts] = useState([]);
    const { handleAddToCart } = useContext(Shopping);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [totalItems, setTotalItems] = useState(0);
    // const [quantities, setQuantities] = useState({});
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate()



    const totalPages = Math.ceil(totalItems / itemsPerPage);
 
    useEffect(()=>{
        const fetchproduct = async()=>{
            setLoading(true)
            try{
            const response = await axios.get(`${BASE_URL}/products?page=${currentPage}&limit=${itemsPerPage}`)
            setProducts(response.data || [])
            setTotalItems(response.data.totalItems || 0);
            }catch{
                setError(HandleError(error.response))
            }finally{
                setLoading(false)
            }
           
        }
        fetchproduct()
    },[currentPage])

 

   
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


const handleclick = (product) => {

    const updatedCart = handleAddToCart(product);
 
     navigate(`/Cart/${product.id}`, { state: { cart: updatedCart } })
     
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
                                    onadd={()=>handleclick(product)}
                                    />
                                ))
                            ) : (
                                <p>No products available.</p>
                            )}

                           
                        </div>


                        {totalPages > 1 && (
                    <div className="pagination flex justify-center mt-8">
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

                <Footer />

            </div>
    );
};


export default Shop; 

