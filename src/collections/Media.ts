import type { CollectionConfig } from 'payload'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
  upload: {
    staticDir: path.join(process.cwd(), 'public', 'images', 'products'),
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'centre',
      },
      {
        name: 'medium',
        width: 800,
        height: 800,
        position: 'centre',
      },
      {
        name: 'large',
        width: 1400,
        height: 1400,
        position: 'centre',
      },
    ],
    focalPoint: true,
  },
}
