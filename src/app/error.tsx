'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        <p className="text-accent text-xs uppercase tracking-[0.3em] mb-4">Something went wrong</p>
        <h1 className="text-4xl lg:text-5xl font-serif mb-4">Unexpected Error</h1>
        <p className="text-muted text-sm mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-block px-8 py-3.5 bg-primary text-white text-sm uppercase tracking-wider font-medium hover:bg-primary-light transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
