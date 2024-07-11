import React, { useRef } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { useTabs } from '../../context/TabContext';

const Navbar = () => {
    const { tabs, closeTab } = useTabs();
    const tabsRef = useRef(null);

    const handleAuxClick = (e, path) => {
        if (e.button === 1) {
            e.preventDefault()
            closeTab(path);
        }
    };

    return (
        <div className='navbar'>
            <Link to='/'>
                <img className='logo' src={assets.logo} alt="" />
            </Link>
            <div className='tabs' ref={tabsRef}>
                <div className='tabs-inner'>
                    {tabs.map(tab => (
                        <div key={tab.path} className={`tab ${tab.path === window.location.pathname ? 'active' : ''}`}>
                            <NavLink
                                to={tab.path}
                                className="tab-link"
                                onAuxClick={(e) => handleAuxClick(e, tab.path)}
                            >
                                {tab.label}
                            </NavLink>
                            <button className='close-tab' onClick={() => closeTab(tab.path)}>x</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Navbar;