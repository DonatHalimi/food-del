import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [expanded, setExpanded] = useState({
        food: false,
        category: false,
        user: false,
        country: false,
        city: false,
    });

    const toggleExpand = (section) => {
        setExpanded(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    return (
        <div className='sidebar'>
            <div className="sidebar-options">

                <div className="sidebar-option" onClick={() => toggleExpand('food')}>
                    <img src={assets.order_icon} alt="" />
                    <p>Food</p>
                </div>
                <div className={`sidebar-sub-options ${expanded.food ? 'expanded' : ''}`}>
                    <NavLink to='/add' className="sidebar-option">
                        <img src={assets.add_icon} alt="" />
                        <p>Add Item</p>
                    </NavLink>
                    <NavLink to='/list' className="sidebar-option">
                        <img src={assets.order_icon} alt="" />
                        <p>Food Items</p>
                    </NavLink>
                    <NavLink to='/orders' className="sidebar-option">
                        <img src={assets.order_icon} alt="" />
                        <p>Orders</p>
                    </NavLink>
                </div>

                <div className="sidebar-option" onClick={() => toggleExpand('category')}>
                    <img src={assets.order_icon} alt="" />
                    <p>Category</p>
                </div>
                <div className={`sidebar-sub-options ${expanded.category ? 'expanded' : ''}`}>
                    <NavLink to='/add-category' className="sidebar-option">
                        <img src={assets.add_icon} alt="" />
                        <p>Add Category</p>
                    </NavLink>
                    <NavLink to='/categories' className="sidebar-option">
                        <img src={assets.order_icon} alt="" />
                        <p>Categories</p>
                    </NavLink>
                </div>

                <div className="sidebar-option" onClick={() => toggleExpand('user')}>
                    <img src={assets.order_icon} alt="" />
                    <p>User</p>
                </div>
                <div className={`sidebar-sub-options ${expanded.user ? 'expanded' : ''}`}>
                    <NavLink to='/add-user' className="sidebar-option">
                        <img src={assets.add_icon} alt="" />
                        <p>Add User</p>
                    </NavLink>
                    <NavLink to='/users' className="sidebar-option">
                        <img src={assets.order_icon} alt="" />
                        <p>Users</p>
                    </NavLink>
                </div>

                <div className="sidebar-option" onClick={() => toggleExpand('country')}>
                    <img src={assets.order_icon} alt="" />
                    <p>Country</p>
                </div>
                <div className={`sidebar-sub-options ${expanded.country ? 'expanded' : ''}`}>
                    <NavLink to='/add-country' className="sidebar-option">
                        <img src={assets.add_icon} alt="" />
                        <p>Add Country</p>
                    </NavLink>
                    <NavLink to='/countries' className="sidebar-option">
                        <img src={assets.order_icon} alt="" />
                        <p>Countries</p>
                    </NavLink>
                </div>

                <div className="sidebar-option" onClick={() => toggleExpand('city')}>
                    <img src={assets.order_icon} alt="" />
                    <p>City</p>
                </div>
                <div className={`sidebar-sub-options ${expanded.city ? 'expanded' : ''}`}>
                    <NavLink to='/add-city' className="sidebar-option">
                        <img src={assets.add_icon} alt="" />
                        <p>Add City</p>
                    </NavLink>
                    <NavLink to='/cities' className="sidebar-option">
                        <img src={assets.order_icon} alt="" />
                        <p>Cities</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;