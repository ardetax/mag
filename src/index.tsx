import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/template.css';
import {LinguiProvider} from "./context/LinguiProvider";

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <LinguiProvider><App /></LinguiProvider>
    </React.StrictMode>
  );
}