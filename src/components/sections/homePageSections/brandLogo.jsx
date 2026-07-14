import React from 'react'

const Brandlogo = () => {
  return (
    <section className="w-full bg-black py-6 md:py-10">
      <div className="max-w-480 min-w-75 mx-auto px-4 md:px-25">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-x-8 gap-y-5">

          <img
            src="/homePage/brand/group1.svg"
            alt="Versace logo"
            className="h-4 sm:h-5 md:h-6 w-auto"
          />
          <img
            src="homePage/brand/group2.svg"
            alt="Zara logo"
            className="h-4 sm:h-5 md:h-6 w-auto"
          />
          <img
            src="homePage/brand/group3.svg"
            alt="Gucci logo"
            className="h-4 sm:h-5 md:h-6 w-auto"
          />
          <img
            src="homePage/brand/group4.svg"
            alt="Prada logo"
            className="h-5 sm:h-6 md:h-7 w-auto"
          />
          <img
            src="homePage/brand/group5.svg"
            alt="Calvin Klein logo"
            className="h-4 sm:h-5 md:h-6 w-auto"
          />

        </div>
      </div>
    </section>
  )
}

export default Brandlogo