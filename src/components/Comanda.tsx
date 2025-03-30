//Оформление заказа
//Компонент Comanda содержит форму ввода контактных данных с базовой валидацией.
//После успешной отправки заказа происходит очистка корзины и перенаправление на главную страницу.
import React, {useState, useContext, JSX} from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import {Trans} from "@lingui/react/macro";
import { useLingui } from '@lingui/react';

interface ComandaForm {
	name: string;
	address: string;
	phone: string;
	email: string;
}

export function Comanda(): JSX.Element {
	const [formData, setFormData] = useState<ComandaForm>({
		name: "",
		address: "",
		phone: "",
		email: "",
	});
	const [errors, setErrors] = useState<Partial<ComandaForm>>({});
	const { i18n } = useLingui();

	const cartContext = useContext(CartContext);// Получаем контекст корзины
	const navigate = useNavigate();// Используем для навигации между страницами

	if (!cartContext) {
		throw new Error("CartContext не найден");// Выдаем ошибку, если контекст корзины не найден
	}

	const { cartItems, clearCart } = cartContext;// Извлекаем функции и данные из контекста

	// Функция для валидации данных формы
	function validate(): boolean {
		const newErrors: Partial<ComandaForm> = {};

		if (!formData.name.trim()) {
			newErrors.name = i18n._({ id: "newErrorsname", message: "Введите имя" });
		}
		if (!formData.address.trim()) {
			newErrors.address = i18n._({ id: "newErrorsaddress", message: "Введите адрес" });
		}
		if (!/^\+?[0-9\s\-]{7,15}$/.test(formData.phone)) {
			newErrors.phone = i18n._({ id: "newErrorsphone", message: "Введите корректный телефон" });
		}
		if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = i18n._({ id: "newErrorsemail", message: "Введите корректный e-mail" });
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;// Возвращаем true, если нет ошибок
	}

	// Функция для обработки изменений в форме
	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	// Функция для обработки отправки формы
	function handleSubmit(e: React.FormEvent): void {
		e.preventDefault();
		if (validate()) {
			// Здесь можно выполнить отправку данных заказа на сервер
			alert(i18n._({ id: "alertOrder", message: "Заказ оформлен!" }));
			clearCart();// Очищаем корзину после успешного оформления заказа
			navigate("/");// Перенаправляем на главную страницу
		}
	}

	// Если корзина пуста, показываем сообщение
	if (cartItems.length === 0) {
		return ( // Отображаем форму ввода данных для оформления заказа
			<div className="comanda">
				<h1><Trans id="placeOrderb">Оформление заказа</Trans></h1><br/>
				<p><Trans id="cartA">Корзина пуста</Trans></p><br/>
				<Link to="/"><Trans id="BackProducts">Вернуться к товарам</Trans></Link>
			</div>
		);
	}

	return (
		<div className="comanda">
			<h1><Trans id="placeOrderb">Оформление заказа</Trans></h1>
			<form onSubmit={handleSubmit} noValidate>
				<div>
					<label htmlFor="name"><Trans id="name">Имя:</Trans></label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
					{errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
				</div><br /><br />
				<div>
					<label htmlFor="address"><Trans id="address">Адрес:</Trans></label>
					<textarea
						id="address"
						name="address"
						value={formData.address}
						onChange={handleChange}
					/>
					{errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
				</div><br /><br />
				<div>
					<label htmlFor="phone"><Trans id="tel">Телефон:</Trans></label>
					<input
						type="text"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
					/>
					{errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
				</div><br /><br />
				<div>
					<label htmlFor="email"><Trans id="mail">E-mail:</Trans></label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
					{errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
				</div><br /><br />
				<button type="submit"><Trans id="placeOrder">Оформить заказ</Trans></button>
			</form>
	    <Link to="/"><Trans id="BackProducts">Вернуться к товарам</Trans></Link>
		</div>
	);
}