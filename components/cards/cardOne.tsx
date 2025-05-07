import Image from 'next/image';
import React from 'react'
import { motion} from "framer-motion";
import card1 from "@/public/freepik__candid-photography-with-natural-textures-and-highl__83704.png";

export const CardOne = () => {
    return (
        <div className="relative sticky top-4 z-[10]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-green-100 rounded-[32px] p-6 sm:p-10 md:p-16 flex flex-col md:flex-row items-center shadow-2xl hover:shadow-3xl transition-all"
          >
            <div className="w-full md:w-1/2">
              <Image
                src={card1}
                alt="Card 1"
                className="rounded-[24px] w-full object-cover h-[250px] sm:h-[300px] md:h-[400px]"
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0 md:ml-12">
              <h3 className="text-green-800 text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                हमारे किसान नेटवर्क से जुड़ें
              </h3>
              <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
                रजिस्टर करें और बुवाई की सलाह, बीज से जुड़ी जानकारी, नए सीड वैरायटी की सूचना और सीजन के लिए बीज मार्गदर्शन पाएं।
              </p>
              <button className="bg-black text-white px-6 py-3 rounded-full transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:scale-105 hover:shadow-xl text-sm font-semibold shadow-md">
                अभी रजिस्टर करें
              </button>
            </div>
          </motion.div>
        </div>
      );}

