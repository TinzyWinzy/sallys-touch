import Link from 'next/link'
import { Heart, Globe, Users } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Our Story — Sally's Touch",
  description: "Discover the story behind Sally's Touch — handcrafted luxury bags born from generations of artistry, heritage, and passion.",
  openGraph: {
    title: "Our Story — Sally's Touch",
    description: "Handcrafted luxury bags born from generations of artistry.",
  },
}

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-[50vh] min-h-[400px] bg-primary flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-accent text-xs uppercase tracking-[0.3em] mb-4">Our Story</p>
          <h1 className="text-4xl lg:text-6xl font-serif text-white">Where Craft Meets Soul</h1>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-sm max-w-none">
            <p className="text-lg text-muted leading-relaxed mb-8">
              Sally&apos;s Touch was born from a simple belief: that the things we carry should carry meaning. 
              Every bag we create is a celebration of heritage, craftsmanship, and the hands that bring it to life.
            </p>
            <p className="text-muted leading-relaxed mb-8">
              Our journey began with a vision to bridge the gap between traditional African artisanal techniques and 
              contemporary luxury design. We work directly with master artisans in Zimbabwe and South America, 
              preserving techniques passed down through generations while creating sustainable livelihoods for 
              women artisans.
            </p>
            <p className="text-muted leading-relaxed">
              Each Sally&apos;s Touch piece is more than an accessory — it&apos;s a story of empowerment, a testament to 
              patience, and a celebration of the beauty that emerges when skilled hands meet premium materials. 
              We believe in putting people first, honoring the maker, and creating pieces that transcend the 
              ordinary.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-accent text-xs uppercase tracking-[0.3em] mb-3">Our Values</p>
            <h2 className="text-3xl lg:text-5xl font-serif">What We Stand For</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Heart,
                title: 'People First',
                desc: 'We support fair wages, safe working conditions, and artisan communities across Africa and South America.',
              },
              {
                icon: Globe,
                title: 'Sustainable Craft',
                desc: 'From ethically sourced materials to eco-conscious packaging, sustainability is woven into everything we do.',
              },
              {
                icon: Users,
                title: 'Empowerment',
                desc: 'We invest in female artisans through workshops, skill transfer programs, and economic opportunities.',
              },
            ].map((val, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary text-accent flex items-center justify-center">
                  <val.icon size={28} />
                </div>
                <h3 className="text-xl font-serif mb-3">{val.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-serif mb-6">Ready to Find Your Perfect Bag?</h2>
          <Link
            href="/shop"
            className="inline-block px-10 py-4 bg-primary text-white text-sm uppercase tracking-wider font-medium hover:bg-primary-light transition-colors"
          >
            Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  )
}
