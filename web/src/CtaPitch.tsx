import { useEffect, useRef, useState, type ReactNode } from 'react'

type CtaPitchProps = {
  lines: string[]
  joinHref?: string
}

function smoothStep(edge0: number, edge1: number, x: number) {
  if (edge0 >= edge1) return x >= edge1 ? 1 : 0
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function CharLine({ text, startIndex }: { text: string; startIndex: number }) {
  const chars: ReactNode[] = []
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    chars.push(
      <span key={startIndex + i} className="cta-pitch-char" data-i={startIndex + i}>
        {ch}
      </span>,
    )
  }
  return <p className="cta-pitch-line">{chars}</p>
}

function splitLines(lines: string[]) {
  let offset = 0
  return lines.map((line) => {
    const startIndex = offset
    offset += line.length
    return { line, startIndex }
  })
}

/** Accent chars light up in reading order as the section crosses the viewport. */
export function CtaPitch({ lines, joinHref = '/join' }: CtaPitchProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const parts = splitLines(lines)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const stack = stackRef.current
    const top = topRef.current
    if (!stack || !top) return

    const chars = [...top.querySelectorAll<HTMLElement>('.cta-pitch-char')]
    const n = Math.max(chars.length - 1, 1)

    if (reduceMotion) {
      for (const el of chars) el.style.opacity = '1'
      return
    }

    for (const el of chars) el.style.opacity = '0'

    let frame = 0
    const update = () => {
      frame = 0
      const rect = stack.getBoundingClientRect()
      // Scrub as the text rises from ~85% to ~50% down the viewport, so it is
      // fully lit by the time it settles mid-screen
      const start = window.innerHeight * 0.85
      const end = window.innerHeight * 0.5
      const progress = Math.max(
        0,
        Math.min(1, (start - rect.top) / Math.max(start - end, 1)),
      )

      for (let i = 0; i < chars.length; i++) {
        const t = i / n
        // Soft edge must end at ≤1 so the last chars actually finish
        chars[i].style.opacity = String(
          smoothStep(t, Math.min(1, t + 0.05), progress),
        )
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [lines, reduceMotion])

  return (
    <section
      ref={sectionRef}
      className="cta cta-pitch"
      aria-label="Join Us pitch"
    >
      <p className="cta-pitch-sr">{lines.join(' ')}</p>
      <div className="cta-pitch-stack" ref={stackRef}>
        <div className="cta-pitch-bottom" aria-hidden="true">
          {parts.map(({ line, startIndex }) => (
            <CharLine key={`b-${startIndex}`} text={line} startIndex={startIndex} />
          ))}
        </div>
        <div className="cta-pitch-top" ref={topRef} aria-hidden="true">
          {parts.map(({ line, startIndex }) => (
            <CharLine key={`t-${startIndex}`} text={line} startIndex={startIndex} />
          ))}
        </div>
      </div>
      <a className="cta-join" href={joinHref}>
        Learn more
      </a>
    </section>
  )
}
