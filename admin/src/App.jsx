import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Countries from './pages/Countries/Countries';
import AddCountry from './pages/AddCountry/AddCountry';
import Categories from './pages/Categories/Categories';
import AddCategory from './pages/AddCategory/AddCategory';
import StoreContextProvider from '../../frontend/src/context/StoreContext';

const App = () => {
  const url = "http://localhost:4000";

  return (
    <StoreContextProvider>
      <div>
        <ToastContainer />
        <Navbar />
        <hr />
        <div className='app-content'>
          <Sidebar />
          <Routes>
            <Route path='/add' element={<Add url={url} />} />
            <Route path='/list' element={<List url={url} />} />
            <Route path='/orders' element={<Orders url={url} />} />
            <Route path='/countries' element={<Countries url={url} />} />
            <Route path='/add-country' element={<AddCountry url={url} />} />
            <Route path='/categories' element={<Categories url={url} />} />
            <Route path='/add-category' element={<AddCategory url={url} />} />
          </Routes>
        </div>
      </div>
    </StoreContextProvider>
  );
};

export default App;