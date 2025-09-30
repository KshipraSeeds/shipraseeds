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
    <div className="relative sticky top-4 z-[20]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="rounded-[32px] p-6 sm:p-10 md:p-16 flex flex-col items-center shadow-2xl hover:shadow-3xl transition-all"
       
           style={{
          backgroundColor: "#f3e8ff",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='1' viewBox='0 0 40 1' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v1H0z' fill='%239C92AC' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
}}
      >
        <div className="max-w-4xl w-full mb-10 px-4 text-center">
          <h3 className="text-purple-800 text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 font-heading3">
            {localizedTitle}
          </h3>
          <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed font-sans3">
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
                  <h4 className="text-lg font-semibold text-gray-800 font-heading3">
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
