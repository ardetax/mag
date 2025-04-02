// Компонент верхней навигационной панели
import React, {JSX, useContext} from "react";
import {ModalProvider} from "./modal/ModalContext";
import ModalBtComp from "./modal/ModalBtComp";
import {Cart} from "./Cart";
import {CartContext} from "../context/CartContext";
import {Trans} from "@lingui/react/macro";
import LanguageSwitcher from "./LanguageSwitcher";

export function NavBar (): JSX.Element {
	const cartContext = useContext(CartContext);

	if (!cartContext) {
		throw new Error("CartContext не найден");
	}
	const { cartItems } = cartContext;

	const carInfo = cartItems.length === 0 ? (
		<Trans id="cartA">Корзина пуста</Trans>
	) : (
		<><Trans id="cartB">В корзине</Trans> {cartItems.length} <Trans id="cartC">товаров</Trans></>
	);

	return (
		<div className="nav-bar">
			<div className="nav-content center-container">
				<div className="bt-cart">
					<ModalProvider><ModalBtComp buttonCaption={carInfo} Component={Cart}/></ModalProvider>
				</div>
				<LanguageSwitcher />
			</div>
		</div>
	)
}