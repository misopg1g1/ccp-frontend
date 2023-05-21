import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Routes from './routes';
import configureStore from './configureStore';
import './global.scss';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import global_es from "./transalations/es/global.json";
import global_en from "./transalations/en/global.json";

i18next.init({
    interpolation: { escapeValue: false },
    lng: "es",
    resources: {
        es: {
            global: global_es
        }, 
        en: {
            global: global_en
        },
    },
});

const {store} = configureStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <Provider store={store}>
                <Routes />
            </Provider> 
        </I18nextProvider>
    </React.StrictMode>
)
