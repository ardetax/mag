// Контекст локализации приложения.
// Используется библиотека JavaScript i18n LinguiJS
import React from "react";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { messages as roMessages } from "../locales/ro/messages";
import { messages as ruMessages } from "../locales/ru/messages";

// Настройка локалей
i18n.load({ ro: roMessages, ru: ruMessages });
i18n.activate("ro");

export const LinguiProvider = ({ children }: { children: React.ReactNode }) => {
	return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};