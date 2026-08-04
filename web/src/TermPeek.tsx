import { useId } from 'react'

type TermPeekProps = {
  term: string
  imageName: string
  imageWidth: number
  imageHeight: number
  imageAlt: string
  title: string
  children: string
  wide?: boolean
}

/** Inline glossary term — hover/focus reveals a short figure + note. */
export function TermPeek({
  term,
  imageName,
  imageWidth,
  imageHeight,
  imageAlt,
  title,
  children,
  wide = false,
}: TermPeekProps) {
  const panelId = useId()

  return (
    <span className="term-peek">
      <button
        type="button"
        className="term-peek-trigger"
        aria-describedby={panelId}
      >
        {term}
      </button>
      <span
        className={`term-peek-panel${wide ? ' term-peek-panel-wide' : ''}`}
        id={panelId}
        role="tooltip"
      >
        <picture className="term-peek-media">
          <source srcSet={`/images/${imageName}.avif`} type="image/avif" />
          <source srcSet={`/images/${imageName}.webp`} type="image/webp" />
          <img
            src={`/images/${imageName}.jpg`}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            loading="lazy"
            decoding="async"
          />
        </picture>
        <span className="term-peek-copy">
          <strong className="term-peek-title">{title}</strong>
          <span className="term-peek-body">{children}</span>
        </span>
      </span>
    </span>
  )
}
