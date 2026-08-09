import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Contact from './Contact.tsx'

const path = window.location.pathname.replace(/\/+$/, '') || '/'
const Page = path === '/join' ? Contact : App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
