import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { items, subtotal, shipping, total, shippingAddress, paymentMethod } = body

    if (!items?.length || !total || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payload = await getPayloadClient()

    const customers = await payload.find({
      collection: 'customers',
      where: { email: { equals: shippingAddress?.email || '' } },
      limit: 1,
    })

    let customerId = ''
    if (customers.docs.length > 0) {
      customerId = String(customers.docs[0].id)
    } else {
      const newCustomer = await payload.create({
        collection: 'customers',
        data: {
          name: shippingAddress?.fullName || '',
          email: shippingAddress?.email || '',
          phone: shippingAddress?.phone || '',
          address: {
            line1: shippingAddress?.address || '',
            city: shippingAddress?.city || '',
            province: shippingAddress?.province || '',
            country: shippingAddress?.country || '',
            zipCode: shippingAddress?.zipCode || '',
          },
        },
      })
      customerId = String(newCustomer.id)
    }

    const order = await payload.create({
      collection: 'orders',
      data: {
        customer: customerId,
        items: items.map((item: { id: string; title: string; price: number; quantity: number; image?: string }) => ({
          product: String(item.id),
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: String(item.image || ''),
        })),
        subtotal,
        shipping,
        total,
        currency: 'USD',
        status: 'pending',
        paymentMethod,
        paymentStatus: 'pending',
        shippingAddress: {
          fullName: shippingAddress?.fullName || '',
          phone: shippingAddress?.phone || '',
          address: shippingAddress?.address || '',
          city: shippingAddress?.city || '',
          province: shippingAddress?.province || '',
          country: shippingAddress?.country || '',
          zipCode: shippingAddress?.zipCode || '',
        },
      },
    })

    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
