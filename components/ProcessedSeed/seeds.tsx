import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Sparkle,
  ShieldCheck,
  FlaskConical,
  Wallet,
  ArrowRight,
} from "lucide-react";
import Link from "next/link"; // Assuming you might use this elsewhere, keeping it.

const seedPoints = [
  {
    id: "a",
    title: "बेहतर अंकुरण और एक समान बढ़वार",
    summary:
      "प्रोसेस्ड बीजों को ध्यान से छांटा जाता है, ताकि केवल मोटे, स्वस्थ और परिपक्व दाने चुने जाएं। इससे अंकुरण सुधरता है और फसल की बढ़वार एक समान होती है।",
    readMore: `छंटाई बीज प्रोसेसिंग की एक अहम प्रक्रिया है। बीज मशीनों से गुज़ारे जाते हैं जो उन्हें आकार, वजन और बनावट के आधार पर अलग करती हैं। इससे टूटे, सूखे या अधपके बीज हट जाते हैं और केवल वो बीज चुने जाते हैं जिनमें पोषण ज़्यादा होता है और अंकुरण की संभावना अधिक होती है।

इससे जो बीज का लॉट तैयार होता है वो एकसमान होता है। जब ऐसे बीज बोए जाते हैं तो अंकुरण भी एकसमान होता है और पौध बेहतर तरीके से खेत में स्थापित होते हैं।

कमज़ोर बीज पहले ही हटा दिए जाते हैं, जिससे अधिक बीज डालने की ज़रूरत नहीं रहती। यानी बीज दर कम हो जाती है, और इससे लागत व मेहनत दोनों की बचत होती है।`,
    example:
      "घर में सहेजे गए बीजों में अक्सर छोटे, हल्के या अधपके दाने होते हैं, जो देर से अंकुरित होते हैं या नहीं होते। जबकि ग्रेड किए हुए बीज तेज़ और संतुलित अंकुरण देते हैं।",
    analogy: `जैसे आप खाना पकाने के लिए साफ़, पूरे दानों वाला चावल इस्तेमाल करते हैं — अगर उसमें टूटे या खराब दाने हों, तो खाना भी सही नहीं बनता। बीज भी कुछ ऐसे ही होते हैं — एकसमान गुणवत्ता से नतीजे बेहतर आते हैं।`,
    href: "/why-processed-seed#a", // Example href
    icon: <Sparkle className="w-6 h-6 text-purple-600" />,
  },
  {
    id: "b",
    title: "उपचारित बिना उपचारित बीज – सुरक्षित शुरुआत, बेहतर परिणाम",
    summary:
      "उपचारित बीज शुरू से ही फसल को कीटों, बीमारियों और नुकसान से बचाते हैं। ये तेजी से, मजबूती से बढ़ते हैं और उपज बेहतर होती है।",
    readMore: `चावल जैसे फसलों में बीज को फफूंदनाशक, कीटनाशक और सूक्ष्म पोषकतत्वों से लेपित किया जाता है। यह बीज को फंगल रोगों जैसे ब्लास्ट या बैक्टीरियल ब्लाइट और मिट्टी के कीटों से बचाते हैं।

शुरुआती 10–15 दिन सबसे अहम होते हैं— और अगर बीज इस समय को सुरक्षित पार कर जाए, तो पूरी फसल मजबूत होती है।

घर के सहेजे गए बीज आमतौर पर उपचारित नहीं होते, जिससे अंकुरण असमान होता है, बीमारियों का खतरा अधिक रहता है, और पौध कमजोर हो सकते हैं। बाद में ज़्यादा स्प्रे की ज़रूरत भी पड़ सकती है— लेकिन तब तक नुक़सान हो चुका होता है।

उपचारित बीज फसल को एक अच्छी शुरुआत देते हैं, जिससे टिलर मजबूत होते हैं और उपज ज़्यादा आती है।

तो गेहूं का क्या?

अभी हम गेहूं के बीजों का रासायनिक उपचार नहीं करते क्योंकि गेहूं में प्रारंभिक कीट और रोग का खतरा तुलनात्मक रूप से कम होता है। लेकिन छंटाई और सफाई से बड़ा फर्क पड़ता है।

ग्रेड किए गए गेहूं के बीज से:
• हर पौधे में ज़्यादा टिलर आते हैं
• दानों का विकास बेहतर होता है
• फसल ज़्यादा मजबूत और संतुलित दिखती है`,
    example:
      "दो खेतों में जब एक में उपचारित बासमती धान लगाया गया और दूसरे में बिना उपचार वाला — तो इलाज वाले बीजों में अंकुरण तेज़ और फसल खड़ी अच्छी मिली। गेहूं में भी ग्रेडेड बीजों से ज्यादा तिलर और मोटे दाने देखे गए।",
    analogy: `यह वैसा ही है जैसे किसी बच्चे को स्कूल भेजने से पहले वैक्सीनेशन देना। वैक्सीनेटेड बच्चा स्वस्थ और आगे बढ़ता है, जबकि बिना टीके वाला बार-बार बीमार पड़ता है और पीछे रह जाता है।`,
    href: "/why-processed-seed#b",
    icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
  },
  {
    id: "c",
    title: "जांच-परखा, भरोसेमंद और आपकी उपज की नींव",
    summary:
      "प्रोसेस्ड बीज प्रयोगशाला में जांचे जाते हैं और इनकी गुणवत्ता प्रमाणित होती है। ये फसल के लिए एक भरोसेमंद शुरुआत देते हैं और उत्पादन की नींव बनते हैं।",
    readMore: `अनुमान के अनुसार, अकेले उच्च गुणवत्ता वाले बीज का फसल उत्पादन में 15–20% तक सीधा योगदान होता है। और यदि बाकी इनपुट जैसे खाद, सिंचाई और रसायनों का बेहतर प्रबंधन हो, तो यह योगदान 45% तक बढ़ सकता है। लेकिन बीज का यह 15–20% योगदान ही पूरी फसल की बुनियाद बनाता है—जैसे एक इमारत की मजबूत नींव।

प्रोसेस्ड बीज निम्न परीक्षणों से गुजरते हैं:
• अंकुरण दर (%)
• नमी की मात्रा
• आनुवंशिक शुद्धता
• बीज स्वास्थ्य (रोग/कीट की जांच)

यह सिर्फ आंकड़े नहीं होते—यह गारंटी होती है कि बीज अंकुरित होगा, टिकेगा और सही तरीके से बढ़ेगा।

इसके विपरीत, घर में सहेजे गए बीजों की कोई लैब जांच नहीं होती। चाहे भंडारण कितना भी अच्छा हो, उनकी वास्तविक स्थिति अनिश्चित होती है—और वही अनिश्चितता एक जोखिम बन जाती है।`,
    example:
      "एक किसान जो ज़ांच-परखा बीज लेता है, उसे पता होता है कि वह क्या बो रहा है—जैसे कोई मशीन वारंटी के साथ खरीदना। वहीं, जो किसान घर का बीज इस्तेमाल करता है, वह सिर्फ अनुमान लगा रहा होता है।",
    analogy: `यह वैसा है जैसे कोई साफ़ सुथरे इंजन और भरे हुए टैंक के साथ यात्रा शुरू करे, और कोई पुरानी केन में बचे हुए डीजल से। सफ़र में फर्क दिखेगा—दूरी, रफ़्तार और भरोसे में।`,
    href: "/why-processed-seed#c",
    icon: <FlaskConical className="w-6 h-6 text-blue-600" />,
  },
  {
    id: "d",
    title: "असली फायदा, कम जोखिम – एक समझदारी भरा निवेश",
    summary:
      "प्रोसेस्ड बीज थोड़े महंगे लग सकते हैं, लेकिन यह जोखिम कम करते हैं, मेहनत बचाते हैं और ज़्यादा मुनाफ़ा देते हैं। घरेलू बीजों की छुपी हुई लागत, उनकी सस्ती कीमत से ज़्यादा होती है।",
    readMore: `खाद्य या कीटनाशकों के मुकाबले बीज सबसे कम लागत वाला इनपुट होता है—लेकिन इसका असर सबसे गहरा होता है। एक अच्छा बीज भले ही शुरू में महंगा लगे, पर यह अंकुरण, बढ़वार और अंतिम उपज में बड़ा अंतर लाता है। कई बार यह खाद या दवाओं से भी ज्यादा असर दिखाता है।

कंपनियों को कीटनाशक और दवाओं से ज्यादा मुनाफा मिलता है, इसलिए बाजार उसी ओर धकेलता है। लेकिन अगर बीज ही मजबूत नहीं है, तो बाकी सब चीजें असर नहीं कर पाएंगी।

घरेलू बीजों के छुपे नुकसान:
• कम और असमान अंकुरण
• बार-बार बुवाई की ज़रूरत
• खरपतवार ज्यादा
• रोग और कीटों का ज्यादा खतरा
• मेहनत ज्यादा, उपज कम

प्रोसेस्ड बीजों के लाभ:
• साफ़-सुथरे और सीधे बुवाई के लिए तैयार
• कम स्प्रे की ज़रूरत
• खाद और पानी का बेहतर उपयोग
• मन की शांति और उपज में भरोसा`,
    example:
      "अगर आप ₹300–₹400 बीज पर बचा लें, और उससे उपज 10% कम हो जाए, तो आपको ₹2000–₹3000 प्रति एकड़ नुकसान हो सकता है। तो असली फायदा कहां है?",
    analogy: `यह वैसे ही है जैसे आप ट्रैक्टर के लिए सस्ते टायर ले लें। वो थोड़ी देर चलेंगे, लेकिन जल्दी घिस जाएंगे, फिसलेंगे और आखिर में ज़्यादा नुकसान देंगे।`,
    href: "/why-processed-seed#d",
    icon: <Wallet className="w-6 h-6 text-yellow-600" />,
  },
];

export const WhyProcessedSeedCard = () => {
  const [openId, setOpenId] = useState < string | null > (null);
  const [modalOpen, setModalOpen] = useState < boolean > (false);
  const [modalContent, setModalContent] = useState < any > (null); // Using 'any' for simplicity here

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const openModal = (point: any) => {
    setModalContent(point);
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll when modal is open
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
    document.body.style.overflow = 'auto'; // Restore background scroll
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 border border-purple-200 rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl max-w-5xl mx-auto my-12 sm:my-16">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-purple-800 mb-6 sm:mb-8 text-center">
        🌾 प्रोसेस्ड बीज क्यों ज़रूरी हैं?
      </h2>

      <div className="space-y-4 sm:space-y-6">
        {seedPoints.map((point) => (
          <div
            key={point.id}
            className="bg-white hover:bg-purple-50 border border-purple-200 rounded-2xl px-4 py-4 sm:px-6 sm:py-5 transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <button
              onClick={() => toggle(point.id)}
              className="w-full flex justify-between items-center text-left focus:outline-none"
              aria-expanded={openId === point.id}
              aria-controls={`content-${point.id}`}
            >
              <div className="flex items-center gap-3">
                {point.icon}
                <h3 className="text-md sm:text-lg lg:text-xl font-semibold text-purple-900 group-hover:text-purple-700">
                  {point.id}. {point.title}
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
                  ? "max-h-96 mt-3 opacity-100" // Increased max-h for potentially longer summaries
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <p className="text-gray-700 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
                {point.summary}
              </p>
              <button
                onClick={() => openModal(point)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors duration-300 group/button"
              >
                विस्तार से जानें
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && modalContent && ( // Ensure modalContent is not null
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4" // Darker, more focused overlay
          onClick={closeModal} // Close on overlay click
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-xl shadow-2xl w-full max-w-xl md:max-w-2xl lg:max-w-3xl relative flex flex-col" // Gradient background for modal
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            style={{ maxHeight: 'calc(100vh - 4rem)' }} // Max height with some padding
          >
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
              <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-purple-800">
                {modalContent.icon && React.cloneElement(modalContent.icon, { className: "w-7 h-7 text-purple-700 inline mr-2" })}
                {modalContent.title}
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

            <div className="p-4 sm:p-6 overflow-y-auto flex-grow"> {/* Scrollable content area */}
              <div className="prose prose-sm sm:prose-base max-w-none text-gray-800 leading-relaxed"> {/* Using Tailwind Typography for better text styling */}
                {/* Using dangerouslySetInnerHTML for readMore as it contains newlines/paragraphs. Be cautious if this content can be user-generated. */}
                <div dangerouslySetInnerHTML={{ __html: modalContent.readMore.replace(/\n/g, '<br />') }} className="mb-4 sm:mb-6" />

                {modalContent.example && (
                  <>
                    <h4 className="text-md sm:text-lg font-semibold text-purple-700 mt-4 mb-1 sm:mb-2">उदाहरण:</h4>
                    <p className="mb-4 sm:mb-6 italic bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400">{modalContent.example}</p>
                  </>
                )}
                {modalContent.analogy && (
                  <>
                    <h4 className="text-md sm:text-lg font-semibold text-purple-700 mt-4 mb-1 sm:mb-2">उपमा:</h4>
                    <p className="italic bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">{modalContent.analogy}</p>
                  </>
                )}
              </div>
            </div>
            {/* <div className="p-4 sm:p-6 border-t border-gray-200 text-right">
                <Link href={modalContent.href || "#"} legacyBehavior>
                    <a
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
                        target="_blank" // Optional: if you want links to open in a new tab
                        rel="noopener noreferrer" // Optional: for security with target="_blank"
                    >
                        और अधिक जानें <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                </Link>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

// Add this to your global CSS or a <style jsx global> tag if using Next.js specific styling
/*
body {
  // When modal is open, this will be handled by JS to prevent scrolling
}

// Optional: Custom scrollbar for webkit browsers (Chrome, Safari, Edge)
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c084fc; // purple-400
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a855f7; // purple-500
}
*/