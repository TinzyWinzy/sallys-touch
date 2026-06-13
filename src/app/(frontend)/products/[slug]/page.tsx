'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, ChevronLeft, Check, Heart } from 'lucide-react'
import { useCart } from '@/lib/CartContext'

interface Product {
  title: string
  price: number
  compareAtPrice?: number
  description: string
  shortDescription?: string
  materials: string
  dimensions: string
  category: string
  img: string
}

const fallbackData: Record<string, Product> = {
  'the-grace-tote': {
    title: 'The Grace Tote', price: 295,
    description: 'A timeless companion for everyday elegance. Crafted with premium full-grain leather and lined with soft suede, The Grace Tote offers both sophistication and practicality.',
    materials: 'Full-grain Italian leather, suede lining, gold-toned hardware',
    dimensions: '14" W x 10" H x 5" D', category: 'Totes',
    img: '/images/optimized/the-grace-tote.webp',
  },
  'the-noir-crossbody': {
    title: 'The Noir Crossbody', price: 245,
    description: 'Sleek, compact, and undeniably chic. Designed for the woman on the move with an adjustable strap and multiple interior pockets.',
    materials: 'Calfskin leather, microfiber lining, silver-toned hardware',
    dimensions: '9" W x 6" H x 3" D', category: 'Crossbody',
    img: '/images/optimized/the-noir-crossbody.webp',
  },
  'the-blossom-clutch': {
    title: 'The Blossom Clutch', price: 195, compareAtPrice: 245,
    description: 'Make a statement with delicate floral-inspired design.',
    materials: 'Satin finish leather, silk interior, crystal embellishments',
    dimensions: '10" W x 5" H x 2" D', category: 'Clutches',
    img: '/images/optimized/the-blossom-clutch.webp',
  },
  'the-dusk-satchel': {
    title: 'The Dusk Satchel', price: 320,
    description: 'A structured satchel that exudes confidence.',
    materials: 'Italian pebbled leather, canvas lining, brass hardware',
    dimensions: '12" W x 9" H x 5" D', category: 'Satchels',
    img: '/images/optimized/the-dusk-satchel.webp',
  },
  'the-ember-shoulder': {
    title: 'The Ember Shoulder Bag', price: 275,
    description: 'Rich ember hue adds warmth to any ensemble.',
    materials: 'Waxed calfskin, suede interior, antique gold hardware',
    dimensions: '11" W x 8" H x 4" D', category: 'Signature',
    img: '/images/optimized/the-ember-shoulder.webp',
  },
  'the-pearl-mini': {
    title: 'The Pearl Mini Bag', price: 180,
    description: 'A dainty mini bag adorned with genuine mother of pearl accents.',
    materials: 'Mother of pearl accents, satin finish, chain strap',
    dimensions: '7" W x 4" H x 2" D', category: 'Evening',
    img: '/images/optimized/the-pearl-mini.webp',
  },
  'the-velvet-crescent': {
    title: 'The Velvet Crescent', price: 260,
    description: 'The crescent shape reimagined in plush velvet with leather trim.',
    materials: 'Italian velvet, leather trim, gold hardware',
    dimensions: '10" W x 5" H x 3" D', category: 'Crossbody',
    img: '/images/optimized/the-velvet-crescent.webp',
  },
  'the-gilded-bucket': {
    title: 'The Gilded Bucket', price: 310,
    description: 'Gold-stamped leather that catches the light with every step.',
    materials: 'Gold-stamped leather, microfiber lining, magnetic closure',
    dimensions: '9" W x 11" H x 6" D', category: 'Signature',
    img: '/images/optimized/the-gilded-bucket.webp',
  },
  'the-linen-market': {
    title: 'The Linen Market Bag', price: 160,
    description: 'Lightweight yet durable linen tote.',
    materials: 'Premium linen, leather handles, cotton lining',
    dimensions: '16" W x 14" H x 6" D', category: 'Totes',
    img: '/images/optimized/the-linen-market.webp',
  },
}

const additionalImages = [
  '/images/optimized/the-suede-sling-medium.webp',
  '/images/optimized/the-leather-duffle-medium.webp',
  '/images/optimized/the-evening-star-medium.webp',
]

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { addItem } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products?slug=${slug}`)
        const data = await res.json()
        if (data.docs?.length > 0) {
          const p = data.docs[0]
          setProduct({
            title: p.title,
            price: p.price,
            compareAtPrice: p.compareAtPrice,
            description: p.shortDescription || p.description || '',
            materials: p.materials || '',
            dimensions: p.dimensions || '',
            category: p.category?.name || '',
            img: `/images/optimized/${slug}.webp`,
          })
        } else {
          setProduct(fallbackData[slug] || null)
        }
      } catch {
        setProduct(fallbackData[slug] || null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
        <Link href="/shop" className="text-accent hover:underline text-sm">
          Back to Shop
        </Link>
      </div>
    )
  }

  const onSale = product.compareAtPrice && product.compareAtPrice > product.price
  const images = [product.img, ...additionalImages.slice(0, 3)]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Link href="/shop" className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-muted hover:text-primary transition-colors mb-8">
        <ChevronLeft size={14} /> Back to Shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="space-y-4">
          <div className="relative aspect-[4/5] bg-secondary overflow-hidden">
            <Image
              src={images[selectedImage]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
          <div className="flex gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative w-20 h-20 bg-secondary overflow-hidden border-2 transition-colors ${
                  i === selectedImage ? 'border-primary' : 'border-transparent'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:pt-8">
          <p className="text-[10px] uppercase tracking-widest text-muted mb-2">{product.category}</p>
          <h1 className="text-3xl lg:text-4xl font-serif mb-4">{product.title}</h1>

          <div className="flex items-center gap-3 mb-6">
            <span className={`text-2xl font-medium ${onSale ? 'text-accent-dark' : ''}`}>
              ${product.price.toFixed(2)}
            </span>
            {onSale && (
              <span className="text-muted line-through text-lg">${product.compareAtPrice?.toFixed(2)}</span>
            )}
          </div>

          <p className="text-muted text-sm leading-relaxed mb-8">{product.description}</p>

          <div className="space-y-3 mb-8">
            <div className="flex gap-2">
              <span className="text-xs uppercase tracking-wider text-muted w-24 shrink-0">Materials</span>
              <span className="text-sm">{product.materials}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-xs uppercase tracking-wider text-muted w-24 shrink-0">Dimensions</span>
              <span className="text-sm">{product.dimensions}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => addItem({ id: slug, slug, title: product.title, price: product.price, quantity: 1, image: product.img })}
              className="w-full py-4 bg-primary text-white text-sm uppercase tracking-wider font-medium hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} /> Add to Cart — ${product.price.toFixed(2)}
            </button>
            <button className="w-full py-4 border border-border text-sm uppercase tracking-wider font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2">
              <Heart size={16} /> Add to Wishlist
            </button>
          </div>

          <div className="mt-8 flex items-start gap-3 p-4 bg-secondary">
            <Check size={16} className="text-accent mt-0.5 shrink-0" />
            <p className="text-xs text-muted leading-relaxed">
              Free shipping on orders over $100. 30-day returns. All bags are handcrafted and may vary slightly — that&apos;s the beauty of handmade.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
