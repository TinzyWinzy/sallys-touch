'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitted(true)
        form.reset()
      } else {
        const err = await res.json()
        setError(err.error || 'Failed to send message')
      }
    } catch {
      setError('Failed to send message')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="text-center mb-16">
        <p className="text-accent text-xs uppercase tracking-[0.3em] mb-3">Get in Touch</p>
        <h1 className="text-3xl lg:text-5xl font-serif">We&apos;d Love to Hear From You</h1>
        <p className="text-muted text-sm mt-4 max-w-md mx-auto">
          Have a question about our bags, shipping, or anything else? We&apos;re here to help.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          {submitted ? (
            <div className="p-6 bg-secondary text-center">
              <p className="text-lg font-serif mb-2">Message Sent!</p>
              <p className="text-sm text-muted">We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
              )}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-wider text-muted mb-2">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full px-4 py-3.5 border border-border bg-white text-sm focus:outline-none focus:border-accent"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider text-muted mb-2">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full px-4 py-3.5 border border-border bg-white text-sm focus:outline-none focus:border-accent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-muted mb-2">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="w-full px-4 py-3.5 border border-border bg-white text-sm focus:outline-none focus:border-accent"
                  placeholder="How can we help?"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-wider text-muted mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3.5 border border-border bg-white text-sm focus:outline-none focus:border-accent resize-none"
                  placeholder="Tell us more..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-primary text-white text-sm uppercase tracking-wider font-medium hover:bg-primary-light transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-8 lg:pt-2">
          <div className="flex gap-4">
            <Mail size={18} className="text-accent mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted mb-1">General Enquiries</h4>
              <a href="mailto:hello@sallystouch.com" className="text-sm hover:text-accent transition-colors">
                hello@sallystouch.com
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <Mail size={18} className="text-accent mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted mb-1">Sales & Wholesale</h4>
              <a href="mailto:sales@sallystouch.com" className="text-sm hover:text-accent transition-colors">
                sales@sallystouch.com
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <Phone size={18} className="text-accent mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted mb-1">Phone</h4>
              <p className="text-sm text-muted">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex gap-4">
            <MapPin size={18} className="text-accent mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted mb-1">Location</h4>
              <p className="text-sm text-muted">Harare, Zimbabwe & Cape Town, South Africa</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Clock size={18} className="text-accent mt-0.5 shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted mb-1">Response Time</h4>
              <p className="text-sm text-muted">We aim to respond within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
