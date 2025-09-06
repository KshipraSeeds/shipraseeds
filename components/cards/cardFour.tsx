"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { client, urlFor } from "@/sanity";
import Link from "next/link";

export const CardFour = () => {
  const { lang: language, t } = useLanguage();
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        // Your GROQ query is already correct for fetching the data structure.
        const data = await client.fetch(`*[_type == "cardFourContent"][0]{
                 mainImage,
                 title,        // This will be the localeString object
                 description,  // This will be the localeText object
                 buttonTextKey // This will be the string 'registerNow'
               }`);
        setCardData(data);
      } catch (err) {
        setError("Failed to load content.");
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div className="text-center py-10">Loading Card Content...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!cardData) {
    return <div className="text-center py-10">No card content found.</div>;
  }

  // --- Localization Logic ---
  // Access the localized title and description based on the current 'language' from context.
  // Use a fallback to 'en' (English) if the specific language translation isn't found.
  const localizedTitle = cardData.title?.[language] || cardData.title?.en || "";
  const localizedDescription =
    cardData.description?.[language] || cardData.description?.en || "";

  return (
    <div className="relative sticky top-4 z-[40]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-blue-100 rounded-[32px] p-6 sm:p-10 md:p-16 flex flex-col md:flex-row items-center shadow-xl hover:shadow-3xl transition-all"
      >
        <div className="w-full md:w-1/2">
          <img
            src={urlFor(cardData.mainImage).url()}
            alt={localizedTitle || "Card Image"}
            className="rounded-[24px] w-full object-cover h-[250px] sm:h-[300px] md:h-[400px]"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0 md:ml-12">
          <h3 className="text-blue-800 text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
            {localizedTitle}
          </h3>
          <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
            {localizedDescription}
          </p>
          <Link href="/about">
          <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 text-sm font-semibold shadow-md">
            {t("knowShipraSeeds")}
          </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
