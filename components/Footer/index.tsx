// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { MapPin, Mail, ShieldCheck, LockKeyhole, Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const address = "VPO Bhalsi, Distt. Madlauda, Panipat, Haryana 132113, India";
  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const emailId = "info@yourdomain.com"; 

  const footerSections = [
    {
      title: "हमसे संपर्क करें",
      items: [
        { icon: MapPin, text: address, href: googleMapsUrl, isExternal: true },
        { icon: Mail, text: emailId, href: `mailto:${emailId}` },
      ],
    },
    {
      title: "महत्वपूर्ण लिंक",
      items: [
        { text: "होम", href: "/" },
        { text: "हमारे बारे में", href: "/about" },
        { text: "उत्पाद", href: "/products" },
        { text: "संपर्क", href: "/contact" },
      ],
    },
    {
      title: "कानूनी",
      items: [
        { icon: ShieldCheck, text: "Disclaimer", href: "/disclaimer" },
        { icon: LockKeyhole, text: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
  ];

  return (
    <footer className="bg-agri-footer-bg-light text-agri-text-secondary"> {/* Or bg-gray-100, bg-green-50 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          <div className="mb-6 md:mb-0 lg:col-span-1">
            <Link href="/" legacyBehavior>
              <a className="flex items-center space-x-2 text-2xl font-bold text-agri-text-primary hover:text-agri-green-medium transition-colors">
                <Leaf size={36} className="text-green-700" />
                <h1 className="text-2xl font-black text-green-700 italic gothic-font group-hover:text-green-800 transition-colors">
                  Shipra Seeds
                </h1>
              </a>
            </Link>
            {/* <p className="mt-4 text-sm leading-relaxed">
              Dedicated to providing the highest quality agricultural products and knowledge to help you grow.
            </p> */}
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-agri-text-primary tracking-wider uppercase mb-5 border-b-2 border-agri-green-light pb-2 inline-block">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.text} className="flex items-start">
                    {item.icon && <item.icon className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-agri-green-medium" />}
                    <Link href={item.href || '#'} legacyBehavior>
                      <a
                        className="hover:text-agri-text-primary hover:underline transition-colors duration-200 leading-relaxed"
                        target={item.isExternal ? "_blank" : "_self"}
                        rel={item.isExternal ? "noopener noreferrer" : ""}
                      >
                        {item.text}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 border-t border-agri-green-light/50 pt-8 text-center md:text-left">
          <p className="text-sm text-agri-text-secondary">
            © {currentYear} Shipra Seeds. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;