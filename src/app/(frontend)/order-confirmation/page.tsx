import Link from 'next/link'
import { Check } from 'lucide-react'

function generateReference(id: string): string {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const chars = hash.toString(36).toUpperCase()
  return `ST-${new Date().getFullYear()}-${chars.padEnd(6, '0').slice(0, 6)}`
}

export default async function OrderConfirmationPage(props: {
  searchParams: Promise<{ order?: string }>
}) {
  const { order } = await props.searchParams
  const reference = order ? generateReference(order) : `ST-${new Date().getFullYear()}-CONFIRMED`

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check size={32} className="text-accent-dark" />
      </div>
      <h1 className="text-3xl lg:text-4xl font-serif mb-4">Thank You for Your Order!</h1>
      <p className="text-muted text-sm mb-2">
        Your order has been placed successfully.
      </p>
      <p className="text-muted text-sm mb-8">
        You will receive a confirmation email shortly with your order details.
      </p>
      <div className="bg-secondary p-6 mb-8 text-left">
        <p className="text-xs uppercase tracking-wider text-muted mb-2">Order Reference</p>
        <p className="text-lg font-mono">{reference}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/shop"
          className="px-8 py-3.5 bg-primary text-white text-sm uppercase tracking-wider font-medium hover:bg-primary-light transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/contact"
          className="px-8 py-3.5 border border-border text-sm uppercase tracking-wider font-medium hover:bg-secondary transition-colors"
        >
          Need Help?
        </Link>
      </div>
    </div>
  )
}
