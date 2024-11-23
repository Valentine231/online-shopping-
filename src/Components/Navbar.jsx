import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { CartContext } from './Cartcontext';

const Navbar = () => {
    const { cart } = useContext(CartContext);
    const firstItemId = Object.keys(cart.items || {})[0];
  return (
    <nav className='bg-gray-800 p-4 my-2 mx-2'>
        <ul className='flex gap-20 items-center'>
           <Logo />
            <li>
                <NavLink to='/' className={({ isActive }) =>isActive ? 'text-white border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'}>Home</NavLink>
            </li>

            <li>
                <NavLink to='/Shop'   className={({ isActive }) => isActive ? 'text-white border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'}>Shop</NavLink>
            </li>


            <li>
                <NavLink to={firstItemId ? `/Cart/${firstItemId}` : '/Cart'} className={({ isActive }) => isActive ? 'text-white border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'}>Cart</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar