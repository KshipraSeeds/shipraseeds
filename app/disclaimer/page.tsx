"use client";

import { useLanguage } from "../context/LanguageContext";
import { client, urlFor } from "@/sanity";
import React, { useEffect, useState } from "react";

const DisclaimerPage: React.FC = () => {
  const { lang: language, t } = useLanguage();

  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(`*[_type == "disclaimerSection"][0]{
        item1,
        item2,
        item3,
        item4,
        item5,
        item6,
        item7,
        item8,
        item9,
        item10,
        item11,
        item12,
        item13,
        item14,
        item15,
        item16,
        item17,
        item18,
        item19,
        item20,
        item21,
        item22,
        item23,
        item24,
        item25,
        item26,
        item27,
        item28,
        item29,
        item30,
        item31,
        item32,
        item33,
        item34,
        item35,
        item36,
        item37,
        item38,
        item39,
        item40,
        item41,
        item42,
        item43,
        item44,
        item45,
        item46,
        item47,
        item48,
        item49,
        item50,
        item51,
        item52,
        item53,
        item54,
        item55,
        item56,
        item57,
        item58,
        item59,
        item60,
        item61,
        item62,
        item63
      }`);
        setCardData(data);
      } catch (err) {
        setError("Failed to load content.");
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading Card Content...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="m-4 rounded-[30px] sm:rounded-[42px] flex items-center justify-center">
      <div className="w-full max-w-4xl border-green-100 sm:p-8 md:p-10 space-y-10">
        <header className="text-center mb-10 mt-6 md:mt-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-700 leading-tight mt-28 sm:mt-20 md:mt-24">
            {cardData.item1?.[language] || cardData.item1?.hi}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-green-600 max-w-2xl mx-auto">
            {cardData.item2?.[language] || cardData.item2?.hi}
          </p>
        </header>

        {/* Main Website Disclaimer */}
        <section className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 mb-12 border-t-8 border-green-500">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-6 border-b-2 border-green-300 pb-3">
            📜 {cardData.item3?.[language] || cardData.item3?.hi}
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            {cardData.item4?.[language] || cardData.item4?.hi}
          </p>

          <ul className="space-y-6">
            <li>
              <h3 className="text-xl sm:text-2xl font-semibold text-green-600 mb-2">
                {cardData.item5?.[language] || cardData.item5?.hi}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {cardData.item6?.[language] || cardData.item6?.hi}
              </p>
            </li>
            <li>
              <h3 className="text-xl sm:text-2xl font-semibold text-green-600 mb-2">
                {cardData.item7?.[language] || cardData.item7?.hi}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {cardData.item8?.[language] || cardData.item8?.hi}
              </p>
            </li>
            <li>
              <h3 className="text-xl sm:text-2xl font-semibold text-green-600 mb-2">
                {cardData.item9?.[language] || cardData.item9?.hi}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {cardData.item10?.[language] || cardData.item10?.hi}
              </p>
            </li>
            <li>
              <h3 className="text-xl sm:text-2xl font-semibold text-green-600 mb-2">
                {cardData.item11?.[language] || cardData.item11?.hi}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {cardData.item12?.[language] || cardData.item12?.hi}
              </p>
            </li>
            <li>
              <h3 className="text-xl sm:text-2xl font-semibold text-green-600 mb-2">
                {cardData.item13?.[language] || cardData.item13?.hi}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {cardData.item14?.[language] || cardData.item14?.hi}
              </p>
            </li>
            <li>
              <h3 className="text-xl sm:text-2xl font-semibold text-green-600 mb-2">
                {cardData.item15?.[language] || cardData.item15?.hi}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {cardData.item16?.[language] || cardData.item16?.hi}
              </p>
            </li>
            <li>
              <h3 className="text-xl sm:text-2xl font-semibold text-green-600 mb-2">
                {cardData.item17?.[language] || cardData.item17?.hi}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {cardData.item18?.[language] || cardData.item18?.hi}
              </p>
            </li>
            <li>
              <h3 className="text-xl sm:text-2xl font-semibold text-green-600 mb-4">
                {cardData.item19?.[language] || cardData.item19?.hi}
              </h3>
              <p className="font-medium text-green-600 mb-2">
                {cardData.item20?.[language] || cardData.item20?.hi}
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                {cardData.item21?.[language] || cardData.item21?.hi}
              </p>
              <p className="font-medium text-green-600 mb-2">
                {cardData.item22?.[language] || cardData.item22?.hi}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {cardData.item23?.[language] || cardData.item23?.hi}
              </p>
            </li>
            <li>
              <h3 className="text-xl sm:text-2xl font-semibold text-green-600 mb-2">
                {cardData.item24?.[language] || cardData.item24?.hi}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {cardData.item25?.[language] || cardData.item25?.hi}
              </p>
            </li>
          </ul>
        </section>

        {/* Promotional Messages Disclaimer */}
        <section className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 mb-12 border-t-8 border-yellow-500">
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-700 mb-6 border-b-2 border-yellow-300 pb-3">
            📜 {cardData.item26?.[language] || cardData.item26?.hi}
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            {cardData.item27?.[language] || cardData.item27?.hi}
          </p>
          <p className="mb-6 text-lg leading-relaxed text-gray-700 font-semibold">
            {cardData.item28?.[language] || cardData.item28?.hi}
          </p>
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>{cardData.item29?.[language] || cardData.item29?.hi}</li>
            <li>{cardData.item30?.[language] || cardData.item30?.hi}</li>
            <li>{cardData.item31?.[language] || cardData.item31?.hi}</li>
            <li>{cardData.item32?.[language] || cardData.item32?.hi}</li>
            <li>{cardData.item33?.[language] || cardData.item33?.hi}</li>
            <li>{cardData.item34?.[language] || cardData.item34?.hi}</li>
          </ul>
          <p className="mt-6 text-lg leading-relaxed text-gray-700 italic">
            {cardData.item35?.[language] || cardData.item35?.hi}
          </p>
        </section>

        {/* Agricultural Advice Disclaimer */}
        <section className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 mb-12 border-t-8 border-blue-500">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-3">
            📜 {cardData.item36?.[language] || cardData.item36?.hi}
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            {cardData.item37?.[language] || cardData.item37?.hi}
          </p>

          <ul className="space-y-6">
            <li>
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-2">
                {cardData.item38?.[language] || cardData.item38?.hi}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {cardData.item39?.[language] || cardData.item39?.hi}
              </p>
              <ul className="list-disc pl-8 mt-2 space-y-1 text-gray-700">
                <li>{cardData.item40?.[language] || cardData.item40?.hi}</li>
                <li>{cardData.item41?.[language] || cardData.item41?.hi}</li>
                <li>{cardData.item42?.[language] || cardData.item42?.hi}</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-2">
                {cardData.item43?.[language] || cardData.item43?.hi}
              </p>
            </li>

            <li>
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-2">
                {cardData.item44?.[language] || cardData.item44?.hi}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {cardData.item45?.[language] || cardData.item45?.hi}
              </p>
              <ul className="list-disc pl-8 mt-2 space-y-1 text-gray-700">
                <li>{cardData.item46?.[language] || cardData.item46?.hi}</li>
                <li>{cardData.item47?.[language] || cardData.item47?.hi}</li>
                <li>{cardData.item48?.[language] || cardData.item48?.hi}</li>
                <li>{cardData.item49?.[language] || cardData.item49?.hi}</li>
                <li>{cardData.item50?.[language] || cardData.item50?.hi}</li>
                <li>{cardData.item51?.[language] || cardData.item51?.hi}</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-2">
                {cardData.item52?.[language] || cardData.item52?.hi}
              </p>
            </li>
            
            <li>
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-2">
                {cardData.item53?.[language] || cardData.item53?.hi}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {cardData.item54?.[language] || cardData.item54?.hi}
              </p>
              <ul className="list-disc pl-8 mt-2 space-y-1 text-gray-700">
                <li>{cardData.item55?.[language] || cardData.item55?.hi}</li>
                <li>{cardData.item56?.[language] || cardData.item56?.hi}</li>
                <li>{cardData.item57?.[language] || cardData.item57?.hi}</li>
              </ul>
            </li>

            <li>
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-2">
                {cardData.item58?.[language] || cardData.item58?.hi}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {cardData.item59?.[language] || cardData.item59?.hi}
              </p>
              <ul className="list-disc pl-8 mt-2 space-y-1 text-gray-700">
                <li>{cardData.item60?.[language] || cardData.item60?.hi}</li>
                <li>{cardData.item61?.[language] || cardData.item61?.hi}</li>
                <li>{cardData.item62?.[language] || cardData.item62?.hi}</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-2">
                {cardData.item63?.[language] || cardData.item63?.hi}
              </p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default DisclaimerPage;