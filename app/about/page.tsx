// src/app/about-us/page.jsx
"use client"

import React, { useState, useEffect, useRef } from 'react';
import Modal from '@/components/Modal/modal'; // Adjust path based on your project structure

// Full content for modals
const founderFullContent = (
    <>
        <p className="mb-3">डॉ. सत्य नारायण वशिष्ठ, शिप्रा सीड्स के संस्थापक हैं। उनके पास खेती और कृषि विज्ञान का दशकों का अनुभव है। वे व्यावहारिक ज्ञान और वैज्ञानिक सोच को जोड़कर ऐसे समाधान बनाते हैं जो सच में किसानों को लाभ पहुंचाते हैं।</p>
        <p className="mb-3">उन्होंने खुद खेती की कठिनाइयों का सामना किया है, इसलिए उन्हें पता है कि एक किसान को सफल होने के लिए क्या चाहिए। यही समझ उन्हें उच्च गुणवत्ता वाले बीज और व्यावहारिक सहयोग देने की दिशा में प्रेरित करती है।</p>
        <p>शुरुआत से ही उन्होंने शिप्रा सीड्स को कड़ी मेहनत और लगन से खड़ा किया। आज उनकी यह कंपनी कृषि क्षेत्र में एक विश्वसनीय नाम बन चुकी है। वे अब भी उसी समर्पण और जोश के साथ किसानों को सशक्त बनाने और खेती को लाभदायक बनाने में लगे हुए हैं।</p>
    </>
);

const storyFullContent = (
    <>
        <p className="mb-4">डॉ. वशिष्ठ की यात्रा खेती से जुड़ी रही है। किसान के रूप में उन्होंने मौसम की अनिश्चितता, आर्थिक दबाव और खेती की कड़ी मेहनत को खुद महसूस किया है। यही अनुभव उन्हें ऐसे समाधान ढूंढने की ओर ले गया जो खेती को आसान और लाभदायक बना सकें।</p>
        <h3 className="font-semibold text-xl mb-2 text-shipra-green-500">🌱 कृषि और विज्ञान के लिए जुनून</h3>
        <p className="mb-4">उन्होंने कृषि में स्नातक की पढ़ाई की, फिर पशु पोषण विज्ञान में मास्टर्स और पोस्टडॉक्टरल किया। हालांकि वे वैज्ञानिक बनना चाहते थे, लेकिन जीवन ने उन्हें एक अलग रास्ता दिखाया। वे ADO बने, पर संतुष्टि नहीं मिली।</p>
        <p className="mb-4">खेती से जुड़े रहने की चाह में उन्होंने किराए की ज़मीन पर काम शुरू किया, लेकिन पारिवारिक और आर्थिक मुश्किलों ने रुकावट डाली।</p>
        <h3 className="font-semibold text-xl mb-2 text-shipra-green-500">💡 एक नया अवसर</h3>
        <p className="mb-4">परिवार के लिए सहारा बनने के उद्देश्य से उन्होंने एक छोटा बीज और कीटनाशक की दुकान खोली। इसी दौरान उन्हें महसूस हुआ कि कई सफल बीज कंपनियां ऐसे लोग चला रहे हैं जिन्हें खेती का कोई अनुभव नहीं। तब उन्होंने सोचा:</p>
        <p className="italic border-l-4 border-shipra-green-500 pl-4 py-2 my-4 text-shipra-text">अगर वे कर सकते हैं, तो मैं क्यों नहीं? मेरे पास तो विज्ञान और खेती दोनों का अनुभव है!</p>
        <h3 className="font-semibold text-xl mb-2 text-shipra-green-500">🌾 बेहतर कृषि के लिए एक दृष्टि</h3>
        <p>डॉ. वशिष्ठ मानते थे कि कृषि को आगे बढ़ाने के लिए ऐसे लोगों की जरूरत है जो इसे भीतर से जानते हों। यही सोच शिप्रा सीड्स की नींव बनी — किसानों को भरोसेमंद बीज और सही मार्गदर्शन देना।</p>
    </>
);

const coreValuesFullContent = (
    <>
        <p className="mb-4">बीज सिर्फ बेचे नहीं जाते, उनकी देखभाल की जाती है।</p>
        <p className="mb-4">शुद्धता, नमी और विश्वास हमारी गुणवत्ता की पहचान हैं।</p>

        <h3 className="font-semibold text-xl mb-3 text-shipra-green-700">1. गुणवत्ता के प्रति प्रतिबद्धता</h3>
        <p className="mb-3">गुणवत्ता हमारे हर काम के केंद्र में है। यही बात हमारे बीजों को खास बनाती है और हर फसल की सफलता को तय करती है। उच्चतम मानकों को बनाए रखने के लिए, हम तीन महत्वपूर्ण पहलुओं पर ध्यान केंद्रित करते हैं:</p>

        <h4 className="font-semibold text-lg mb-2 text-shipra-green-500 pl-4">a. नमी नियंत्रण (Moisture Management)</h4>
        <p className="mb-3 pl-4">बीजों की गुणवत्ता में नमी की सबसे महत्वपूर्ण भूमिका होती है। अंकुरण को सक्रिय करने के लिए बीजों में सही मात्रा में नमी होनी चाहिए। बहुत अधिक नमी से समस्याएं हो सकती हैं जैसे:</p>
        <ul className="list-disc list-inside space-y-2 text-shipra-text mb-3 pl-4">
            <li>पानी का जमाव, जिससे ऑक्सीजन की उपलब्धता कम हो जाती है।</li>
            <li>फंगल संक्रमण और कीट, जो उच्च नमी वाले वातावरण में पनपते हैं।</li>
            <li>बीज का सड़ना या अंकुरण का विफल होना, जो व्यवहार्यता और उत्पादकता को प्रभावित करता है।</li>
        </ul>
        <p className="mb-4 pl-4">इसी वजह से हम नमी को लेकर अतिरिक्त सावधानी बरतते हैं। उदाहरण के लिए, हम कंबाइन से काटे गए धान के बीज स्वीकार नहीं करते क्योंकि उनमें नमी की मात्रा (20%-25%) भंडारण के लिए बहुत अधिक होती है। कंबाइन से कटाई भले ही कुशल हो, लेकिन यह नमी के स्तर को कम करने के लिए आवश्यक समय नहीं देती, जिससे अंकुरण दर प्रभावित हो सकती है। ऐसी प्रथाओं को अस्वीकार करके और नमी को ध्यान से प्रबंधित करके, हम हर बीज की व्यवहार्यता की रक्षा करते हैं। यह सुनिश्चित करता है कि आपके द्वारा बोए गए बीज आपके खेतों में अंकुरित होने, बढ़ने और प्रदर्शन करने के लिए तैयार हैं।</p>

        <h4 className="font-semibold text-lg mb-2 text-shipra-green-500 pl-4">b. आनुवांशिक शुद्धता (Genetic Purity)</h4>
        <p className="mb-4 pl-4">आनुवांशिक शुद्धता का मतलब है कि प्रत्येक बीज अपनी किस्म के अनुरूप ही बढ़ेगा, ठीक वैसे ही प्रदर्शन करेगा जैसा अपेक्षित है। इसे प्राप्त करने के लिए, हम सभी फाउंडेशन और ब्रीडर बीज प्रमाणित कार्यक्रमों से प्राप्त करते हैं। चाहे वे आंतरिक रूप से उत्पादित हों या अधिकृत आपूर्तिकर्ताओं से प्राप्त हों, आप भरोसा कर सकते हैं कि हमारे बीज विश्वसनीय और सुसंगत परिणाम देते हैं।</p>

        <h4 className="font-semibold text-lg mb-2 text-shipra-green-500 pl-4">c. भौतिक शुद्धता (Physical Purity)</h4>
        <p className="mb-4 pl-4">भौतिक शुद्धता का अर्थ है प्रत्येक बीज किस्म को अलग और बिना मिलावट के रखना। हम बीजों के किसी भी मिश्रण से बचने के लिए भंडारण, सफाई और पैकिंग के दौरान सख्त प्रक्रियाओं का पालन करते हैं। हर कदम दस्तावेजित होता है और राज्य बीज प्रमाणीकरण मानकों का पालन करता है, जिससे पूरी तरह से पता लगाया जा सकता है और हम जो बीज प्रदान करते हैं उनकी अखंडता की रक्षा होती है।</p>
        <p className="mb-4 pl-4">एक साथ, <strong className="text-shipra-green-700">नमी नियंत्रण</strong>, <strong className="text-shipra-green-700">आनुवांशिक शुद्धता</strong>, और <strong className="text-shipra-green-700">भौतिक शुद्धता</strong> किसानों को विश्वसनीय बीज प्रदान करने की हमारी प्रतिबद्धता की रीढ़ हैं।</p>

        <h3 className="font-semibold text-xl mb-3 text-shipra-green-700">2. सतत खेती की प्रतिबद्धता (Sustainability)</h3>
        <p className="mb-3">हम ऐसी कृषि पद्धतियों में विश्वास करते हैं जो किसानों और पर्यावरण दोनों को लाभ पहुंचाती हैं। स्थिरता के प्रति हमारे दृष्टिकोण में शामिल हैं:</p>
        <ul className="list-disc list-inside space-y-2 text-shipra-text mb-4">
            <li>अधिक बुवाई को रोकने के लिए अनुशंसित बीज दरों का उपयोग करना, जो स्वस्थ फसलों को सुनिश्चित करता है और संसाधनों की बर्बादी से बचाता है।</li>
            <li>मिट्टी के स्वास्थ्य को बनाए रखने और पर्यावरण की रक्षा के लिए न्यूनतम कीटनाशक और उर्वरक उपयोग को प्रोत्साहित करना।</li>
            <li>संसाधन दक्षता को बढ़ावा देना, यह सुनिश्चित करना कि प्रत्येक इनपुट, चाहे वह पानी हो या पोषक तत्व, का प्रभावी ढंग से उपयोग किया जाए।</li>
        </ul>
        <p className="mb-4">हमारे लिए, स्थिरता आज भविष्य की पीढ़ियों के लिए खेती की रक्षा और उसे बढ़ाने के लिए विचारशील विकल्प चुनने के बारे में है। यह जमीन को वापस देने का हमारा तरीका है, साथ ही किसानों को स्थायी सफलता प्राप्त करने में मदद करना भी है।</p>

        <h3 className="font-semibold text-xl mb-3 text-shipra-green-700">3. हर बीज की अहमियत</h3>
        <p className="mb-3">हमारे लिए, बीज सिर्फ उत्पाद नहीं हैं - उनमें खेतों को फलती-फूलती फसल में बदलने की क्षमता है। यही कारण है कि हम हर बीज को सावधानी से संभालते हैं और सुनिश्चित करते हैं कि वह मिट्टी तक पहुंचने के लिए तैयार हो ताकि वह एक उत्पादक पौधा बन सके।</p>
        <p>हम मानते हैं कि कोई भी बीज बर्बाद नहीं होना चाहिए। हम यह सुनिश्चित करके कचरे को कम करने में गर्व महसूस करते हैं कि हम जिस हर बीज को संसाधित करते हैं, उसे उद्देश्य के साथ व्यवहार किया जाता है और उसे अनाज के रूप में त्याग या उपयोग नहीं किया जाता है। हमारी प्रतिबद्धता सरल है: हर बीज को खेत में अपनी भूमिका निभाने का मौका मिलना चाहिए।</p>
    </>
);

const whyChooseUsFullContent = (
    <>
        <h3 className="font-semibold text-xl mb-3 text-shipra-green-700">1. सस्ती और विश्वसनीय गुणवत्ता</h3>
        <p className="mb-4">हम मानते हैं कि हर किसान को बिना अधिक भुगतान किए उच्च गुणवत्ता वाले बीजों तक पहुंच मिलनी चाहिए। जबकि कई कंपनियां समान गुणवत्ता के लिए प्रीमियम लेती हैं, हम सुनिश्चित करते हैं कि हमारे बीजों का मूल्य उचित और पारदर्शी हो। हम छिपी हुई लागतों या भ्रामक दावों में विश्वास नहीं करते - जो आप देखते हैं वही आपको मिलता है। हमारा लक्ष्य सरल है: हर किसान को विश्वसनीय बीज उपलब्ध कराना, चाहे उनके खेत का आकार या बजट कुछ भी हो। हमारे व्यवसाय में धोखाधड़ी का कोई स्थान नहीं है, और हमें मूल्य निर्धारण में ईमानदारी के प्रति अपनी प्रतिबद्धता पर गर्व है।</p>

        <h3 className="font-semibold text-xl mb-3 text-shipra-green-700">2. ईमानदारी और पारदर्शिता</h3>
        <p className="mb-3">शिप्रा सीड्स में, हम आपके विश्वास को महत्व देते हैं। इसलिए हम यह सुनिश्चित करने के लिए अतिरिक्त सावधानी बरतते हैं कि आपके द्वारा खरीदा गया प्रत्येक बीज बिल्कुल वही हो जो वह होने का दावा करता है।</p>
        <p className="mb-2">हम पारदर्शिता कैसे बनाए रखते हैं, यहाँ बताया गया है:</p>
        <ul className="list-disc list-inside space-y-2 text-shipra-text mb-4">
            <li>कोई शॉर्टकट नहीं, कोई मिलावट नहीं, और गुणवत्ता से कोई समझौता नहीं।</li>
            <li>हम कभी भी पुराने बीजों को नए नामों से गलत लेबल नहीं करते या फिर से पैक नहीं करते।</li>
            <li>प्रत्येक बीज अपनी मूल पहचान बनाए रखता है, जैसा कि विश्वविद्यालयों और वैज्ञानिकों द्वारा नामित किया गया है।</li>
        </ul>
        <p className="mb-4">जब आप हमसे खरीदते हैं, तो आप ठीक-ठीक जानते हैं कि आपको क्या मिल रहा है। यह ईमानदारी आप जैसे किसानों के साथ विश्वास पैदा करती है, और हमें अपने व्यवसाय के हर पहलू में इसे बनाए रखने पर गर्व है।</p>

        <h3 className="font-semibold text-xl mb-3 text-shipra-green-700">3. भरोसेमंद गुणवत्ता</h3>
        <p className="mb-3">हमारे लिए, गुणवत्ता सिर्फ एक मानक नहीं है - यह हमारी विरासत है। हम जो भी बीज प्रदान करते हैं, उसे सावधानी से प्राप्त किया जाता है, संसाधित किया जाता है और संग्रहीत किया जाता है ताकि यह विश्वसनीय, स्वस्थ और आपके खेतों में फलने-फूलने के लिए तैयार हो।</p>
        <p className="mb-2">शुरुआत से अंत तक, हम उच्चतम मानकों को बनाए रखने पर ध्यान केंद्रित करते हैं। इसका मतलब है:</p>
        <ul className="list-disc list-inside space-y-2 text-shipra-text mb-4">
            <li>उच्च अंकुरण दरों को सुनिश्चित करने के लिए बीजों का सावधानीपूर्वक चयन।</li>
            <li>बीजों को ताजा और व्यवहार्य रखने के लिए उचित भंडारण।</li>
            <li>हर कदम पर विस्तार पर ध्यान देना, ताकि आपके द्वारा बोए गए बीज मजबूत होने के लिए तैयार हों।</li>
        </ul>
        <p>जब आप शिप्रा सीड्स चुनते हैं, तो आप केवल बीज नहीं चुनते - आप विश्वास पर बनी साझेदारी में निवेश कर रहे होते हैं। हमारे द्वारा बेचे जाने वाले प्रत्येक बीज एक सफल फसल और आपके खेत के लिए एक उज्जवल भविष्य की दिशा में एक कदम का प्रतिनिधित्व करता है।</p>
    </>
);


const AboutUsPage = () => {
    // State for the founder's experience counter animation
    const [yearsCount, setYearsCount] = useState(0);
    const yearsRef = useRef(null); // Ref to observe the 15+ years element

    // State for the states animation
    const [statesVisible, setStatesVisible] = useState(false);
    const statesRef = useRef(null); // Ref to observe the states list

    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);

    const stateNames = [
        "हरियाणा", "पंजाब", "उत्तर प्रदेश", "मध्य प्रदेश", "जम्मू", "आंध्र प्रदेश"
    ];

    const openModal = (title, content) => {
        setModalTitle(title);
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalTitle('');
        setModalContent(null);
    };

    // Hook for the years counter animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const end = 15; // Target value
                    const duration = 3000; // 3 seconds (increased for slower animation)
                    const increment = Math.ceil(end / (duration / 16)); // ~60 frames per second

                    const counter = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            start = end;
                            clearInterval(counter);
                        }
                        setYearsCount(start);
                    }, 16); // Update roughly every 16ms (60fps)
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            },
            { threshold: 0.2 } // Trigger when 20% of the element is visible (earlier start)
        );

        if (yearsRef.current) {
            observer.observe(yearsRef.current);
        }

        return () => {
            if (yearsRef.current) {
                observer.unobserve(yearsRef.current);
            }
        };
    }, []); // Run only once on mount

    // Hook for the states entry animation
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
    }, []); // Run only once on mount


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
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">हमारे बारे में</h1>
                    <p className="text-lg sm:text-xl max-w-2xl mx-auto">भरोसा बनाना, फसलें बेहतर करना और कृषि को आगे बढ़ाना।</p>
                </div>
            </header>
            {/* --- END HEADER SECTION --- */}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">

                {/* NEW: 15+ Years of Experience Card (Moved to top) */}
                <section className="bg-agri-sky-blue p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-center items-center text-center">
                    <div ref={yearsRef} className="font-montserrat font-bold text-shipra-green-700">
                        <div className="text-6xl sm:text-7xl mb-2">
                            <span className="animate-fade-in">{yearsCount}</span>+
                        </div>
                        <div className="text-xl sm:text-2xl">वर्षों का अनुभव</div>
                    </div>
                </section>

                {/* Card 1: The Founder */}
                <section className="bg-agri-card-bg p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out lg:col-span-2 flex flex-col justify-between">
                    <div>
                        <h2 className="font-montserrat text-2xl font-semibold mb-4 text-shipra-green-700">👤 संस्थापक: डॉ. सत्य नारायण वशिष्ठ</h2>
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-4">
                            <div className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden border-4 border-shipra-green-500 flex items-center justify-center">
                                {/* You can replace this placeholder with a real image */}
                                <img src="https://placehold.co/128x128/5E8C61/FFFFFF?text=FOUNDER" alt="Dr. Satya Narain Vashishtha - Founder, Shipra Seeds" className="object-cover w-full h-full" />
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <p className="font-semibold text-lg mb-2">संस्थापक और निदेशक, शिप्रा सीड्स</p>
                                {/* Crucial info */}
                                <p className="mb-3">डॉ. सत्य नारायण वशिष्ठ, शिप्रा सीड्स के संस्थापक हैं। उनके पास खेती और कृषि विज्ञान का दशकों का अनुभव है। वे व्यावहारिक ज्ञान और वैज्ञानिक सोच को जोड़कर ऐसे समाधान बनाते हैं जो सच में किसानों को लाभ पहुंचाते हैं।</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => openModal('संस्थापक: डॉ. सत्य नारायण वशिष्ठ', founderFullContent)}
                        className="mt-4 bg-shipra-green-500 text-white px-6 py-2 rounded-md hover:bg-shipra-green-700 transition-colors duration-300 self-start"
                    >
                        और जानें
                    </button>
                </section>

                {/* Card 2: The Story */}
                <section className="bg-agri-green-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out lg:col-span-1 flex flex-col justify-between">
                    <div>
                        <h2 className="font-montserrat text-2xl font-semibold mb-4 text-shipra-green-700">🔬 हमारी कहानी – विज्ञान + अनुभव = शिप्रा सीड्स</h2>
                        {/* Crucial info */}
                        <p className="mb-4">डॉ. वशिष्ठ की यात्रा खेती से जुड़ी रही है। किसान के रूप में उन्होंने मौसम की अनिश्चितता, आर्थिक दबाव और खेती की कड़ी मेहनत को खुद महसूस किया है। यही अनुभव उन्हें ऐसे समाधान ढूंढने की ओर ले गया जो खेती को आसान और लाभदायक बना सकें।</p>
                        <p className="italic border-l-4 border-shipra-green-500 pl-4 py-2 my-4 text-shipra-text">अगर वे कर सकते हैं, तो मैं क्यों नहीं? मेरे पास तो विज्ञान और खेती दोनों का अनुभव है!</p>
                    </div>
                    <button
                        onClick={() => openModal('शिप्रा सीड्स की कहानी', storyFullContent)}
                        className="mt-4 bg-shipra-green-500 text-white px-6 py-2 rounded-md hover:bg-shipra-green-700 transition-colors duration-300 self-start"
                    >
                        और जानें
                    </button>
                </section>

                {/* Card 3: Building Trust & Reaching States (Combined content) - MADE ATTRACTIVE */}
                <section className="bg-shipra-green-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out col-span-1 md:col-span-2 lg:col-span-3 border border-shipra-green-200"> {/* Changed background and added a border */}
                    <h3 className="font-montserrat text-2xl font-semibold mb-4 text-shipra-green-700">📈 अनुभव और विस्तार</h3> {/* Updated heading for consistency */}
                    <p className="mb-4 text-shipra-text">2008 में लाइसेंस मिलने के बाद शिप्रा सीड्स ने बीज उत्पादन की शुरुआत की। हमारा लक्ष्य था — किसानों को भरोसेमंद बीज देना। धीरे-धीरे यह लक्ष्य हमारी सच्चाई बन गया।</p>

                    {/* Sub-card b: Reaching Across States - Now integrated here with enhanced styling */}
                    <div ref={statesRef} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-center items-center font-montserrat font-bold text-shipra-green-700 border-2 border-shipra-green-500 mb-6 transform hover:scale-105 transition-transform duration-300"> {/* Changed background, stronger border, added shadow and hover effect */}
                        <div className="text-5xl sm:text-6xl mb-2 text-agri-dark-green">🌍</div> {/* Changed emoji, could be a custom icon */}
                        <div className="text-xl sm:text-2xl mb-4 text-shipra-green-700">कई राज्यों तक पहुंच</div> {/* Ensured strong text color */}
                        <div className="text-lg text-shipra-text font-normal">
                            <p className="mb-2">आज शिप्रा सीड्स इन राज्यों में किसानों के साथ काम कर रही है:</p>
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
                                                ${statesVisible ? `animate-slide-in-right` : 'opacity-0'}
                                            `}
                                        style={{ animationDelay: statesVisible ? `${index * 0.1}s` : '0s' }}
                                    >
                                        {state}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="mb-4 text-shipra-text">हमने कई संगठनों के साथ साझेदारी की जो गुणवत्ता और नवाचार में विश्वास रखते हैं, जैसे: • NFL – गेहूं बीज उत्पादन के लिए • SUNSTAR – धान और गेहूं बीज के लिए • IFFCO (IIFDC) – गेहूं बीज के लिए इन सहयोगों से हमें न केवल तकनीकी मजबूती मिली, बल्कि किसानों तक बेहतर बीज पहुंचाना संभव हुआ।</p>
                    <p className="mb-4 text-shipra-text">पिछले **15 वर्षों (2009–2024)** में हमने: **2,50,000 क्विंटल गेहूं बीज** और **1,00,000 क्विंटल धान बीज** प्रसंस्कृत किए हैं। हम मुख्य रूप से **बासमती धान** और **गेहूं** पर ध्यान केंद्रित करते हैं ताकि इन फसलों में उत्कृष्टता और स्थिरता सुनिश्चित की जा सके।</p>
                </section>

                {/* Card 4: Our Mission */}
                <section className="bg-agri-card-bg p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                    <h2 className="font-montserrat text-2xl font-semibold mb-4 text-shipra-green-700">🎯 हमारा उद्देश्य</h2>
                    <p className="font-semibold text-xl mb-4 text-shipra-green-500">किसानों के साथ मिलकर — एक मजबूत कल के लिए।</p>
                    <p className="mb-4">शिप्रा सीड्स में, हमारा उद्देश्य सिर्फ बीज बेचना नहीं है — बल्कि किसानों का भरोसा जीतना और खेती को सफल बनाना है।</p>
                    <p className="mb-2">हर बीज जो हम देते हैं, उसमें छिपा होता है:</p>
                    <ul className="list-disc list-inside space-y-2 text-shipra-text mb-4">
                        <li>🌱 गुणवत्ता का भरोसा</li>
                        <li>🌾 बेहतर अंकुरण, बेहतर बढ़वार, और अधिक उपज</li>
                        <li>🚜 खेती को अधिक लाभदायक और टिकाऊ बनाना</li>
                    </ul>
                    <p>हम मानते हैं कि खेती सिर्फ काम नहीं — एक जीवनशैली है। जब किसान आगे बढ़ता है, तो पूरा समाज मजबूत होता है। हम सिर्फ फसल नहीं उगाते — हम भरोसा, अवसर और आशा उगाते हैं।</p>
                </section>

                {/* Card 5: Core Values */}
                <section className="bg-agri-green-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out md:col-span-2 flex flex-col justify-between">
                    <div>
                        <h2 className="font-montserrat text-2xl font-semibold mb-4 text-shipra-green-700">🛡️ हमारी मूल भावनाएं</h2>
                        <p className="font-semibold text-xl mb-4 text-shipra-green-500">नियम नहीं, हमारी कार्यशैली का हिस्सा।</p>
                        {/* Crucial info */}
                        <p className="mb-4">गुणवत्ता के प्रति हमारी प्रतिबद्धता का अर्थ है सावधानीपूर्वक नमी प्रबंधन, आनुवंशिक शुद्धता सुनिश्चित करना, और मिश्रण को रोकने के लिए सख्त प्रक्रियाओं के माध्यम से भौतिक शुद्धता बनाए रखना।</p>
                        <p className="mb-4">हम भावी पीढ़ियों के लिए अनुशंसित बीज दरों, न्यूनतम कीटनाशक उपयोग और संसाधन दक्षता की वकालत करके स्थायी खेती को बढ़ावा देते हैं।</p>
                        <p>हम मानते हैं कि हर बीज मायने रखता है, यह सुनिश्चित करते हुए कि प्रत्येक को सावधानी से संभाला जाए और बिना किसी बर्बादी के अपनी पूरी क्षमता को पूरा किया जाए, जिससे उत्पादक फसलों में योगदान हो।</p>
                    </div>
                    <button
                        onClick={() => openModal('हमारी मूल भावनाएं', coreValuesFullContent)}
                        className="mt-4 bg-shipra-green-500 text-white px-6 py-2 rounded-md hover:bg-shipra-green-700 transition-colors duration-300 self-start"
                    >
                        और जानें
                    </button>
                </section>

                {/* Card 6: Why Choose Us - MADE ATTRACTIVE */}
                <section className="bg-shipra-green-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out md:col-span-3 border border-shipra-green-200"> {/* Changed background and added a border */}
                    <div>
                        <h2 className="font-montserrat text-2xl font-semibold mb-4 text-shipra-green-700">क्यों चुनें Shipra Seeds?</h2>
                        <p className="font-semibold text-xl mb-4 text-shipra-green-500">वजहें जो किसानों को हम पर भरोसा दिलाती हैं:</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-center">
                            <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-center font-semibold text-shipra-green-700 border border-shipra-green-500 shadow-md transform hover:scale-105 transition-transform duration-300"> {/* Changed background, stronger border, added shadow and hover effect */}
                                <span className="text-3xl mb-2 text-agri-dark-green">💰</span> उचित मूल्य, कोई छुपा खर्च नहीं
                            </div>
                            <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-center font-semibold text-shipra-green-700 border border-shipra-green-500 shadow-md transform hover:scale-105 transition-transform duration-300"> {/* Changed background, stronger border, added shadow and hover effect */}
                                <span className="text-3xl mb-2 text-agri-dark-green">🧪</span> शुद्ध बीज — बिना मिलावट, बिना नकली नाम
                            </div>
                            <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-center font-semibold text-shipra-green-700 border border-shipra-green-500 shadow-md transform hover:scale-105 transition-transform duration-300"> {/* Changed background, stronger border, added shadow and hover effect */}
                                <span className="text-3xl mb-2 text-agri-dark-green">🌾</span> गुणवत्ता की स्थिरता — शुरुआत से स्टोरेज तक
                            </div>
                            <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-center font-semibold text-shipra-green-700 border border-shipra-green-500 shadow-md transform hover:scale-105 transition-transform duration-300"> {/* Changed background, stronger border, added shadow and hover effect */}
                                <span className="text-3xl mb-2 text-agri-dark-green">🤝</span> पारदर्शिता पर आधारित व्यापार
                            </div>
                        </div>
                        {/* Crucial info */}
                        <p className="mb-4 text-shipra-text">किसानों के लिए भरोसेमंद बीज, उचित दाम पर। कोई झूठे दावे नहीं, जो है वही दिखता है।</p>
                        <p className="mb-4 text-shipra-text">बीज की पहचान वही रहती है — जैसा वैज्ञानिकों ने नाम दिया। कोई पुराना बीज नए नाम से नहीं बेचा जाता।</p>
                        <p className="text-shipra-text">उच्च अंकुरण क्षमता वाले बीज, सही तरीके से संग्रहित, साफ़ और ताज़ा बीज। हर कदम पर सावधानी — ताकि खेत में अच्छे परिणाम मिलें।</p>
                    </div>
                    <button
                        onClick={() => openModal('क्यों चुनें Shipra Seeds?', whyChooseUsFullContent)}
                        className="mt-4 bg-shipra-green-500 text-white px-6 py-2 rounded-md hover:bg-shipra-green-700 transition-colors duration-300 self-start"
                    >
                        और जानें
                    </button>
                </section>
            </main>

            {/* Modal Component */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
                {modalContent}
            </Modal>
        </div>
    );
};

export default AboutUsPage;