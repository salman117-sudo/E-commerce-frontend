import React from 'react'

const dressStyles = [
  {
    id: 1,
    name: 'Casual',
    img: 'homePage/homepage/dressStyle/image 11.webp',
    colSpan: 'sm:col-span-2',
  },
  {
    id: 2,
    name: 'Formal',
    img: 'homePage/homepage/dressStyle/image 13.webp',
    colSpan: 'sm:col-span-3',
  },
  {
    id: 3,
    name: 'Party',
    img: 'homePage/homepage/dressStyle/image 12.webp',
    colSpan: 'sm:col-span-3',
  },
  {
    id: 4,
    name: 'Gym',
    img: 'homePage/homepage/dressStyle/image 14.webp',
    colSpan: 'sm:col-span-2',
  },
]

const DressStyle = () => {
  return (
    <div className="max-w-480 min-w-75 mx-auto px-4 md:px-25 py-6 sm:py-10">
      <div className="bg-gray1 rounded-3xl p-4 sm:p-10 flex flex-col gap-4 sm:gap-8">
        <h2 className="uppercase text-2xl sm:text-[48px] font-bold text-center fontintegral">
          Browse By Dress Style
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-5 font-satoshi">
          {dressStyles.map((style) => (
            <div
              key={style.id}
              className={`relative rounded-2xl overflow-hidden bg-white h-35 sm:h-72.25 ${style.colSpan}`}
            >
              <span className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 text-base sm:text-2xl font-bold text-black">
                {style.name}
              </span>
              <img
                src={style.img}
                alt={`${style.name} dress style`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DressStyle