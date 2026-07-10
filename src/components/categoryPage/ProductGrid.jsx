import ProductCard from './ProductCard'
import { SlidersHorizontal } from 'lucide-react'

const ProductGrid = ({ title, products, total, onOpenFilters }) => {
  return (
    <div className="flex-1">
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>

        {/* filter icon - mobile only */}
        <button
          onClick={onOpenFilters}
          className="rounded border p-2 lg:hidden"
        >
          <SlidersHorizontal size={18} />
        </button>

        <div className="hidden items-center gap-2 text-sm text-gray-500 lg:flex">
          <span>Showing 1-{products.length} of {total} Products</span>
          <select className="rounded border px-2 py-1">
            <option>Most Popular</option>
            <option>Low Price</option>
            <option>High Price</option>
          </select>
        </div>
      </div>

      {/* showing text - mobile only, under title */}
      <p className="mb-4 text-xs text-gray-400 lg:hidden">
        Showing 1-{products.length} of {total} Products
      </p>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid