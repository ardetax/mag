//Управление состоянием корзины
//Context API используется для хранения и управления состоянием корзины через CartContext.
import React, { createContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '../types';

// Определение интерфейса для контекста корзины
interface CartContextType {
	cartItems: CartItem[]; // Список элементов в корзине
	addToCart: (product: Product) => void; // Функция для добавления продукта в корзину
	updateQuantity: (productId: number, quantity: number) => void; // Функция для обновления количества продукта в корзине
	removeFromCart: (productId: number) => void; // Функция для удаления продукта из корзины
	clearCart: () => void; // Функция для очистки корзины
}

// Создание контекста корзины
export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
	children: ReactNode; // Дочерние компоненты, которые будут иметь доступ к контексту корзины
}

// Провайдер контекста корзины
export function CartProvider(props: CartProviderProps) {
	const { children } = props;
	const [cartItems, setCartItems] = useState<CartItem[]>([]); // Создаем состояние для хранения элементов корзины,
																															// начальное значение - пустой массив

	// Функция для добавления продукта в корзину
	function addToCart(product: Product): void {
		setCartItems(function (prevItems) {
			const existingItem = prevItems.find(function (item) {
				return item.id === product.id; // Ищем, есть ли уже этот продукт в корзине
			});
			if (existingItem) { // Если продукт уже в корзине, увеличиваем его количество
				return prevItems.map(function (item) {
					return item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item;
				});
			} // Если продукта нет в корзине, добавляем его с количеством 1
			return [...prevItems, { ...product, quantity: 1 }];
		});
	}

	// Функция для обновления количества продукта в корзине
	function updateQuantity(productId: number, quantity: number): void {
		setCartItems(function (prevItems) { // Находим продукт по его id и обновляем его количество
			return prevItems.map(function (item) {
				return item.id === productId ? { ...item, quantity: quantity } : item;
			});
		});
	}

	// Функция для удаления продукта из корзины
	function removeFromCart(productId: number): void {
		setCartItems(function (prevItems) { // Удаляем продукт из корзины, фильтруя его по id
			return prevItems.filter(function (item) {
				return item.id !== productId;
			});
		});
	}

	// Функция для очистки корзины
	function clearCart(): void {
		setCartItems([]); // Очищаем состояние корзины, устанавливая его в пустой массив
	}

	return (
		<CartContext.Provider
			value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }} // Передаем значения и функции через контекст
		>
			{children}
		</CartContext.Provider>
	);
}