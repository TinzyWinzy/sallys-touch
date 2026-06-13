import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

async function init() {
  console.log('Initializing payload...')
  const payload = await getPayload({ config })

  const { totalDocs: catCount } = await payload.count({ collection: 'categories' })
  const { totalDocs: prodCount } = await payload.count({ collection: 'products' })

  console.log(`Database ready — ${catCount} categories, ${prodCount} products`)
  process.exit(0)
}

init().catch((err) => {
  console.error('Init failed:', err)
  process.exit(1)
})
