import { useEffect, useRef, useState, type ReactNode } from 'react'

export type QuotePart = {
  text: string
  strong?: boolean
  citeHref?: string
  citeN?: string
}

export type QuoteParagraph = {
  /** Rich segments (bold / mid-cite). Prefer this when formatting matters. */
  parts?: QuotePart[]
  /** Simple plain text; optional end cite. */
  text?: string
  citeHref?: string
  citeN?: string
}

type TypewriterQuoteProps = {
  paragraphs: QuoteParagraph[]
  /** Characters per second while typing. */
  cps?: number
  /** Lighter plain style (vs default bold pull-quote). */
  plain?: boolean
}

function normalizeParts(para: QuoteParagraph): QuotePart[] {
  if (para.parts?.length) return para.parts
  return [
    {
      text: para.text ?? '',
      citeHref: para.citeHref,
      citeN: para.citeN,
    },
  ]
}

function partsFullText(parts: QuotePart[]) {
  return parts.map((p) => p.text).join('')
}

function renderParts(
  parts: QuotePart[],
  visibleChars: number,
  caret: boolean,
): ReactNode {
  let remaining = visibleChars
  const nodes: ReactNode[] = []

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (remaining <= 0) break

    const take = Math.min(part.text.length, remaining)
    const slice = part.text.slice(0, take)
    remaining -= take
    const partComplete = take >= part.text.length
    const cite =
      partComplete && part.citeHref && part.citeN ? (
        <sup className="cite">
          <a href={part.citeHref}>{part.citeN}</a>
        </sup>
      ) : null

    const body = (
      <>
        {slice}
        {cite}
      </>
    )

    nodes.push(
      part.strong ? (
        <strong key={i}>{body}</strong>
      ) : (
        <span key={i}>{body}</span>
      ),
    )
  }

  if (caret) {
    nodes.push(
      <span key="caret" className="quote-typewriter-caret" aria-hidden="true" />,
    )
  }

  return nodes
}

/** Right-aligned quote that types itself in when scrolled into view. */
export function TypewriterQuote({
  paragraphs,
  cps = 42,
  plain = false,
}: TypewriterQuoteProps) {
  const rootRef = useRef<HTMLQuoteElement>(null)
  const paragraphsRef = useRef(paragraphs)
  paragraphsRef.current = paragraphs

  const normalized = paragraphs.map(normalizeParts)
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

    const partsList = paragraphsRef.current.map(normalizeParts)
    const current = partsList[paraIndex]
    if (!current) {
      setDone(true)
      return
    }

    const full = partsFullText(current)
    if (charIndex >= full.length) {
      if (paraIndex >= partsList.length - 1) {
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
  }, [started, reduceMotion, paraIndex, charIndex, cps])

  const showFull = reduceMotion || done

  return (
    <blockquote
      ref={rootRef}
      className={`quote-typewriter${plain ? ' quote-plain' : ''}`}
      aria-live="polite"
    >
      <div className="quote-typewriter-sizer" aria-hidden="true">
        {normalized.map((parts, i) => (
          <p key={`sizer-${i}`}>{renderParts(parts, partsFullText(parts).length, false)}</p>
        ))}
      </div>
      <div className="quote-typewriter-live">
        {normalized.map((parts, i) => {
          const fullLen = partsFullText(parts).length
          const visible = showFull
            ? fullLen
            : i < paraIndex
              ? fullLen
              : i === paraIndex
                ? charIndex
                : 0
          const showCaret =
            started &&
            !done &&
            !reduceMotion &&
            i === paraIndex &&
            charIndex < fullLen

          if (visible === 0 && i > paraIndex) return null

          return (
            <p key={`live-${i}`}>{renderParts(parts, visible, showCaret)}</p>
          )
        })}
      </div>
    </blockquote>
  )
}
