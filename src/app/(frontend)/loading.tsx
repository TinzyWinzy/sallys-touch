export default function FrontendLoading() {
  return (
    <div className="flex-1 flex items-center justify-center py-20">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted text-sm">Loading...</p>
      </div>
    </div>
  )
}
