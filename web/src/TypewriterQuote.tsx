import { useEffect, useRef, useState } from 'react'

type QuoteParagraph = {
  text: string
  citeHref?: string
  citeN?: string
}

type TypewriterQuoteProps = {
  paragraphs: QuoteParagraph[]
  /** Characters per second while typing. */
  cps?: number
}

/** Right-aligned quote that types itself in when scrolled into view. */
export function TypewriterQuote({ paragraphs, cps = 42 }: TypewriterQuoteProps) {
  const rootRef = useRef<HTMLQuoteElement>(null)
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const [paraIndex, setParaIndex] = useState(0)
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
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started || reduceMotion) {
      if (reduceMotion) setDone(true)
      return
    }

    const current = paragraphs[paraIndex]
    if (!current) {
      setDone(true)
      return
    }

    if (charIndex >= current.text.length) {
      if (paraIndex >= paragraphs.length - 1) {
        setDone(true)
        return
      }
      const pause = window.setTimeout(() => {
        setParaIndex((i) => i + 1)
        setCharIndex(0)
      }, 420)
      return () => window.clearTimeout(pause)
    }

    const delay = 1000 / cps
    const tick = window.setTimeout(() => {
      setCharIndex((n) => n + 1)
    }, delay)
    return () => window.clearTimeout(tick)
  }, [started, reduceMotion, paraIndex, charIndex, paragraphs, cps])

  const showFull = reduceMotion || done

  return (
    <blockquote
      ref={rootRef}
      className="quote-plain quote-typewriter"
      aria-live="polite"
    >
      {paragraphs.map((para, i) => {
        const visible = showFull
          ? para.text
          : i < paraIndex
            ? para.text
            : i === paraIndex
              ? para.text.slice(0, charIndex)
              : ''
        const showCite =
          Boolean(para.citeHref && para.citeN) &&
          (showFull || i < paraIndex || (i === paraIndex && charIndex >= para.text.length))
        const showCaret =
          started &&
          !done &&
          !reduceMotion &&
          i === paraIndex &&
          charIndex < para.text.length

        if (!visible && !showCite && i > paraIndex) return null

        return (
          <p key={i}>
            {visible}
            {showCaret ? <span className="quote-typewriter-caret" aria-hidden="true" /> : null}
            {showCite ? (
              <sup className="cite">
                <a href={para.citeHref}>{para.citeN}</a>
              </sup>
            ) : null}
          </p>
        )
      })}
    </blockquote>
  )
}
