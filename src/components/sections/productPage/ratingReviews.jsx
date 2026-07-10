import React, { useState } from 'react'
import StarRating from './starRating'
import { ChevronDown } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: 'Samantha D.',
    rating: 4.5,
    text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    date: 'August 14, 2023',
  },
  {
    id: 2,
    name: 'Alex M.',
    rating: 5,
    text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    date: 'August 15, 2023',
  },
  {
    id: 3,
    name: 'Ethan R.',
    rating: 3.5,
    text: 'This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer\u2019s touch in every aspect of this shirt.',
    date: 'August 16, 2023',
  },
  {
    id: 4,
    name: 'Olivia P.',
    rating: 4,
    text: 'As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It\u2019s evident that the designer poured their creativity into making this t-shirt stand out.',
    date: 'August 17, 2023',
  },
  {
    id: 5,
    name: 'Liam K.',
    rating: 4,
    text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
    date: 'August 18, 2023',
  },
  {
    id: 6,
    name: 'Ava H.',
    rating: 4.5,
    text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
    date: 'August 19, 2023',
  },
]

const ReviewCard = ({ review }) => (
  <div className="border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col gap-3 relative">
    <div className="flex justify-between items-start">
      <StarRating rating={review.rating} showLabel={false} />
      <button className="text-gray-400 text-lg leading-none">•••</button>
    </div>
    <div className="flex items-center gap-1">
      <span className="font-medium">{review.name}</span>
      <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center shrink-0">
        <span className="text-white text-[10px]">✓</span>
      </span>
    </div>
    <p className="text-sm text-gray-500">"{review.text}"</p>
    <span className="text-xs text-gray-400">Posted on {review.date}</span>
  </div>
)

const RatingReviews = () => {
  const [activeTab, setActiveTab] = useState('reviews')
  const [visibleCount, setVisibleCount] = useState(6)

  const visibleReviews = reviews.slice(0, visibleCount)

  return (
    <div className="mt-12 sm:mt-16 md:mt-18 overflow-x-hidden">
      <div className="flex justify-center gap-6 sm:gap-12 md:gap-20 border-b border-gray-200 overflow-x-auto">
        {['details', 'reviews', 'faqs'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-xs sm:text-base whitespace-nowrap capitalize ${
              activeTab === tab
                ? 'border-b-2 border-black font-medium'
                : 'text-gray-400'
            }`}
          >
            {tab === 'reviews'
              ? 'Rating & Reviews'
              : tab === 'faqs'
              ? 'FAQs'
              : 'Product Details'}
          </button>
        ))}
      </div>

      {activeTab === 'reviews' && (
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h3 className="text-lg sm:text-xl font-bold">
              All Reviews <span className="text-gray-400 font-normal">({reviews.length})</span>
            </h3>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-500 shrink-0">
                <img src="/productPage/reviews/Frame.svg" alt="icon" className="w-4 h-4" />
              </button>

              <div className="relative inline-block">
                <select className="appearance-none border border-gray-300 rounded-full pl-3 sm:pl-4 pr-7 sm:pr-8 py-1.5 sm:py-2 text-xs sm:text-sm outline-none bg-white">
                  <option>Latest</option>
                  <option>Oldest</option>
                  <option>Highest Rating</option>
                  <option>Lowest Rating</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
              </div>

              <button className="bg-black text-white rounded-full px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors whitespace-nowrap">
                Write a Review
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {visibleCount < reviews.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount((c) => c + 6)}
                className="border border-gray-300 rounded-full px-8 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors"
              >
                Load More Reviews
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'details' && (
        <p className="text-sm text-gray-500 mt-8">
          Add product detail content here (materials, fit, care instructions).
        </p>
      )}

      {activeTab === 'faqs' && (
        <p className="text-sm text-gray-500 mt-8">
          Add frequently asked questions here.
        </p>
      )}
    </div>
  )
}

export default RatingReviews