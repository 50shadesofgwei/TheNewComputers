import { useEffect } from 'react'
import './Home.css'

export function SiteNav() {
  return (
    <nav className="gate-nav" aria-label="Site">
      <a href="/mission">Mission</a>
      <a href="/blueprints">Blueprints</a>
      <a href="/team">Team</a>
    </nav>
  )
}

export default function Home() {
  useEffect(() => {
    document.title = 'Cheap Quantum Computers'
  }, [])

  return (
    <main className="gate">
      <div className="gate-frame">
        <h1>Cheap Quantum Computers</h1>
        <SiteNav />
      </div>
    </main>
  )
}
