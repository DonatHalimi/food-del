import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const ToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 80);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 11);
        }
    };

    const buttonStyle = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        height: '50px',
        width: '60px',
        backgroundColor: 'tomato',
        color: '#fff',
        padding: '10px 15px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
    };

    const arrowStyle = {
        width: '20px',
        height: '20px',
    };

    return (
        <div>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    style={buttonStyle}
                >
                    <FontAwesomeIcon icon={faArrowUp} style={arrowStyle} />

                </button>
            )}
        </div>
    );
};

export default ToTop