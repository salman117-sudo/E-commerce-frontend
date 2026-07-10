import { useState } from 'react'
import FilterAccordion from './FilterAccordion'
import { ChevronRight, SlidersHorizontal, X } from 'lucide-react'

const categories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans']
const colors = ['green', 'red', 'yellow', 'orange', 'sky', 'blue', 'purple', 'pink', 'white', 'black']
const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large']
const dressStyles = ['Casual', 'Formal', 'Party', 'Gym']

const FilterSidebar = ({ onApply, isOpen, onClose }) => {
  const [selectedColor, setSelectedColor] = useState('blue')
  const [selectedSize, setSelectedSize] = useState('Large')
  const [price, setPrice] = useState([50, 200])

  const handleApply = () => {
    onApply?.({ price, color: selectedColor, size: selectedSize })
    onClose?.()
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
             font-satoshi
          fixed inset-y-0 right-0 z-50 w-[85%] max-w-[320px] overflow-y-auto
          bg-white p-5 transition-transform duration-300 ease-in-out
          lg:static lg:z-auto lg:w-[295px] lg:max-w-none lg:translate-x-0
          lg:rounded-2xl lg:border lg:border-gray-200
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold ">Filters</h3>
          <button onClick={onClose} className="lg:hidden">
            <X size={22} />
          </button>
          <SlidersHorizontal size={18} className="hidden lg:block" />
        </div>

        <FilterAccordion title="Category" defaultOpen={false}>
          <ul className="space-y-3 text-sm text-gray-500 ">
            {categories.map((c) => (
              <li key={c} className="flex cursor-pointer items-center justify-between hover:text-black font-Satoshi">
                {c} <ChevronRight size={16} />
              </li>
            ))}
          </ul>
        </FilterAccordion>

        <FilterAccordion title="Price">
          <input
            type="range"
            min={50}
            max={200}
            value={price[1]}
            onChange={(e) => setPrice([price[0], Number(e.target.value)])}
            className="w-full accent-black font-Satoshi"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>${price[0]}</span>
            <span>${price[1]}</span>
          </div>
        </FilterAccordion>

        {/* COLORS — now a fixed 5-column grid */}
        <FilterAccordion title="Colors">
          <div className="grid grid-cols-5 gap-3 font-Satoshi">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`aspect-square w-full rounded-full border ${
                  selectedColor === c ? 'ring-2 ring-black ring-offset-2' : ''
                }`}
                style={{ backgroundColor: c === 'sky' ? '#38bdf8' : c }}
              />
            ))}
          </div>
        </FilterAccordion>

        {/* SIZE — now a fixed 2-column grid */}
        <FilterAccordion title="Size">
          <div className="grid grid-cols-2 gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`w-full rounded-full px-3 py-2 text-sm ${
                  selectedSize === s ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </FilterAccordion>

        <FilterAccordion title="Dress Style">
          <ul className="space-y-3 text-sm text-gray-500">
            {dressStyles.map((d) => (
              <li key={d} className="flex cursor-pointer items-center justify-between hover:text-black">
                {d} <ChevronRight size={16} />
              </li>
            ))}
          </ul>
        </FilterAccordion>

        <button
          onClick={handleApply}
          className="mt-4 w-full rounded-full bg-black py-3 text-white"
        >
          Apply Filter
        </button>
      </aside>
    </>
  )
}

export default FilterSidebar