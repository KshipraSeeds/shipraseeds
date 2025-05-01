import React from 'react'
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import card3 from "@/public/freepik__the-style-is-candid-image-photography-with-natural__17003.jpeg";

export const CardFour = () => {
    return (
        <div className="relative sticky top-4 z-[40]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-blue-100 rounded-[32px] p-6 sm:p-10 md:p-16 flex flex-col md:flex-row items-center shadow-2xl hover:shadow-3xl transition-all"
          >
            <div className="w-full md:w-1/2">
              <Image
                src={card3}
                alt="Card 4"
                className="rounded-[24px] w-full object-cover h-[250px] sm:h-[300px] md:h-[400px]"
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0 md:ml-12">
              <h3 className="text-blue-800 text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                हर बीज की बोरी के पीछे एक कहानी होती है।
              </h3>
              <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
                यह हमारी है — भरोसे, मेहनत और किसानों के लिए बनाई गई।
              </p>
              <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 text-sm font-semibold shadow-md">
                शिप्रा सीड्स को जानिए
              </button>
            </div>
          </motion.div>
        </div>
      );
}

