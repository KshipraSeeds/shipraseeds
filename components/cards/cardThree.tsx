import React from 'react'
import card31 from "@/public/Wheat.jpg";
import card32 from "@/public/paddy1.jpg";
import card33 from "@/public/JowarSeeds.avif";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';


export const CardThree = () => {
    const images = [
        { src: card32, name: "बासमती धान", href: "/products?category=paddy" },
        { src: card31, name: "गेहूं", href: "/products?category=wheat " },
        { src: card33, name: "ज्वार", href: "/products?category=sorghum" },
      ];
    
      return (
        <div className="relative sticky top-4 z-[30]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-purple-100 rounded-[32px] p-6 sm:p-10 md:p-16 flex flex-col items-center shadow-2xl hover:shadow-3xl transition-all"
          >
            <div className="max-w-4xl w-full mb-10 px-4 text-center">
              <h3 className="text-purple-800 text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                हमारे बीज देखें
              </h3>
              <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
                विभिन्न फसलों और वैरायटी के लिए हमारे उत्पादों को देखें — पैक साइज और उपयोग की पूरी जानकारी के साथ।
              </p>
              <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:scale-105 hover:shadow-xl">
  उत्पाद देखें
</button>

            </div>
            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 ">
              {images.map((img, i) => (
                <Link key={i} href={img.href} className="block w-full">
                  <motion.div
                    whileHover={{
                      y: -8,
                      scale: 1.05,
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
                    }}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden text-center transition cursor-pointer"
                  >
                    <Image
                      src={img.src}
                      alt={img.name}
                      className="h-10 sm:h-24 md:h-40 w-full object-cover"
                    />
                    <div className="py-1 sm:py-3 md:py-3">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {img.name}
                      </h4>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      );
}
