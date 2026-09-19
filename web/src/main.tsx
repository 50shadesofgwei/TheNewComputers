import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Blueprint from './Blueprint.tsx'
import Contact from './Contact.tsx'
import DiamondQpu from './DiamondQpu.tsx'
import Home from './Home.tsx'
import Team from './Team.tsx'

const path = window.location.pathname.replace(/\/+$/, '') || '/'

const Page =
  path === '/mission'
    ? App
    : path === '/blueprints/diamond-qpu' || path === '/diamond-qpu'
      ? DiamondQpu
      : path === '/blueprints' || path === '/blueprint'
        ? Blueprint
        : path === '/team'
          ? Team
          : path === '/join'
            ? Contact
            : Home

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
