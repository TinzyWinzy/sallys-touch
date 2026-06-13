'use client'

import { useCart } from '@/lib/CartContext'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CartDrawer() {
  const { state, removeItem, updateQuantity, closeCart, subtotal, totalItems } = useCart()

  return (
    <>
      {state.isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={closeCart} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <span className="font-medium">Cart ({totalItems})</span>
              </div>
              <button onClick={closeCart} className="p-1 hover:text-accent transition-colors">
                <X size={20} />
              </button>
            </div>

            {state.items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag size={48} className="text-gray-300" />
                <p className="text-muted text-sm">Your cart is empty</p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="px-6 py-3 bg-primary text-white text-sm uppercase tracking-wider hover:bg-primary-light transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b border-border last:border-0">
                      <div className="relative w-20 h-20 bg-secondary shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="text-sm font-medium hover:text-accent transition-colors line-clamp-1"
                          >
                            {item.title}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                            aria-label="Remove item"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <p className="text-sm text-muted mt-1">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 border border-border hover:border-primary transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 border border-border hover:border-primary transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border px-6 py-5 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted">Shipping calculated at checkout</p>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full py-3.5 bg-primary text-white text-center text-sm uppercase tracking-wider hover:bg-primary-light transition-colors"
                  >
                    Checkout
                  </Link>
                  <button
                    onClick={closeCart}
                    className="block w-full text-center text-sm text-muted hover:text-primary transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
