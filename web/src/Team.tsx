import { useEffect } from 'react'
import './Home.css'

const POSTERS = [
  {
    src: '/images/team/uncle-sam.jpg',
    alt: 'Uncle Sam pointing. I want you for U.S. Army — James Montgomery Flagg, 1917',
    className: 'team-p team-p-sam',
  },
  {
    src: '/images/team/uncle-sam-point.jpg',
    alt: 'Uncle Sam’s pointing finger — James Montgomery Flagg, 1917',
    className: 'team-p team-p-finger',
  },
  {
    src: '/images/team/navy-sam.jpg',
    alt: 'Uncle Sam pointing. Navy! Enlist in the Navy — 1917',
    className: 'team-p team-p-navy',
  },
  {
    src: '/images/team/moor.jpg',
    alt: 'Red Army soldier pointing. Have you volunteered? — Dmitry Moor, 1920',
    className: 'team-p team-p-moor',
  },
  {
    src: '/images/team/your-country.jpg',
    alt: 'Lord Kitchener pointing. Your country needs you — Alfred Leete, 1914',
    className: 'team-p team-p-country',
  },
  {
    src: '/images/team/leete-cover.jpg',
    alt: 'London Opinion cover with Lord Kitchener pointing — Alfred Leete, 1914',
    className: 'team-p team-p-cover',
  },
] as const

export default function Team() {
  useEffect(() => {
    document.title = 'Team — Cheap Quantum Computers'
  }, [])

  return (
    <main className="team-collage">
      <a className="team-home" href="/">
        Cheap Quantum Computers
      </a>
      {POSTERS.map((poster) => (
        <img
          key={poster.src}
          className={poster.className}
          src={poster.src}
          alt={poster.alt}
        />
      ))}
    </main>
  )
}
