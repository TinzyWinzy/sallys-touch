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
    const { amount, currency, orderId } = body

    if (!amount || !orderId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const accessToken = await getPayPalAccessToken()

    const orderResponse = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          reference_id: orderId,
          amount: {
            currency_code: currency || 'USD',
            value: amount.toString(),
          },
        }],
      }),
    })

    const order = await orderResponse.json()

    if (order.id) {
      const payload = await getPayloadClient()
      await payload.update({
        collection: 'orders',
        where: { id: { equals: orderId } },
        data: {
          paymentStatus: 'pending',
          paypalOrderId: order.id,
        },
      })

      return NextResponse.json({
        success: true,
        paypalOrderId: order.id,
        approvalUrl: order.links?.find((l: { rel: string }) => l.rel === 'approve')?.href,
      })
    }

    return NextResponse.json({
      success: false,
      error: order.message || 'Failed to create PayPal order',
    }, { status: 400 })
  } catch (error) {
    console.error('PayPal error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
