'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '@/lib/CartContext'

export default function CartPage() {
  const { state, removeItem, updateQuantity, subtotal, totalItems } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingBag size={48} className="text-gray-300 mx-auto mb-6" />
        <h1 className="text-2xl font-serif mb-4">Your Cart is Empty</h1>
        <p className="text-muted text-sm mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/shop"
          className="inline-block px-8 py-3.5 bg-primary text-white text-sm uppercase tracking-wider font-medium hover:bg-primary-light transition-colors"
        >
          Shop Now
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl lg:text-3xl font-serif">Shopping Cart</h1>
        <span className="text-sm text-muted">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
      </div>

      <div className="space-y-6">
        {state.items.map((item) => (
          <div key={item.id} className="flex gap-6 py-6 border-b border-border">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-secondary shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <Link
                    href={`/products/${item.slug}`}
                    className="text-sm font-medium hover:text-accent transition-colors"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-muted mt-1">${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="p-1.5 border border-border hover:border-primary transition-colors"
                  aria-label="Decrease"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1.5 border border-border hover:border-primary transition-colors"
                  aria-label="Increase"
                >
                  <Plus size={14} />
                </button>
                <span className="text-sm text-muted ml-auto">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} /> Continue Shopping
        </Link>
        <div className="text-right w-full sm:w-auto">
          <div className="flex justify-between sm:justify-end items-center gap-8 mb-4">
            <span className="text-sm text-muted">Subtotal</span>
            <span className="text-xl font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <p className="text-xs text-muted mb-6">Shipping and taxes calculated at checkout</p>
          <Link
            href="/checkout"
            className="block sm:inline-block px-10 py-4 bg-primary text-white text-sm uppercase tracking-wider font-medium hover:bg-primary-light transition-colors text-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
