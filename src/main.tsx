import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import Routes from './routes'
import configureStore from './configureStore'
import './global.scss'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const {store} = configureStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <Routes />
        </Provider> 
    </React.StrictMode>,
)
