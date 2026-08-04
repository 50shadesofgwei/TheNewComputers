import { useId } from 'react'

type TermPeekProps = {
  term: string
  title: string
  children: string
  wide?: boolean
  imageName?: string
  imageWidth?: number
  imageHeight?: number
  imageAlt?: string
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
  const hasImage = Boolean(imageName && imageWidth && imageHeight && imageAlt)

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
        className={[
          'term-peek-panel',
          wide ? 'term-peek-panel-wide' : '',
          hasImage ? '' : 'term-peek-panel-text',
        ]
          .filter(Boolean)
          .join(' ')}
        id={panelId}
        role="tooltip"
      >
        {hasImage ? (
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
        ) : null}
        <span className="term-peek-copy">
          <strong className="term-peek-title">{title}</strong>
          <span className="term-peek-body">{children}</span>
        </span>
      </span>
    </span>
  )
}
