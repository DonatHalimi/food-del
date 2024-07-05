import React, { useContext, useState, useEffect } from 'react';
import './ExploreMenu.css';
import { StoreContext } from '../../context/StoreContext';
import MenuSkeleton from '../Skeleton/Menu/MenuSkeleton';

const ExploreMenu = () => {
    const { categories, setSelectedCategory, selectedCategory, url } = useContext(StoreContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    }, [selectedCategory]);

    useEffect(() => {
        const element = document.getElementById('explore-menu');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div>
            <div className='explore-menu' id='explore-menu'>
                <h1>Explore our menu</h1>
                <p className='explore-menu-text'>
                    Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
                </p>
                <div className='explore-menu-list'>
                    {loading ? (
                        Array.from({ length: 9 }).map((_, index) => <MenuSkeleton key={index} />)
                    ) : (
                        categories.map((item, index) => (
                            <div
                                key={index}
                                className={`explore-menu-list-item ${selectedCategory === item.name ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(prev => prev === item.name ? 'All' : item.name)}
                            >
                                <img src={`${url}/images/${item.image}`} alt={item.name} className={`food-item-image ${selectedCategory === item.name ? 'active' : ''}`} />
                                <p>{item.name}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;