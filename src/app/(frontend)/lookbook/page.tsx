import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Lookbook — Sally's Touch",
  description: "Explore our collections through the lens of the artists, muses, and landscapes that inspire them.",
}

const lookbookItems = [
  { title: 'Signature Collection', description: 'Timeless designs crafted for the modern woman.', img: '/images/optimized/the-grace-tote.webp' },
  { title: 'Evening Edit', description: 'Sophisticated pieces for nights out and special occasions.', img: '/images/optimized/the-pearl-mini.webp' },
  { title: 'Crossbody Curated', description: 'Hands-free elegance for the woman on the go.', img: '/images/optimized/the-noir-crossbody.webp' },
]

const galleryImages = [
  { src: '/images/optimized/the-dusk-satchel.webp', span: 'col-span-2' },
  { src: '/images/optimized/the-blossom-clutch.webp', span: '' },
  { src: '/images/optimized/the-gilded-bucket.webp', span: '' },
  { src: '/images/optimized/the-velvet-crescent.webp', span: '' },
  { src: '/images/optimized/the-ember-shoulder.webp', span: '' },
  { src: '/images/optimized/the-linen-market.webp', span: 'col-span-2' },
]

export default function LookbookPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="text-center mb-16">
        <p className="text-accent text-xs uppercase tracking-[0.3em] mb-3">Visual Stories</p>
        <h1 className="text-3xl lg:text-5xl font-serif">Lookbook</h1>
        <p className="text-muted text-sm mt-4 max-w-lg mx-auto">
          Explore our collections through the lens of the artists, muses, and landscapes that inspire them.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {lookbookItems.map((item, i) => (
          <Link key={i} href="/shop" className="group cursor-pointer">
            <div className="relative aspect-[3/4] bg-secondary mb-5 overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
            <h3 className="text-lg font-serif mb-1 group-hover:text-accent transition-colors">{item.title}</h3>
            <p className="text-sm text-muted">{item.description}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8 mt-16">
        {galleryImages.map((img, i) => (
          <div key={i} className={`${img.span} relative aspect-[3/2] bg-secondary overflow-hidden`}>
            <Image src={img.src} alt="" fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        ))}
      </div>
    </div>
  )
}
