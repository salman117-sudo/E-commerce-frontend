import { ArrowLeft, ArrowRight } from 'lucide-react'

const Pagination = ({ page, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
      return pages
    }

    pages.push(1, 2, 3)

    if (page > 5) {
      pages.push('...')
    } else if (totalPages > 6) {
      for (let i = 4; i < totalPages - 2; i++) pages.push(i)
    }

    pages.push(totalPages - 2, totalPages - 1, totalPages)

    return [...new Set(pages)].sort((a, b) => {
      if (a === '...' || b === '...') return 0
      return a - b
    })
  }

  // simplified mobile version: first 2, ellipsis, last 2
  const getMobilePageNumbers = () => {
    if (totalPages <= 4) {
      return [...Array(totalPages)].map((_, i) => i + 1)
    }
    return [1, 2, '...', totalPages - 1, totalPages]
  }

  const pageNumbers = getPageNumbers()
  const mobilePageNumbers = getMobilePageNumbers()

  return (
    <div className="mt-10 mb-6 flex items-center justify-between gap-2 border-t border-gray-200 pt-6">
      {/* Previous button - icon only on mobile, text on desktop */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex shrink-0 items-center gap-1 rounded-lg border border-gray-300 px-2.5 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent hover:bg-gray-50 sm:px-4"
      >
        <ArrowLeft size={16} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Mobile page numbers */}
      <div className="flex items-center gap-1 sm:hidden">
        {mobilePageNumbers.map((num, i) =>
          num === '...' ? (
            <span key={`m-ellipsis-${i}`} className="px-1 text-sm text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={num}
              onClick={() => onPageChange(num)}
              className={`h-8 min-w-8 rounded-lg px-2 text-sm font-medium ${
                page === num ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {num}
            </button>
          )
        )}
      </div>

      {/* Desktop page numbers */}
      <div className="hidden items-center gap-1 sm:flex">
        {pageNumbers.map((num, i) =>
          num === '...' ? (
            <span key={`ellipsis-${i}`} className="px-2 text-sm text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={num}
              onClick={() => onPageChange(num)}
              className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium ${
                page === num ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {num}
            </button>
          )
        )}
      </div>

      {/* Next button - icon only on mobile, text on desktop */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex shrink-0 items-center gap-1 rounded-lg border border-gray-300 px-2.5 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent hover:bg-gray-50 sm:px-4"
      >
        <span className="hidden sm:inline">Next</span>
        <ArrowRight size={16} />
      </button>
    </div>
  )
}

export default Pagination