// app/products/page.tsx
"use client";

import { useRouter, usePathname } from "next/navigation"; // Removed useSearchParams
import React, { useState, useEffect } from "react"; // Removed useMemo as initial logic changes
// import Link from "next/link"; // Link is not used, can be removed if not needed elsewhere
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  TrendingUp,
  Star,
  ChevronDown,
  ChevronUp,
  Leaf,
  Zap,
  Sun,
  PackageSearch,
  Sprout,
} from "lucide-react";

interface Variety {
  id: string;
  name: string;
  image?: string;
  maturity: string;
  yield: string;
  potentialYield?: string;
  specialTrait: string;
  shortSummary: string;
  detailedDescription: string;
}

interface CropCategory {
  id: string;
  name: string;
  icon?: React.ElementType;
  varieties: Variety[];
}

const allCropData: CropCategory[] = [
  {
    id: "paddy",
    name: "बासमती धान",
    icon: Sprout,
    varieties: [
      {
        id: "pb-1692",
        name: "PB-1692",
        maturity: "110-115 दिन (बीज से बीज)",
        yield: "औसत 20-24 क्विंटल/एकड़",
        specialTrait: "जल्दी पकने वाली, न गिरने वाली, न झड़ने वाली",
        shortSummary:
          "पूसा बासमती 1509 और PB-1601 के गुणों को मिलाकर विकसित, यह किस्म जल्दी पकने और उच्च उपज क्षमता प्रदान करती है।",
        detailedDescription: `<h4 class="text-md font-semibold text-agri-green-deep mb-2">PB-1692 के बारे में:</h4> <p class="mb-2 text-sm">इसके जनक पूसा बासमती 1509 और PB-1601 हैं...</p> <h4 class="text-md font-semibold text-agri-green-deep mb-2">PB-1692 क्यों विकसित किया गया?</h4> <p>...</p>`,
      },
      {
        id: "pb-1121",
        name: "PB-1121",
        maturity: "145 दिन (बुवाई के बाद)",
        yield: "औसत 18.21 क्विंटल/एकड़",
        specialTrait: "उच्च उपज वाली किस्म",
        shortSummary:
          "पारंपरिक बासमती से प्राप्त, यह असाधारण दाना बढ़ाव और प्रीमियम सुगंध प्रदान करती है।",
        detailedDescription: `...`,
      },
    ],
  },
  {
    id: "millet",
    name: "बाजरा",
    icon: Zap,
    varieties: [
      {
        id: "m-hybrid-1",
        name: "हाइब्रिड बाजरा 1",
        maturity: "80-85 दिन",
        yield: "12-15 क्विंटल/एकड़",
        specialTrait: "सूखा प्रतिरोधी",
        shortSummary: "उच्च उपज और सूखा सहिष्णुता के लिए उत्कृष्ट विकल्प।",
        detailedDescription: "...",
      },
    ],
  },
  {
    id: "sorghum",
    name: "ज्वार",
    icon: Sun,
    varieties: [
      {
        id:"s-sweet-1",
        name: "मीठी ज्वार 1",
        maturity: "100-110 दिन",
        yield: "हरा चारा: 200-250 क्विंटल/एकड़",
        specialTrait: "मीठे डंठल, चारा के लिए उत्तम",
        shortSummary: "पशुओं के चारे के लिए उत्तम, मीठे और रसदार डंठल।",
        detailedDescription: "...",
      },
    ],
  },
];

interface VarietyCardProps {
  variety: Variety;
  isOpen: boolean;
  onToggle: () => void;
}

const VarietyCard: React.FC<VarietyCardProps> = ({
  variety,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-200/80 flex flex-col">
      {variety.image && (
        <img
          src={variety.image}
          alt={variety.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-agri-green-deep mb-3">
          {variety.name}
        </h3>
        <div className="space-y-2 text-sm mb-4 text-gray-700">
          <div className="flex items-center">
            <Clock
              size={16}
              className="mr-2 text-agri-orange-harvest flex-shrink-0"
            />
            <span>
              <strong>पकने की अवधि:</strong> {variety.maturity}
            </span>
          </div>
          <div className="flex items-center">
            <TrendingUp
              size={16}
              className="mr-2 text-agri-orange-harvest flex-shrink-0"
            />
            <span>
              <strong>उपज:</strong> {variety.yield}
            </span>
          </div>
          <div className="flex items-center">
            <Star
              size={16}
              className="mr-2 text-agri-orange-harvest flex-shrink-0"
            />
            <span>
              <strong>विशेष गुण:</strong> {variety.specialTrait}
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
          {variety.shortSummary}
        </p>
        <button
          onClick={onToggle}
          className="w-full mt-auto inline-flex items-center justify-center px-4 py-2.5 bg-agri-green-medium text-white text-sm font-semibold rounded-lg hover:bg-agri-green-deep transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-agri-green-light focus:ring-offset-2"
        >
          {isOpen ? "कम दिखाएं" : "और जानें"}
          {isOpen ? (
            <ChevronUp size={18} className="ml-2" />
          ) : (
            <ChevronDown size={18} className="ml-2" />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="p-5 border-t border-gray-200 bg-gray-50">
          <div
            className="prose prose-sm max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: variety.detailedDescription }}
          />
        </div>
      )}
    </div>
  );
};

const ProductsPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Set initial selectedCategoryId to null or a default.
  // The actual category from URL will be set in useEffect.
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    allCropData.length > 0 ? allCropData[0].id : null // Default to first category to avoid empty initial view
  );
  const [openVarietyId, setOpenVarietyId] = useState<string | null>(null);

  // Effect to read category from URL on initial client-side load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentParams = new URLSearchParams(window.location.search);
      const categoryFromUrl = currentParams.get("category");

      if (categoryFromUrl && allCropData.find((c) => c.id === categoryFromUrl)) {
        // If a valid category is in the URL, set it as selected
        // Only update if it's different from the current state to avoid unnecessary re-renders
        if (selectedCategoryId !== categoryFromUrl) {
          setSelectedCategoryId(categoryFromUrl);
          setOpenVarietyId(null); // Reset open variety when category changes from URL
        }
      } else if (!categoryFromUrl && allCropData.length > 0) {
        // If no category in URL or invalid, and it's not already set to the default
        const defaultCategory = allCropData[0].id;
        if (selectedCategoryId !== defaultCategory) {
            setSelectedCategoryId(defaultCategory);
            setOpenVarietyId(null);
        }
      }
      // If no categories exist, selectedCategoryId will remain null (or its initial value)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // Rerun if pathname changes (though category is in search, this can help catch some navigation cases)
                  // Or you might want an empty dependency array [] if this should truly only run once on mount
                  // and subsequent updates are only via handleCategorySelect.
                  // For robustness with back/forward, you might need to listen to 'popstate' events
                  // or use router events if Next.js router emits them in a way that provides searchParams.
                  // For now, [pathname] is a compromise.

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setOpenVarietyId(null);
    // Still update the URL when the user clicks a category
    router.push(`${pathname}?category=${categoryId}`, { scroll: false });
  };

  const toggleVarietyDetails = (varietyId: string) => {
    setOpenVarietyId(openVarietyId === varietyId ? null : varietyId);
  };

  const selectedCategoryData = allCropData.find(
    (cat) => cat.id === selectedCategoryId
  );

  const subtitles = ["बासमती धान", "बाजरा", "ज्वार"];
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSubtitleIndex(
        (prevIndex) => (prevIndex + 1) % subtitles.length
      );
    }, 4000);
    return () => clearInterval(intervalId);
  }, [subtitles.length]);

  return (
    <>
      {/* New Hero Card Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <div
          className="absolute m-5 inset-0 bg-gradient-to-br from-agri-green-medium via-agri-green-deep to-agri-brown-rich opacity-90 rounded-[42px]"
        />
        <Sprout className="absolute top-10 left-10 w-16 h-16 text-white opacity-10 transform -rotate-12" />
        <Leaf className="absolute bottom-10 right-10 w-20 h-20 text-white opacity-10 transform rotate-12" />

        <div className="relative mt-40 z-10 flex flex-col justify-center items-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <PackageSearch className="mx-auto text-white h-16 w-16 md:h-20 md:w-20 mb-4 opacity-80" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold !leading-tight mb-5 md:mb-6 drop-shadow-lg">
              हमारे <span className="text-agri-yellow-sun">उत्पाद</span>
            </h1>
            <div className="h-[35px] md:h-[45px] flex items-center justify-center relative mb-6 md:mb-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={subtitles[currentSubtitleIndex]}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.6, ease: "circOut" }}
                  className="absolute text-3xl md:text-4xl font-semibold text-white opacity-95 tracking-wide"
                >
                  {subtitles[currentSubtitleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="mt-10 md:mt-12 lg:mt-16"
          >
            <button
              onClick={() => {
                const productSection = document.getElementById(
                  "product-listing-section"
                );
                if (productSection) {
                  productSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              aria-label="हमारे उत्पाद देखें"
              className="group flex flex-col items-center text-white opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-agri-green-deep rounded-full p-2"
            >
              <span className="text-xs sm:text-sm font-medium mb-1 tracking-wider group-hover:text-agri-yellow-sun transition-colors">
                नीचे स्क्रॉल करें
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 1.7,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown className="w-8 h-8 sm:w-10 sm:w-10" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main Product Listing Section (Sidebar + Varieties) */}
      <div id="product-listing-section" className="container mx-auto px-4 py-10  relative z-20">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 rounded-xl shadow-xl border border-gray-200/80 self-start sticky top-0 md:top-28">
            <h2 className="text-xl font-semibold text-agri-green-deep mb-5 border-b pb-3">
              फसल श्रेणियाँ
            </h2>
            <ul className="space-y-2">
              {allCropData.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`w-full flex items-center text-left px-4 py-3 rounded-lg transition-all duration-200 ease-in-out group
                                      ${
                                        selectedCategoryId === cat.id
                                          ? "bg-agri-green-medium text-white shadow-lg transform scale-105"
                                          : "text-gray-700 hover:bg-gray-100 hover:text-agri-green-deep"
                                      }`}
                  >
                    {cat.icon && (
                      <cat.icon
                        size={22}
                        className={`mr-3 transition-colors duration-200 ${
                          selectedCategoryId === cat.id
                            ? "text-white"
                            : "text-agri-green-medium group-hover:text-agri-green-deep"
                        }`}
                      />
                    )}
                    <span className="font-medium text-sm">{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <main className="md:w-2/3 lg:w-3/4">
            {selectedCategoryData ? (
              <>
                <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200/80 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-agri-green-deep">
                    {selectedCategoryData.name} की किस्में
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8">
                  {selectedCategoryData.varieties.map((variety) => (
                    <VarietyCard
                      key={variety.id}
                      variety={variety}
                      isOpen={openVarietyId === variety.id}
                      onToggle={() => toggleVarietyDetails(variety.id)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-10 bg-white p-6 rounded-xl shadow-xl border border-gray-200/80">
                <p className="text-xl text-gray-600">
                  लोड हो रहा है या श्रेणी उपलब्ध नहीं है... कृपया एक फसल श्रेणी
                  चुनें।
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;