import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { PropertyProvider } from './context/PropertyContext.tsx'
import { GlobalStyle } from './styles/GlobalStyle.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PropertyProvider>
          <GlobalStyle />
          <App />
        </PropertyProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)