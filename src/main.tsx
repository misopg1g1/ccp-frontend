import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MockComponent from "./components/MockComponent/MockComponent";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <MockComponent/>
    </React.StrictMode>,
)
