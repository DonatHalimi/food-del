import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TabContext = createContext();

export const useTabs = () => useContext(TabContext);

export const TabProvider = ({ children }) => {
    const [tabs, setTabs] = useState(() => {
        const savedTabs = localStorage.getItem('tabs');
        return savedTabs ? JSON.parse(savedTabs) : [];
    });

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('tabs', JSON.stringify(tabs));
    }, [tabs]);

    const addTab = (tab) => {
        setTabs((prevTabs) => {
            if (prevTabs.find(t => t.path === tab.path)) return prevTabs;
            return [...prevTabs, tab];
        });
    };

    const closeTab = (path) => {
        setTabs((prevTabs) => {
            const newTabs = prevTabs.filter(t => t.path !== path);
            if (newTabs.length > 0) {
                const currentIndex = prevTabs.findIndex(t => t.path === path);
                const nextTab = newTabs[currentIndex] || newTabs[currentIndex - 1];
                navigate(nextTab.path);
            } else {
                navigate('/');
            }
            return newTabs;
        });
    };

    return (
        <TabContext.Provider value={{ tabs, addTab, closeTab }}>
            {children}
        </TabContext.Provider>
    );
};