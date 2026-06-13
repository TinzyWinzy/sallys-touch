import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getPayloadClient } from '@/lib/payload'

export async function POST(request: Request) {
  try {
    const PAYNOW_INTEGRATION_KEY = process.env.PAYNOW_INTEGRATION_KEY || ''
    if (!PAYNOW_INTEGRATION_KEY) {
      return NextResponse.json({ error: 'Paynow not configured' }, { status: 500 })
    }

    const text = await request.text()
    const params = new URLSearchParams(text)
    const values: Record<string, string> = {}
    for (const [key, value] of params) {
      values[key] = value
    }

    const { reference, paynowreference, amount, status, hash } = values

    if (!reference || !paynowreference || !amount || !status || !hash) {
      return NextResponse.json({ error: 'Invalid notification' }, { status: 400 })
    }

    const expectedHash = crypto
      .createHash('sha512')
      .update(reference + paynowreference + amount + PAYNOW_INTEGRATION_KEY)
      .digest('hex')
      .toUpperCase()

    if (expectedHash !== hash.toUpperCase()) {
      console.error('Paynow webhook: invalid hash')
      return NextResponse.json({ error: 'Invalid hash' }, { status: 403 })
    }

    const payload = await getPayloadClient()

    if (status.toLowerCase() === 'paid') {
      await payload.update({
        collection: 'orders',
        where: { id: { equals: reference } },
        data: {
          paymentStatus: 'paid',
          status: 'processing',
          paynowReference: paynowreference,
        },
      })
    } else if (status.toLowerCase() === 'failed' || status.toLowerCase() === 'cancelled') {
      await payload.update({
        collection: 'orders',
        where: { id: { equals: reference } },
        data: {
          paymentStatus: 'failed',
        },
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Paynow webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
