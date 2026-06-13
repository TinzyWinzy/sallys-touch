import { test, expect } from '@playwright/test'

test('homepage loads with correct branding', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Sally's Touch/)
  await expect(page.getByText('Not All Bags Are Created Equal')).toBeVisible()
  await expect(page.getByText('Shop the Collection')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Our Story' }).first()).toBeVisible()
})

test('homepage displays brand values section', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Handcrafted' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Sustainable' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Timeless' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Empowering' })).toBeVisible()
})

test('shop page shows product grid', async ({ page }) => {
  await page.goto('/shop')
  await expect(page.getByRole('heading', { name: 'Shop Bags' })).toBeVisible()
  const productImages = page.locator('img')
  const count = await productImages.count()
  expect(count).toBeGreaterThanOrEqual(9)
})

test('navigation links work', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Shop' }).first().click()
  await expect(page).toHaveURL('/shop')

  await page.getByRole('link', { name: 'Our Story' }).first().click()
  await expect(page).toHaveURL('/about')

  await page.getByRole('link', { name: 'Contact' }).first().click()
  await expect(page).toHaveURL('/contact')
})

test('about page loads', async ({ page }) => {
  await page.goto('/about')
  await expect(page.getByRole('heading', { name: 'Where Craft Meets Soul' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'People First' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Sustainable Craft' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Empowerment' })).toBeVisible()
})

test('contact page has form', async ({ page }) => {
  await page.goto('/contact')
  await expect(page.getByRole('heading', { name: "We'd Love to Hear From You" })).toBeVisible()
  await expect(page.getByLabel('Name')).toBeVisible()
  await expect(page.getByLabel('Email')).toBeVisible()
  await expect(page.getByLabel('Subject')).toBeVisible()
  await expect(page.getByLabel('Message')).toBeVisible()
})

test('faq page shows accordion', async ({ page }) => {
  await page.goto('/faq')
  await expect(page.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible()
  await expect(page.getByText('What materials do you use?').first()).toBeVisible()
  await page.getByText('What materials do you use?').first().click()
  await expect(page.getByText('We use premium full-grain leather')).toBeVisible()
})

test('lookbook page loads', async ({ page }) => {
  await page.goto('/lookbook')
  await expect(page.getByRole('heading', { name: 'Lookbook' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Signature Collection' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Evening Edit' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Crossbody Curated' })).toBeVisible()
})

test('cart page shows empty state', async ({ page }) => {
  await page.goto('/cart')
  await expect(page.getByText('Your Cart is Empty')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Shop Now' })).toBeVisible()
})

test('checkout page shows empty state when cart is empty', async ({ page }) => {
  await page.goto('/checkout')
  await expect(page.getByText('Your cart is empty')).toBeVisible()
})

test('product detail page shows product info', async ({ page }) => {
  await page.goto('/products/the-grace-tote')
  await expect(page.getByRole('heading', { name: 'The Grace Tote' })).toBeVisible()
  await expect(page.getByText('$295.00').first()).toBeVisible()
  await expect(page.getByText('Full-grain Italian leather')).toBeVisible()
  await expect(page.getByRole('button', { name: /Add to Cart/ })).toBeVisible()
})

test('product not found page', async ({ page }) => {
  await page.goto('/products/non-existent-product')
  await expect(page.getByText('Product Not Found')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Back to Shop' })).toBeVisible()
})

test('order confirmation page loads', async ({ page }) => {
  await page.goto('/order-confirmation')
  await expect(page.getByText('Thank You for Your Order!')).toBeVisible()
})

test('footer has newsletter signup', async ({ page }) => {
  await page.goto('/')
  const footer = page.locator('footer')
  await expect(footer.getByText('Newsletter')).toBeVisible()
  await expect(footer.getByPlaceholder('Your email')).toBeVisible()
  await expect(footer.getByRole('button', { name: 'Subscribe' })).toBeVisible()
})

test('shopping cart drawer opens', async ({ page }) => {
  await page.goto('/')
  const cartButton = page.getByLabel('Open cart')
  await cartButton.click()
  await expect(page.getByText('Your cart is empty')).toBeVisible()
})

test('product can be added to cart from product page', async ({ page }) => {
  await page.goto('/products/the-grace-tote')
  await page.getByRole('button', { name: /Add to Cart/ }).click()
  const cartBadge = page.locator('header button[aria-label="Open cart"] span')
  await expect(cartBadge).toContainText('1')
})

test('checkout shows paynow and paypal when cart has items', async ({ page }) => {
  await page.goto('/products/the-grace-tote')
  await page.getByRole('button', { name: /Add to Cart/ }).click()
  await page.goto('/checkout')
  await expect(page.getByText('Paynow').first()).toBeVisible()
  await expect(page.getByText('PayPal').first()).toBeVisible()
})
