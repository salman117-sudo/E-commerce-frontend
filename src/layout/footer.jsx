import React from 'react'

const footerLinks = {
  company: ['About', 'Features', 'Works', 'Career'],
  help: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'],
  faq: ['Account', 'Manage Deliveries', 'Orders', 'Payments'],
  resources: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'],
}

const socialIcons = [
  { src: '/homePage/layout/footer/1.svg', alt: 'Twitter logo' },
  { src: '/homePage/layout/footer/2.svg', alt: 'Facebook logo' },
  { src: '/homePage/layout/footer/3.svg', alt: 'Instagram logo' },
  { src: '/homePage/layout/footer/4.svg', alt: 'Github logo' },
]

const paymentBadges = [
  { src: '/homePage/layout/footer/Badge.svg', alt: 'Visa' },
  { src: '/homePage/layout/footer/Badge (1).svg', alt: 'Mastercard' },
  { src: '/homePage/layout/footer/Badge (2).svg', alt: 'PayPal' },
  { src: '/homePage/layout/footer/Badge (3).svg', alt: 'Apple Pay' },
  { src: '/homePage/layout/footer/Badge (4).svg', alt: 'Google Pay' },
]

const FooterLinkColumn = ({ title, links }) => (
  <div className="flex flex-col gap-4 ">
    <h4 className="uppercase text-xs tracking-widest font-semibold text-gray-500">
      {title}
    </h4>
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="text-sm text-gray-500 hover:text-black transition-colors">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

const Footer = () => {
  return (
    <div className="bg-gray1 pt-6 sm:pt-10">
      <div className="max-w-480 min-w-75 mx-auto px-4 md:px-25">

        {/* upper newsletter section */}
        <div className="bg-black rounded-3xl px-6 sm:px-12 py-8 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 -mt-30">
          <h2 className="uppercase text-white text-2xl sm:text-4xl font-bold leading-tight max-w-md font-integral">
            Stay upto date about our latest offers...
          </h2>

          <div className="flex flex-col gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-3 w-full sm:w-75 ">
              <img
                src="/homePage/layout/footer/Frame.svg"
                alt=""
                className="w-5 h-5 opacity-50"
              />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full text-sm outline-none placeholder:text-gray-400 font-satoshi"
              />
            </div>
            <button className="bg-white rounded-full px-4 py-3 text-sm font-medium w-full sm:w-75 font-satoshi hover:bg-gray-100 transition-colors">
              Subscribe to Newsletter
            </button>
          </div>
        </div>

        {/* lower section — switches to the 5-col row layout at lg (1024px)
            instead of sm (640px), so there's no cramped middle zone */}
        <div className="py-10 grid grid-cols-1 lg:grid-cols-5 gap-10 font-satoshi">

          {/* logo + description + socials */}
          <div className="lg:col-span-1 flex flex-col items-start text-left gap-4">
            <img
              src="/homePage/layout/footer/SHOP.CO.svg"
              alt="Shop.co logo"
              className="h-6 w-auto mx-0 block "
            />
            <p className="text-sm text-gray-500 max-w-62.5">
              {"We have clothes that suits your style and which you're proud to wear. From women to men."}
            </p>
            <div className="flex gap-3">
              {socialIcons.map((icon) => (
                <a
                  key={icon.alt}
                  href="#"
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                >
                  <img src={icon.src} alt={icon.alt} className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* link columns: 2x2 until lg, then 4 across */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <FooterLinkColumn title="Company" links={footerLinks.company} />
            <FooterLinkColumn title="Help" links={footerLinks.help} />
            <FooterLinkColumn title="FAQ" links={footerLinks.faq} />
            <FooterLinkColumn title="Resources" links={footerLinks.resources} />
          </div>
        </div>

        {/* bottom bar */}
        <div className="border-t border-gray-300 py-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mb-20">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            Shop.co (c) 2000-2023, All Rights Reserved
          </p>
          <div className="flex gap-2">
            {paymentBadges.map((badge) => (
              <img
                key={badge.alt}
                src={badge.src}
                alt={badge.alt}
                className="h-9 w-auto"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer