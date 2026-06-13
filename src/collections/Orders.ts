import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'id',
    group: 'E-commerce',
    defaultColumns: ['id', 'customer', 'total', 'status', 'paymentStatus', 'createdAt'],
  },
  fields: [
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'image',
          type: 'text',
        },
      ],
    },
    {
      name: 'subtotal',
      type: 'number',
      required: true,
    },
    {
      name: 'shipping',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'total',
      type: 'number',
      required: true,
    },
    {
      name: 'currency',
      type: 'text',
      defaultValue: 'USD',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'paymentMethod',
      type: 'select',
      options: [
        { label: 'Paynow', value: 'paynow' },
        { label: 'PayPal', value: 'paypal' },
      ],
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'paynowReference',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'paypalOrderId',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
        { name: 'fullName', type: 'text' },
        { name: 'phone', type: 'text' },
        { name: 'address', type: 'textarea' },
        { name: 'city', type: 'text' },
        { name: 'province', type: 'text' },
        { name: 'country', type: 'text' },
        { name: 'zipCode', type: 'text' },
      ],
    },
  ],
}
