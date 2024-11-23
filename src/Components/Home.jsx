import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-blue-500 min-h-screen'>
         <section className="bg-gray-950 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Shop!</h1>
        <p className="text-lg mb-6">Discover the best products at unbeatable prices</p>
        <Link to="/shop" >
        <button className="bg-white text-blue-500 py-2 px-6 rounded-full hover:bg-gray-200 transition">
          Shop Now
        </button>
        </Link>
      </section>

      <section>
        <div>
        <img src="/public/cart.png" alt="" className='min-h-70 w-full object-cover  opacity-5'/>

        

        </div>
        
      </section>
    </div>
  )
}

export default Home