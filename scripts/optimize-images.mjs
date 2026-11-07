import sharp from 'sharp'
import { readdirSync, mkdirSync } from 'fs'
import path from 'path'
const src = 'assets-original', out = 'public/images'
mkdirSync(out, { recursive: true })
for (const f of readdirSync(src).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))) {
  const n = path.parse(f).name.toLowerCase()
  const img = () => sharp(path.join(src, f)).rotate()
  await img().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${out}/${n}.webp`)
  await img().resize({ width: 800, withoutEnlargement: true }).webp({ quality: 76 }).toFile(`${out}/${n}-800.webp`)
  console.log('done', n)
}
