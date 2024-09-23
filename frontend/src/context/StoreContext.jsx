import { createContext, useEffect } from "react";
import { useState } from 'react';
import axios from 'axios';
import { config } from "../config";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

        if (token) {
            await axios.post(config.baseUrl + '/api/cart/add', {itemId}, {headers:{token}})
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const newCartItems = { ...prev };
            if (newCartItems[itemId] > 1) {
                newCartItems[itemId] -= 1;
            } else {
                delete newCartItems[itemId];
            }
            return newCartItems;
        });
        
        if (token) {
            await axios.post(config.baseUrl + "/api/cart/remove", {itemId}, {headers: {token}})
        }
    };

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const itemInfo = food_list.find((product) => product._id === itemId);
            return itemInfo ? total + itemInfo.price * cartItems[itemId] : total;
        }, 0);
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${config.baseUrl}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async (token) => {
        const response = await axios.post(config.baseUrl + '/api/cart/get', {}, {headers: {token}})
        setCartItems(response.data.cartData)

    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList()
            
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'))
                await loadCartData(localStorage.getItem('token'))
            }
        }

        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;