import React from 'react'
import ReactDOM from 'react-dom/client'
import './Resources/css/app.css'
import Routes from './routes.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
)
