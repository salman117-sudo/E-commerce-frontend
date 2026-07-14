import React, { useRef } from 'react'

const reviews = [
  {
    id: 1,
    name: 'Sarah M.',
    verified: true,
    rating: 5,
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: 'Alex K.',
    verified: true,
    rating: 5,
    text: 'Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.',
  },
  {
    id: 3,
    name: 'James L.',
    verified: true,
    rating: 5,
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    id: 4,
    name: 'Moe R.',
    verified: true,
    rating: 5,
    text: 'As someone who values both style and comfort, I appreciate how Shop.co delivers on both fronts. The clothes are on-trend and made from quality materials that hold up wash after wash.',
  },
  {
    id: 5,
    name: 'Emily R.',
    verified: true,
    rating: 5,
    text: 'Shop.co has become my go-to for every wardrobe update. Their pieces fit true to size and the fabrics feel premium without the premium price tag.',
  },
  {
    id: 6,
    name: 'David P.',
    verified: true,
    rating: 5,
    text: 'The customer service is as impressive as the clothing itself. Fast shipping, easy returns, and a team that actually cares about getting your order right.',
  },
  {
    id: 7,
    name: 'Priya S.',
    verified: true,
    rating: 5,
    text: 'I recommend Shop.co to everyone I know. The variety means I can find pieces for work, weekends, and everything in between, all in one place.',
  },
  {
    id: 8,
    name: 'Michael T.',
    verified: true,
    rating: 5,
    text: 'Every order feels curated just for me. The sizing charts are accurate and the styles photograph exactly like they look in person.',
  },
  {
    id: 9,
    name: 'Laura B.',
    verified: true,
    rating: 5,
    text: "From loungewear to formal pieces, Shop.co nails the balance between comfort and style. I always find something new I didn't know I needed.",
  },
  {
    id: 10,
    name: 'Carlos G.',
    verified: true,
    rating: 5,
    text: "Consistently high quality at fair prices. I've recommended Shop.co to my whole family and they all shop here now too.",
  },
]

const StarRow = ({ rating }) => (
  <div className="flex gap-1 text-yellow-400">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i}>{i < rating ? '★' : '☆'}</span>
    ))}
  </div>
)

const ReviewCard = ({ review }) => (
  <div className="flex-none w-[85%] sm:w-[calc(33.333%-16px)] snap-center border border-gray-200 rounded-2xl font-satoshi p-6 flex flex-col gap-3 bg-white">
    <StarRow rating={review.rating} />
    <div className="flex items-center gap-2">
      <span className="font-bold">{review.name}</span>
      {review.verified && (
        <span className="w-4 h-4 rounded-full bg-green-500 text-white text-[10px] flex items-center justify-center">
          ✓
        </span>
      )}
    </div>
    <p className="text-sm text-gray-500 leading-relaxed">"{review.text}"</p>
  </div>
)

const Reviews = () => {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    const container = scrollRef.current
    if (!container) return
    const card = container.children[0]
    const gap = 24 // matches gap-6 below
    const distance = card.offsetWidth + gap
    container.scrollBy({ left: direction * distance, behavior: 'smooth' })
  }

  return (
    <div className="max-w-480 mx-auto px-4 md:px-25 py-10 flex flex-col gap-6 mb-20">
      {/* heading + arrows */}
      <div className="flex items-center justify-between">
        <h2 className="uppercase text-2xl sm:text-[40px] font-bold font-integral">
          Our Happy Customers
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous reviews"
            className="w-10 h-10 rounded-full flex items-center justify-center  hover:text-white transition-colors"
          >
            <img
              src="homePage/reviews/arrow-down-bold 2.svg"
              alt="Previous"
              className="w-4 h-4"
            />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next reviews"
            className="w-10 h-10 rounded-full  flex items-center justify-center  hover:text-white transition-colors"
          >
            <img
              src="homePage/reviews/arrow-down-bold 1.svg"
              alt="Next"
              className="w-4 h-4"
            />
          </button>
        </div>
      </div>

      {/* scrollable review row with fade edges */}
      <div className="relative">
        {/* left fade overlay */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-10 bg-linear-to-r from-white to-transparent" />

        {/* right fade overlay */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-10 bg-linear-to-l from-white to-transparent" />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [-ms-overflow-style:none]  [&::-webkit-scrollbar]:hidden"
        >
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reviews