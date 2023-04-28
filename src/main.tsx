import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import Routes from './routes'
import configureStore from './configureStore'
import './global.scss'

const {store} = configureStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <Routes />
        </Provider> 
    </React.StrictMode>,
)
