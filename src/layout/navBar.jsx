import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      {/* Top Promo Banner - full width black background */}
      {showBanner && (
        <div className="w-full bg-black font-satoshi text-white text-xs md:text-sm py-2.5 relative">
          <div className="max-w-480 min-w-75 mx-auto px-4 md:px-25 flex items-center justify-center text-center relative">
            <p>
              Sign up and get 20% off to your first order.{" "}
              <span className="underline cursor-pointer font-medium">
                Sign Up Now
              </span>
            </p>
            <button
              onClick={() => setShowBanner(false)}
              className="hidden md:flex absolute right-4 md:right-25 text-white text-lg leading-none"
              aria-label="Close banner"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <nav className="w-full py-4 md:py-4 border-b border-gray1">
        <div className="max-w-480 min-w-75 mx-auto px-3 md:px-25 flex items-center justify-between gap-2 md:gap-4">
          {/* Mobile: Hamburger + Logo */}
          <div className="flex items-center gap-2 md:gap-2 shrink-0 min-w-0">
            <button
              className="md:hidden shrink-0"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <img
                src="/homePage/layout/navbar/menu-icon.png"
                alt="menu icon"
                className="w-4 h-4"
              />
            </button>

            <Link to="/">
              <img
                src="/homePage/layout/navbar/SHOP.CO.svg"
                alt="Shop.co Logo"
                className="h-4 sm:h-5 md:h-6 w-auto shrink-0 cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <ul className="flex items-center gap-5 lg:gap-8 text-base whitespace-nowrap lg:text-[16px] text-[15px] font-satoshi">
              <li className="flex items-center gap-1 cursor-pointer hover:text-green-500 transition">
                Shop
                <ChevronDown className="w-4 h-4" />
              </li>
              <li>
                <Link
                  to="/category"
                  className="cursor-pointer hover:text-green-500 transition"
                >
                  Category
                </Link>
              </li>
              <li className="cursor-pointer hover:text-green-500 transition">
                New Arrivals
              </li>
              <li className="cursor-pointer hover:text-green-500 transition">
                Brands
              </li>
            </ul>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="w-full flex items-center gap-2 bg-gray1 rounded-full px-4 py-2.5">
              <svg
                className="w-4 h-4 text-gray2 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-transparent outline-none text-sm text-gray3 placeholder-gray2"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 pr-2 md:gap-3 shrink-0">
            {/* Mobile Search Icon */}
            <button className="md:hidden" aria-label="Search">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <img
              src="/homePage/layout/navbar/Vector (2).svg"
              alt="cart"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 cursor-pointer"
            />
            <img
              src="/homePage/layout/navbar/Frame.svg"
              alt="profile"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 cursor-pointer"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-6 mt-6">
            <div className="border rounded-xl p-6 shadow-lg">
              <ul className="flex flex-col gap-5 text-lg">
                <li className="cursor-pointer hover:text-green-500 transition">
                  Shop
                </li>

               <li>
  <Link
    to="/category"
    onClick={() => setMenuOpen(false)}
    className="cursor-pointer hover:text-green-500 transition"
  >
    Category
  </Link>
</li>

                <li className="cursor-pointer hover:text-green-500 transition">
                  New Arrivals
                </li>
                <li className="cursor-pointer hover:text-green-500 transition">
                  Brands.
                </li>
              </ul>

              <div className="w-full flex items-center gap-2 bg-gray1 rounded-full px-4 py-2.5 mt-6">
                <svg
                  className="w-4 h-4 text-gray2 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full bg-transparent outline-none text-sm text-gray3 placeholder-gray2"
                />
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;