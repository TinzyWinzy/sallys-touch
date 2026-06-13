import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'
import type { Where } from 'payload'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const slug = searchParams.get('slug')
  const featured = searchParams.get('featured')

  try {
    const payload = await getPayloadClient()
    const where: Where = {}

    if (slug) where.slug = { equals: slug }
    if (featured === 'true') where.featured = { equals: true }
    if (category && category !== 'all') where['category.slug'] = { equals: category }

    const result = await payload.find({
      collection: 'products',
      where,
      depth: 1,
      limit: 50,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
