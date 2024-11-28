import React, { useContext, useEffect } from 'react';
import { Shopping } from './Cartcontext';
import Navbar from './Navbar';

import { PaystackButton } from 'react-paystack';

const Shoppingcard = () => {
  const {cart,quantities,addQuantity} = useContext(Shopping);
  




  const publickey = 'pk_test_296f47c5e8e7a5b71336f33dd7c61d59b70083cb';
  const UserEmail = 'ugwuvalentine917@gmail.com';
  const amount = Object.values(cart).reduce((total, product) => {
    return total + (product.price * product.quantity); // Assuming quantity is stored in the product
  }, 0) * 100;

  const componentProps = {
    email: UserEmail,
    amount: amount,
    metadata: {
      description: 'Payment for items in cart',
    },
    publicKey: publickey,
    text: 'Pay Now',
    onSuccess: () => {
      alert('Thanks for doing business with us! Come back soon!!');
    },
    onClose: () => alert(`Wait! Do not leave ${product.name} behind!`),
  };

  const handleclick =(productId, change)=>{
    handleQuantityChange(productId, change)
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <section className="py-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
          {Object.keys(cart).length > 0 ? Object.values(cart).map((product) => 

            <div key={product.id} className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg mt-6">
              <img
                className="w-75 h-48 object-cover"
                src={product.image}
                alt={product.name}
              />
              <div className="px-6 py-4">
                <h2 className="font-bold text-2xl text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
              </div>
              <div className="px-6 py-4">
                <span className="font-bold text-xl text-gray-900">${product.price}</span>
              </div>
              <div className="px-6 py-4">
                      {/* <div className="flex items-center mt-2">
                     <button onClick={() => addQuantity(product.id, -1)} className="bg-gray-300 px-2 py-1 rounded-l">
                       -
                      </button>
                        <span className="px-4 py-1 bg-gray-200 text-center">
                         {quantities[product.id] || 1}
                            </span>
                          <button  onClick={() => addQuantity(product.id, 1)} className="bg-gray-300 px-2 py-1 rounded-r" >
                           +
                          </button>
                     </div> */}

                <PaystackButton
                  {...componentProps}
                  className="p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                />
              </div>
            </div>
          ) : (
            <p className="text-lg mt-6 text-gray-600">You have no items in your cart</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Shoppingcard;
