import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Pages } from './collections/Pages'
import { Orders } from './collections/Orders'
import { Customers } from './collections/Customers'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-key-sallys-touch-2026',
  admin: {
    user: 'customers',
    meta: {
      titleSuffix: ' - Sally\'s Touch Admin',
    },
  },
  collections: [Media, Categories, Products, Pages, Orders, Customers],
  globals: [SiteSettings],
  editor: lexicalEditor({}),
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./sallys-touch.db',
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, '../payload-types.ts'),
  },
})
