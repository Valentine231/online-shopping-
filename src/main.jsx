import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home.jsx'
import Shop from './Components/Shop.jsx'
import Errorpage from './Components/Errorpage.jsx'
import Shoppingcard from './Components/Shoppingcard.jsx'
import ProductCard from './Components/ProductCard.jsx'
import Cartprovider from './Components/Cartcontext.jsx'




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
    ]
  },
  {
    path: '/Shop',
    element: <Shop />
  },
  {
    path: '/Cart/:id',
    element: <Shoppingcard />
  },
  
  {
    path: '/*',
    element: <Errorpage />
  }
], {
  future: {
    v7_relativeSplatRoutes: true,
    v7_startTransition: true, // Opt-in to the startTransition behavior
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cartprovider>
      <RouterProvider router={router} />
    </Cartprovider>
  </StrictMode>,
)


