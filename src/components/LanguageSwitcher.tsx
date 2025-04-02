// Компонент вывода кнопок переключения языка
import React from 'react';
import { useLingui } from '@lingui/react';

const LanguageSwitcher: React.FC = () => {
	const { i18n } = useLingui();
	const handleLanguageChange = (lang: string) => {
		i18n.activate(lang);
	};

	return (
		<div className="lang" >
			<button
				className={`${i18n.locale === 'ro' ? 'bt-active' : ''}`}
				onClick={() => handleLanguageChange('ro')}
			>
				Româna
			</button>
			<button
				className={`${i18n.locale === 'ru' ? 'bt-active' : ''}`}
				onClick={() => handleLanguageChange('ru')}
			>
				Русский
			</button>

		</div>
	);
};

export default LanguageSwitcher;