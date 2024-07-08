import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { useTabs } from '../../context/TabContext';
import { HiOutlineInformationCircle } from "react-icons/hi";
import { IoFastFoodOutline, IoEarthOutline } from "react-icons/io5";
import { BiCategoryAlt, BiUser, BiPackage } from "react-icons/bi";
import { PiCityLight } from "react-icons/pi";
import { CiCirclePlus } from "react-icons/ci";

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

    useEffect(() => {
        const handleEscClick = (event) => {
            if (event.key === 'Escape') {
                setExpanded(prevState => {
                    const allExpanded = Object.values(prevState).every(val => val);
                    return {
                        food: !allExpanded,
                        category: !allExpanded,
                        user: !allExpanded,
                        country: !allExpanded,
                        city: !allExpanded
                    };
                });
            }
        };

        document.addEventListener('keydown', handleEscClick);

        return () => {
            document.removeEventListener('keydown', handleEscClick);
        };
    }, []);
    
    const handleNavLinkClick = (label, path) => {
        addTab({ label, path });
    };

    return (
        <div className='sidebar'>
            <div className="sidebar-info">
                <p><HiOutlineInformationCircle size={20} className='info-icon' /><b>Escape</b>: Expand / Close </p>
            </div>
            <div className="sidebar-options">
                <div className="sidebar-option" onClick={() => toggleExpand('food')}>
                    <IoFastFoodOutline size={24} />
                    <p>Food</p>
                </div>
                <div className={`sidebar-sub-options ${expanded.food ? 'expanded' : ''}`}>
                    <NavLink
                        to='/add'
                        className="sidebar-option"
                        onClick={() => handleNavLinkClick('Add Item', '/add')}>
                        <CiCirclePlus size={24} />
                        <p>Add Item</p>
                    </NavLink>
                    <NavLink
                        to='/list'
                        className="sidebar-option"
                        onClick={() => handleNavLinkClick('Food Items', '/list')}>
                        <IoFastFoodOutline size={24} />
                        <p>Food Items</p>
                    </NavLink>
                    <NavLink
                        to='/orders'
                        className="sidebar-option"
                        onClick={() => handleNavLinkClick('Orders', '/orders')}>
                        <BiPackage size={24} />
                        <p>Orders</p>
                    </NavLink>
                </div>

                <div className="sidebar-option" onClick={() => toggleExpand('category')}>
                    <BiCategoryAlt size={24} />
                    <p>Category</p>
                </div>
                <div className={`sidebar-sub-options ${expanded.category ? 'expanded' : ''}`}>
                    <NavLink
                        to='/add-category'
                        className="sidebar-option"
                        onClick={() => handleNavLinkClick('Add Category', '/add-category')}>
                        <CiCirclePlus size={24} />
                        <p>Add Category</p>
                    </NavLink>
                    <NavLink
                        to='/categories'
                        className="sidebar-option"
                        onClick={() => handleNavLinkClick('Categories', '/categories')}>
                        <BiCategoryAlt size={24} />
                        <p>Categories</p>
                    </NavLink>
                </div>

                <div className="sidebar-option" onClick={() => toggleExpand('user')}>
                    <BiUser size={24} />
                    <p>User</p>
                </div>
                <div className={`sidebar-sub-options ${expanded.user ? 'expanded' : ''}`}>
                    <NavLink
                        to='/add-user'
                        className="sidebar-option"
                        onClick={() => handleNavLinkClick('Add User', '/add-user')}>
                        <CiCirclePlus size={24} />
                        <p>Add User</p>
                    </NavLink>
                    <NavLink
                        to='/users'
                        className="sidebar-option"
                        onClick={() => handleNavLinkClick('Users', '/users')}>
                        <BiUser size={24} />
                        <p>Users</p>
                    </NavLink>
                </div>

                <div className="sidebar-option" onClick={() => toggleExpand('country')}>
                    <IoEarthOutline size={24} />
                    <p>Country</p>
                </div>
                <div className={`sidebar-sub-options ${expanded.country ? 'expanded' : ''}`}>
                    <NavLink
                        to='/add-country'
                        className="sidebar-option"
                        onClick={() => handleNavLinkClick('Add Country', '/add-country')}>
                        <CiCirclePlus size={24} />
                        <p>Add Country</p>
                    </NavLink>
                    <NavLink
                        to='/countries'
                        className="sidebar-option"
                        onClick={() => handleNavLinkClick('Countries', '/countries')}>
                        <IoEarthOutline size={24} />
                        <p>Countries</p>
                    </NavLink>
                </div>

                <div className="sidebar-option" onClick={() => toggleExpand('city')}>
                    <PiCityLight size={24} />
                    <p>City</p>
                </div>
                <div className={`sidebar-sub-options ${expanded.city ? 'expanded' : ''}`}>
                    <NavLink
                        to='/add-city'
                        className="sidebar-option"
                        onClick={() => handleNavLinkClick('Add City', '/add-city')}>
                        <CiCirclePlus size={24} />
                        <p>Add City</p>
                    </NavLink>
                    <NavLink
                        to='/cities'
                        className="sidebar-option"
                        onClick={() => handleNavLinkClick('Cities', '/cities')}>
                        <PiCityLight size={24} />
                        <p>Cities</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;