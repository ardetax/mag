// Компонент корзины с товарами
// Компонент Cart показывает выбранные товары, позволяет изменить количество или удалить товар,
// а также вычисляет общую стоимость заказа.
import React, {JSX, useContext} from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import {i18n} from "@lingui/core";
import {Trans} from "@lingui/react/macro";

export function Cart(): JSX.Element {
	const cartContext = useContext(CartContext); // Получаем контекст корзины
	const navigate = useNavigate(); // Используем для навигации между страницами

	if (!cartContext) {
		throw new Error("CartContext не найден"); // Выдаем ошибку, если контекст корзины не найден
	}

	// Извлекаем функции и данные из контекста
	const { cartItems, updateQuantity, removeFromCart, clearCart } = cartContext;

	function handleQuantityChange(productId: number, quantity: number): void {
		if (quantity < 1) return; // Если количество меньше 1, ничего не делаем
		updateQuantity(productId, quantity); // Обновляем количество товара в корзине
	}

	const totalPrice = cartItems.reduce(function (acc, item) {
		// Вычисляем общую стоимость товаров в корзине
		return acc + item.price * item.quantity;
	}, 0);

	return (
		<div id="cart">
			<h1><Trans id="cart">Корзина</Trans></h1>
			{cartItems.length === 0 ? (
				// Показываем сообщение, если корзина пуста
				<p><Trans id="cartA">Корзина пуста</Trans></p>
			) : (
				// Показываем товары, если корзина не пуста
				<div>
					{cartItems.map(function (item) {
						return (
							<div key={item.id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
								<h3>{item.name[i18n.locale] || item.name['ru']}</h3>
								<p>{item.category[i18n.locale] || item.category['ru']}</p>
								<p><Trans id="priceb">Цена: $</Trans>{item.price.toFixed(2)}</p>
								<div>
									<label htmlFor={`quantity-${item.id}`}><Trans id="quantity">Количество: </Trans></label>
									<input
										id={`quantity-${item.id}`}
										type="number"
										value={item.quantity}
										onChange={function (e) {
											// Обрабатываем изменение количества товара
											handleQuantityChange(item.id, parseInt(e.target.value, 10));
										}}
										style={{ width: "50px" }}
									/>
								</div>
								<button onClick={function () { removeFromCart(item.id); }}>
									<Trans id="removeFromCart">Удалить</Trans>
								</button>
							</div>
						);
					})}
					<h2><Trans id="totalPrice">Итого: $</Trans>{totalPrice.toFixed(2)}</h2>
					<button onClick={function () { navigate("/comanda");} }>
						<Trans id="placeOrder">Оформить заказ</Trans>
					</button>&nbsp;&nbsp;
					<button onClick={function () { clearCart() }}>
						<Trans id="clearCart">Очистить корзину</Trans>
					</button>
				</div>
			)}
		</div>
	);
}