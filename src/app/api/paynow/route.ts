import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getPayloadClient } from '@/lib/payload'

const PAYNOW_INITIATE_URL = 'https://www.paynow.co.zw/interface/initiatetransaction'

export async function POST(request: Request) {
  try {
    const PAYNOW_INTEGRATION_ID = process.env.PAYNOW_INTEGRATION_ID || ''
    const PAYNOW_INTEGRATION_KEY = process.env.PAYNOW_INTEGRATION_KEY || ''
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    if (!PAYNOW_INTEGRATION_ID || !PAYNOW_INTEGRATION_KEY) {
      return NextResponse.json({ error: 'Paynow not configured' }, { status: 500 })
    }

    const body = await request.json()
    const { amount, orderId, email } = body

    if (!amount || !orderId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const returnUrl = `${SITE_URL}/order-confirmation?order=${orderId}`
    const resultUrl = `${SITE_URL}/api/paynow/result`

    const fields: Record<string, string> = {
      id: PAYNOW_INTEGRATION_ID,
      reference: orderId,
      amount: amount.toString(),
      authemail: email || '',
      additionalinfo: 'Sallys Touch Order',
      returnurl: returnUrl,
      resulturl: resultUrl,
      statusurl: resultUrl,
    }

    const hashValues = [
      fields.id,
      fields.reference,
      fields.amount,
      fields.authemail,
      fields.additionalinfo,
      fields.returnurl,
      fields.resulturl,
      fields.statusurl,
      PAYNOW_INTEGRATION_KEY,
    ]

    fields.hash = crypto
      .createHash('sha512')
      .update(hashValues.join(''))
      .digest('hex')
      .toUpperCase()

    const paynowResponse = await fetch(PAYNOW_INITIATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(fields).toString(),
    })

    const responseText = await paynowResponse.text()
    const parsed: Record<string, string> = {}
    const regex = /<(\w+)>([^<]*)<\/\1>/g
    let match: RegExpExecArray | null
    while ((match = regex.exec(responseText)) !== null) {
      parsed[match[1]] = match[2]
    }

    if (parsed.status?.toLowerCase() === 'ok') {
      const payload = await getPayloadClient()
      await payload.update({
        collection: 'orders',
        where: { id: { equals: orderId } },
        data: {
          paymentStatus: 'pending',
          paynowReference: parsed.paynowreference || '',
        },
      })

      return NextResponse.json({
        success: true,
        redirectUrl: parsed.browserurl,
        pollUrl: parsed.pollurl,
        paynowReference: parsed.paynowreference,
      })
    }

    return NextResponse.json({
      success: false,
      error: parsed.error || parsed.status || 'Payment initiation failed',
    }, { status: 400 })
  } catch (error) {
    console.error('Paynow error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
