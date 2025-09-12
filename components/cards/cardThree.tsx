"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { client, urlFor } from "@/sanity";

export const CardThree = () => {
  const { lang: language, t } = useLanguage();
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        // Your GROQ query is already correct for fetching the data structure.
        const data = await client.fetch(`*[_type == "cardThreeContent"][0]{
                     mainImage,
                     title,        // This will be the localeString object
                     description,  // This will be the localeText object
                     buttonTextKey, // This will be the string 'registerNow'
                       crops[]{
            image,
            name,
            href
          }
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


  const localizedTitle = cardData.title?.[language] || cardData.title?.en || "";
  const localizedDescription =
    cardData.description?.[language] || cardData.description?.en || "";

  return (
    <div className="relative sticky top-4 z-[30]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="rounded-[32px] p-6 sm:p-10 md:p-16 flex flex-col items-center shadow-2xl hover:shadow-3xl transition-all"
         style={{
          backgroundColor: "#f3e8ff",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='32' viewBox='0 0 16 32'%3E%3Cg fill='%239C92AC' fill-opacity='0.22'%3E%3Cpath fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="max-w-4xl w-full mb-10 px-4 text-center">
          <h3 className="text-purple-800 text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
            {localizedTitle}
          </h3>
          <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
            {localizedDescription}
          </p>
          <Link href="/products">
          <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:scale-105 hover:shadow-xl">
            {t("viewProducts")}
          </button>
          </Link>
        </div>
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 ">
          {cardData.crops?.map((crop, i) => (
            <Link key={i} href={`/products?category=${crop.href}`}  className="block w-full">
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
                }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden text-center transition cursor-pointer"
              >
                <img
                  src={urlFor(crop.image).url()}
                  alt={crop.name?.[language] || crop.name?.en || "Crop"}
                  className="h-10 sm:h-24 md:h-40 w-full object-cover"
                />
                <div className="py-1 sm:py-3 md:py-3">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {crop.name?.[language] || crop.name?.en}
                  </h4>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
