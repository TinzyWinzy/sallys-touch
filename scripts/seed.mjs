import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const seedData = {
  categories: [
    { name: 'Signature', slug: 'signature', description: 'Our signature collection — timeless designs crafted for the modern woman.' },
    { name: 'Evening', slug: 'evening', description: 'Sophisticated pieces for nights out and special occasions.' },
    { name: 'Crossbody', slug: 'crossbody', description: 'Hands-free elegance for the woman on the go.' },
    { name: 'Totes', slug: 'totes', description: 'Spacious and stylish — perfect for everyday luxury.' },
    { name: 'Clutches', slug: 'clutches', description: 'Compact and chic — for when less is more.' },
    { name: 'Satchels', slug: 'satchels', description: 'Structured silhouettes with a classic appeal.' },
  ],

  products: [
    { title: 'The Grace Tote', slug: 'the-grace-tote', price: 295, category: 'Totes', featured: true, new: true, stock: 10, materials: 'Full-grain Italian leather, suede lining, gold-toned hardware', dimensions: '14" W x 10" H x 5" D', shortDescription: 'A timeless companion for everyday elegance.', description: 'Crafted with premium full-grain leather and lined with soft suede, The Grace Tote offers both sophistication and practicality. The spacious interior comfortably holds your essentials while maintaining a sleek silhouette.' },
    { title: 'The Noir Crossbody', slug: 'the-noir-crossbody', price: 245, category: 'Crossbody', featured: true, new: true, stock: 15, materials: 'Calfskin leather, microfiber lining, silver-toned hardware', dimensions: '9" W x 6" H x 3" D', shortDescription: 'Sleek, compact, and undeniably chic.', description: 'Designed for the woman on the move. With an adjustable strap and multiple interior pockets, it perfectly balances style and function.' },
    { title: 'The Blossom Clutch', slug: 'the-blossom-clutch', price: 195, compareAtPrice: 245, category: 'Clutches', featured: true, stock: 8, materials: 'Satin finish leather, silk interior', dimensions: '10" W x 5" H x 2" D', shortDescription: 'Make a statement with delicate floral design.', description: 'Adorned with delicate floral-inspired details, this evening piece transforms any outfit into a conversation starter.' },
    { title: 'The Dusk Satchel', slug: 'the-dusk-satchel', price: 320, category: 'Satchels', featured: true, stock: 7, materials: 'Italian pebbled leather, canvas lining, brass hardware', dimensions: '12" W x 9" H x 5" D', shortDescription: 'Structured sophistication for the confident woman.', description: 'A structured satchel that exudes confidence. The Dusk Satchel features multiple compartments and a top handle with optional shoulder strap.' },
    { title: 'The Ember Shoulder Bag', slug: 'the-ember-shoulder', price: 275, category: 'Signature', new: true, stock: 12, materials: 'Waxed calfskin, suede interior, antique gold hardware', dimensions: '11" W x 8" H x 4" D', shortDescription: 'Warm tones that ignite your style.', description: 'The rich ember hue of this shoulder bag adds warmth to any ensemble. Hand-stitched details showcase the artisan&apos;s skill.' },
    { title: 'The Pearl Mini Bag', slug: 'the-pearl-mini', price: 180, category: 'Evening', stock: 20, materials: 'Mother of pearl accents, satin finish, chain strap', dimensions: '7" W x 4" H x 2" D', shortDescription: 'Small but mighty in elegance.', description: 'A dainty mini bag adorned with genuine mother of pearl accents. Perfect for evenings when you only need the essentials.' },
    { title: 'The Velvet Crescent', slug: 'the-velvet-crescent', price: 260, category: 'Crossbody', stock: 9, materials: 'Italian velvet, leather trim, gold hardware', dimensions: '10" W x 5" H x 3" D', shortDescription: 'Luxurious velvet meets modern silhouette.', description: 'The crescent shape is reimagined in plush velvet with leather trim. An adjustable strap makes it versatile for day to night.' },
    { title: 'The Gilded Bucket', slug: 'the-gilded-bucket', price: 310, category: 'Signature', featured: true, stock: 5, materials: 'Gold-stamped leather, microfiber lining, magnetic closure', dimensions: '9" W x 11" H x 6" D', shortDescription: 'A touch of gold for the discerning woman.', description: 'The Gilded Bucket bag features gold-stamped leather that catches the light with every step. A true investment piece.' },
    { title: 'The Linen Market Bag', slug: 'the-linen-market', price: 160, category: 'Totes', stock: 25, materials: 'Premium linen, leather handles, cotton lining', dimensions: '16" W x 14" H x 6" D', shortDescription: 'Effortless everyday style.', description: 'Lightweight yet durable, this linen tote is perfect for farmers markets, beach days, or casual brunches.' },
  ],

  pages: [
    { title: 'Our Story', slug: 'our-story', published: true, content: 'Sally\'s Touch began with a simple belief: every bag should tell a story. We work with master artisans across Africa and South America, preserving techniques passed down through generations while creating sustainable livelihoods for women artisans.' },
    { title: 'Our Process', slug: 'our-process', published: true, content: 'From the selection of premium materials to the final stitch, each Sally\'s Touch bag undergoes a meticulous process. We believe in slow fashion — taking the time to create pieces that last a lifetime.' },
  ],
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding categories...')
  const categoryMap = {}
  for (const cat of seedData.categories) {
    const existing = await payload.find({ collection: 'categories', where: { slug: { equals: cat.slug } }, limit: 1 })
    const doc = existing.docs.length > 0
      ? existing.docs[0]
      : await payload.create({ collection: 'categories', data: cat })
    categoryMap[cat.name] = doc.id
    console.log(`  ✓ ${cat.name}`)
  }

  console.log('\nSeeding products...')
  for (const prod of seedData.products) {
    const existing = await payload.find({ collection: 'products', where: { slug: { equals: prod.slug } }, limit: 1 })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'products',
        data: {
          ...prod,
          category: categoryMap[prod.category],
        },
      })
      console.log(`  ✓ ${prod.title}`)
    } else {
      console.log(`  - ${prod.title} (already exists)`)
    }
  }

  console.log('\nSeeding pages...')
  for (const page of seedData.pages) {
    const existing = await payload.find({ collection: 'pages', where: { slug: { equals: page.slug } }, limit: 1 })
    if (existing.docs.length === 0) {
      await payload.create({ collection: 'pages', data: page })
      console.log(`  ✓ ${page.title}`)
    } else {
      console.log(`  - ${page.title} (already exists)`)
    }
  }

  console.log('\n✓ Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
