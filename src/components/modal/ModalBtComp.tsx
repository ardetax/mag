// Кнопка запуска компонента в модальном окне с возможностью использования в любой части приложения
import React, {JSX} from 'react';
import { useModal } from './ModalContext';

interface IntFB {
	buttonCaption: React.ReactNode;
	Component: React.ComponentType<any>;
}

export default function ModalBtComp ({buttonCaption, Component}:IntFB): JSX.Element {
	const { openModal } = useModal();

	const handleOpenComponentModal = () => {
		openModal(<Component />);
	};

	return (<button onClick={handleOpenComponentModal}>{buttonCaption}</button>);
}

/**
 *
 * Использование:
 * В любом месте проекта вставить следующее:
 * <ModalProvider><ModalBtComp buttonCaption="Корзина" Component={Cart}/></ModalProvider>
 *
 */