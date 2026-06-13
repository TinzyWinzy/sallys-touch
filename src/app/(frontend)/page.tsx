'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Shield, Feather, Sparkles } from 'lucide-react'

const brandValues = [
  {
    title: 'Handcrafted',
    description: 'Every bag is meticulously handcrafted by skilled artisans, ensuring each piece is uniquely yours.',
    icon: 'Heart',
  },
  {
    title: 'Sustainable',
    description: 'We source eco-friendly materials and support ethical production practices that honor our planet.',
    icon: 'Shield',
  },
  {
    title: 'Timeless',
    description: 'Designed to transcend seasons and trends — a true investment in enduring style.',
    icon: 'Feather',
  },
  {
    title: 'Empowering',
    description: 'Every purchase supports artisan communities and preserves traditional craftsmanship.',
    icon: 'Sparkles',
  },
]

const asSeenIn = [
  'Vogue', 'Harper\'s Bazaar', 'Elle', 'Marie Claire', 'Vanity Fair', 'InStyle',
]

const featuredProducts = [
  { slug: 'the-grace-tote', name: 'The Grace Tote', price: '$295.00', cat: 'Signature' },
  { slug: 'the-noir-crossbody', name: 'The Noir Crossbody', price: '$245.00', cat: 'Crossbody' },
  { slug: 'the-blossom-clutch', name: 'The Blossom Clutch', price: '$195.00', cat: 'Clutches' },
]

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-serif mb-4">Join the Circle</h2>
        <p className="text-muted text-sm mb-8">
          Subscribe for early access to new collections, artisan stories, and exclusive offers.
        </p>
        {status === 'success' ? (
          <p className="text-accent text-sm">Thanks for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 border border-border bg-white text-sm focus:outline-none focus:border-accent"
              required
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-primary text-white text-sm uppercase tracking-wider font-medium hover:bg-primary-light transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-red-500 text-xs mt-2">Something went wrong. Try again later.</p>
        )}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[90vh] flex bg-primary">
        <div className="hidden lg:block w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent z-10" />
          <Image
            src="/images/optimized/the-grace-tote-medium.webp"
            alt="The Grace Tote"
            fill
            className="object-contain object-right p-12"
            sizes="50vw"
            priority
          />
          <div className="absolute bottom-12 left-12 z-20 flex gap-3">
            <span className="text-white/40 text-[10px] uppercase tracking-widest">The Grace Tote</span>
            <span className="text-accent text-[10px] uppercase tracking-widest">$295</span>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center px-6 sm:px-12 lg:px-16 py-20 lg:py-0">
          <div className="max-w-lg">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-accent" />
              <span className="text-accent text-xs uppercase tracking-[0.3em]">Luxury Redefined</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-white leading-[1.1] mb-6">
              Not All Bags Are Created Equal
            </h1>
            <p className="text-white/60 text-base sm:text-lg mb-10 leading-relaxed">
              Handcrafted luxury for the bold and beautiful. Every stitch tells a story of heritage, skill, and passion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-10 py-4 bg-accent text-white text-sm uppercase tracking-wider font-medium hover:bg-accent-dark transition-colors"
              >
                Shop the Collection
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white text-sm uppercase tracking-wider font-medium hover:bg-white/10 transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['the-grace-tote', 'the-noir-crossbody', 'the-dusk-satchel', 'the-gilded-bucket'].map((slug) => (
              <Link key={slug} href={`/products/${slug}`} className="group relative aspect-[3/4] bg-secondary overflow-hidden">
                <Image
                  src={`/images/optimized/${slug}.webp`}
                  alt=""
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-xs uppercase tracking-[0.3em] mb-3">Our Promise</p>
            <h2 className="text-3xl lg:text-5xl font-serif">Designed for the Bold</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {brandValues.map((val, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto mb-5 bg-primary text-accent flex items-center justify-center">
                  {val.icon === 'Heart' && <Heart size={24} />}
                  {val.icon === 'Shield' && <Shield size={24} />}
                  {val.icon === 'Feather' && <Feather size={24} />}
                  {val.icon === 'Sparkles' && <Sparkles size={24} />}
                </div>
                <h3 className="text-lg font-serif mb-2">{val.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-xs uppercase tracking-[0.3em] mb-3">The Collection</p>
            <h2 className="text-3xl lg:text-5xl font-serif">Featured Bags</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group cursor-pointer">
                <div className="relative aspect-[4/5] bg-secondary mb-4 overflow-hidden">
                  <Image
                    src={`/images/optimized/${p.slug}.webp`}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <p className="text-[10px] uppercase tracking-widest text-muted mb-1">{p.cat}</p>
                <h3 className="text-sm font-medium mb-1">{p.name}</h3>
                <p className="text-sm">{p.price}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-block px-10 py-4 border-2 border-primary text-primary text-sm uppercase tracking-wider font-medium hover:bg-primary hover:text-white transition-colors"
            >
              View All Bags
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent text-xs uppercase tracking-[0.3em] mb-4">Our Heritage</p>
          <h2 className="text-3xl lg:text-5xl font-serif mb-8">
            Where Craft Meets <span className="text-accent">Soul</span>
          </h2>
          <p className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Each Sally&apos;s Touch bag is born from generations of artistry. From the careful selection 
            of materials to the final stitch, our process honors the hands that make it and the story it carries.
          </p>
          <Link
            href="/about"
            className="inline-block px-10 py-4 border border-white/30 text-white text-sm uppercase tracking-wider font-medium hover:bg-white/10 transition-colors"
          >
            Discover Our Story
          </Link>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-accent text-xs uppercase tracking-[0.3em] mb-8">As Seen In</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {asSeenIn.map((name) => (
              <div key={name} className="text-lg lg:text-xl font-serif text-gray-400 tracking-wide">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  )
}
