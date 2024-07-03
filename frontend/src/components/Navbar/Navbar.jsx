import React, { useContext, useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, token, setToken, food_list } = useContext(StoreContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSearchActive(false);
            }
        };

        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setSearchActive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEsc);
        };
    }, [dropdownRef]);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?query=${searchTerm}`);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        setShowLogin(true);
    };

    const filteredProducts = food_list.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='navbar'>
            <Link to='/'>
                <img src={assets.logo} alt='' className='logo' />
            </Link>
            <ul className="navbar-menu">
                <li><Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link></li>
                <li><a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a></li>
                <li><a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a></li>
                <li><a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a></li>
            </ul>
            <div className='navbar-right'>
                <form onSubmit={handleSearch} className="search-form" ref={dropdownRef}>
                    <img src={assets.search_icon} alt="" onClick={() => setSearchActive(true)} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setSearchActive(e.target.value.length > 0);
                        }}
                        className={searchActive ? 'active' : ''}
                        placeholder="Search..."
                    />
                    {searchActive && searchTerm && (
                        <ul className="auto-complete-results">
                            {filteredProducts.map(product => (
                                <li key={product._id} onClick={() => navigate(`/food/${product._id}`)}>
                                    {product.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </form>
                <div className="navbar-search-icon">
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt="" />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className='nav-profile-dropdown'>
                            <li onClick={(() => navigate('/my-orders'))}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>}
            </div>
        </div>
    );
};

export default Navbar;
