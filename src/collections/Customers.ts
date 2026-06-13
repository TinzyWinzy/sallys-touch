import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'email',
    group: 'E-commerce',
    defaultColumns: ['email', 'name', 'createdAt'],
  },
  auth: {
    loginWithUsername: false,
    verify: false,
    forgotPassword: {
      generateEmailSubject: () => 'Reset your Sally\'s Touch password',
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'line1', type: 'text' },
        { name: 'line2', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'province', type: 'text' },
        { name: 'country', type: 'text' },
        { name: 'zipCode', type: 'text' },
      ],
    },
  ],
}
