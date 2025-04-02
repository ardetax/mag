// lingui.config.js
module.exports = {
	locales: ['ro', 'ru'], // Языки для проекта
	sourceLocale: 'ru', // Язык по умолчанию
	catalogs: [
		{
			path: '<rootDir>/locales/{locale}/messages',
			include: ['src'], // Папка с кодом
		},
	],
	format: 'ts', // Формат переводов
}