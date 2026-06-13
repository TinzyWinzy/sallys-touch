'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-serif mb-4">
              Sally&apos;s <span className="text-accent">Touch</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Handcrafted luxury bags made with love and intention. 
              Every stitch tells a story of heritage, skill, and passion.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors text-xs uppercase tracking-wider" aria-label="Instagram">IG</a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors text-xs uppercase tracking-wider" aria-label="Facebook">FB</a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors text-xs uppercase tracking-wider" aria-label="Twitter">X</a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm uppercase tracking-widest mb-4 text-accent">Shop</h4>
              <ul className="space-y-3">
                <li><Link href="/shop" className="text-gray-400 hover:text-white text-sm transition-colors">All Bags</Link></li>
                <li><Link href="/shop" className="text-gray-400 hover:text-white text-sm transition-colors">New Arrivals</Link></li>
                <li><Link href="/shop" className="text-gray-400 hover:text-white text-sm transition-colors">Best Sellers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-widest mb-4 text-accent">Info</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">Our Story</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">FAQ</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest mb-4 text-accent">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Be the first to know about new collections and exclusive offers.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Sally&apos;s Touch. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-accent" /> by Sally
          </p>
        </div>
      </div>
    </footer>
  )
}

function NewsletterForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const email = new FormData(form).get('email') as string
    if (!email) return

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        form.reset()
        alert('Thanks for subscribing!')
      }
    } catch { /* ignore */ }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        name="email"
        placeholder="Your email"
        className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-accent"
      />
      <button
        type="submit"
        className="px-5 py-2.5 bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors"
      >
        Subscribe
      </button>
    </form>
  )
}
