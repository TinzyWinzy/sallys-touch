import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const inputDir = path.resolve(__dirname, '..', 'public', 'images', 'products')
const outputDir = path.resolve(__dirname, '..', 'public', 'images', 'optimized')

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const productNames = [
  'the-grace-tote', 'the-noir-crossbody', 'the-blossom-clutch',
  'the-dusk-satchel', 'the-ember-shoulder', 'the-pearl-mini',
  'the-velvet-crescent', 'the-gilded-bucket', 'the-linen-market',
  'the-suede-sling', 'the-leather-duffle', 'the-evening-star',
  'the-boho-crossbody', 'the-classic-bucket', 'the-silk-clutch',
  'the-structured-tote', 'the-mini-belt-bag', 'the-tribal-print',
  'the-elegance-tote', 'the-twilight-bag',
]

async function optimizeImage(filename, index) {
  const inputPath = path.join(inputDir, filename)
  const baseName = productNames[index] || `product-${index + 1}`

  const sizes = [
    { suffix: '', width: 1400 },
    { suffix: '-medium', width: 800 },
    { suffix: '-thumbnail', width: 400 },
  ]

  for (const size of sizes) {
    const outputName = `${baseName}${size.suffix}.webp`
    const outputPath = path.join(outputDir, outputName)

    await sharp(inputPath)
      .resize(size.width, undefined, { withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outputPath)

    console.log(`  ✓ ${outputName}`)
  }
}

async function main() {
  const files = fs.readdirSync(inputDir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .sort()

  console.log(`Optimizing ${files.length} images...\n`)

  for (let i = 0; i < files.length; i++) {
    console.log(`[${i + 1}/${files.length}] ${files[i]}`)
    await optimizeImage(files[i], i)
  }

  console.log(`\n✓ Done! ${files.length * 3} optimized images created in ${outputDir}`)
}

main().catch(console.error)
