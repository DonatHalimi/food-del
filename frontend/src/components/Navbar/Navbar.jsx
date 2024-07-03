import React, { useContext, useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, token, setToken, food_list } = useContext(StoreContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const searchIconRef = useRef(null);
    const inputRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !searchIconRef.current.contains(event.target) &&
                !inputRef.current.contains(event.target)
            ) {
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
    }, [dropdownRef, searchIconRef, inputRef]);

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            if (filteredProducts.length === 1) {
                navigate(`food/${filteredProducts[0]._id}`);
            } else {
                navigate(`/search?query=${searchTerm}`);
            }
            setSearchActive(false);
        } else {
            toast.info('Please enter a search term');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex !== -1 && filteredProducts.length > 0) {
                navigate(`/food/${filteredProducts[selectedIndex]._id}`);
                setSearchActive(false);
            } else {
                handleSearch();
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (selectedIndex > 0) {
                setSelectedIndex(selectedIndex - 1);
                scrollItemIntoView(selectedIndex - 1);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (selectedIndex < filteredProducts.length - 1) {
                setSelectedIndex(selectedIndex + 1);
                scrollItemIntoView(selectedIndex + 1);
            }
        }
    };

    const scrollItemIntoView = (index) => {
        const list = dropdownRef.current;
        if (!list) return;

        const item = list.childNodes[index];
        if (item) {
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        setShowLogin(true);
    };

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        setSelectedIndex(-1);
        setSearchActive(term.trim() !== '');
        if (term.length > 0) {
            const products = food_list.filter(product =>
                product.name.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredProducts(products);
        } else {
            setFilteredProducts([]);
        }
    };

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
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="search-form" ref={dropdownRef}>
                    <img src={assets.search_icon} alt="" onClick={() => setSearchActive(true)} ref={searchIconRef} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        className={searchActive ? 'active' : ''}
                        placeholder="Search..."
                        ref={inputRef}
                    />
                    {searchActive && filteredProducts.length > 0 && (
                        <ul className="auto-complete-results" ref={dropdownRef}>
                            {filteredProducts.map((product, index) => (
                                <li key={product._id}
                                    className={index === selectedIndex ? 'selected' : ''}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/food/${product._id}`);
                                        setSearchActive(false);
                                    }}>
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
