import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import TermsOfUse from './components/TermsOfUse/TermsOfUse'
import FoodDetails from './components/FoodDetails/FoodDetails'
import ToTop from './components/ToTop/ToTop'
import SearchResults from './pages/SearchResults/SearchResults'

const App = () => {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogIn={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/terms-of-use' element={<TermsOfUse />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
      <ToTop />
      <Footer />
    </>
  )
}

export default App