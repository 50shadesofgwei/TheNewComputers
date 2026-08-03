type MissionImageProps = {
  name: string
  alt: string
  width: number
  height: number
  priority?: boolean
}

/** Responsive picture with AVIF → WebP → JPEG fallback. */
export function MissionImage({
  name,
  alt,
  width,
  height,
  priority = false,
}: MissionImageProps) {
  return (
    <picture>
      <source srcSet={`/images/${name}.avif`} type="image/avif" />
      <source srcSet={`/images/${name}.webp`} type="image/webp" />
      <img
        src={`/images/${name}.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  )
}

export const IMAGE = {
  fig000: { name: 'fig-000', width: 1600, height: 806 },
  fig001: { name: 'fig-001', width: 962, height: 1200 },
  fig002: { name: 'fig-002', width: 1400, height: 1104 },
  fig003: { name: 'fig-003', width: 1600, height: 1067 },
  figLaser: { name: 'fig-laser', width: 1600, height: 1205 },
  figIbm: { name: 'fig-ibm', width: 1047, height: 1600 },
  figCondensed: { name: 'fig-condensed-matter', width: 1440, height: 810 },
  uva01: { name: 'uva-atomic-01', width: 900, height: 1600 },
  uva02: { name: 'uva-atomic-02', width: 900, height: 1600 },
} as const

/** Chapter splash images in scroll order — used for ahead-of-time preload. */
export const CHAPTER_IMAGES = [
  IMAGE.fig000.name,
  IMAGE.fig001.name,
  IMAGE.uva01.name,
  IMAGE.uva02.name,
  IMAGE.fig003.name,
  IMAGE.fig002.name,
] as const
