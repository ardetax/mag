// Компонент вывода товаров
import React, { useContext, useState, useEffect, useRef, JSX } from 'react';
import { CartContext } from '../context/CartContext';
import { Product } from '../types';
import { Preloader } from './Preloader';
import { Trans } from "@lingui/react/macro";
import { useLingui } from '@lingui/react';

// Список товаров с возможностью сортировки по категориям и бесконечной прокруткой
export function ProductList(): JSX.Element {
	const { i18n } = useLingui();
	const [products, setProducts] = useState<Product[]>([]);// Состояние для хранения списка товаров
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);// Состояние для хранения отфильтрованных товаров
	const [selectedCategory, setSelectedCategory] = useState<string>('');// Состояние для хранения выбранной категории
	const [loading, setLoading] = useState<boolean>(true);// Состояние для отслеживания загрузки
	const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);// Состояние для хранения отображаемых товаров
	const loadMoreRef = useRef<HTMLDivElement | null>(null);// Референция для элемента подгрузки товаров
	const ITEMS_PER_LOAD = 6;// Количество товаров для подгрузки за один раз

	const cartContext = useContext(CartContext);// Получаем контекст корзины
	if (!cartContext) {
		throw new Error("CartContext is undefined");
	}
	const { addToCart } = cartContext;

	// Загружаем товары из JSON-файла (расположенного в папке public)
	useEffect(() => {
		fetch('/products.json')
			.then((res) => res.json())
			.then((data: Product[]) => {
				setProducts(data);
				setFilteredProducts(data);
				setVisibleProducts(data.slice(0, ITEMS_PER_LOAD));
				setLoading(false);// Сбрасываем состояние загрузки после успешного получения данных
			})
			.catch((error) => {
				console.error(i18n._({ id: "errorProducts", message: "Ошибка загрузки товаров:" }), error);
				setLoading(false);// Сбрасываем состояние загрузки при ошибке
			});
	}, []);

	// При смене локали сбрасываем выбранную категорию и пересчитываем отфильтрованные товары
	useEffect(() => {
		// При смене языка выбранная категория может стать неактуальной, поэтому сбрасываем фильтр
		setSelectedCategory('');
		setFilteredProducts(products);
		setVisibleProducts(products.slice(0, ITEMS_PER_LOAD));
	}, [i18n.locale, products]);

	function handleAddToCart(product: Product): void {
		addToCart(product);// Добавляем товар в корзину
	}

	function handleCategoryChange(category: string): void {
		setSelectedCategory(category);
		// Фильтруем товары по выбранной категории
		const filtered = category
			? products.filter(
				product =>
					(product.category[i18n.locale] || product.category['ru']) === category
			)
			: products;
		setFilteredProducts(filtered);
		setVisibleProducts(filtered.slice(0, ITEMS_PER_LOAD));
	}

	function loadMoreProducts(): void {
		// Подгружаем больше товаров при прокрутке
		setVisibleProducts(prev => {
			const nextItems = filteredProducts.slice(prev.length, prev.length + ITEMS_PER_LOAD);
			return [...prev, ...nextItems];
		});
	}

	useEffect(() => {
		const handleObserver = (entries: IntersectionObserverEntry[]) => {
			if (entries[0].isIntersecting && visibleProducts.length < filteredProducts.length) {
				loadMoreProducts();// Подгружаем товары, если элемент наблюдения виден и есть еще товары для подгрузки
			}
		};

		const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);// Начинаем наблюдение за элементом подгрузки
		}

		return () => {
			if (loadMoreRef.current) {
				observer.unobserve(loadMoreRef.current);// Прекращаем наблюдение при размонтировании компонента
			}
		};
	}, [visibleProducts, filteredProducts]);

	if (loading) {
		return <Preloader />;// Показываем индикатор загрузки, пока данные загружаются
	}

	// Вычисляем список уникальных категорий с учётом текущей локали
	const localizedCategories = Array.from(
		new Set(
			products.map(
				(product) => product.category[i18n.locale] || product.category['ru']
			)
		)
	);

	return (
		<div>
			{/* Фильтр по категориям */}
			<div className="filtrCat">
				<label htmlFor="category-select">
					<Trans id="selectCategory">Выберите категорию:</Trans>
				</label>
				<select
					id="category-select"
					value={selectedCategory}
					onChange={(e) => handleCategoryChange(e.target.value)}
				>
					<option value="">
						<Trans id="allCategories">Все категории</Trans>
					</option>
					{localizedCategories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>

			{/* Список товаров */}
			<div className="productList">
				{visibleProducts.map((product) => (
					<div key={product.id} className="productID">
						<div>
							<img
								src={product.image}
								alt={product.name[i18n.locale] || product.name['ru']}
								style={{ width: "100%" }}
							/>
							{/* Выводим название товара с переводом */}
							<h3>{product.name[i18n.locale] || product.name['ru']}</h3>
						</div>
						<div>
							{/* Выводим категорию товара с переводом */}
							<p>{product.category[i18n.locale] || product.category['ru']}</p>
							<p>
								<Trans id="price">Цена:</Trans> ${product.price.toFixed(2)}
							</p>
							<button onClick={() => handleAddToCart(product)}>
								<Trans id="cartAdd">Добавить в корзину</Trans>
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Элемент наблюдения для подгрузки товаров */}
			<div ref={loadMoreRef} style={{ height: '1px' }}></div>
		</div>
	);
}