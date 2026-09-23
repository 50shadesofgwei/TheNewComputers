import { useEffect } from 'react'
import './Home.css'

const DESIGNS = [
  {
    name: 'Diamond QPU',
    note: 'v2.1',
    links: [{ label: 'Paper', href: '/blueprints/diamond-qpu' }],
  },
  {
    name: 'On-Chip Ion Trap',
    note: 'v1.3',
    links: [
      {
        label: 'Paper',
        href: 'https://www.zk50.io/papers/pathfinder-pic-chip.pdf',
      },
      {
        label: 'CAD',
        href: 'https://github.com/50shadesofgwei/pathfinder-pic-ion-chip/blob/main/Ba138_v2.f3d',
      },
    ],
  },
] as const

export default function Blueprint() {
  useEffect(() => {
    document.title = 'Blueprints — Cheap Quantum Computers'
  }, [])

  return (
    <main className="gate gate-sub">
      <a className="gate-mark" href="/">
        Cheap Quantum Computers
      </a>
      <h1>Blueprints</h1>
      <ol className="gate-list">
        {DESIGNS.map((design) => (
          <li key={design.name}>
            <span className="gate-list-name">{design.name}</span>
            <span className="gate-list-note">{design.note}</span>
            <span className="gate-list-links">
              {design.links.map((link) => {
                const external = link.href.startsWith('http')
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    {...(external
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                  >
                    {link.label}
                  </a>
                )
              })}
            </span>
          </li>
        ))}
      </ol>
    </main>
  )
}
