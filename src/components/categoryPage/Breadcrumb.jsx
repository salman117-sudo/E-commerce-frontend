import { Link } from 'react-router-dom'

const Breadcrumb = ({ current }) => {
  return (
    <div className="mb-4 text-sm text-gray-500 sm:mb-6">
      <Link to="/" className="hover:underline">Home</Link> / <span className="text-black">{current}</span>
    </div>
  )
}

export default Breadcrumb