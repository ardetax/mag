// Контекст модального окна
import React, {createContext, useContext, useState, ReactNode, FC, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useLocation} from "react-router-dom";

interface ModalContextProps {
	openModal: (content: ReactNode) => void;
	closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [modalContent, setModalContent] = useState<ReactNode | null>(null);

	// Переименуем переменную, чтобы избежать конфликта с глобальной "location"
	const routerLocation = useLocation();

	// Открытие модального окна
	const openModal = (content: ReactNode) => {
		setModalContent(content);
	};

	// Закрытие модального окна
	const closeModal = () => {
		setModalContent(null);
	};

	// При изменении маршрута закрываем модальное окно
	useEffect(() => {
		closeModal();
	}, [routerLocation]);

	return (
		<ModalContext.Provider value={{ openModal, closeModal }}>
			{children}
			{modalContent &&
				ReactDOM.createPortal(
					<div className="modal-overlay">
						<div className="modal-content">
							{modalContent}
							<button onClick={closeModal} className="modal-bt">X</button>
						</div>
					</div>,
					// Убедитесь, что в вашем index.html есть элемент с id="modal-root"
					document.getElementById('modal-root')!
				)}
		</ModalContext.Provider>
	);
};

export const useModal = (): ModalContextProps => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('useModal должен использоваться внутри ModalProvider');
	}
	return context;
};