"use client";

// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Mail,
  ShieldCheck,
  LockKeyhole,
  ExternalLink,
  Navigation,
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const address = "वि.पो. भलसी, जिला मदलौडा, पानीपत, हरियाणा - 132113, भारत";
  const latitude = 29.390889;
  const longitude = 76.812139;
  const googleMapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
  const emailId = "info@yourdomain.com"; // Replace with your actual email

  const footerSections = [
    {
      title: "हमसे संपर्क करें",
      items: [
        { type: 'address' as const, icon: MapPin, text: address, href: googleMapsUrl, isExternal: true },
        { type: 'email' as const, icon: Mail, text: emailId, href: `mailto:${emailId}` },
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
    <footer className="bg-slate-900 text-slate-300 m-4 rounded-[30px] sm:rounded-[42px]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-12 mb-14 md:mb-18">

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div
              key={section.title}
              className="animate-fadeInUp"
              style={{ animationFillMode: 'backwards', animationDelay: `${200 + index * 150}ms` }}
            >
              <h3 className="text-lg font-semibold text-sky-400 tracking-wide mb-6 border-b-2 border-sky-600/30 pb-3">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.items.map((item) => {
                  if (item.type === 'address') {
                    return (
                      <li key={item.text} className="group/item">
                        <Link href={item.href || '#'} legacyBehavior>
                          <a
                            className="flex items-start text-slate-300 hover:text-sky-300 hover:underline focus:outline-none focus:ring-2 focus:ring-sky-500 focus:rounded-sm transition-all duration-300 ease-in-out group/link"
                            target={item.isExternal ? "_blank" : "_self"}
                            rel={item.isExternal ? "noopener noreferrer" : ""}
                          >
                            {item.icon && (
                              <item.icon className="w-5 h-5 mr-3 mt-[3px] flex-shrink-0 text-sky-500 transition-colors duration-300 group-hover/link:text-sky-300" />
                            )}
                            <span className="leading-relaxed">
                              {item.text}
                              <Navigation size={14} className="ml-1.5 inline-block opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all duration-300 text-sky-400 group-hover/link:text-sky-300" />
                            </span>
                          </a>
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={item.text} className="flex items-start text-sm group/item">
                      {item.icon && (
                        <item.icon className="w-5 h-5 mr-3 mt-[2px] flex-shrink-0 text-sky-500 transition-colors duration-300 group-hover/item:text-sky-300" />
                      )}
                      <Link href={item.href || '#'} legacyBehavior>
                        <a
                          className="text-slate-300 hover:text-sky-300 hover:underline focus:outline-none focus:ring-2 focus:ring-sky-500 focus:rounded-sm transition-colors duration-300 ease-in-out leading-relaxed group/link inline-flex items-center"
                          target={item.isExternal ? "_blank" : "_self"}
                          rel={item.isExternal ? "noopener noreferrer" : ""}
                        >
                          <span className="hover:translate-x-1 transition-transform duration-200 inline-block">{item.text}</span>
                          {item.isExternal && item.type !== 'address' && (
                            <ExternalLink size={14} className="ml-1.5 opacity-70 group-hover/link:opacity-100 transition-opacity duration-300 text-sky-400 group-hover/link:text-sky-300" />
                          )}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div
          className="mt-16 md:mt-12 border-t border-slate-700 pt-10 text-center animate-fadeInUp"
          style={{ animationFillMode: 'backwards', animationDelay: `${200 + footerSections.length * 150}ms` }}
        >
          <p className="text-base text-slate-400">
            © {currentYear} Shipra Seeds. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;