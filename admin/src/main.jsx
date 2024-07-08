import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { TabProvider } from './context/TabContext.jsx'
import StoreContextProvider from '../../frontend/src/context/StoreContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <TabProvider>
        <App />
      </TabProvider>
    </StoreContextProvider>
  </BrowserRouter>,
)
