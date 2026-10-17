import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AllProducts from './pages/AllProducts'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import SupportModal from './pages/SupportModal'


const App = () => {
  return (
 
    <>
    
    <BrowserRouter>
    
    <Navbar/>
    
    <Routes>


    <Route path='/' element={<Home/>} />
    <Route path='/products' element={<AllProducts/>} />
    <Route path='/products/:id' element={<ProductDetails/>} />
    <Route path='/cart' element={<Cart/>} />
    <Route path='/profile' element={<Profile/>} />
    <Route path='/orders' element={<Orders/>} />
    <Route path='/support' element={<SupportModal/>} />



    </Routes>
    
    <Footer/>
    
    </BrowserRouter>
    
    </>
 
  )
}

export default App
