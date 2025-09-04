import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/tailwind.css'
import './App/App.css'
import './styles/styles.tsx'
import './Button/Button.css'
import App from './App/App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
