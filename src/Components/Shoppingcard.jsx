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
      return <p>Product not found in cart.</p>;
  }

  // console.log(getCartFromLocalStorage());


  const publickey = 'pk_test_296f47c5e8e7a5b71336f33dd7c61d59b70083cb';
  const UserEmail = "ugwuvalentine917@gmail.com"
  const amount = product ? product.price * 100 : 0;

  const componentProps = {
    email: UserEmail, // customer email
    amount: amount, // amount in the smallest currency unit
    metadata: {
      description: product ? product.description : 'Payment for items in cart',
    },
    publicKey: publickey, // public key to use
    text: 'Pay Now',
    onSuccess: () => {
      alert('Thanks for doing business with us! Come back soon!!');
    },
    onClose: () => alert(`Wait! Do not leave ${product.name} behind!`),
  };

  // console.log('Cart:', cart);
  // console.log('Product ID:', id);
  // console.log('Product:', product);

  return (
    <div>
      <Navbar />
      <div className="bg-blue-500 min-h-screen">
        <section className="text-white py-20 text-center">
          <h1 className="text-4xl font-bold ">Your Cart</h1>
          {product ? (
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
              <img
                className="w-75 h-23 object-cover items-center"
                src={product.image}
                alt={product.name}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-700 text-base">{product.description}</p>
              </div>
              <div className="px-6 py-4">
                <span className="font-bold text-xl text-gray-900">
                  ${product.price}
                </span>
              </div>
              <div >
                <PaystackButton {...componentProps} className="p-3 bg-blue-500 text-black rounded-lg shadow-md " />
              </div>
            </div>
          ) : (
            <p className="text-lg mb-6">You have no items in your cart</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Shoppingcard;
