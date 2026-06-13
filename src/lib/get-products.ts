import 'server-only'

import { getPayloadClient } from './payload'
import type { Where } from 'payload'

export async function getFeaturedProducts() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: { featured: { equals: true } } as Where,
    limit: 6,
    depth: 1,
  })
  return result.docs
}

export async function getProducts(options?: { category?: string; limit?: number }) {
  const payload = await getPayloadClient()
  const where: Where = {}
  if (options?.category && options.category !== 'all') {
    where['category.slug'] = { equals: options.category }
  }
  const result = await payload.find({
    collection: 'products',
    where,
    limit: options?.limit ?? 50,
    depth: 1,
  })
  return result.docs
}

export async function getProductBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } } as Where,
    limit: 1,
    depth: 2,
  })
  return result.docs[0] ?? null
}
