// app/products/page.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
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

type CropVariety = {
  id: string;
  name: string;
  image: string;
  maturity: string;
  yield: string;
  specialTrait: string;
  aboutVariety: string;
  whyItCreated: string;
};

type CropCategory = {
  id: string;
  name: string;
  icon: any;
  varieties: CropVariety[];
};

const allCropData: CropCategory[] = [
  {
    id: "paddy",
    name: "बासमती धान",
    icon: Sprout,
    varieties: [
      {
        id: "pb-1692",
        name: "PB-1692",
        image: "/images/crops/paddy-pb-1692.jpg",
        maturity: "110-115 दिन",
        yield: "20-24 क्विंटल/एकड़ (देखभाल में 26-28)",
        specialTrait: "जल्दी पकने वाली, न गिरने वाली, न झड़ने वाली",
        aboutVariety: `
इस किस्म को दो अच्छी किस्मों — पूसा बासमती 1509 और PB-1601 — को मिलाकर बनाया गया है।
•	पूसा1509 से इसे जल्दी पकने की ताकत, ज्यादा उपज और छोटा पौधा मिला जिससे फसल संभालना आसान होता है।
•	PB-1601 से इसे मजबूत तना मिला जो फसल को गिरने नहीं देता और दाने पकने पर भी टूटते नहीं हैं।`,
        whyItCreated: `पुरानी किस्में देर से पकती थीं और गिरने का खतरा रहता था। PB-1692 को इस समस्या को दूर करने के लिए लाया गया है।
किसानों को इससे ये फायदा होता है:
•	फसल जल्दी काट सकते हैं
•	कम गिरावट और नुकसान होता है
•	कम समय में अच्छी उपज मिलती है,`,
      },
      {
        id: "pb-1121",
        name: "PB-1121",
        image: "/images/crops/paddy-pb-1121.jpg",
        maturity: "145 दिन",
        yield: "18.21 क्विंटल/एकड़ (देखभाल में 22.26)",
        specialTrait:
          "बहुत अच्छी उपज, लंबा दाना और बासमती खुशबू, पकने में भरोसेमंद",
        aboutVariety: `
यह किस्म पूसा614-1-2 और पूसा614-2-4-3 से मिलाकर बनाई गई है, जो खुद पारंपरिक बासमती से निकली हैं।
• इसमें लंबा दाना, खुशबू और बढ़िया पकने की क्षमता है
• यह दिन की लंबाई पर निर्भर नहीं है, यानी किसी भी मौसम में आसानी से फूल आती है`,
        whyItCreated: `पुरानी बासमती किस्मों (जैसे बासमती 370) की पैदावार कम थी और फसल देर से पकती थी।
PB-1121 से किसान को मिलता है:
• ज्यादा उपज
• अच्छी क्वालिटी का बासमती दाना
• थोड़ा कम समय में फसल तैयार`,
      },
      {
        id: "pb-1718",
        name: "PB-1718",
        image: "/images/crops/paddy-pb-1718.jpg",
        maturity: "136-138 दिन",
        yield: "18–20 क्विंटल/एकड़ (देखभाल में 22–24)",
        specialTrait: "BLB से बचाव, PB-1121 जैसी खुशबू और लंबा दाना",
        aboutVariety: `
यह किस्म PB-1121 से ही निकली एक खास लाइन से बनाई गई है जिसमें BLB से बचाव के लिए दो मजबूत जीन (xa13 और Xa21) डाले गए हैं।
• इसमें PB-1121 जैसा स्वाद, खुशबू और लंबा दाना है
• लेकिन अब बीमारी से भी सुरक्षित है`,
        whyItCreated: `PB-1121 में उपज तो बढ़िया थी लेकिन BLB बीमारी से जल्दी खराब हो जाती थी।
PB-1718 को इसलिए बनाया गया ताकि:
• किसान को बीमारी की मार से बचाया जा सके
• फसल की उपज हर साल बराबर और भरोसेमंद रहे`,
      },
      {
        id: "pb-1847",
        name: "PB-1847",
        image: "/images/crops/paddy-pb-1847.jpg",
        maturity: "120 दिन",
        yield: "23 क्विंटल/एकड़",
        specialTrait: "BLB और ब्लास्ट से बचाव, नहीं गिरती, जल्दी तैयार",
        aboutVariety: `
यह किस्म पूसा बासमती 1509 का ही एक मजबूत रूप है।
• इसमें कुल 4 बीमारियों से बचाने वाले जीन डाले गए हैं – 2 BLB के लिए और 2 ब्लास्ट के लिए
• दाना, खुशबू और पकने की खासियत PB-1509 जैसी ही है`,
        whyItCreated: `PB-1509 अच्छी थी लेकिन बीमारी लगने पर दिक्कत आती थी और किसान को दवा पर खर्च करना पड़ता था।
PB-1847 से किसानों को ये फायदा होता है:
• दवा कम लगती है
• बीमारी का डर नहीं
• फसल जल्दी तैयार और मजबूत होती है`,
      },
      {
        id: "pb-1885",
        name: "PB-1885",
        image: "/images/crops/paddy-pb-1885.jpg",
        maturity: "140 दिन",
        yield: "18.94 क्विंटल/एकड़ (देखभाल में 20–22)",
        specialTrait: "BLB और ब्लास्ट से सुरक्षा, नहीं गिरती, ज्यादा उपज",
        aboutVariety: `
यह किस्म पुरानी पसंदीदा किस्म PB-1121 को और बेहतर बनाकर बनाई गई है।
• इसमें BLB के लिए xa13 और Xa21, और ब्लास्ट के लिए Pi54 और Pi2 नाम के जीन डाले गए हैं।
• दाने की लंबाई, खुशबू और बासमती स्वाद वही पुराना है — लेकिन पौधा अब और मजबूत और रोग से सुरक्षित है।`,
        whyItCreated: `PB-1121 बहुत पसंद की जाती थी, लेकिन वह बीमारियों से जल्दी खराब हो जाती थी।
PB-1885 को इसलिए बनाया गया ताकि:
• किसान को बीमारी से नुकसान ना हो
• उपज ज्यादा और स्थिर मिले
• फसल का प्रबंधन आसान हो`,
      },
      {
        id: "pb-1509",
        name: "PB-1509",
        image: "/images/crops/paddy-pb-1509.jpg",
        maturity: "115 दिन",
        yield: "20.22 क्विंटल/एकड़ (देखभाल में 26–28)",
        specialTrait: "नहीं गिरती, दाने नहीं झड़ते",
        aboutVariety: `
इस किस्म को PB-1121 और पूसा1301 को मिलाकर तैयार किया गया है।
• PB-1121 से इसे लंबा, पतला और खुशबूदार दाना मिला।
• पूसा1301 से इसे ज्यादा उपज, कम अवधि और मजबूत पौधा मिला।`,
        whyItCreated: `PB-1121 बढ़िया थी, लेकिन समय ज्यादा लेती थी और ज्यादा पानी या खाद मिलने पर गिर जाती थी।
PB-1509 इन दिक्कतों को दूर करती है और किसानों को जल्दी कटाई और बेहतर उपज देती है।`,
      },
      {
        id: "pb-1401",
        name: "PB-1401",
        image: "/images/crops/paddy-pb-1401.jpg",
        maturity: "140–145 दिन",
        yield: "20.22 क्विंटल/एकड़ (अच्छे खेत में 36–38)",
        specialTrait: "जल्दी पकने वाली, ज्यादा उपज देने वाली",
        aboutVariety: `
यह PB-1121 का नया, सुधारित रूप है।
• इसमें PB-1121 की ही खुशबू, लंबा दाना और स्वाद है
• लेकिन अब इसमें और ज्यादा कल्ले, मजबूत पौधा और ज्यादा पैदावार है`,
        whyItCreated: `PB-1121 की क्वालिटी तो शानदार थी, लेकिन किसान चाहते थे थोड़ी जल्दी तैयार होने वाली और ज्यादा मजबूत किस्म।
PB-1401 उसी जरूरत को पूरा करती है।`,
      },
      {
        id: "csr-30",
        name: "CSR-30 (यामिनी)",
        image: "/images/crops/paddy-csr-30.jpg",
        maturity: "155 दिन",
        yield:
          "खारी ज़मीन: 8.09 | सामान्य ज़मीन: 12.13 | कुछ मामलों में: 18 क्विंटल/एकड़",
        specialTrait:
          "नमकीन/सोडा ज़मीन में भी अच्छी फसल, निर्यात लायक लंबा दाना",
        aboutVariety: `
यह किस्म पाकिस्तान की बासमती और महाराष्ट्र की एक पुराने नमक-सहने वाली किस्म (भूरा राटा) को मिलाकर बनाई गई है।
• इसमें बासमती जैसी खुशबू और स्वाद भी है
• और खराब ज़मीन में झेलने की ताकत भी`,
        whyItCreated: `जिन इलाकों में ज़मीन नमकीन या सोडिक है (जैसे हरियाणा और पश्चिमी यूपी), वहां किसानों को दिक्कत होती थी।
CSR-30 उन्हीं किसानों के लिए खास है — कम ज़मीन वाली हालत में भी बढ़िया दाना और ठीक-ठाक पैदावार देती है।`,
      },
    ],
  },
  {
    id: "sorghum",
    name: "ज्वार",
    icon: Sun,
    varieties: [
      {
        id: "ss-17",
        name: "SS-17",
        image: "/images/crops/sorghum-ss-17.jpg",
        maturity: "90–95 दिन",
        yield: "150 क्विंटल/एकड़ (हराभरा चारा)",
        specialTrait: "बहुत तेजी से बढ़ने वाली, बहुवर्षीय चारा किस्म",
        aboutVariety: `
यह एक हाइब्रिड ज्वार की किस्म है जो मुख्य रूप से हरे चारे के लिए उगाई जाती है।
• पौधा सीधा, मजबूत और बहुत घना होता है
• इसमें पत्तियां चौड़ी और रसदार होती हैं — जानवरों को बहुत पसंद आती हैं
• यह किस्म साल में कई बार काटी जा सकती है (multi-cut) और हर बार अच्छी उपज देती है`,
        whyItCreated: `पशुपालकों को ऐसी किस्म की ज़रूरत थी जो:
• जल्दी तैयार हो
• सालभर हरा चारा दे
• पौष्टिक और स्वादिष्ट हो

SS-17 इन सभी ज़रूरतों को पूरा करती है — कम ज़मीन में भी ज्यादा उत्पादन संभव है।`,
      },
      {
        id: "ever-green",
        name: "एवर ग्रीन",
        image: "/images/crops/sorghum-evergreen.jpg",
        maturity: "85–90 दिन",
        yield: "140–160 क्विंटल/एकड़ (हरे चारे का उत्पादन)",
        specialTrait: "बहु-काट वाली किस्म, जल्दी बढ़ती, गर्मी सहने वाली",
        aboutVariety: `
यह किस्म खासतौर पर लगातार हरा चारा देने के लिए तैयार की गई है।
• इसमें हर कटाई के बाद तेज़ी से नई कोंपलें आती हैं
• चारा मुलायम, हरा और पोषक तत्वों से भरपूर होता है
• पौधा लंबा और पतला होता है — जिससे जानवरों को खाना आसान रहता है`,
        whyItCreated: `गर्मी और सूखा सह सकने वाली किस्म की ज़रूरत थी जो साल में 3–4 बार चारा दे सके।

एवर ग्रीन को इसलिए विकसित किया गया ताकि:
• किसान हर मौसम में चारा पा सकें
• जानवरों को लगातार ताज़ा और अच्छा चारा मिले`,
      },
    ],
  },
  {
    id: "millet",
    name: "बाजरा",
    icon: Zap,
    varieties: [
      // {
      //   id: "m-hybrid-1",
      //   name: "हाइब्रिड बाजरा MPMH 17",
      //   image: "/images/crops/millet-hybrid-1.jpg", // Example image path
      //   maturity: "75-80 दिन",
      //   yield: "12-14 क्विंटल/एकड़ (दाना), 250-300 क्विंटल/एकड़ (चारा)",
      //   specialTrait: "सूखा प्रतिरोधी, डाउनी मिल्ड्यू प्रतिरोधी",
      //   // shortSummary: "उच्च उपज, सूखा सहिष्णुता और रोग प्रतिरोधक क्षमता के लिए उत्कृष्ट विकल्प।",
      //   // detailedDescription: "<p class='text-sm'>यह किस्म कम वर्षा वाले क्षेत्रों के लिए उपयुक्त है और पशुओं के चारे के लिए भी अच्छी मानी जाती है।</p>",
      // },
    ],
  },
];

interface VarietyCardProps {
  variety: any;
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
        {/* <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
          {variety.shortSummary}
        </p> */}
        <button
          onClick={onToggle}
          className="w-full mt-auto inline-flex items-center justify-center px-4 py-2.5 bg-agri-green-medium text-white text-sm font-semibold rounded-lg hover:bg-agri-green-deep transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-agri-green-light focus:ring-offset-2"
        >
          {!isOpen ? "कम दिखाएं" : "और जानें"}
          {!isOpen ? (
            <ChevronUp size={18} className="ml-2" />
          ) : (
            <ChevronDown size={18} className="ml-2" />
          )}
        </button>
      </div>
      {!isOpen && (
        <div className="p-5 border-t border-gray-200 bg-gray-50">
          {/* About the Variety Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {variety.name} के बारे में
            </h3>
            <div
              className="prose prose-sm max-w-none text-gray-700 mt-2"
              dangerouslySetInnerHTML={{ __html: variety.aboutVariety }}
            />
          </div>

          {/* Why it was Created Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              क्यों बनाई गई?
            </h3>
            <div
              className="prose prose-sm max-w-none text-gray-700 mt-2"
              dangerouslySetInnerHTML={{ __html: variety.whyItCreated }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ProductsPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    allCropData.length > 0 ? allCropData[0].id : null
  );
  // New state for the currently selected variety
  const [selectedVarietyId, setSelectedVarietyId] = useState<string | null>(
    null
  );
  const [openVarietyId, setOpenVarietyId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentParams = new URLSearchParams(window.location.search);
      const categoryFromUrl = currentParams.get("category");
      const varietyFromUrl = currentParams.get("variety");

      let newSelectedCategoryId = selectedCategoryId; // Persist current state unless overridden by URL
      let newSelectedVarietyId = null; // Always reset variety unless explicitly found for the category

      if (
        categoryFromUrl &&
        allCropData.find((c) => c.id === categoryFromUrl)
      ) {
        newSelectedCategoryId = categoryFromUrl;
      } else if (
        !categoryFromUrl &&
        allCropData.length > 0 &&
        !newSelectedCategoryId
      ) {
        // Fallback to default if no category in URL and none set (e.g. initial load from base path)
        newSelectedCategoryId = allCropData[0].id;
      }

      let categoryActuallyChanged = false;
      if (newSelectedCategoryId !== selectedCategoryId) {
        setSelectedCategoryId(newSelectedCategoryId);
        setOpenVarietyId(null); // Reset accordion if category changes
        categoryActuallyChanged = true;
      }

      if (newSelectedCategoryId) {
        const categoryData = allCropData.find(
          (c) => c.id === newSelectedCategoryId
        );
        if (
          categoryData &&
          varietyFromUrl &&
          categoryData.varieties.find((v) => v.id === varietyFromUrl)
        ) {
          newSelectedVarietyId = varietyFromUrl;
        }
      }

      // Only update variety if it's different or if the category changed (which would have nulled it)
      if (
        newSelectedVarietyId !== selectedVarietyId ||
        categoryActuallyChanged
      ) {
        setSelectedVarietyId(newSelectedVarietyId);
        setOpenVarietyId(newSelectedVarietyId); // Open card if a variety is selected (new or same)
      } else if (
        newSelectedVarietyId &&
        newSelectedVarietyId !== openVarietyId
      ) {
        // If variety in URL is already selected but card is closed, open it.
        setOpenVarietyId(newSelectedVarietyId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // Keep existing dependency; ideal would be useSearchParams if allowed.

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedVarietyId(null); // Reset selected variety
    setOpenVarietyId(null); // Close any open variety card details
    router.push(`${pathname}?category=${categoryId}`, { scroll: false });
  };

  // New handler for selecting a variety from the sub-navigation
  const handleVarietySelect = (varietyId: string) => {
    setSelectedVarietyId(varietyId);
    setOpenVarietyId(varietyId); // Open the details of the selected variety card
    if (selectedCategoryId) {
      router.push(
        `${pathname}?category=${selectedCategoryId}&variety=${varietyId}`,
        { scroll: false }
      );
    }
  };

  const toggleVarietyDetails = (varietyId: string) => {
    setOpenVarietyId(openVarietyId === varietyId ? null : varietyId);
  };

  const selectedCategoryData = allCropData.find(
    (cat) => cat.id === selectedCategoryId
  );

  // Dynamically generate subtitles from crop data for the hero animation
  const subtitles = React.useMemo(
    () => allCropData.map((cat) => cat.name),
    [allCropData]
  ); // Added allCropData dependency
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);

  useEffect(() => {
    if (subtitles.length === 0) return; // Guard against empty subtitles
    const intervalId = setInterval(() => {
      setCurrentSubtitleIndex(
        (prevIndex) => (prevIndex + 1) % subtitles.length
      );
    }, 4000);
    return () => clearInterval(intervalId);
  }, [subtitles]);

  return (
    <>
      {/* Hero Card Section (remains unchanged) */}
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute m-5 inset-0 bg-gradient-to-br from-agri-green-medium via-agri-green-deep to-agri-brown-rich opacity-90 rounded-[42px]" />
        <Sprout className="absolute top-10 left-10 w-16 h-16 text-white opacity-30 transform -rotate-12" />
        <Leaf className="absolute bottom-10 right-10 w-20 h-20 text-white opacity-30 transform rotate-12" />

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
              {subtitles.length > 0 && (
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
              )}
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
                <ChevronDown className="w-8 h-8 sm:w-10 sm:h-10" />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Main Product Listing Section (Sidebar + Varieties) */}
      <div
        id="product-listing-section"
        className="container mx-auto px-4 py-10 relative z-20"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar (remains mostly unchanged) */}
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

          {/* Main content area for varieties */}
          <main className="md:w-2/3 lg:w-3/4">
            {selectedCategoryData ? (
              <>
                <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200/80 mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-agri-green-deep">
                    {selectedCategoryData.name} की किस्में
                  </h2>
                </div>

                {/* Sub-navigation for Varieties */}
                {selectedCategoryData.varieties &&
                selectedCategoryData.varieties.length > 0 ? (
                  <nav className="mb-8 p-4 bg-gray-50 rounded-lg shadow-md border border-gray-200/60">
                    <h3 className="text-lg font-semibold text-agri-green-dark mb-3">
                      उपलब्ध किस्में:
                    </h3>
                    <ul className="flex flex-wrap gap-3">
                      {selectedCategoryData.varieties.map((variety) => (
                        <li key={variety.id}>
                          <button
                            onClick={() => handleVarietySelect(variety.id)}
                            className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-agri-green-dark focus:ring-opacity-50
                                                        ${
                                                          selectedVarietyId ===
                                                          variety.id
                                                            ? "bg-agri-green-deep text-white shadow-md transform scale-105"
                                                            : "bg-gray-200 text-gray-700 hover:bg-agri-green-light hover:text-agri-green-deep hover:shadow-sm"
                                                        }`}
                          >
                            {variety.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ) : (
                  <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200/80 mb-8 text-center">
                    <p className="text-md text-gray-500">
                      इस श्रेणी के लिए कोई किस्म उपलब्ध नहीं है।
                    </p>
                  </div>
                )}

                {/* Display selected variety card */}
                {selectedVarietyId
                  ? (() => {
                      // IIFE to find and render the selected variety
                      const varietyToShow = selectedCategoryData.varieties.find(
                        (v) => v.id === selectedVarietyId
                      );
                      if (varietyToShow) {
                        return (
                          <div className="grid grid-cols-1 gap-8">
                            {" "}
                            {/* Displaying a single card */}
                            <VarietyCard
                              key={varietyToShow.id}
                              variety={varietyToShow}
                              isOpen={openVarietyId === varietyToShow.id}
                              onToggle={() =>
                                toggleVarietyDetails(varietyToShow.id)
                              }
                            />
                          </div>
                        );
                      }
                      // This case should ideally not be reached if selectedVarietyId is valid and data is consistent
                      return (
                        <div className="text-center py-10 bg-white p-6 rounded-xl shadow-xl border border-gray-200/80">
                          <p className="text-xl text-gray-600">
                            चयनित किस्म नहीं मिली। कृपया पुनः प्रयास करें।
                          </p>
                        </div>
                      );
                    })()
                  : // Show message if a category is selected but no specific variety is chosen yet
                    selectedCategoryData.varieties &&
                    selectedCategoryData.varieties.length > 0 && (
                      <div className="text-center py-10 bg-white p-6 rounded-xl shadow-xl border border-gray-200/80">
                        <p className="text-xl text-gray-600">
                          ऊपर दी गई सूची में से एक किस्म चुनें।
                        </p>
                      </div>
                    )}
              </>
            ) : (
              // Fallback if no category is selected or data is not loaded
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
