import { useEffect, useRef, useState } from 'react'

type RevealLinesProps = {
  lines: string[]
  className?: string
  /** Delay between each line revealing, in ms. */
  staggerMs?: number
}

/** Right-aligned pull list that cascades in when scrolled into view. */
export function RevealLines({
  lines,
  className = '',
  staggerMs = 140,
}: RevealLinesProps) {
  const rootRef = useRef<HTMLParagraphElement>(null)
  const [active, setActive] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    if (reduceMotion) {
      setActive(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true)
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.4, rootMargin: '0px 0px -10% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [reduceMotion])

  return (
    <p
      ref={rootRef}
      className={`pull pull-sm pull-end pull-reveal${active ? ' is-active' : ''}${reduceMotion ? ' is-instant' : ''} ${className}`.trim()}
      aria-live="polite"
    >
      {lines.map((line, i) => (
        <span
          key={line}
          className="pull-reveal-line"
          style={
            reduceMotion
              ? undefined
              : { transitionDelay: active ? `${i * staggerMs}ms` : '0ms' }
          }
        >
          {line}
        </span>
      ))}
    </p>
  )
}
