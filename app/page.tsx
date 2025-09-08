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

export default function Home() {
  const { t, setLang } = useLanguage(); // 👈 use translation function from context
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

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
              className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg"
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
                  className={`absolute font-bold text-white 
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
              className="text-4xl md:text-6xl font-extrabold drop-shadow-lg"
            >
              {t("yourTrustedSeedPartner")}
            </motion.h3>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="bg-white text-green-700 font-semibold rounded-full px-8 py-4 flex items-center space-x-2 hover:bg-gray-100 transition-all shadow-lg mb-8 md:mb-12"
          >
            <Link href="/about">{t("learnMoreAboutUs")}</Link>
            <span className="text-2xl">→</span>
          </motion.button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="relative w-full min-h-[400vh] px-4 sm:px-6 md:px-12 py-20 space-y-20">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>
      <div className="px-4 sm:px-6 md:px-12">
        <WhyProcessedSeedCard />
      </div>
      <WhyChooseUs />

      {/* ✅ SEO Rich Content (Expandable Read More) */}
      <div className="px-6 md:px-12 py-12 bg-gray-50 text-gray-800">
        <h2 className="text-2xl font-bold mb-4">About Shipra Seeds</h2>
        <p>
          Shipra Seeds is one of the leading seed companies in India, dedicated to providing 
          farmers with high-quality basmati rice seeds and agricultural solutions that ensure 
          better yields and healthier crops. We understand that farming is not just about 
          producing food—it is about building a sustainable livelihood for millions of families.
        </p>

        {showMore && (
          <div className="mt-4 space-y-4">
            {/* 👉 full 1000-word SEO content block goes here */}
            <p>
              Our goal is to ensure that every farmer who chooses Shipra Seeds products gets access 
              to disease-resistant, high-yield, and climate-adaptable seed varieties...
            </p>
           About Shipra Seeds

Shipra Seeds is one of the leading seed companies in India, dedicated to providing farmers with high-quality basmati rice seeds and agricultural solutions that ensure better yields and healthier crops. We understand that farming is not just about producing food—it is about building a sustainable livelihood for millions of families. By offering reliable seed varieties and supporting farmers with expert guidance, Shipra Seeds has become a trusted partner in agriculture.

Our goal is to ensure that every farmer who chooses Shipra Seeds products gets access to disease-resistant, high-yield, and climate-adaptable seed varieties. Whether you are a small farmer or a large cultivator, we are committed to improving your productivity, profitability, and long-term success.

Our Seed Varieties

At Shipra Seeds, we specialize in basmati rice seeds that are known for their long grains, rich aroma, and excellent cooking quality. Our portfolio includes a wide range of popular and innovative paddy seed varieties such as:

PB-1692 – A high-yielding variety with excellent grain length and cooking quality.

PB-1121 – Famous for its extra-long grains and strong basmati fragrance, one of the most demanded seeds.

PB-1718 – Resistant to many common rice diseases, ensuring reliable harvests.

PB-1847 – Adaptable to different soil types and suitable for varied climates.

PB-1885 – Combines high productivity with strong plant health.

PB-1509 – Early maturing seed variety, helping farmers save water and time.

PB-1401 – Traditional basmati taste with dependable yields.

By continuously improving our seed genetics and maintaining high purity standards, Shipra Seeds ensures that farmers receive only the best quality seeds for every sowing season.

Why Farmers Choose Shipra Seeds

High Germination Rates – Every batch of seeds undergoes strict quality checks to ensure better crop establishment.

Disease Resistance – Our paddy seeds are developed to withstand common pests and diseases.

Higher Yields – With our seeds, farmers consistently achieve better yield per acre.

Trusted Brand – Thousands of farmers across India rely on Shipra Seeds for their basmati cultivation.

Affordable Prices – We provide seeds at competitive prices, ensuring accessibility for all farmers.

Sustainability Focus – Our products are designed to promote eco-friendly and water-saving cultivation practices.

Benefits of Using Quality Seeds

Seeds are the foundation of agriculture, and using high-quality seeds can make the difference between an average harvest and an exceptional one. Farmers who use Shipra Seeds paddy varieties experience:

Better crop establishment and uniform growth.

Resistance to lodging and crop failure.

Stronger plants with higher grain filling.

Increased profitability due to premium-quality basmati grain.

When farmers invest in quality seeds, they are not just purchasing a product—they are securing their future harvests and financial stability.

Our Mission and Vision

At Shipra Seeds, our mission is to empower farmers with modern agricultural solutions while preserving the traditional value of farming. We envision a future where every farmer has access to the best seed technologies, training, and support to ensure food security and prosperity.

Our focus is not only on seeds but also on building long-term relationships with the farming community. We believe in growth together—when farmers succeed, we succeed.

Research and Development

Innovation is at the heart of Shipra Seeds. Our R&D team is constantly working to develop new seed varieties that meet the challenges of climate change, water scarcity, and disease outbreaks. By combining traditional knowledge with modern breeding techniques, we are able to deliver seed varieties that:

Require less water

Mature faster

Resist pests and diseases

Deliver consistent results year after year

This dedication to research makes us one of the most reliable seed companies in India.

Customer Support for Farmers

At Shipra Seeds, we believe that selling seeds is just the beginning. We provide farmers with guidance, cultivation practices, and crop management tips to help them make the most out of their harvest. Our support team ensures that farmers get timely advice on sowing, irrigation, and plant protection.

We also use digital platforms and WhatsApp alerts to keep farmers updated on:

Seasonal sowing guidelines

Weather-related advisories

Best practices for pest and disease control

This farmer-first approach ensures that we go beyond being just a seed provider—we become a partner in farming success.

Commitment to Sustainability

Agriculture faces new challenges every day, from climate change to resource scarcity. At Shipra Seeds, we are committed to offering sustainable seed solutions that help farmers grow more with fewer resources. By promoting early maturing and water-efficient seed varieties, we contribute to reducing the environmental footprint of farming.

We believe in nurturing nature while feeding the nation.

Why Shipra Seeds is the Right Choice for You

If you are looking for high-yield basmati seeds, Shipra Seeds is the right choice.

If you want seeds that resist diseases and pests, we have the right solution.

If you value trust, consistency, and quality, Shipra Seeds is your farming partner.

Farmers across India trust us because we combine innovation, tradition, and quality assurance in every seed we deliver.

Final Word

Shipra Seeds is more than just a seed company—it is a movement to transform Indian agriculture. With a wide range of basmati rice seeds, high-yield paddy varieties, and sustainable farming solutions, we are here to support farmers at every step.

Our promise is simple: Better Seeds, Better Harvests, Better Future.
          </div>
        )}

        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-4 text-green-700 font-semibold hover:underline"
        >
          {showMore ? "Read Less" : "Read More"}
        </button>
      </div>
    </>
  );
}
