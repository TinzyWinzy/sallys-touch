import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sally's Touch — Handmade Luxury Bags",
  description: "Handcrafted premium handbags for the bold and beautiful. Not all bags are created equal.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
