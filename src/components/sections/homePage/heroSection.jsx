import React from "react";
import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
    <div className="bg-gray1 ">
    <section className="relative w-full overflow-hidden max-w-480 mx-auto  min-w-75">
      {/* Desktop Background Image - Rectangle 2, hidden below lg */}
      <img
        src="homePage/homepage/herosection/Rectangle 2.webp"
        alt="Models wearing stylish clothes"
        className="hidden lg:block w-full h-125 md:h-137.5 lg:h-150 xl:h-160 object-cover object-[right_15%]"
      />

      {/* Stars over desktop image - hidden below lg */}
      <img
        src="homePage/homepage/herosection/Vector (2).svg"
        alt=""
        className="hidden lg:block absolute top-18 right-16 xl:right-32 lg:right-22 md:right-40   w-12 h-12 md:w-16 md:h-16 z-20"
      />
      <img
        src="homePage/homepage/herosection/Vector (3).svg"
        alt=""
        className="hidden lg:block absolute top-70 left-[38%] xl:left-[56%] lg:left-[50%] md:left-[40%] lg:top-59 w-12 h-12 md:w-11 md:h-11 z-20"
      />

      {/* Text Content - overlay on lg+, normal flow below lg */}
      <div className="lg:absolute lg:inset-0 flex items-center z-10 py-8 lg:py-0">
        <div className="w-full px-4 md:px-25">
          <div className="w-full lg:w-1/2 flex flex-col font-satoshi gap-5 md:gap-6 items-start text-left sm:items-center sm:text-center lg:items-start lg:text-left">
            <h1 className="font-integral font-black uppercase leading-[1.05] text-[34px] md:text-[48px] lg:text-[52px] xl:text-[64px] text-black text-balance">
              Find Clothes That Matches Your Style
            </h1>

            <p className="text-gray5 font-Satoshi text-sm lg:text-base font-satoshi   leading-relaxed max-w-xl mx-0 sm:mx-auto lg:mx-0">
              Browse through our diverse range of meticulously crafted
              garments, designed to bring out your individuality and cater to
              your sense of style.
            </p>

            <div className="w-full flex justify-center sm:block sm:w-auto">
              <Link
                to="/category"
                className="inline-block bg-black text-white font-medium font-satoshi px-20 py-3 sm:px-18 md:px-18 sm:py-3 md:py-4 rounded-full hover:bg-gray-800 transition text-center"
              >
                Shop Now
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap cw:flex-nowrap justify-center lg:justify-start gap-6 xl:gap-6 pt-4 mt-2 max-w-sm cw:max-w-none mx-auto lg:mx-0">
              <div>
                <h3 className="font-satoshi font-bold text-xl md:text-3xl text-black">
                  200+
                </h3>
                <p className="text-gray2 text-xs md:text-sm">
                  International Brands
                </p>
              </div>

              <div>
                <h3 className="font-satoshi font-bold text-xl md:text-3xl text-black">
                  2,000+
                </h3>
                <p className="text-gray2 text-xs md:text-sm">
                  High-Quality Products
                </p>
              </div>

              <div>
                <h3 className="font-satoshi font-bold text-xl md:text-3xl text-black">
                  30,000+
                </h3>
                <p className="text-gray2 text-xs md:text-sm">
                  Happy Customers
                </p>
              </div>
            </div>

            {/* Mobile/Tablet Image - Rectangle 3, hidden on lg+ */}
            <div className="relative lg:hidden w-full mt-2 flex justify-center">
              <img
                src="homePage/homepage/herosection/Rectangle3.webp"
                alt="Models wearing stylish clothes"
                className="w-full max-w-sm sm:max-w-md h-auto object-contain object-center mx-auto"
              />

              {/* Stars over mobile image */}
              <img
                src="homePage/homepage/herosection/Vector (2).svg"
                alt=""
                className="absolute top-[12%] right-[14%] w-10 h-10 sm:w-14 sm:h-14 z-20"
              />
              <img
                src="homePage/homepage/herosection/Vector (3).svg"
                alt=""
                className="absolute top-[45%] left-[8%] w-5 h-5 sm:w-9 sm:h-9 z-20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default HeroSection;
// import React from "react";

// const HeroSection = () => {
//   return (
//     <div className="bg-gray1 ">
//     <section className="relative w-full overflow-hidden max-w-480 mx-auto  min-w-75">
//       {/* Desktop Background Image - Rectangle 2, hidden below lg */}
//       <img
//         src="homePage/homepage/herosection/Rectangle 2.webp"
//         alt="Models wearing stylish clothes"
//         className="hidden lg:block w-full h-125 md:h-137.5 lg:h-150 object-cover object-right"
//       />

//       {/* Stars over desktop image - hidden below lg */}
//       <img
//         src="homePage/homepage/herosection/Vector (2).svg"
//         alt=""
//         className="hidden lg:block absolute top-18 right-16 xl:right-32 lg:right-22 md:right-40   w-12 h-12 md:w-16 md:h-16 z-20"
//       />
//       <img
//         src="homePage/homepage/herosection/Vector (3).svg"
//         alt=""
//         className="hidden lg:block absolute top-70 left-[38%] xl:left-[56%] lg:left-[50%] md:left-[40%] lg:top-59 w-12 h-12 md:w-11 md:h-11 z-20"
//       />

//       {/* Text Content - overlay on lg+, normal flow below lg */}
//       <div className="lg:absolute lg:inset-0 flex items-center z-10 py-8 lg:py-0">
//         <div className="w-full px-4 md:px-25">
//           <div className="w-full lg:w-1/2 flex flex-col font-satoshi gap-5 md:gap-6 items-start text-left sm:items-center sm:text-center lg:items-start lg:text-left">
//             <h1 className="font-integral font-black uppercase leading-[1.05] text-[34px] md:text-[48px] lg:text-[52px] xl:text-[64px] text-black text-balance">
//               Find Clothes That Matches Your Style
//             </h1>

//             <p className="text-gray-600 font-Satoshi text-sm lg:text-base font-satoshi   leading-relaxed max-w-xl mx-0 sm:mx-auto lg:mx-0">
//               Browse through our diverse range of meticulously crafted
//               garments, designed to bring out your individuality and cater to
//               your sense of style.
//             </p>

//             <div className="w-full flex justify-center sm:block sm:w-auto">
//               <button className="bg-black text-white font-medium font-satoshi px-20 py-3 sm:px-18 md:px-18 sm:py-3 md:py-4 rounded-full hover:bg-gray-800 transition">
//                 Shop Now
//               </button>
//             </div>

//             {/* Stats */}
//             <div className="flex flex-wrap cw:flex-nowrap justify-center lg:justify-start gap-6 xl:gap-6 pt-4 mt-2 max-w-sm cw:max-w-none mx-auto lg:mx-0">
//               <div>
//                 <h3 className="font-satoshi font-bold text-xl md:text-3xl text-black">
//                   200+
//                 </h3>
//                 <p className="text-gray2 text-xs md:text-sm">
//                   International Brands
//                 </p>
//               </div>

//               <div>
//                 <h3 className="font-satoshi font-bold text-xl md:text-3xl text-black">
//                   2,000+
//                 </h3>
//                 <p className="text-gray2 text-xs md:text-sm">
//                   High-Quality Products
//                 </p>
//               </div>

//               <div>
//                 <h3 className="font-satoshi font-bold text-xl md:text-3xl text-black">
//                   30,000+
//                 </h3>
//                 <p className="text-gray2 text-xs md:text-sm">
//                   Happy Customers
//                 </p>
//               </div>
//             </div>

//             {/* Mobile/Tablet Image - Rectangle 3, hidden on lg+ */}
//             <div className="relative lg:hidden w-full mt-2 flex justify-center">
//               <img
//                 src="homePage/homepage/herosection/Rectangle3.webp"
//                 alt="Models wearing stylish clothes"
//                 className="w-full max-w-sm sm:max-w-md h-auto object-contain object-center mx-auto"
//               />

//               {/* Stars over mobile image */}
//               <img
//                 src="homePage/homepage/herosection/Vector (2).svg"
//                 alt=""
//                 className="absolute top-[12%] right-[14%] w-10 h-10 sm:w-14 sm:h-14 z-20"
//               />
//               <img
//                 src="homePage/homepage/herosection/Vector (3).svg"
//                 alt=""
//                 className="absolute top-[45%] left-[8%] w-5 h-5 sm:w-9 sm:h-9 z-20"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//     </div>
//   );
// };

// export default HeroSection;