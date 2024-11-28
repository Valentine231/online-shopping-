import React from 'react'

const ProductCard = ({product,onadd}) => {
  const {name,image,description,price} = product
  return (
    
    <div className=" max-w-sm rounded overflow-hidden shadow-lg bg-white">
    <img className="w-75 h-23 object-cover items-center" src={product.image} alt={product.name} />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{product.name}</div>
      <p className="text-gray-700 text-base">{product.description}</p>
    </div>
    <div className="px-6 py-4">
      <span className="font-bold text-xl text-gray-900">${product.price}</span>
    </div>
    <div className="px-6 py-4 flex gap-10">
      <button onClick={()=>onadd(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add to Cart
      </button>

                                   
  </div>
  </div>
);
};
  


export default ProductCard