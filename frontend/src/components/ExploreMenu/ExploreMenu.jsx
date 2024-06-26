import React, { useContext } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../context/StoreContext';

const ExploreMenu = () => {
    const { categories, setSelectedCategory, selectedCategory, url } = useContext(StoreContext);

    return (
        <div>
            <div className='explore-menu' id='explore-menu'>
                <h1>Explore our menu</h1>
                <p className='explore-menu-text'>
                    Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
                </p>
                <div className='explore-menu-list'>
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            className={`explore-menu-list-item ${selectedCategory === item.name ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(prev => prev === item.name ? 'All' : item.name)}
                        >
                            <img src={`${url}/images/${item.image}`} alt={item.name} className={`food-item-image ${selectedCategory === item.name ? 'active' : ''}`} />
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;