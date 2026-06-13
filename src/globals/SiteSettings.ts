import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: "Sally's Touch",
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Handmade With Love, Worn With Pride',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contactEmail',
      type: 'email',
      defaultValue: 'hello@sallystouch.com',
    },
    {
      name: 'contactPhone',
      type: 'text',
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'pinterest', type: 'text' },
      ],
    },
    {
      name: 'shippingInfo',
      type: 'group',
      fields: [
        { name: 'domesticRate', type: 'number', defaultValue: 5 },
        { name: 'internationalRate', type: 'number', defaultValue: 15 },
        { name: 'freeShippingThreshold', type: 'number', defaultValue: 100 },
      ],
    },
    {
      name: 'heroSettings',
      type: 'group',
      fields: [
        { name: 'headline', type: 'text', defaultValue: 'Not All Bags Are Created Equal' },
        { name: 'subheadline', type: 'text', defaultValue: 'Handcrafted luxury for the bold and beautiful' },
        { name: 'ctaText', type: 'text', defaultValue: 'Shop Our Collection' },
        { name: 'ctaLink', type: 'text', defaultValue: '/shop' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'brandValues',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Lucide icon name (e.g. "heart", "shield", "feather")',
          },
        },
      ],
    },
    {
      name: 'asSeenIn',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
