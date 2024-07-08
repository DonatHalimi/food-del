import React, { useRef } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { useTabs } from '../../context/TabContext';

const Navbar = () => {
    const { tabs, closeTab } = useTabs();
    const tabsRef = useRef(null);

    return (
        <div className='navbar'>
            <Link to='/'>
                <img className='logo' src={assets.logo} alt="" />
            </Link>
            <div className='tabs' ref={tabsRef}>
                <div className='tabs-inner'>
                    {tabs.map(tab => (
                        <div key={tab.path} className='tab'>
                            <NavLink to={tab.path} className="tab-link">{tab.label}</NavLink>
                            <button className='close-tab' onClick={() => closeTab(tab.path)}>x</button>
                        </div>
                    ))}
                </div>
            </div>
            <img className='profile' src={assets.profile_image} alt="" />
        </div>
    );
};

export default Navbar;