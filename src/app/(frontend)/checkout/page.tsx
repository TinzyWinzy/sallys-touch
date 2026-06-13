'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/CartContext'
import { ChevronLeft, Lock } from 'lucide-react'

const shippingMethods = [
  { id: 'standard', label: 'Standard (5-7 business days)', cost: 5 },
  { id: 'express', label: 'Express (2-3 business days)', cost: 15 },
  { id: 'free', label: 'Free Shipping (7-10 business days)', cost: 0 },
]

interface FormState {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  country: string
  zipCode: string
}

const initialForm: FormState = {
  fullName: '', email: '', phone: '',
  address: '', city: '', province: '',
  country: 'Zimbabwe', zipCode: '',
}

export default function CheckoutPage() {
  const { state, subtotal, totalItems, clearCart } = useCart()
  const [shipping, setShipping] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState<'paynow' | 'paypal'>('paynow')
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const shippingCost = shippingMethods.find((s) => s.id === shipping)?.cost ?? 5
  const total = subtotal + shippingCost

  const updateField = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
        <Link href="/shop" className="text-accent hover:underline text-sm">Shop now</Link>
      </div>
    )
  }

  async function placeOrder() {
    setError('')
    setSubmitting(true)

    try {
      if (!form.fullName || !form.email || !form.address || !form.city) {
        throw new Error('Please fill in all required fields')
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        throw new Error('Please enter a valid email address')
      }

      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: state.items.map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          subtotal,
          shipping: shippingCost,
          total,
          shippingAddress: form,
          paymentMethod,
        }),
      })

      const order = await orderRes.json()
      if (!order.success) throw new Error(order.error || 'Failed to create order')

      if (paymentMethod === 'paynow') {
        const paynowRes = await fetch('/api/paynow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: total,
            orderId: order.orderId,
            email: form.email,
          }),
        })

        const paynow = await paynowRes.json()
        if (!paynow.success) throw new Error(paynow.error || 'Payment initiation failed')

        clearCart()
        window.location.assign(paynow.redirectUrl)
      } else {
        const paypalRes = await fetch('/api/paypal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: total,
            currency: 'USD',
            orderId: order.orderId,
          }),
        })

        const paypal = await paypalRes.json()
        if (!paypal.success) throw new Error(paypal.error || 'Payment initiation failed')

        clearCart()
        window.location.assign(paypal.approvalUrl)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <Link href="/cart" className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-muted hover:text-primary transition-colors mb-10">
        <ChevronLeft size={14} /> Back to Cart
      </Link>

      <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
        <div className="lg:col-span-3">
          <h1 className="text-2xl lg:text-3xl font-serif mb-10">Checkout</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <div className="space-y-8">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-muted mb-5">Contact Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs text-muted mb-2">Full Name *</label>
                  <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-accent"
                    placeholder="Sally M."
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs text-muted mb-2">Email *</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-accent"
                    placeholder="sally@example.com"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-xs text-muted mb-2">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-accent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-muted mb-5">Shipping Address</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-xs text-muted mb-2">Address *</label>
                  <input
                    id="address"
                    type="text"
                    value={form.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-accent"
                    placeholder="Street address"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-xs text-muted mb-2">City *</label>
                  <input
                    id="city"
                    type="text"
                    value={form.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-accent"
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="province" className="block text-xs text-muted mb-2">Province / State</label>
                  <input
                    id="province"
                    type="text"
                    value={form.province}
                    onChange={(e) => updateField('province', e.target.value)}
                    className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-accent"
                    placeholder="Province"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-xs text-muted mb-2">Country</label>
                  <select
                    id="country"
                    value={form.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-accent"
                  >
                    <option>Zimbabwe</option>
                    <option>South Africa</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-xs text-muted mb-2">Zip Code</label>
                  <input
                    id="zipCode"
                    type="text"
                    value={form.zipCode}
                    onChange={(e) => updateField('zipCode', e.target.value)}
                    className="w-full px-4 py-3 border border-border bg-white text-sm focus:outline-none focus:border-accent"
                    placeholder="00000"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-muted mb-5">Shipping Method</h3>
              <div className="space-y-3">
                {shippingMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      shipping === method.id ? 'border-primary bg-secondary' : 'border-border hover:border-primary'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={method.id}
                        checked={shipping === method.id}
                        onChange={() => setShipping(method.id)}
                        className="accent-primary"
                      />
                      <span className="text-sm">{method.label}</span>
                    </div>
                    <span className="text-sm font-medium">{method.cost === 0 ? 'FREE' : `$${method.cost.toFixed(2)}`}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-muted mb-5">Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`flex items-center justify-center p-6 border cursor-pointer transition-colors ${
                    paymentMethod === 'paynow' ? 'border-primary bg-secondary' : 'border-border hover:border-primary'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="paynow"
                    checked={paymentMethod === 'paynow'}
                    onChange={() => setPaymentMethod('paynow')}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-sm font-medium mb-1">Paynow</div>
                    <div className="text-[10px] text-muted">Zimbabwe Payments</div>
                  </div>
                </label>
                <label
                  className={`flex items-center justify-center p-6 border cursor-pointer transition-colors ${
                    paymentMethod === 'paypal' ? 'border-primary bg-secondary' : 'border-border hover:border-primary'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-sm font-medium mb-1">PayPal</div>
                    <div className="text-[10px] text-muted">Credit Card / PayPal</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-secondary p-6 lg:p-8 sticky top-28">
            <h3 className="text-sm uppercase tracking-wider mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-white shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                    <p className="text-xs text-muted mt-0.5">Qty: {item.quantity}</p>
                    <p className="text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal ({totalItems} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-medium border-t border-border pt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              disabled={submitting}
              className="w-full mt-6 py-4 bg-primary text-white text-sm uppercase tracking-wider font-medium hover:bg-primary-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Lock size={14} /> {submitting ? 'Processing...' : 'Place Order'}
            </button>

            <p className="text-[10px] text-muted text-center mt-4">
              Your payment information is processed securely via Paynow or PayPal.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
