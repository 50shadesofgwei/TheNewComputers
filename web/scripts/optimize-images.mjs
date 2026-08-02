import sharp from 'sharp'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/images')
const MAX_EDGE = 1600

const files = (await readdir(dir)).filter((f) => f.endsWith('.jpg') && !f.includes('.tmp'))

for (const file of files) {
  const base = file.replace(/\.jpg$/i, '')
  const input = path.join(dir, file)
  const original = await readFile(input)
  const meta = await sharp(original).rotate().metadata()
  const width = meta.width ?? MAX_EDGE
  const height = meta.height ?? MAX_EDGE
  const needsResize = width > MAX_EDGE || height > MAX_EDGE

  const makePipeline = () => {
    let pipeline = sharp(original).rotate()
    if (needsResize) {
      pipeline = pipeline.resize({
        width: width >= height ? MAX_EDGE : undefined,
        height: height > width ? MAX_EDGE : undefined,
        fit: 'inside',
        withoutEnlargement: true,
      })
    }
    return pipeline
  }

  const jpgBuf = await makePipeline().jpeg({ quality: 78, mozjpeg: true }).toBuffer()
  const webpBuf = await makePipeline().webp({ quality: 74 }).toBuffer()
  const avifBuf = await makePipeline().avif({ quality: 55, effort: 6 }).toBuffer()

  await writeFile(input, jpgBuf)
  await writeFile(path.join(dir, `${base}.webp`), webpBuf)
  await writeFile(path.join(dir, `${base}.avif`), avifBuf)

  const outMeta = await sharp(jpgBuf).metadata()
  console.log(
    `${base}: ${width}×${height} → ${outMeta.width}×${outMeta.height} | jpg ${(jpgBuf.length / 1024).toFixed(0)}KB webp ${(webpBuf.length / 1024).toFixed(0)}KB avif ${(avifBuf.length / 1024).toFixed(0)}KB`,
  )
}
