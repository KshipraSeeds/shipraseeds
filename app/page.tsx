'use client';

import Image from "next/image";
import backgroundImage from "@/public/bg1.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CardOne } from "@/components/cards/cardOne";
import { CardTwo } from "@/components/cards/cardTwo";
import { CardThree } from "@/components/cards/cardThree";
import { CardFour } from "@/components/cards/cardFour";
import { WhyProcessedSeedCard } from "@/components/ProcessedSeed/seeds";
import WhyChooseUs from "@/components/WhyChooseUs";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext"; // 👈 import the context
import { CardFive } from "@/components/cards/cardFive";

export default function Home() {
  const { t, setLang } = useLanguage(); // 👈 use translation function from context
  const [index, setIndex] = useState(0);

  const titles = [
    t("seedProducer"),
    t("seedProcessor"),
    t("seedDistributorSupplier"),
  ];



  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute m-5 inset-0 overflow-hidden rounded-[42px]">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover z-0 brightness-75"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col justify-between items-center text-center h-screen text-white px-4 pb-8">
          <div className="flex flex-col justify-center items-center flex-grow mt-8 w-full max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 0.75, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg font-heading3"
            >
              {t("whoAreWe")}
            </motion.h1>

            <div className="h-[60px] md:h-[72px] flex items-center justify-center relative mb-6">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={titles[index]}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                  className={`absolute font-bold text-white font-heading3
                    ${
                      index === 2
                        ? "text-3xl whitespace-normal"
                        : "text-4xl whitespace-nowrap"
                    } 
                    md:text-6xl md:whitespace-nowrap`}
                >
                  {titles[index]}
                </motion.h2>
              </AnimatePresence>
            </div>

            <motion.h3
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 0.75, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-4xl md:text-6xl font-extrabold drop-shadow-lg font-heading3"
            >
              {t("yourTrustedSeedPartner")}
            </motion.h3>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="bg-white text-green-700 font-semibold rounded-full px-8 py-4 flex items-center space-x-2 hover:bg-gray-100 transition-all shadow-lg mb-8 md:mb-12 font-heading3
            "
          >
            <Link href="/about">{t("learnMoreAboutUs")}</Link>
            <span className="text-2xl">→</span>
          </motion.button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative w-full min-h-[400vh] px-4 sm:px-6 md:px-12 py-20 space-y-20">
        {/* <CardOne /> */}
        <CardTwo />
        <CardThree />
        <CardFour />
        <CardFive/>
      </div>
      <div className="px-4 sm:px-6 md:px-12">
        <WhyProcessedSeedCard />
      </div>
      <WhyChooseUs />
    </>
  );
}
