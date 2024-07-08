import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';
import { useTabs } from '../../context/TabContext';

const Sidebar = () => {
    const [expanded, setExpanded] = useState({
        food: false,
        category: false,
        user: false,
        country: false,
        city: false,
    });

    const { addTab } = useTabs();

    const toggleExpand = (section) => {
        setExpanded(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    const handleNavLinkClick = (label, path) => {
        addTab({ label, path });
    };

    return (
        <div className='sidebar'>
            <div className="sidebar-options">
                <div className="sidebar-option" onClick={() => toggleExpand('food')}>
                    <img src={assets.order_icon} alt="" />
                    <p>Food</p>
                </div>
                <div className={`sidebar-sub-options ${expanded.food ? 'expanded' : ''}`}>
                    <NavLink 
                        to='/add' 
                        className="sidebar-option" 
                        onClick={() => handleNavLinkClick('Add Item', '/add')}>
                        <img src={assets.add_icon} alt="" />
                        <p>Add Item</p>
                    </NavLink>
                    <NavLink 
                        to='/list' 
                        className="sidebar-option" 
                        onClick={() => handleNavLinkClick('Food Items', '/list')}>
                        <img src={assets.order_icon} alt="" />
                        <p>Food Items</p>
                    </NavLink>
                    <NavLink 
                        to='/orders' 
                        className="sidebar-option" 
                        onClick={() => handleNavLinkClick('Orders', '/orders')}>
                        <img src={assets.order_icon} alt="" />
                        <p>Orders</p>
                    </NavLink>
                </div>

                <div className="sidebar-option" onClick={() => toggleExpand('category')}>
                    <img src={assets.order_icon} alt="" />
                    <p>Category</p>
                </div>
                <div className={`sidebar-sub-options ${expanded.category ? 'expanded' : ''}`}>
                    <NavLink 
                        to='/add-category' 
                        className="sidebar-option" 
                        onClick={() => handleNavLinkClick('Add Category', '/add-category')}>
                        <img src={assets.add_icon} alt="" />
                        <p>Add Category</p>
                    </NavLink>
                    <NavLink 
                        to='/categories' 
                        className="sidebar-option" 
                        onClick={() => handleNavLinkClick('Categories', '/categories')}>
                        <img src={assets.order_icon} alt="" />
                        <p>Categories</p>
                    </NavLink>
                </div>

                <div className="sidebar-option" onClick={() => toggleExpand('user')}>
                    <img src={assets.order_icon} alt="" />
                    <p>User</p>
                </div>
                <div className={`sidebar-sub-options ${expanded.user ? 'expanded' : ''}`}>
                    <NavLink 
                        to='/add-user' 
                        className="sidebar-option" 
                        onClick={() => handleNavLinkClick('Add User', '/add-user')}>
                        <img src={assets.add_icon} alt="" />
                        <p>Add User</p>
                    </NavLink>
                    <NavLink 
                        to='/users' 
                        className="sidebar-option" 
                        onClick={() => handleNavLinkClick('Users', '/users')}>
                        <img src={assets.order_icon} alt="" />
                        <p>Users</p>
                    </NavLink>
                </div>

                <div className="sidebar-option" onClick={() => toggleExpand('country')}>
                    <img src={assets.order_icon} alt="" />
                    <p>Country</p>
                </div>
                <div className={`sidebar-sub-options ${expanded.country ? 'expanded' : ''}`}>
                    <NavLink 
                        to='/add-country' 
                        className="sidebar-option" 
                        onClick={() => handleNavLinkClick('Add Country', '/add-country')}>
                        <img src={assets.add_icon} alt="" />
                        <p>Add Country</p>
                    </NavLink>
                    <NavLink 
                        to='/countries' 
                        className="sidebar-option" 
                        onClick={() => handleNavLinkClick('Countries', '/countries')}>
                        <img src={assets.order_icon} alt="" />
                        <p>Countries</p>
                    </NavLink>
                </div>

                <div className="sidebar-option" onClick={() => toggleExpand('city')}>
                    <img src={assets.order_icon} alt="" />
                    <p>City</p>
                </div>
                <div className={`sidebar-sub-options ${expanded.city ? 'expanded' : ''}`}>
                    <NavLink 
                        to='/add-city' 
                        className="sidebar-option" 
                        onClick={() => handleNavLinkClick('Add City', '/add-city')}>
                        <img src={assets.add_icon} alt="" />
                        <p>Add City</p>
                    </NavLink>
                    <NavLink 
                        to='/cities' 
                        className="sidebar-option" 
                        onClick={() => handleNavLinkClick('Cities', '/cities')}>
                        <img src={assets.order_icon} alt="" />
                        <p>Cities</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;