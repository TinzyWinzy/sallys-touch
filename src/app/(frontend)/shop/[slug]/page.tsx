import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getProducts } from '@/lib/get-products'
import { getPayloadClient } from '@/lib/payload'

const fallbackProducts = [
  { title: 'The Grace Tote', price: 295, category: 'Totes', slug: 'the-grace-tote', image: '/images/optimized/the-grace-tote.webp' },
  { title: 'The Noir Crossbody', price: 245, category: 'Crossbody', slug: 'the-noir-crossbody', image: '/images/optimized/the-noir-crossbody.webp' },
  { title: 'The Blossom Clutch', price: 195, category: 'Clutches', slug: 'the-blossom-clutch', image: '/images/optimized/the-blossom-clutch.webp' },
  { title: 'The Dusk Satchel', price: 320, category: 'Satchels', slug: 'the-dusk-satchel', image: '/images/optimized/the-dusk-satchel.webp' },
  { title: 'The Ember Shoulder Bag', price: 275, category: 'Signature', slug: 'the-ember-shoulder', image: '/images/optimized/the-ember-shoulder.webp' },
  { title: 'The Pearl Mini Bag', price: 180, category: 'Evening', slug: 'the-pearl-mini', image: '/images/optimized/the-pearl-mini.webp' },
  { title: 'The Velvet Crescent', price: 260, category: 'Crossbody', slug: 'the-velvet-crescent', image: '/images/optimized/the-velvet-crescent.webp' },
  { title: 'The Gilded Bucket', price: 310, category: 'Signature', slug: 'the-gilded-bucket', image: '/images/optimized/the-gilded-bucket.webp' },
  { title: 'The Linen Market Bag', price: 160, category: 'Totes', slug: 'the-linen-market', image: '/images/optimized/the-linen-market.webp' },
]

function getImageForSlug(slug: string): string {
  return `/images/optimized/${slug}.webp`
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const name = slug.charAt(0).toUpperCase() + slug.slice(1)
  return {
    title: `${name} Bags — Sally's Touch`,
    description: `Browse our ${slug} collection of handcrafted luxury bags.`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let products: Array<{ title: string; price: number; category: string; slug: string; image: string }> = []
  let categories: Array<{ name: string; slug: string }> = []

  try {
    const cmsProducts = await getProducts({ category: slug })
    if (cmsProducts.length > 0) {
      products = cmsProducts.map((p) => ({
        title: p.title,
        price: p.price,
        category: typeof p.category === 'object' && p.category ? (p.category as { name: string }).name : slug,
        slug: p.slug,
        image: getImageForSlug(p.slug),
      }))
    }
  } catch { /* fallback below */ }

  if (products.length === 0) {
    const catName = slug.charAt(0).toUpperCase() + slug.slice(1)
    products = fallbackProducts
      .filter((p) => p.category.toLowerCase() === slug.toLowerCase())
      .map((p) => ({ ...p, category: catName }))
  }

  try {
    const payload = await getPayloadClient()
    const cats = await payload.find({ collection: 'categories', limit: 50 })
    if (cats.docs.length > 0) {
      categories = [
        { name: 'All Bags', slug: 'all' },
        ...cats.docs.map((c) => ({ name: c.name, slug: c.slug })),
      ]
    }
  } catch { /* ignore */ }

  if (categories.length === 0) {
    categories = [
      { name: 'All Bags', slug: 'all' },
      { name: 'Signature', slug: 'signature' },
      { name: 'Evening', slug: 'evening' },
      { name: 'Crossbody', slug: 'crossbody' },
      { name: 'Totes', slug: 'totes' },
      { name: 'Clutches', slug: 'clutches' },
    ]
  }

  const currentName = slug.charAt(0).toUpperCase() + slug.slice(1)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="text-center mb-12">
        <p className="text-accent text-xs uppercase tracking-[0.3em] mb-3">{currentName}</p>
        <h1 className="text-3xl lg:text-5xl font-serif">{currentName} Bags</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.slug === 'all' ? '/shop' : `/shop/${cat.slug}`}
            className={`px-5 py-2.5 text-xs uppercase tracking-wider transition-colors ${
              cat.slug === slug ? 'bg-primary text-white' : 'bg-secondary text-primary hover:bg-primary hover:text-white'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted text-sm">No products found in this category.</p>
          <Link href="/shop" className="text-accent hover:underline text-sm mt-2 inline-block">View all bags</Link>
        </div>
      ) : (
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
              <p className="text-[10px] uppercase tracking-widest text-muted mb-1">{product.category}</p>
              <h3 className="text-sm font-medium mb-1">
                <Link href={`/products/${product.slug}`} className="hover:text-accent transition-colors">
                  {product.title}
                </Link>
              </h3>
              <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
