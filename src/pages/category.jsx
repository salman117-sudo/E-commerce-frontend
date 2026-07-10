import { useState } from 'react'
import { Breadcrumb, FilterSidebar, ProductGrid, Pagination } from '@categoryPage'
import { allProducts } from '@data/products'

const PRODUCTS_PER_PAGE = 9

const Category = () => {
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (page - 1) * PRODUCTS_PER_PAGE
  const currentProducts = allProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 mb-20">
      <Breadcrumb current="Casual" />

      <div className="flex gap-8 items-start">
        <FilterSidebar
          isOpen={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          onApply={(filters) => console.log(filters)}
        />

        <div className="flex-1">
          <ProductGrid
            title="Casual"
            products={currentProducts}
            total={allProducts.length}
            onOpenFilters={() => setFiltersOpen(true)}
          />

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Category