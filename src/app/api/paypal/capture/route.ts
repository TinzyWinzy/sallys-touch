import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || ''
const PAYPAL_SECRET = process.env.PAYPAL_SECRET || ''
const PAYPAL_API = process.env.PAYPAL_SANDBOX === 'true'
  ? 'https://api-m.sandbox.paypal.com'
  : 'https://api-m.paypal.com'

async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64')
  const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  if (!response.ok) {
    throw new Error('Failed to get PayPal access token')
  }
  const data = await response.json()
  return data.access_token
}

export async function POST(request: Request) {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET) {
      return NextResponse.json({ error: 'PayPal not configured' }, { status: 500 })
    }

    const body = await request.json()
    const { paypalOrderId, orderId } = body

    if (!paypalOrderId || !orderId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const accessToken = await getPayPalAccessToken()

    const captureResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders/${paypalOrderId}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    const capture = await captureResponse.json()

    if (capture.status === 'COMPLETED') {
      const payload = await getPayloadClient()
      await payload.update({
        collection: 'orders',
        where: { id: { equals: orderId } },
        data: {
          paymentStatus: 'paid',
          status: 'processing',
          paypalOrderId: paypalOrderId,
        },
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({
      success: false,
      error: capture.message || 'Payment capture failed',
    }, { status: 400 })
  } catch (error) {
    console.error('PayPal capture error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
