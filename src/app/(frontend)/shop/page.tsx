import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getProducts } from '@/lib/get-products'

export const metadata: Metadata = {
  title: "Shop Bags — Sally's Touch",
  description: "Browse our collection of handcrafted luxury bags — totes, crossbodies, clutches, satchels, and more.",
  openGraph: {
    title: "Shop Bags — Sally's Touch",
    description: "Handcrafted luxury bags for every occasion.",
  },
}

const fallbackCategories = [
  { name: 'All Bags', slug: 'all' },
  { name: 'Signature', slug: 'signature' },
  { name: 'Evening', slug: 'evening' },
  { name: 'Crossbody', slug: 'crossbody' },
  { name: 'Totes', slug: 'totes' },
  { name: 'Clutches', slug: 'clutches' },
]

const fallbackProducts = [
  { title: 'The Grace Tote', price: 150, category: 'Totes', slug: 'the-grace-tote', image: '/images/optimized/the-grace-tote.webp' },
  { title: 'The Noir Crossbody', price: 120, category: 'Crossbody', slug: 'the-noir-crossbody', image: '/images/optimized/the-noir-crossbody.webp' },
  { title: 'The Blossom Clutch', price: 120, category: 'Clutches', slug: 'the-blossom-clutch', image: '/images/optimized/the-blossom-clutch.webp' },
  { title: 'The Dusk Satchel', price: 150, category: 'Satchels', slug: 'the-dusk-satchel', image: '/images/optimized/the-dusk-satchel.webp' },
  { title: 'The Ember Shoulder Bag', price: 150, category: 'Signature', slug: 'the-ember-shoulder', image: '/images/optimized/the-ember-shoulder.webp' },
  { title: 'The Pearl Mini Bag', price: 120, category: 'Evening', slug: 'the-pearl-mini', image: '/images/optimized/the-pearl-mini.webp' },
  { title: 'The Velvet Crescent', price: 120, category: 'Crossbody', slug: 'the-velvet-crescent', image: '/images/optimized/the-velvet-crescent.webp' },
  { title: 'The Gilded Bucket', price: 150, category: 'Signature', slug: 'the-gilded-bucket', image: '/images/optimized/the-gilded-bucket.webp' },
  { title: 'The Linen Market Bag', price: 150, category: 'Totes', slug: 'the-linen-market', image: '/images/optimized/the-linen-market.webp' },
]

function getImageForSlug(slug: string): string {
  return `/images/optimized/${slug}.webp`
}

export default async function ShopPage() {
  let products: Array<{ title: string; price: number; category?: string; slug: string; image: string }> = []
  let categories: Array<{ name: string; slug: string }> = []

  try {
    const cmsProducts = await getProducts()
    if (cmsProducts.length > 0) {
      products = cmsProducts.map((p) => ({
        title: p.title,
        price: p.price,
        category: typeof p.category === 'object' && p.category ? (p.category as { name: string }).name : undefined,
        slug: p.slug,
        image: getImageForSlug(p.slug),
      }))
    } else {
      products = fallbackProducts
    }
  } catch {
    products = fallbackProducts
  }

  try {
    const { getPayloadClient } = await import('@/lib/payload')
    const payload = await getPayloadClient()
    const cats = await payload.find({ collection: 'categories', limit: 50 })
    if (cats.docs.length > 0) {
      categories = [
        { name: 'All Bags', slug: 'all' },
        ...cats.docs.map((c) => ({ name: c.name, slug: c.slug })),
      ]
    } else {
      categories = fallbackCategories
    }
  } catch {
    categories = fallbackCategories
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="text-center mb-12">
        <p className="text-accent text-xs uppercase tracking-[0.3em] mb-3">The Collection</p>
        <h1 className="text-3xl lg:text-5xl font-serif">Shop Bags</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.slug === 'all' ? '/shop' : `/shop/${cat.slug}`}
            className="px-5 py-2.5 text-xs uppercase tracking-wider transition-colors bg-secondary text-primary hover:bg-primary hover:text-white"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {products.map((product) => (
          <div key={product.slug} className="group">
            <Link href={`/products/${product.slug}`}>
              <div className="relative aspect-[4/5] bg-secondary mb-4 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
            </Link>
            {product.category && (
              <p className="text-[10px] uppercase tracking-widest text-muted mb-1">{product.category}</p>
            )}
            <h3 className="text-sm font-medium mb-1">
              <Link href={`/products/${product.slug}`} className="hover:text-accent transition-colors">
                {product.title}
              </Link>
            </h3>
            <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
