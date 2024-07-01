import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddFood from './pages/Add/AddFood/AddFood';
import List from './pages/Table/Food/Food';
import Orders from './pages/Table/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Countries from './pages/Table/Countries/Countries';
import AddCountry from './pages/Add/AddCountry/AddCountry';
import Categories from './pages/Table/Categories/Categories';
import AddCategory from './pages/Add/AddCategory/AddCategory';
import AddCity from './pages/Add/AddCity/AddCity';
import StoreContextProvider from '../../frontend/src/context/StoreContext';
import Cities from './pages/Table/Cities/Cities';
import AddUser from './pages/Add/AddUser/AddUser';
import Users from './pages/Table/Users/Users';

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
            <Route path='/add' element={<AddFood url={url} />} />
            <Route path='/list' element={<List url={url} />} />
            <Route path='/orders' element={<Orders url={url} />} />
            <Route path='/countries' element={<Countries url={url} />} />
            <Route path='/add-country' element={<AddCountry url={url} />} />
            <Route path='/categories' element={<Categories url={url} />} />
            <Route path='/add-category' element={<AddCategory url={url} />} />
            <Route path='/add-city' element={<AddCity url={url} />} />
            <Route path='/cities' element={<Cities url={url} />} />
            <Route path='/add-user' element={<AddUser url={url} />} />
            <Route path='/users' element={<Users url={url} />} />
          </Routes>
        </div>
      </div>
    </StoreContextProvider>
  );
};

export default App;