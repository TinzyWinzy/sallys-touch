'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/CartContext'
import { ShoppingBag } from 'lucide-react'

interface ProductCardProps {
  id: string
  slug: string
  title: string
  price: number
  compareAtPrice?: number | null
  image: string
  category?: string
  new?: boolean
}

export default function ProductCard({
  id, slug, title, price, compareAtPrice, image, category, new: isNew,
}: ProductCardProps) {
  const { addItem } = useCart()
  const onSale = compareAtPrice && compareAtPrice > price

  return (
    <div className="group">
      <Link href={`/products/${slug}`} className="block relative aspect-[4/5] bg-secondary overflow-hidden mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {isNew && (
            <span className="px-3 py-1 bg-accent text-white text-[10px] uppercase tracking-wider font-medium">
              New
            </span>
          )}
          {onSale && (
            <span className="px-3 py-1 bg-primary text-white text-[10px] uppercase tracking-wider font-medium">
              Sale
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            addItem({ id, slug, title, price, quantity: 1, image })
          }}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-white"
          aria-label="Add to cart"
        >
          <ShoppingBag size={16} />
        </button>
      </Link>
      <div className="space-y-1">
        {category && (
          <p className="text-[10px] uppercase tracking-widest text-muted">{category}</p>
        )}
        <h3 className="text-sm font-medium">
          <Link href={`/products/${slug}`} className="hover:text-accent transition-colors">
            {title}
          </Link>
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">${price.toFixed(2)}</span>
          {onSale && (
            <span className="text-xs text-muted line-through">${compareAtPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  )
}
