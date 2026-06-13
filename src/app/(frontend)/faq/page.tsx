'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What materials do you use?',
    a: 'We use premium full-grain leather, calfskin, satin finish leather, and eco-friendly materials sourced from ethical suppliers. Each product page lists the specific materials used.',
  },
  {
    q: 'Are your bags handmade?',
    a: 'Yes! Every Sally\'s Touch bag is meticulously handcrafted by skilled artisans. This means each piece has subtle unique characteristics that make it truly one-of-a-kind.',
  },
  {
    q: 'How do I care for my bag?',
    a: 'Store your bag in the dust bag provided, away from direct sunlight. For leather care, use a soft dry cloth. For deeper cleaning, we recommend professional leather cleaning services.',
  },
  {
    q: 'What is your shipping policy?',
    a: 'We offer free shipping on orders over $100. Domestic orders are processed within 2-3 business days and delivered within 5-7 business days. International shipping takes 7-14 business days.',
  },
  {
    q: 'What is your return policy?',
    a: 'We accept returns within 30 days of delivery. Items must be unused, in their original packaging, and with all tags attached. We offer free returns for domestic orders.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes, we ship worldwide! International shipping rates vary by destination and are calculated at checkout. Customs duties may apply and are the responsibility of the customer.',
  },
  {
    q: 'Can I track my order?',
    a: 'Yes, once your order ships, you will receive a tracking number via email. You can use this to track your package\'s journey to your doorstep.',
  },
  {
    q: 'How are your bags priced?',
    a: 'Our prices reflect the quality of materials, the skill of our artisans, and fair wages. We believe in transparent pricing — you\'re paying for exceptional craftsmanship, not a brand name.',
  },
  {
    q: 'Do you offer gift wrapping?',
    a: 'Absolutely! We offer complimentary gift wrapping with a handwritten note. Just let us know at checkout.',
  },
  {
    q: 'Can I change or cancel my order?',
    a: 'You can modify or cancel your order within 24 hours of placing it. After that, the order enters production and cannot be changed. Contact us immediately if you need to make changes.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="text-center mb-16">
        <p className="text-accent text-xs uppercase tracking-[0.3em] mb-3">Got Questions?</p>
        <h1 className="text-3xl lg:text-5xl font-serif">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-border">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-secondary transition-colors"
            >
              <span className="text-sm font-medium pr-4">{faq.q}</span>
              <ChevronDown
                size={16}
                className={`shrink-0 transition-transform duration-200 ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-6 pb-5">
                <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
