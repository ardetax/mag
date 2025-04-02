// Прелоадер. Используется при выводе товаров на экран
import React, {JSX, useEffect} from 'react';

export function Preloader(): JSX.Element {
	useEffect(function () {

		// Добавляем класс к body
		document.body.classList.add('load');

		// Функция очистки, которая выполнится при размонтировании компонента
		return function () {
			document.body.classList.remove('load');
		};
	}, []); // Пустой массив зависимостей гарантирует, что эффект выполнится один раз при монтировании

	return <span className="loader"></span>;
}