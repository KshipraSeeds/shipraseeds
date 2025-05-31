'use client';

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  TrendingUp,
  Star,
  ChevronDown,
  Leaf,
  Zap,
  Sun,
  PackageSearch,
  Sprout,
  X, 
} from "lucide-react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from "../context/LanguageContext";
// import paddy31 from "@/public/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png"; // No longer directly used as images are from variety data


type CropVariety = {
  id: string;
  name: string;
  image?: string;
  weightImages?: { weight: string; url: string }[]; // Updated type for weightImages
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
        weightImages: [
          { weight: "5 KG", url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png" },
          { weight: "4 KG", url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png" },
          { weight: "3 KG", url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png" },
        ],
        maturity: "110-115 दिन",
        yield: "20-24 क्विंटल/एकड़ (देखभाल में 26-28)",
        specialTrait: "जल्दी पकने वाली, न गिरने वाली, न झड़ने वाली",
        aboutVariety: `
इस किस्म को दो अच्छी किस्मों — पूसा बासमती 1509 और PB-1601 — को मिलाकर बनाया गया है।
• पूसा1509 से इसे जल्दी पकने की ताकत, ज्यादा उपज और छोटा पौधा मिला जिससे फसल संभालना आसान होता है।
• PB-1601 से इसे मजबूत तना मिला जो फसल को गिरने नहीं देता और दाने पकने पर भी टूटते नहीं हैं।`,
        whyItCreated: `पुरानी किस्में देर से पकती थीं और गिरने का खतरा रहता था। PB-1692 को इस समस्या को दूर करने के लिए लाया गया है।
किसानों को इससे ये फायदा होता है:
• फसल जल्दी काट सकते हैं
• कम गिरावट और नुकसान होता है
• कम समय में अच्छी उपज मिलती है,`,
      },
      {
        id: "pb-1121",
        name: "PB-1121",
        weightImages: [
          {
            weight: "5 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
          {
            weight: "4 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
          {
            weight: "3 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
        ],

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
        weightImages: [
          {
            weight: "5 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
          {
            weight: "4 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
          {
            weight: "3 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
        ],

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
        weightImages: [
          {
            weight: "5 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
          {
            weight: "4 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
          {
            weight: "3 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
        ],

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
        weightImages: [
          {
            weight: "5 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
          {
            weight: "4 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
          {
            weight: "3 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
        ],

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
        weightImages: [
          {
            weight: "5 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
          {
            weight: "4 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
          {
            weight: "3 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
        ],

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
        weightImages: [
          {
            weight: "5 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
          {
            weight: "4 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
          {
            weight: "3 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
        ],

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
        weightImages: [
          {
            weight: "5 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
          {
            weight: "4 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
          {
            weight: "3 KG",
            url: "/bagPics/paddy/3 KG PADDY-20250519T122821Z-1-001/3 KG PADDY/Render_Mockup_1080_1920_2025-05-15 (3).png",
          },
        ],
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
        image: "bagPics/jowar/Jowar-20250519T122831Z-1-001/Jowar/SS-17.jpg",
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
        image: "bagPics/jowar/Jowar-20250519T122831Z-1-001/Jowar/Evergreen.jpg",
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
    id: "wheat",
    name: "गेहूं",
    icon: Zap,
    varieties: [
      {
        id: "hd-2967",
        name: "HD-2967",
        image: "bagPics/wheat/wheat-20250519T122832Z-1-001/wheat/wheat1.jpg",
        maturity: "109 दिन: 120 से 162 दिन (बीजनेट)",
        yield: "औसतन - 50–55 क्विंटल/हेक्टेयर; संभावित - 65-70 क्यू/हेक्टेयर",
        specialTrait: "अंतिम गर्मी तनाव के प्रतिसहनशीलता। पत्ते के विस्फोट, कर्नल बंट और ध्वज स्मट रोग के प्रतिसहनशीलता।",
        aboutVariety: "",
        whyItCreated: ""
      },
      {
        id: "hd-3406",
        name: "HD-3406",
        image: "bagPics/wheat/wheat-20250519T122832Z-1-001/wheat/wheat1.jpg",
        maturity: "120-150 दिन",
        yield: "औसतन - 54.73 क्यू/हेक्टेयर, संभावित - 64.05 क्यू/हेक्टेयर",
        specialTrait: "पत्ते और पट्टी की जंग के प्रति प्रतिरोधक, गेहूं के विस्फोट और कर्नल बंट के प्रति अच्छा स्तर का प्रतिरोध।",
        aboutVariety: "",
        whyItCreated: ""
      },
      {
        id: "hd-2851",
        name: "HD-2851",
        image: "bagPics/wheat/wheat-20250519T122832Z-1-001/wheat/wheat1.jpg",
        maturity: "137 से 141 दिन",
        yield: "",
        specialTrait: "समय पर बोई गई; सिंचित और उच्च उर्वरक स्थितियां। पत्ते की rust, स्टेम रस्ट और पट्टी रस्ट के प्रति अत्यधिक प्रतिरोधक, यहां तक कि कृत्रिम स्थितियों में भी।",
        aboutVariety: "",
        whyItCreated: ""
      },
      {
        id: "hd-3086",
        name: "HD-3086",
        image: "bagPics/wheat/wheat-20250519T122832Z-1-001/wheat/wheat1.jpg",
        maturity: "145 दिन",
        yield: "5.4 टन/हेक्टेयर",
        specialTrait: "पीले और भूरी रस्ट के प्रति प्रतिरोधक",
        aboutVariety: "",
        whyItCreated: ""
      },
      {
        id: "hd-3386",
        name: "HD-3386",
        image: "bagPics/wheat/wheat-20250519T122832Z-1-001/wheat/wheat1.jpg",
        maturity: "144 दिन",
        yield: "62.5 क्यू/हेक्टेयर",
        specialTrait: "समय पर बोई गई सिंचित",
        aboutVariety: "",
        whyItCreated: ""
      },
      {
        id: "dbw-327",
        name: "DBW-327",
        image: "bagPics/wheat/wheat-20250519T122832Z-1-001/wheat/wheat1.jpg",
        maturity: "135-140 दिन",
        yield: "औसतन - 79.4 क्यू/हेक्टेयर, संभावित - 87.7 क्यू/हेक्टेयर",
        specialTrait: "कर्नल बंट के प्रति प्रतिरोधक",
        aboutVariety: "",
        whyItCreated: ""
      },
      {
        id: "dbw-333",
        name: "DBW-333",
        image: "bagPics/wheat/wheat-20250519T122832Z-1-001/wheat/wheat1.jpg",
        maturity: "140–145 दिन",
        yield: "औसतन – 50-60 क्यू/हेक्टेयर; संभावित - 80-85 क्यू/हेक्टेयर",
        specialTrait: "",
        aboutVariety: "",
        whyItCreated: ""
      },
      {
        id: "dbw-371",
        name: "DBW-371",
        image: "bagPics/wheat/wheat-20250519T122832Z-1-001/wheat/wheat1.jpg",
        maturity: "102 दिन: 147 से 153 दिन (SeedNet)",
        yield: "75.9 क्यू/हेक्टेयर, संभावित – 87.1 क्यू/हेक्टेयर",
        specialTrait: "जल्दी बोई गई, सिंचित स्थिति उत्तर पश्चिमी मैदानी क्षेत्र (दिल्ली, हरियाणा, हिमाचल प्रदेश, जम्मू और कश्मीर, पंजाब, राजस्थान, उत्तर प्रदेश, उत्तराखंड)। DBW 371 पत्ते के रस्ट के प्रति प्राकृतिक और कृत्रिम स्थितियों में अत्यधिक प्रतिरोधक है (जैसा कि ACI मानों से स्पष्ट है)",
        aboutVariety: "",
        whyItCreated: ""
      },
      {
        id: "dbw-370",
        name: "DBW-370",
        image: "bagPics/wheat/wheat-20250519T122832Z-1-001/wheat/wheat1.jpg",
        maturity: "102 दिन; 148 से 153 दिन (SeedNet)",
        yield: "74.9 क्यू/हेक्टेयर, संभावित – 86.9 क्यू/हेक्टेयर",
        specialTrait: "जल्दी बोई गई, सिंचित स्थिति उत्तर पश्चिमी मैदानी क्षेत्र (दिल्ली, हरियाणा, हिमाचल प्रदेश, जम्मू और कश्मीर, पंजाब, राजस्थान, उत्तर प्रदेश, उत्तराखंड)",
        aboutVariety: "",
        whyItCreated: ""
      },
      {
        id: "dbw-372",
        name: "DBW-372",
        image: "bagPics/wheat/wheat-20250519T122832Z-1-001/wheat/wheat1.jpg",
        maturity: "106 दिन: 148 से 153 दिन (SeedNet)",
        yield: "75.3 क्यू/हेक्टेयर, संभावित – 84.9 क्यू/हेक्टेयर",
        specialTrait: "जल्दी बोई गई, सिंचित स्थिति उत्तर पश्चिमी मैदानी क्षेत्र (दिल्ली, हरियाणा, हिमाचल प्रदेश, जम्मू और कश्मीर, पंजाब, राजस्थान, उत्तर प्रदेश, उत्तराखंड)",
        aboutVariety: "",
        whyItCreated: ""
      },
      {
        id: "dbw-303",
        name: "DBW-303",
        image: "bagPics/wheat/wheat-20250519T122832Z-1-001/wheat/wheat1.jpg",
        maturity: "102-140 दिन",
        yield: "80.3 क्यू/हेक्टेयर",
        specialTrait: "प्राकृतिक और कृत्रिम स्थितियों में पत्ते की बीमारियों के प्रति प्रतिरोधक। यह काले, भूरे और पीले रस्ट के प्रति अत्यधिक प्रतिरोधक है, जैसा कि ACI मानों से स्पष्ट है। इसके अलावा, DBW 303 गेहूं के विस्फोट रोग के प्रति अत्यधिक प्रतिरोधक है। सिंचित, समय पर बोई गई, उच्च उर्वरक स्थिति — केंद्रीय क्षेत्र (MP, राजस्थान, गुजरात, छत्तीसगढ़)",
        aboutVariety: "",
        whyItCreated: ""
      },
      {
        id: "dbw-222",
        name: "DBW-222",
        image: "bagPics/wheat/wheat-20250519T122832Z-1-001/wheat/wheat1.jpg",
        maturity: "139 से 150 दिन",
        yield: "82.1 क्यू/हेक्टेयर",
        specialTrait: "DBW 222 उच्चतम उत्पादन देने वाली प्रजाति है, दोनों समय पर बोई और देर से बोई गई स्थितियों में, और इसमें उच्च अनाज संख्या/स्पाइक और 1000-अनाज वजन है। यह प्राकृतिक और कृत्रिम स्थितियों में पट्टी और पत्ते की रस्ट के प्रति प्रतिरोधक है।",
        aboutVariety: "",
        whyItCreated: ""
      },
      {
        id: "dbw-187",
        name: "DBW-187",
        image: "bagPics/wheat/wheat-20250519T122832Z-1-001/wheat/wheat1.jpg",
        maturity: "120 दिन बुवाई के बाद",
        yield: "औसतन: 61.28 क्यू/हेक्टेयर",
        specialTrait: "",
        aboutVariety: "",
        whyItCreated: ""
      },
      {
        id: "pbw-872",
        name: "PBW-872",
        image: "bagPics/wheat/wheat-20250519T122832Z-1-001/wheat/wheat1.jpg",
        maturity: "135 से 163 दिन",
        yield: "93.4 क्यू/हेक्टेयर",
        specialTrait: "PBW 872 पट्टी और पत्ते की रस्ट के प्रति प्रतिरोधक है, जैसा कि ACI मानों से स्पष्ट है।",
        aboutVariety: "",
        whyItCreated: ""
      },
      {
        id: "pbw-826",
        name: "PBW-826",
        image: "bagPics/wheat/wheat-20250519T122832Z-1-001/wheat/wheat1.jpg",
        maturity: "125 से 165 दिन",
        yield: "84.4 क्यू/हेक्टेयर",
        specialTrait: "समय पर बोई गई, सिंचित स्थितियां",
        aboutVariety: "",
        whyItCreated: ""
      }
    ]
  }

];

// --- VarietyCard Component (Modified for Modal Trigger) ---
interface VarietyCardProps {
  variety: CropVariety; // Use the defined CropVariety type
  onViewDetails: (variety: CropVariety) => void; // New prop to trigger modal
}

const VarietyCard: React.FC<VarietyCardProps> = ({
  variety,
  onViewDetails,
}) => {
  // State to manage the current image index for weightImages carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    if (variety.weightImages) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % variety.weightImages!.length
      );
    }
  };

  const goToPreviousImage = () => {
    if (variety.weightImages) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex - 1 + variety.weightImages!.length) % variety.weightImages!.length
      );
    }
  };

  const displayImage = variety.weightImages?.[currentImageIndex]?.url || variety.image;
  const displayWeight = variety.weightImages?.[currentImageIndex]?.weight;

  return (
    <div
      className="bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl border border-gray-200/80 flex flex-col p-4" // Simplified styling for general display
    >
      {/* Image Section */}
      {displayImage && (
        <div className="relative flex flex-col w-full h-48 justify-center items-center mb-4">
          <img
            src={displayImage}
            alt={`${variety.name} ${displayWeight || ''}`}
            className="w-full h-full object-contain mx-auto border border-gray-200 rounded-lg"
          />
          {/* Display weight below the image, centered and slightly transparent on large screens */}
          {displayWeight && (
            <p className="text-sm mt-2 text-gray-700 font-medium">
              {displayWeight}
            </p>
          )}


          {/* Navigation Arrows for ALL screens */}
          {variety.weightImages && variety.weightImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPreviousImage(); }} // Prevent card click
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/75 transition-colors duration-200 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNextImage(); }} // Prevent card click
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/75 transition-colors duration-200 z-10"
                aria-label="Next image"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {/* Optional: Add Dots for Pagination below image on mobile */}
          {variety.weightImages && variety.weightImages.length > 1 && (
            <div className="flex justify-center mt-3 gap-2">
              {variety.weightImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-agri-green-medium' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                ></button>
              ))}
            </div>
          )}

        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-agri-green-deep mb-2">
          {variety.name}
        </h3>
        <div className="space-y-1 text-sm mb-4 text-gray-700">
          <div className="flex items-center">
            <Clock size={16} className="mr-2 text-agri-orange-harvest flex-shrink-0" />
            <span>
              <strong>पकने की अवधि:</strong> {variety.maturity}
            </span>
          </div>
          <div className="flex items-center">
            <TrendingUp size={16} className="mr-2 text-agri-orange-harvest flex-shrink-0" />
            <span>
              <strong>उपज:</strong> {variety.yield}
            </span>
          </div>
          <div className="flex items-center">
            <Star size={16} className="mr-2 text-agri-orange-harvest flex-shrink-0" />
            <span>
              <strong>विशेष गुण:</strong> {variety.specialTrait}
            </span>
          </div>
        </div>
        <button
          onClick={() => onViewDetails(variety)} // Trigger modal on click
          className="w-full mt-auto inline-flex items-center justify-center px-4 py-2.5 bg-agri-green-medium text-white text-sm font-semibold rounded-lg hover:bg-agri-green-deep transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-agri-green-light focus:ring-offset-2"
        >
          विवरण देखें
          <ChevronRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

// --- VarietyDetailsModal Component (New) ---
interface VarietyDetailsModalProps {
  variety: CropVariety | null;
  onClose: () => void;
}

const VarietyDetailsModal: React.FC<VarietyDetailsModalProps> = ({ variety, onClose }) => {
  // State to manage the current image index for weightImages carousel within the modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Reset image index when variety changes (modal opens for a new one)
    setCurrentImageIndex(0);
  }, [variety]);

  const goToNextImage = useCallback(() => {
    if (variety?.weightImages) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % variety.weightImages.length
      );
    }
  }, [variety]);

  const goToPreviousImage = useCallback(() => {
    if (variety?.weightImages) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex - 1 + variety.weightImages.length) % variety.weightImages.length
      );
    }
  }, [variety]);

  // Handle keyboard navigation for modal images
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (variety) { // Only active if modal is open
        if (event.key === 'ArrowLeft') {
          goToPreviousImage();
        } else if (event.key === 'ArrowRight') {
          goToNextImage();
        } else if (event.key === 'Escape') {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [variety, goToNextImage, goToPreviousImage, onClose]);


  if (!variety) return null; // Don't render if no variety is selected

  const displayImage = variety.weightImages?.[currentImageIndex]?.url || variety.image;
  const displayWeight = variety.weightImages?.[currentImageIndex]?.weight;


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" // Darkened and blurred background
        onClick={onClose} // Close modal on overlay click
      ></div>

      {/* Modal Content */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -50, opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col lg:flex-row"
        role="dialog"
        aria-modal="true"
        aria-labelledby="variety-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-2 rounded-full bg-white/70 hover:bg-white transition-colors z-10"
          aria-label="Close details"
        >
          <X size={24} />
        </button>

        {/* Image Section in Modal (with carousel) */}
        {displayImage && (
          <div className="relative p-4 flex flex-col w-full lg:w-1/2 lg:flex-shrink-0 justify-center items-center">
            <img
              src={displayImage}
              alt={`${variety.name} ${displayWeight || ''}`}
              className="w-full max-h-72 object-contain mx-auto border border-gray-200 rounded-lg lg:max-h-full lg:rounded-none lg:rounded-l-xl"
            />
            {displayWeight && (
              <p className="text-base mt-3 font-semibold text-gray-800">
                {displayWeight}
              </p>
            )}

            {variety.weightImages && variety.weightImages.length > 1 && (
              <>
                <button
                  onClick={goToPreviousImage}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/75 transition-colors duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/75 transition-colors duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            {variety.weightImages && variety.weightImages.length > 1 && (
              <div className="flex justify-center mt-4 gap-2">
                {variety.weightImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentImageIndex ? 'bg-agri-green-medium' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  ></button>
                ))}
              </div>
            )}
          </div>
        )}


        {/* Text Content Section in Modal */}
        <div className="p-6 flex flex-col w-full lg:w-1/2">
          <h2 id="variety-modal-title" className="text-3xl font-bold text-agri-green-deep mb-4">
            {variety.name}
          </h2>

          <div className="space-y-3 text-base mb-6 text-gray-700">
            <div className="flex items-center">
              <Clock size={20} className="mr-3 text-agri-orange-harvest flex-shrink-0" />
              <span>
                <strong>पकने की अवधि:</strong> {variety.maturity}
              </span>
            </div>
            <div className="flex items-center">
              <TrendingUp size={20} className="mr-3 text-agri-orange-harvest flex-shrink-0" />
              <span>
                <strong>उपज:</strong> {variety.yield}
              </span>
            </div>
            <div className="flex items-center">
              <Star size={20} className="mr-3 text-agri-orange-harvest flex-shrink-0" />
              <span>
                <strong>विशेष गुण:</strong> {variety.specialTrait}
              </span>
            </div>
          </div>

          {/* About the Variety Section */}
          {variety.aboutVariety && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {variety.name} के बारे में
              </h3>
              <div
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: variety.aboutVariety }}
              />
            </div>
          )}

          {/* Why it was Created Section */}
          {variety.whyItCreated && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                क्यों बनाई गई?
              </h3>
              <div
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: variety.whyItCreated }}
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};


// --- ProductsPage Component (Modified) ---
const ProductsPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
const searchParams = useSearchParams()
  // const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
  //   allCropData.length > 0 ? allCropData[0].id : null
  // );
  const [modalOpenVariety, setModalOpenVariety] = useState<CropVariety | null>(null);
       const { t } = useLanguage();



    const selectedCategoryId = useMemo(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && allCropData.some((c) => c.id === categoryFromUrl)) {
      return categoryFromUrl;
    }
    // Default to the first category if none is specified or found
    return allCropData.length > 0 ? allCropData[0].id : null;
  }, [searchParams]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentParams = new URLSearchParams(window.location.search);
      const categoryFromUrl = currentParams.get("category");
      const varietyFromUrl = currentParams.get("variety");

      let newSelectedCategoryId = selectedCategoryId;
      let varietyToOpenInModal: CropVariety | null = null;

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
        newSelectedCategoryId = allCropData[0].id;
      }

      // if (newSelectedCategoryId !== selectedCategoryId) {
      //   setSelectedCategoryId(newSelectedCategoryId);
      // }

      if (newSelectedCategoryId) {
        const categoryData = allCropData.find(
          (c) => c.id === newSelectedCategoryId
        );
        if (
          categoryData &&
          varietyFromUrl
        ) {
          varietyToOpenInModal = categoryData.varieties.find((v) => v.id === varietyFromUrl) || null;
        }
      }
      setModalOpenVariety(varietyToOpenInModal);
    }
  }, [pathname, selectedCategoryId]); // Added selectedCategoryId to dependencies to ensure re-run if it changes outside of URL effect

  const handleCategorySelect = (categoryId: string) => {
    // setSelectedCategoryId(categoryId);
    setModalOpenVariety(null);
    router.push(`${pathname}?category=${categoryId}`, { scroll: false });
  };

  const handleViewDetails = (variety: CropVariety) => {
    setModalOpenVariety(variety);
    if (selectedCategoryId) {
      router.push(
        `${pathname}?category=${selectedCategoryId}&variety=${variety.id}`,
        { scroll: false }
      );
    }
  };

  const handleCloseModal = () => {
    setModalOpenVariety(null);
    if (selectedCategoryId) {
      router.push(`${pathname}?category=${selectedCategoryId}`, { scroll: false });
    } else {
      router.push(pathname, { scroll: false });
    }
  };


  const selectedCategoryData = allCropData.find(
    (cat) => cat.id === selectedCategoryId
  );

  const subtitles = React.useMemo(
    () => allCropData.map((cat) => cat.name),
    []
  );
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);

  useEffect(() => {
    if (subtitles.length === 0) return;
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
          {/* Sidebar */}
          {/* Removed `sticky` for mobile to prevent overflow/z-index issues. */}
          {/* Will now scroll normally with content on small screens. */}
          <aside className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 rounded-xl shadow-xl border border-gray-200/80 md:self-start md:sticky md:top-28 z-0">
            <h2 className="text-xl font-semibold text-agri-green-deep mb-5 border-b pb-3">
               {t("cropCategories")}
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

          {/* Main content area for varieties - Added z-10 to ensure it's above sidebar on mobile if needed */}
          <main className="md:w-2/3 lg:w-3/4 z-10">
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
                       {t("availableVarieties")}
                    </h3>
                    <ul className="flex flex-wrap gap-3">
                      {selectedCategoryData.varieties.map((variety) => (
                        <li key={variety.id}>
                          <button
                            onClick={() => handleViewDetails(variety)}
                            className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-agri-green-dark focus:ring-opacity-50
                                          ${
                                            modalOpenVariety?.id === variety.id
                                              ? "bg-agri-green-deep text-white shadow-md "
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

                {/* Display all variety cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedCategoryData.varieties.map((variety) => (
                    <VarietyCard
                      key={variety.id}
                      variety={variety}
                      onViewDetails={handleViewDetails}
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

      {/* Modal Rendered Conditionally */}
      <AnimatePresence>
        {modalOpenVariety && (
          <VarietyDetailsModal
            variety={modalOpenVariety}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductsPage;