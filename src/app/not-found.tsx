import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        <p className="text-accent text-xs uppercase tracking-[0.3em] mb-4">404</p>
        <h1 className="text-4xl lg:text-5xl font-serif mb-4">Page Not Found</h1>
        <p className="text-muted text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3.5 bg-primary text-white text-sm uppercase tracking-wider font-medium hover:bg-primary-light transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
