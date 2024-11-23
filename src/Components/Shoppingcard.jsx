import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from './Cartcontext';
import Navbar from './Navbar';
import { getCartFromLocalStorage } from './utilisstorage';
import { PaystackButton } from 'react-paystack';

const Shoppingcard = () => {
  const { id } = useParams();
  const { cart, setCart } = useContext(CartContext);
  const savedCart = getCartFromLocalStorage();
  const items = cart.items || {};
  const product = items[id];

  useEffect(() => {
    if (!cart || Object.keys(cart.items || {}).length === 0) {
      setCart(savedCart);
    }
  }, [cart, savedCart, setCart]);

  if (!id || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-lg">Product not found in cart.</p>
      </div>
    );
  }

  const publickey = 'pk_test_296f47c5e8e7a5b71336f33dd7c61d59b70083cb';
  const UserEmail = 'ugwuvalentine917@gmail.com';
  const amount = product ? product.price * 100 : 0;

  const componentProps = {
    email: UserEmail,
    amount: amount,
    metadata: {
      description: product ? product.description : 'Payment for items in cart',
    },
    publicKey: publickey,
    text: 'Pay Now',
    onSuccess: () => {
      alert('Thanks for doing business with us! Come back soon!!');
    },
    onClose: () => alert(`Wait! Do not leave ${product.name} behind!`),
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <section className="py-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
          {product ? (
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg mt-6">
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
