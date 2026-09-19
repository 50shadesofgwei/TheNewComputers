import { useEffect } from 'react'
import './Home.css'

const DESIGNS = [
  {
    name: 'Diamond QPU',
    note: 'v2.1 · NV centre · tabletop',
    href: '/blueprints/diamond-qpu',
    links: [] as { label: string; href: string }[],
  },
  {
    name: 'On-Chip Ion Trap',
    note: 'v1.3 · Ba-138 · May 2026',
    href: undefined,
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
            {design.href ? (
              <a className="gate-list-name" href={design.href}>
                {design.name}
              </a>
            ) : (
              <span className="gate-list-name">{design.name}</span>
            )}
            <span className="gate-list-note">{design.note}</span>
            {design.links.length > 0 ? (
              <span className="gate-list-links">
                {design.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </main>
  )
}
