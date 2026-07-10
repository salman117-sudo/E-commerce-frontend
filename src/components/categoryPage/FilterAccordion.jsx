import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

const FilterAccordion = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium">{title}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  )
}

export default FilterAccordion