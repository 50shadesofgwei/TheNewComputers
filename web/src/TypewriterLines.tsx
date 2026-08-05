import { useEffect, useRef, useState } from 'react'

type TypewriterLinesProps = {
  lines: string[]
  className?: string
  /** Characters per second while typing. */
  cps?: number
}

/** Right-aligned pull that types itself in when scrolled into view. */
export function TypewriterLines({
  lines,
  className = '',
  cps = 36,
}: TypewriterLinesProps) {
  const rootRef = useRef<HTMLParagraphElement>(null)
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
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

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStarted(true)
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.4, rootMargin: '0px 0px -10% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started || reduceMotion) {
      if (reduceMotion) setDone(true)
      return
    }

    const current = lines[lineIndex]
    if (!current) {
      setDone(true)
      return
    }

    if (charIndex >= current.length) {
      if (lineIndex >= lines.length - 1) {
        setDone(true)
        return
      }
      const pause = window.setTimeout(() => {
        setLineIndex((i) => i + 1)
        setCharIndex(0)
      }, 280)
      return () => window.clearTimeout(pause)
    }

    const delay = 1000 / cps
    const tick = window.setTimeout(() => {
      setCharIndex((n) => n + 1)
    }, delay)
    return () => window.clearTimeout(tick)
  }, [started, reduceMotion, lineIndex, charIndex, lines, cps])

  const showFull = reduceMotion || done

  return (
    <p
      ref={rootRef}
      className={`pull pull-sm pull-end pull-typewriter ${className}`.trim()}
      aria-live="polite"
    >
      {lines.map((line, i) => {
        const visible = showFull
          ? line
          : i < lineIndex
            ? line
            : i === lineIndex
              ? line.slice(0, charIndex)
              : ''
        const showCaret =
          started &&
          !done &&
          !reduceMotion &&
          i === lineIndex &&
          charIndex < line.length

        if (!visible && i > lineIndex) return null

        return (
          <span key={line} className="pull-typewriter-line">
            {visible}
            {showCaret ? (
              <span className="quote-typewriter-caret" aria-hidden="true" />
            ) : null}
          </span>
        )
      })}
    </p>
  )
}
