// src/app/about-us/page.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Modal from "@/components/Modal/modal"; // Adjust path based on your project structure
import { useLanguage } from "@/app/context/LanguageContext";
import { client, urlFor } from "@/sanity";
// Full content for modals



const AboutUsPage = () => {
  // State for the founder's experience counter animation
  const [yearsCount, setYearsCount] = useState(0);
  const yearsRef = useRef(null); // Ref to observe the 15+ years element
  // State for the states animation
  const [statesVisible, setStatesVisible] = useState(false);
  const statesRef = useRef(null); // Ref to observe the states list
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);


  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalTitle("");
    setModalContent(null);
  };

  useEffect(() => {
    let start = 0;
    const end = 15; // Target value
    const duration = 3000; // 3 seconds
    const increment = Math.ceil(end / (duration / 16)); // ~60 frames per second

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setYearsCount(start);
    }, 200); // Update roughly every 16ms (60fps)

    return () => {
      // Cleanup for the interval if the component unmounts before completion
      clearInterval(counter);
    };
  }, []); // Empty dependency array: runs ONCE on component mount

  // Hook for the states entry animation (keep this as is if you want it on scroll)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatesVisible(true);
          observer.unobserve(entry.target); // Stop observing once animated
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (statesRef.current) {
      observer.observe(statesRef.current);
    }

    return () => {
      if (statesRef.current) {
        observer.unobserve(statesRef.current);
      }
    };
  }, [statesRef.current]);

  const { lang: language, t } = useLanguage();
    const stateNames = t("stateNames");

  const [cardData, setCardData] = useState(null);
  const [coreValuesData, setCoreValuesData] = useState(null);
  const [founderData, setFounderData] = useState(null);
  const [expData, setExpData] = useState(null);
  const [goalData, setGoalData] = useState(null);




  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //whychooseUs Data
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        // Your GROQ query is already correct for fetching the data structure.
        const data =
          await client.fetch(`*[_type == "About_whyChooseUsSection"][0]{
item1,
item2,
item3,
item4,
item5,
item6,
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
item25
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

  //CoreValuesData
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        // Your GROQ query is already correct for fetching the data structure.
        const data =
          await client.fetch(`*[_type == "About_coreValuesSection"][0]{
item1,
item2,
item3,
item4,
item5,
item6,
item7,item8,item9,
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
item25
                 }`);
        setCoreValuesData(data);
      } catch (err) {
        setError("Failed to load content.");
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, []);

  //founderData
   useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        // Your GROQ query is already correct for fetching the data structure.
        const data =
          await client.fetch(`*[_type == "About_FounderSection"][0]{
            mainImage,
item1,
item2,
item3,
item4,
item5,
item6,
item7,item8,item9,
item10,
item11,
item12,
item13,
item14,
item15,
item16,
item17,
item18,
                 }`);
        setFounderData(data);
      } catch (err) {
        setError("Failed to load content.");
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, []);

     useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        // Your GROQ query is already correct for fetching the data structure.
        const data =
          await client.fetch(`*[_type == "About_ExperienceSection"][0]{
item1,
item2,
item3,
item4,
item5,
item6,
item7,item8,item9,
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
item25
                 }`);
        setExpData(data);
      } catch (err) {
        setError("Failed to load content.");
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, []);

      useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        // Your GROQ query is already correct for fetching the data structure.
        const data =
          await client.fetch(`*[_type == "About_OurGoalSection"][0]{
item1,
item2,
item3,
item4,
item5,
item6,
item7,
                 }`);
        setGoalData(data);
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

  if (!cardData || !coreValuesData || !founderData || !expData || !goalData) {
    return <div className="text-center py-10">No card content found.</div>;
  }

  const whyChooseUsFullContent = (
    <>
      <h3 className="font-semibold text-xl mb-3 text-shipra-green-700">
        {cardData.item10?.[language] || cardData.item10?.hi}
      </h3>
      <p className="mb-4">
        {cardData.item11?.[language] || cardData.item11?.hi}
      </p>

      <h3 className="font-semibold text-xl mb-3 text-shipra-green-700">
        {cardData.item12?.[language] || cardData.item12?.hi}
      </h3>
      <p className="mb-3">
        {cardData.item13?.[language] || cardData.item13?.hi}
      </p>
      <p className="mb-2">
        {cardData.item14?.[language] || cardData.item14?.hi}
      </p>
      <ul className="list-disc list-inside space-y-2 text-shipra-text mb-4">
        <li>{cardData.item15?.[language] || cardData.item15?.hi}</li>
        <li>{cardData.item16?.[language] || cardData.item16?.hi}</li>
        <li>{cardData.item17?.[language] || cardData.item17?.hi}</li>
      </ul>
      <p className="mb-4">
        {cardData.item18?.[language] || cardData.item18?.hi}
      </p>

      <h3 className="font-semibold text-xl mb-3 text-shipra-green-700">
        {cardData.item19?.[language] || cardData.item19?.hi}
      </h3>
      <p className="mb-3">
        {cardData.item20?.[language] || cardData.item20?.hi}
      </p>
      <p className="mb-2">
        {cardData.item21?.[language] || cardData.item21?.hi}
      </p>
      <ul className="list-disc list-inside space-y-2 text-shipra-text mb-4">
        <li>{cardData.item22?.[language] || cardData.item22?.hi}</li>
        <li>{cardData.item23?.[language] || cardData.item23?.hi}</li>
        <li>{cardData.item24?.[language] || cardData.item24?.hi}</li>
      </ul>
      <p>{cardData.item25?.[language] || cardData.item25?.hi}</p>
    </>
  );

  const coreValuesFullContent = (
    <>
      <h3 className="font-semibold text-xl mb-3 text-shipra-green-700">
        {coreValuesData.item6?.[language] || coreValuesData.item6?.hi}
      </h3>
      <p className="mb-3">
        {coreValuesData.item7?.[language] || coreValuesData.item7?.hi}
      </p>

      <h4 className="font-semibold text-lg mb-2 text-shipra-green-500 pl-4">
        a. {coreValuesData.item8?.[language] || coreValuesData.item8?.hi}
      </h4>
      <ul className="list-disc list-inside space-y-2 text-shipra-text mb-3 pl-4">
        <li>
          {" "}
          {coreValuesData.item9?.[language] || coreValuesData.item9?.hi}{" "}
        </li>
        <li>
          {" "}
          {coreValuesData.item10?.[language] || coreValuesData.item10?.hi}{" "}
        </li>
        <li>
          {coreValuesData.item11?.[language] || coreValuesData.item11?.hi}
        </li>
      </ul>

      <h4 className="font-semibold text-lg mb-2 text-shipra-green-500 pl-4">
        b.  {coreValuesData.item12?.[language] || coreValuesData.item12?.hi}
      </h4>
      <ul className="list-disc list-inside space-y-2 text-shipra-text mb-3 pl-4">
        <li>
          {" "}
          {coreValuesData.item13?.[language] || coreValuesData.item13?.hi}{" "}
        </li>
        <li>
          {" "}
          {coreValuesData.item14?.[language] || coreValuesData.item14?.hi}{" "}
        </li>
      </ul>

      <h4 className="font-semibold text-lg mb-2 text-shipra-green-500 pl-4">
        c. {coreValuesData.item15?.[language] || coreValuesData.item15?.hi}
      </h4>
     <ul className="list-disc list-inside space-y-2 text-shipra-text mb-3 pl-4">
        <li>
          {" "}
          {coreValuesData.item16?.[language] || coreValuesData.item16?.hi}{" "}
        </li>
        <li>
          {" "}
          {coreValuesData.item17?.[language] || coreValuesData.item17?.hi}{" "}
        </li>
      </ul>

      <h3 className="font-semibold text-xl mb-3 text-shipra-green-700">
        {coreValuesData.item18?.[language] || coreValuesData.item18?.hi}
      </h3>
      <ul className="list-disc list-inside space-y-2 text-shipra-text mb-3 pl-4">
        <li>
          {coreValuesData.item19?.[language] || coreValuesData.item19?.hi}
        </li>
        <li>
         {coreValuesData.item20?.[language] || coreValuesData.item20?.hi}
        </li>
        <li>
          {coreValuesData.item21?.[language] || coreValuesData.item21?.hi}
        </li>
      </ul>

      <h3 className="font-semibold text-xl mb-3 text-shipra-green-700">
        {coreValuesData.item22?.[language] || coreValuesData.item22?.hi}
      </h3>
      <ul className="list-disc list-inside space-y-2 text-shipra-text mb-3 pl-4">
        <li>
          {coreValuesData.item23?.[language] || coreValuesData.item23?.hi}
        </li>
        <li>
         {coreValuesData.item24?.[language] || coreValuesData.item24?.hi}
        </li>
        <li>
          {coreValuesData.item25?.[language] || coreValuesData.item25?.hi}
        </li>
      </ul>

    </>
  );

  const founderFullContent = (
  <>
    <p className="mb-3">
      {founderData.item3?.[language] || founderData.item3?.hi}
    </p>
    <p className="mb-3">
            {founderData.item4?.[language] || founderData.item4?.hi}

    </p>
    <p>
           {founderData.item5?.[language] || founderData.item5?.hi}

    </p>
  </>
);

const storyFullContent = (
  <>
    <p className="mb-4">
     {founderData.item7?.[language] || founderData.item7?.hi}
    </p>
    <h3 className="font-semibold text-xl mb-2 text-shipra-green-500">
      🌱 {founderData.item9?.[language] || founderData.item9?.hi}
    </h3>
    <p className="mb-4">
      {founderData.item10?.[language] || founderData.item10?.hi}
    </p>
    <h3 className="font-semibold text-xl mb-2 text-shipra-green-500">
      💡{founderData.item11?.[language] || founderData.item11?.hi}
    </h3>
    <p className="mb-4">
      {founderData.item12?.[language] || founderData.item12?.hi}
    </p>
    <p className="italic border-l-4 border-shipra-green-500 pl-4 py-2 my-4 text-shipra-text">
      {founderData.item13?.[language] || founderData.item13?.hi}
    </p>
    <h3 className="font-semibold text-xl mb-2 text-shipra-green-500">
      🌾 {founderData.item14?.[language] || founderData.item14?.hi}
    </h3>
    <p>
      {founderData.item15?.[language] || founderData.item15?.hi}
    </p>
  </>
);


  return (
    <div className="bg-shipra-off-white text-shipra-text font-open-sans">
      {/* --- HEADER SECTION --- */}
      <header
        className="
                    bg-gradient-to-r from-shipra-green-500 to-shipra-green-700
                    text-white
                    text-center
                    pt-28 pb-20 md:py-32 /* Adjusted pt-28 for mobile view to push content down */
                    mb-10
                    relative overflow-hidden
                    animate-slide-in-top
                    "
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                        {t("aboutUs")}

          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto">
            {t("aboutTitleInfo")}
          </p>
        </div>
      </header>
      {/* --- END HEADER SECTION --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* NEW: 15+ Years of Experience Card (Moved to top) */}
        <section className="bg-agri-sky-blue p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-center items-center text-center">
          <div className="font-montserrat font-bold text-shipra-green-700">
            <div className="text-6xl sm:text-7xl mb-2">
              <span className="animate-fade-in">{yearsCount}</span>+
            </div>
            <div className="text-xl sm:text-2xl"> {t("expYear")}</div>
          </div>
        </section>

        {/* Card 1: The Founder */}
        <section className="bg-agri-card-bg p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out lg:col-span-2 flex flex-col justify-between">
          <div>
            <h2 className="font-montserrat text-2xl font-semibold mb-4 text-shipra-green-700">
              👤 {founderData.item1?.[language] || founderData.item1?.hi}
            </h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-4">
              <div className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden border-4 border-shipra-green-500 flex items-center justify-center">
                {/* You can replace this placeholder with a real image */}
                <img
                  src={urlFor(founderData.mainImage).url()}
                  alt="Dr. Satya Narain Vashishtha - Founder, Shipra Seeds"
                  className="object-cover object-top w-full h-full"
                />
              </div>
              <div className="flex-grow text-center md:text-left">
                <p className="font-semibold text-lg mb-2">
                  {founderData.item2?.[language] || founderData.item2?.hi}
                </p>
                {/* Crucial info */}
                <p className="mb-3">
                  {founderData.item3?.[language] || founderData.item3?.hi}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() =>
              openModal(founderData.item1?.[language] || founderData.item1?.hi, founderFullContent)
            }
            className="mt-4 bg-shipra-green-500 text-white px-6 py-2 rounded-md hover:bg-shipra-green-700 transition-colors duration-300 self-start"
          >
            {t("KnowMore")}
          </button>
        </section>

        {/* Card 2: The Story */}
        <section className="bg-agri-green-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out lg:col-span-1 flex flex-col justify-between">
          <div>
            <h2 className="font-montserrat text-2xl font-semibold mb-4 text-shipra-green-700">
              🔬 {founderData.item6?.[language] || founderData.item6?.hi}
            </h2>
            {/* Crucial info */}
            <p className="mb-4">
              {founderData.item7?.[language] || founderData.item7?.hi}
            </p>
            <p className="italic border-l-4 border-shipra-green-500 pl-4 py-2 my-4 text-shipra-text">
              {founderData.item8?.[language] || founderData.item8?.hi}
            </p>
          </div>
          <button
            onClick={() => openModal(founderData.item6?.[language] || founderData.item6?.hi, storyFullContent)}
            className="mt-4 bg-shipra-green-500 text-white px-6 py-2 rounded-md hover:bg-shipra-green-700 transition-colors duration-300 self-start"
          >
            {t("KnowMore")}
          </button>
        </section>

        {/* Card 3: Building Trust & Reaching States (Combined content) - MADE ATTRACTIVE */}
        <section className="bg-shipra-green-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out col-span-1 md:col-span-2 lg:col-span-3 border border-shipra-green-200">
          {" "}
          {/* Changed background and added a border */}
          <h3 className="font-montserrat text-2xl font-semibold mb-4 text-shipra-green-700">
            📈 {expData.item1?.[language] || expData.item1?.hi}
          </h3>{" "}
          {/* Updated heading for consistency */}
          <p className="mb-4 text-shipra-text">
           {expData.item2?.[language] || expData.item2?.hi}
          </p>
          {/* Sub-card b: Reaching Across States - Now integrated here with enhanced styling */}
          <div
            ref={statesRef}
            className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-center items-center font-montserrat font-bold text-shipra-green-700 border-2 border-shipra-green-500 mb-6 transform hover:scale-105 transition-transform duration-300"
          >
            {" "}
            {/* Changed background, stronger border, added shadow and hover effect */}
            <div className="text-5xl sm:text-6xl mb-2 text-agri-dark-green">
              🌍
            </div>{" "}
            {/* Changed emoji, could be a custom icon */}
            <div className="text-xl sm:text-2xl mb-4 text-shipra-green-700">
              {expData.item3?.[language] || expData.item3?.hi}
            </div>{" "}
            {/* Ensured strong text color */}
            <div className="text-lg text-shipra-text font-normal">
              <p className="mb-2">
                {expData.item4?.[language] || expData.item4?.hi}
              </p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                {stateNames.map((state, index) => (
                  <span
                    key={state}
                    className={`
                                                inline-block
                                                text-shipra-green-700 /* Stronger text color */
                                                font-bold /* Made bolder */
                                                py-1 px-3 rounded-full bg-shipra-green-100 /* Added light background and rounded corners */
                                                shadow-sm
                                                ${statesVisible ? `animate-slide-in-right` : "opacity-0"}
                                            `}
                    style={{
                      animationDelay: statesVisible ? `${index * 0.1}s` : "0s",
                    }}
                  >
                    {state}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="mb-4 text-shipra-text">
            {expData.item5?.[language] || expData.item5?.hi}
          </p>
          <p className="mb-4 text-shipra-text">
            {expData.item6?.[language] || expData.item6?.hi}
          </p>
        </section>

        {/* Card 4: Our Mission */}
        <section className="bg-agri-card-bg p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <h2 className="font-montserrat text-2xl font-semibold mb-4 text-shipra-green-700">
            🎯 {goalData.item1?.[language] || goalData.item1?.hi}
          </h2>
          <p className="font-semibold text-xl mb-4 text-shipra-green-500">
            {goalData.item2?.[language] || goalData.item2?.hi}
          </p>
          <p className="mb-4">
                        {goalData.item3?.[language] || goalData.item3?.hi}

          </p>
          <p className="mb-2">            {goalData.item4?.[language] || goalData.item4?.hi}
</p>
          <ul className="list-disc list-inside space-y-2 text-shipra-text mb-4">
            <li>🌱             {goalData.item5?.[language] || goalData.item5?.hi}
</li>
            <li>🌾             {goalData.item6?.[language] || goalData.item6?.hi}
</li>
            <li>🚜            {goalData.item7?.[language] || goalData.item7?.hi}
</li>
          </ul>
          {/* <p>
                        {goalData.item1?.[language] || goalData.item1?.hi}

          </p> */}
        </section>

        {/* Card 5: Core Values */}
        <section className="bg-agri-green-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out md:col-span-2 flex flex-col justify-between">
          <div>
            <h2 className="font-montserrat text-2xl font-semibold mb-4 text-shipra-green-700">
              🛡️ {coreValuesData.item1?.[language] || coreValuesData.item1?.hi}
            </h2>
            <p className="font-semibold text-xl mb-4 text-shipra-green-500">
              {coreValuesData.item2?.[language] || coreValuesData.item2?.hi}
            </p>
            {/* Crucial info */}
            <p className="mb-4">
              {coreValuesData.item3?.[language] || coreValuesData.item3?.hi}
            </p>
            <p className="mb-4">
              {coreValuesData.item4?.[language] || coreValuesData.item4?.hi}
            </p>
            <p>
              {coreValuesData.item5?.[language] || coreValuesData.item5?.hi}
            </p>
          </div>
          <button
            onClick={() =>
              openModal(
                coreValuesData.item1?.[language] || coreValuesData.item1?.hi,
                coreValuesFullContent
              )
            }
            className="mt-4 bg-shipra-green-500 text-white px-6 py-2 rounded-md hover:bg-shipra-green-700 transition-colors duration-300 self-start"
          >
            {t("KnowMore")}
          </button>
        </section>

        {/* Card 6: Why Choose Us - MADE ATTRACTIVE */}
        <section className="bg-shipra-green-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out md:col-span-3 border border-shipra-green-200">
          {" "}
          {/* Changed background and added a border */}
          <div>
            <h2 className="font-montserrat text-2xl font-semibold mb-4 text-shipra-green-700">
              {cardData.item1?.[language] || cardData.item1?.hi}
            </h2>
            <p className="font-semibold text-xl mb-4 text-shipra-green-500">
              {cardData.item2?.[language] || cardData.item2?.hi}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-center">
              <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-center font-semibold text-shipra-green-700 border border-shipra-green-500 shadow-md transform hover:scale-105 transition-transform duration-300">
                {" "}
                {/* Changed background, stronger border, added shadow and hover effect */}
                <span className="text-3xl mb-2 text-agri-dark-green">💰</span>{" "}
                {cardData.item3?.[language] || cardData.item3?.hi}
              </div>
              <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-center font-semibold text-shipra-green-700 border border-shipra-green-500 shadow-md transform hover:scale-105 transition-transform duration-300">
                {" "}
                {/* Changed background, stronger border, added shadow and hover effect */}
                <span className="text-3xl mb-2 text-agri-dark-green">🧪</span>{" "}
                {cardData.item4?.[language] || cardData.item4?.hi}
              </div>
              <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-center font-semibold text-shipra-green-700 border border-shipra-green-500 shadow-md transform hover:scale-105 transition-transform duration-300">
                {" "}
                {/* Changed background, stronger border, added shadow and hover effect */}
                <span className="text-3xl mb-2 text-agri-dark-green">🌾</span>{" "}
                {cardData.item5?.[language] || cardData.item5?.hi}
              </div>
              <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-center font-semibold text-shipra-green-700 border border-shipra-green-500 shadow-md transform hover:scale-105 transition-transform duration-300">
                {" "}
                {/* Changed background, stronger border, added shadow and hover effect */}
                <span className="text-3xl mb-2 text-agri-dark-green">🤝</span>{" "}
                {cardData.item6?.[language] || cardData.item6?.hi}
              </div>
            </div>
            {/* Crucial info */}
            {/* <p className="mb-4 text-shipra-text">किसानों के लिए भरोसेमंद बीज, उचित दाम पर। कोई झूठे दावे नहीं, जो है वही दिखता है।</p>
                        <p className="mb-4 text-shipra-text">बीज की पहचान वही रहती है — जैसा वैज्ञानिकों ने नाम दिया। कोई पुराना बीज नए नाम से नहीं बेचा जाता।</p>
                        <p className="text-shipra-text">उच्च अंकुरण क्षमता वाले बीज, सही तरीके से संग्रहित, साफ़ और ताज़ा बीज। हर कदम पर सावधानी — ताकि खेत में अच्छे परिणाम मिलें।</p> */}
          </div>
          <button
            onClick={() =>
              openModal(
                cardData.item1?.[language] || cardData.item1?.hi,
                whyChooseUsFullContent
              )
            }
            className="mt-4 bg-shipra-green-500 text-white px-6 py-2 rounded-md hover:bg-shipra-green-700 transition-colors duration-300 self-start"
          >
            {t("KnowMore")}
          </button>
        </section>
      </main>
      /{/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default AboutUsPage;
