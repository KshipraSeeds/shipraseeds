import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Sparkle,
  ShieldCheck,
  FlaskConical,
  Wallet,
  ArrowRight,
} from "lucide-react";
import Link from "next/link"; // Keeping Link, though not directly used in the provided snippet
import { useLanguage } from "@/app/context/LanguageContext";
import { client } from "@/sanity";

export const WhyProcessedSeedCard = () => {
  const [openId, setOpenId] = useState < string | null > (null);
  const [modalOpen, setModalOpen] = useState < boolean > (false);
  const [modalContent, setModalContent] = useState < any > (null);

  const { lang: language, t } = useLanguage();
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(`*[_type == "whyProcessedSeed"][0]{
          title,
          buttonTextKey,
          seedPoints[]{
            _key,
            id,
            icon,
            href,
            title_en,
            title_hi,
            title_pa,
            summary_en,
            summary_hi,
            summary_pa,
            readMore_en,
            readMore_hi,
            readMore_pa,
            example_en,
            example_hi,
            example_pa,
            analogy_en,
            analogy_pa,
            analogy_hi
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
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading Card Content...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!cardData) {
    return <div className="text-center py-10">No card content found.</div>;
  }

  // Localized title for the main card
  const localizedTitle = cardData.title?.[language] || cardData.title?.hi || "";

  // Mapping string identifiers from Sanity to Lucide React components
  const iconMap = {
    Sparkle: <Sparkle className="w-6 h-6 text-purple-600" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-green-600" />,
    FlaskConical: <FlaskConical className="w-6 h-6 text-blue-600" />,
    Wallet: <Wallet className="w-6 h-6 text-yellow-600" />,
  };

  const getIconComponent = (iconName) => {
    return iconMap[iconName] || null; // Return the icon component or null if not found
  };

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const openModal = (point: any) => {
    setModalContent(point);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
    document.body.style.overflow = 'auto'; // Restore background scroll
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 border border-purple-200 rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl max-w-5xl mx-auto my-12 sm:my-16">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-purple-800 mb-6 sm:mb-8 text-center font-heading3">
        🌾{localizedTitle}
      </h2>

      <div className="space-y-4 sm:space-y-6">
        {cardData?.seedPoints?.map((point) => ( // Corrected to seedPoints
          <div
            key={point._key} // Using _key for unique keys
            className="bg-white hover:bg-purple-50 border border-purple-200 rounded-2xl px-4 py-4 sm:px-6 sm:py-5 transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <button
              onClick={() => toggle(point.id)}
              className="w-full flex justify-between items-center text-left focus:outline-none"
              aria-expanded={openId === point.id}
              aria-controls={`content-${point.id}`}
            >
              <div className="flex items-center gap-3">
                {getIconComponent(point.icon)} {/* Render icon component */}
                <h3 className="text-md sm:text-lg lg:text-xl font-semibold text-purple-900 group-hover:text-purple-700 font-heading3">
                  {point[`title_${language}`] || point.title_en} {/* Localized title */}
                </h3>
              </div>
              {openId === point.id ? (
                <ChevronUp className="w-5 h-5 text-purple-600 transform rotate-180" />
              ) : (
                <ChevronDown className="w-5 h-5 text-purple-600" />
              )}
            </button>

            <div
              id={`content-${point.id}`}
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openId === point.id
                  ? "max-h-96 mt-3 opacity-100"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <p className="text-gray-700 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed font-sans3">
                {point[`summary_${language}`] || point.summary_en} {/* Localized summary */}
              </p>
              <button
                onClick={() => openModal(point)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors duration-300 group/button"
              >
                {t("learnInDetail")}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && modalContent && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-xl shadow-2xl w-full max-w-xl md:max-w-2xl lg:max-w-3xl relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: 'calc(100vh - 4rem)' }}
          >
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
              <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-purple-800 font-heading3">
                {/* Corrected: Get the component first, then clone if it exists */}
                {getIconComponent(modalContent.icon) && React.cloneElement(getIconComponent(modalContent.icon), { className: "w-7 h-7 text-purple-700 inline mr-2" })}
                {modalContent[`title_${language}`] || modalContent.title_en} {/* Localized modal title */}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-red-600 transition-colors duration-200 p-2 rounded-full hover:bg-red-100"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-grow">
              <div className="prose prose-sm sm:prose-base max-w-none text-gray-800 leading-relaxed">
                {/* Localized readMore with line breaks */}
                <div dangerouslySetInnerHTML={{ __html: (modalContent[`readMore_${language}`] || modalContent.readMore_en || '').replace(/\n/g, '<br />') }} className="mb-4 sm:mb-6" />

                {(modalContent[`example_${language}`] || modalContent.example_en) && (
                  <>
                    <h4 className="text-md sm:text-lg font-semibold text-purple-700 mt-4 mb-1 sm:mb-2 font-heading3">{t("Example")}</h4>
                    <p className="mb-4 sm:mb-6 italic bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400 font-sans3">{modalContent[`example_${language}`] || modalContent.example_en}</p>
                  </>
                )}
                {(modalContent[`analogy_${language}`] || modalContent.analogy_en) && (
                  <>
                    <h4 className="text-md sm:text-lg font-semibold text-purple-700 mt-4 mb-1 sm:mb-2 font-heading3">{t("Analogy")}:</h4>
                    <p className="italic bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400 font-sans3">{modalContent[`analogy_${language}`] || modalContent.analogy_en}</p>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};