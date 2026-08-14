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
  fig003: { name: 'fig-003', width: 1600, height: 961 },
  figGordianV2: { name: 'fig-gordian-v2', width: 1600, height: 900 },
  figLaser: { name: 'fig-laser', width: 1600, height: 1205 },
  figLaserQuote: { name: 'fig-laser-quote', width: 1536, height: 1024 },
  figIdiotIndex: { name: 'fig-idiot-index', width: 1600, height: 900 },
  figIbm: { name: 'fig-ibm', width: 1047, height: 1600 },
  figCuprate: { name: 'fig-cuprate', width: 900, height: 646 },
  figNistPaper: { name: 'fig-nist-paper', width: 900, height: 1165 },
  figCondensed: { name: 'fig-condensed-matter', width: 1440, height: 810 },
  figOpticalBench: { name: 'fig-optical-bench', width: 1065, height: 734 },
  figWolfgangPaul: { name: 'fig-wolfgang-paul', width: 480, height: 720 },
  figDavidWineland: { name: 'fig-david-wineland', width: 478, height: 720 },
  figWalterKohn: { name: 'fig-walter-kohn', width: 720, height: 974 },
  figPeterShor: { name: 'fig-peter-shor', width: 559, height: 720 },
  figNoyce: { name: 'fig-noyce', width: 1600, height: 857 },
  figJobsWoz: { name: 'fig-jobs-woz', width: 1000, height: 766 },
  figMocvd: { name: 'fig-mocvd', width: 521, height: 383 },
  figPeople: { name: 'fig-people', width: 1600, height: 1054 },
  figTeleportation: { name: 'fig-teleportation', width: 1448, height: 1086 },
  figSkunkworks: { name: 'fig-skunkworks', width: 1600, height: 884 },
  uva01: { name: 'uva-atomic-01', width: 900, height: 1600 },
  uva02: { name: 'uva-atomic-02', width: 900, height: 1600 },
} as const

/** Chapter splash images in scroll order — used for ahead-of-time preload. */
export const CHAPTER_IMAGES = [
  IMAGE.fig000.name,
  IMAGE.uva01.name,
  IMAGE.uva02.name,
  IMAGE.figGordianV2.name,
] as const
