import React, { createContext, useContext, useReducer } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const BasketContext = createContext();

const basketReducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_BASKET":
			return {
				...state,
				items: [...state.items, action.payload],
			};
		case "REMOVE_FROM_BASKET":
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.payload),
			};
		case "UPDATE_BASKET_ITEM_QUANTITY":
			return {
				...state,
				items: state.items.map((item) =>
					item.id === action.payload.itemId
						? { ...item, quantity: action.payload.quantity }
						: item
				),
			};
		case "CLEAR_BASKET":
			return {
				...state,
				items: [],
			};
		default:
			return state;
	}
};

const BasketProvider = ({ children }) => {
	const [basket, dispatch] = useReducer(basketReducer, { items: [] });

	const addToBasket = (item) => {
		const existingItem = basket.items.find(
			(basketItem) => basketItem.id === item.id
		);

		if (!existingItem) {
			dispatch({ type: "ADD_TO_BASKET", payload: item });
		}
	};

	const clearBasket = () => {
		dispatch({ type: "CLEAR_BASKET" });
	};
	const removeFromBasket = (itemId) => {
		dispatch({ type: "REMOVE_FROM_BASKET", payload: itemId });
	};

	const updateBasketItemQuantity = (itemId, quantity) => {
		dispatch({
			type: "UPDATE_BASKET_ITEM_QUANTITY",
			payload: { itemId, quantity },
		});
	};
	return (
		<BasketContext.Provider
			value={{
				basket,
				addToBasket,
				removeFromBasket,
				updateBasketItemQuantity,
				clearBasket,
			}}>
			<Outlet />
			<ToastContainer />
		</BasketContext.Provider>
	);
};

const useBasket = () => {
	const context = useContext(BasketContext);
	if (!context) {
		throw new Error("useBasket must be used within a BasketProvider");
	}
	return context;
};

export { BasketProvider, useBasket };
