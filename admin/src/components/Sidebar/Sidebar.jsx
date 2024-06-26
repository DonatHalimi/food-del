import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar-options">
                <NavLink to='/add' className="sidebar-option">
                    <img src={assets.add_icon} alt="" />
                    <p>Add Items</p>
                </NavLink>
                <NavLink to='/list' className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>Food Items</p>
                </NavLink>
                <NavLink to='/orders' className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>Orders</p>
                </NavLink>

                <NavLink to='/add-category' className="sidebar-option">
                    <img src={assets.add_icon} alt="" />
                    <p>Add Category</p>
                </NavLink>
                <NavLink to='/categories' className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>Categories</p>
                </NavLink>
                <NavLink to='/add-country' className="sidebar-option">
                    <img src={assets.add_icon} alt="" />
                    <p>Add Country</p>
                </NavLink>
                <NavLink to='/countries' className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>Countries</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar