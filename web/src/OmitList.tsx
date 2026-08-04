import { useEffect, useRef } from 'react'

const ITEMS = [
  'Bill of materials',
  'Assembly time',
  'Supplier list',
  'Maintenance procedure',
  'Account of the earlier versions which failed',
] as const

/** Ruled omission list — × appears as you pass each row, clears if you scroll back up. */
export function OmitList() {
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const root = listRef.current
    if (!root) return

    const rows = [...root.querySelectorAll<HTMLLIElement>('li')]
    const marked = rows.map(() => false)
    let tops: number[] = []
    let ticking = false
    let active = false

    // Cache document Y positions — avoid getBoundingClientRect on every Lenis frame.
    const measure = () => {
      const scrollY = window.scrollY
      tops = rows.map((row) => row.getBoundingClientRect().top + scrollY)
    }

    const update = () => {
      ticking = false
      if (!active || tops.length === 0) return

      const triggerY = window.scrollY + window.innerHeight * 0.3
      for (let i = 0; i < rows.length; i++) {
        const next = tops[i] < triggerY
        if (next === marked[i]) continue
        marked[i] = next
        rows[i].classList.toggle('is-marked', next)
      }
    }

    const onScroll = () => {
      if (!active || ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    const gate = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting
        if (active) {
          measure()
          onScroll()
        }
      },
      { rootMargin: '50% 0px' },
    )
    gate.observe(root)

    measure()
    const onResize = () => {
      measure()
      onScroll()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      gate.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <ol className="omit-list" ref={listRef}>
      {ITEMS.map((label, i) => (
        <li key={label}>
          <span className="omit-list-num" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="omit-list-label">{label}</span>
          <span className="omit-list-mark" aria-hidden="true">
            ×
          </span>
          <span className="visually-hidden"> — not included</span>
        </li>
      ))}
    </ol>
  )
}
