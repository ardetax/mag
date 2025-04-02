//Управление состоянием корзины
//Context API используется для хранения и управления состоянием корзины через CartContext.
import React, { createContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
	cartItems: CartItem[];
	addToCart: (product: Product) => void;
	updateQuantity: (productId: number, quantity: number) => void;
	removeFromCart: (productId: number) => void;
	clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
	children: ReactNode;
}

export function CartProvider(props: CartProviderProps) {
	const { children } = props;
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	function addToCart(product: Product): void {
		setCartItems(function (prevItems) {
			const existingItem = prevItems.find(function (item) {
				return item.id === product.id;
			});
			if (existingItem) {
				return prevItems.map(function (item) {
					return item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item;
				});
			}
			return [...prevItems, { ...product, quantity: 1 }];
		});
	}

	function updateQuantity(productId: number, quantity: number): void {
		setCartItems(function (prevItems) {
			return prevItems.map(function (item) {
				return item.id === productId ? { ...item, quantity: quantity } : item;
			});
		});
	}

	function removeFromCart(productId: number): void {
		setCartItems(function (prevItems) {
			return prevItems.filter(function (item) {
				return item.id !== productId;
			});
		});
	}

	function clearCart(): void {
		setCartItems([]);
	}

	return (
		<CartContext.Provider
			value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}
		>
			{children}
		</CartContext.Provider>
	);
}