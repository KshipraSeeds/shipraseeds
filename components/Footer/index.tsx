"use client";

// components/Footer.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Mail,
  ShieldCheck,
  LockKeyhole,
  ExternalLink,
  Navigation,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { lang: language, t } = useLanguage();

  const address = {
    hi: "वि.पो. भलसी, जिला मदलौडा, पानीपत, हरियाणा - 132113, भारत",
    en: "V.P.O. Bhalsi, Tehsil Madlauda, Panipat, Haryana - 132113, India",
    pa: "ਵੀ.ਪੀ.ਓ. ਭਲਸੀ, ਤਹਿਸੀਲ ਮਦਲੌੜਾ, ਪਾਣੀਪਤ, ਹਰਿਆਣਾ - 132113, ਭਾਰਤ",
  };

  const latitude = 29.390889;
  const longitude = 76.812139;
  const googleMapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
  const emailId = "kshipra@shipraseeds.com";
  const instaIdUrl = `https://www.instagram.com/shipraseeds?igsh=ZHFvYjZkbnBlNXNn&utm_source=qr`;
  const instaId = "Shipra Seeds";

  const footerSections = [
    {
      title: {
        hi: "हमसे संपर्क करें",
        en: "Contact Us",
        pa: "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
      },
      items: [
        {
          type: "address" as const,
          icon: MapPin,
          text: address,
          href: googleMapsUrl,
          isExternal: true,
        },
        {
          type: "email" as const,
          icon: Mail,
          text: {
            hi: emailId,
            en: emailId,
            pa: emailId,
          },
          href: `mailto:${emailId}`,
        },
        {
          type: "insta" as const,
          icon: FaInstagram,
          text: {
            hi: instaId,
            en: instaId,
            pa: instaId,
          },
          href: instaIdUrl,
        },
      ],
    },
    {
      title: {
        hi: "महत्वपूर्ण लिंक",
        en: "Important Links",
        pa: "ਮਹੱਤਵਪੂਰਣ ਲਿੰਕ",
      },
      items: [
        {
          text: {
            hi: "होम",
            en: "Home",
            pa: "ਹੋਮ",
          },
          href: "/",
        },
        {
          text: {
            hi: "हमारे बारे में",
            en: "About Us",
            pa: "ਸਾਡੇ ਬਾਰੇ",
          },
          href: "/about",
        },
        {
          text: {
            hi: "उत्पाद",
            en: "Products",
            pa: "ਉਤਪਾਦ",
          },
          href: "/products",
        },
        {
          text: {
            hi: "संपर्क",
            en: "Contact",
            pa: "ਸੰਪਰਕ",
          },
          href: "/contact",
        },
      ],
    },
    {
      title: {
        hi: "कानूनी",
        en: "Legal",
        pa: "ਕਾਨੂੰਨੀ",
      },
      items: [
        {
          icon: ShieldCheck,
          text: {
            hi: "डिस्क्लेमर",
            en: "Disclaimer",
            pa: "ਅਸਵੀਕਰਨ",
          },
          href: "/disclaimer",
        },
        {
          icon: LockKeyhole,
          text: {
            hi: "प्राइवेसी पॉलिसी",
            en: "Privacy Policy",
            pa: "ਪਰਦੇਦਾਰੀ ਨੀਤੀ",
          },
          href: "/privacy-policy",
        },
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
              key={index}
              className="animate-fadeInUp"
              style={{
                animationFillMode: "backwards",
                animationDelay: `${200 + index * 150}ms`,
              }}
            >
              <h3 className="text-lg font-semibold text-sky-400 tracking-wide mb-6 border-b-2 border-sky-600/30 pb-3">
                {section.title[language] || section.title.hi}
              </h3>
              <ul className="space-y-4">
                {section.items.map((item, itemIndex) => {
                  const text = item.text?.[language] || item.text?.hi;

                  if (item.type === "address") {
                    return (
                      <li key={itemIndex} className="group/item">
                        <Link href={item.href || "#"} legacyBehavior>
                          <a
                            className="flex items-start text-slate-300 hover:text-sky-300 hover:underline focus:outline-none focus:ring-2 focus:ring-sky-500 focus:rounded-sm transition-all duration-300 ease-in-out group/link"
                            target={item.isExternal ? "_blank" : "_self"}
                            rel={item.isExternal ? "noopener noreferrer" : ""}
                          >
                            {item.icon && (
                              <item.icon className="w-5 h-5 mr-3 mt-[3px] flex-shrink-0 text-sky-500 transition-colors duration-300 group-hover/link:text-sky-300" />
                            )}
                            <span className="leading-relaxed">
                              {text}
                              <Navigation
                                size={14}
                                className="ml-1.5 inline-block opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all duration-300 text-sky-400 group-hover/link:text-sky-300"
                              />
                            </span>
                          </a>
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li
                      key={itemIndex}
                      className="flex items-start text-sm group/item"
                    >
                      {item?.icon && (
                        <item.icon className="w-5 h-5 mr-3 mt-[2px] flex-shrink-0 text-sky-500 transition-colors duration-300 group-hover/item:text-sky-300" />
                      )}
                      <Link href={item.href || "#"} legacyBehavior>
                        <a
                          className="text-slate-300 hover:text-sky-300 hover:underline focus:outline-none focus:ring-2 focus:ring-sky-500 focus:rounded-sm transition-colors duration-300 ease-in-out leading-relaxed group/link inline-flex items-center"
                          target={item.isExternal ? "_blank" : "_self"}
                          rel={item.isExternal ? "noopener noreferrer" : ""}
                        >
                          <span className="hover:translate-x-1 transition-transform duration-200 inline-block">
                            {text}
                          </span>
                          {item.isExternal && item.type !== "address" && (
                            <ExternalLink
                              size={14}
                              className="ml-1.5 opacity-70 group-hover/link:opacity-100 transition-opacity duration-300 text-sky-400 group-hover/link:text-sky-300"
                            />
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
          style={{
            animationFillMode: "backwards",
            animationDelay: `${200 + footerSections.length * 150}ms`,
          }}
        >
          <p className="text-base text-slate-400">
            © {currentYear} Shipra seeds. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
