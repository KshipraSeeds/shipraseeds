"use client";


import Image from "next/image";
import backgroundImage from "@/public/bg1.jpg"; // update the path accordingly
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image 
        src={backgroundImage} 
        alt="Background" 
        fill 
        className="object-cover z-0 brightness-75" 
        priority
      />

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white px-4">
        
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg"
        >
          भरोसे के बीज,<br /> 
          सपनों की फसल।
        </motion.h1>

        {/* Animated Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-lg md:text-2xl font-medium mb-8 max-w-2xl drop-shadow-md"
        >
          हम आपके खेती सहयोगी हैं — बीज तैयार करते हैं, सही सलाह देते हैं, और भरोसेमंद बीज समय पर पहुँचाते हैं।
        </motion.p>

        {/* Animated Button */}
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="bg-white text-green-700 font-semibold rounded-full px-8 py-4 flex items-center space-x-2 hover:bg-gray-100 transition-all shadow-lg"
        >
          <span>हमारे बारे में अधिक जानें</span>
          <span className="text-2xl">→</span>
        </motion.button>
        
      </div>
    </div>
      <div>

    xvdsfds
      </div>
      </>
  );
}
