"use client";

import Image from "next/image";
import backgroundImage from "@/public/bg1.jpg";
import card1 from "@/public/freepik__candid-photography-with-natural-textures-and-highl__83704.png";
import card2 from "@/public/freepik__the-style-is-candid-image-photography-with-natural__17002.png";
import card3 from "@/public/freepik__the-style-is-candid-image-photography-with-natural__17003.jpeg";
import card31 from "@/public/bajra.webp";
import card32 from "@/public/wheat.jpg";
import card33 from "@/public/JowarSeeds.avif";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute m-5 inset-0 overflow-hidden rounded-[42px]">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover z-0 brightness-75"
            priority
          />
        </div>
        {/* <Image 
          src={backgroundImage} 
          alt="Background" 
          fill 
          className="object-cover z-0 brightness-75" 
          priority
        /> */}

        {/* Overlay content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white px-4">
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg"
          >
            भरोसे के बीज,
            <br />
            सपनों की फसल।
          </motion.h1>

          {/* Animated Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-lg md:text-2xl font-medium mb-8 max-w-2xl drop-shadow-md"
          >
            हम आपके खेती सहयोगी हैं — बीज तैयार करते हैं, सही सलाह देते हैं, और
            भरोसेमंद बीज समय पर पहुँचाते हैं।
          </motion.p>

          {/* Animated Button */}
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="bg-white text-green-700 font-semibold rounded-full px-8 py-4 flex items-center space-x-2 hover:bg-gray-100 transition-all shadow-lg"
          >
            <span>हमारे बारे में अधिक जानें</span>
            <span className="text-2xl">→</span>
          </motion.button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="py-20 px-6 md:px-24 bg-gray-50 min-h-[300vh]">
        <div className="relative flex flex-col space-y-14">
          {/* Card 1 */}
          <div className="sticky top-24 z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-green-100 rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row items-center shadow-2xl hover:shadow-3xl transition-all"
            >
              <div className="hidden md:block w-full md:w-1/2">
                <Image
                  src={card1}
                  alt="Farmer Registration"
                  className="rounded-[24px] w-full object-cover h-[400px]"
                />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0 md:ml-12">
                <motion.h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-green-800">
                हमारे किसान नेटवर्क से जुड़ें
                </motion.h3>
                <motion.p className="text-gray-700 mb-8 text-base md:text-lg leading-relaxed">
                  रजिस्टर करें और बुवाई की सलाह, बीज से जुड़ी जानकारी, नए सीड
                  वैरायटी की सूचना और सीजन के लिए बीज मार्गदर्शन पाएं।
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-700 text-white px-8 py-4 rounded-full hover:bg-green-800 text-base font-semibold shadow-md"
                >
                  अभी रजिस्टर करें
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Card 2 */}
          <div className="sticky top-32 z-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-orange-100 rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row items-center shadow-2xl hover:shadow-3xl transition-all"
            >
              {/* Image section */}
              <div className="hidden md:block w-full md:w-1/2">
                <Image
                  src={card2}
                  alt="Retailer Wholesaler Enquiry"
                  className="rounded-[24px] w-full object-cover h-[400px]"
                />
              </div>

              {/* Text section */}
              <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0 md:ml-12">
                <h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-orange-800">
                क्या आप हमारे बीज खरीदने में रुचि रखते हैं?
                </h3>
                <p className="text-gray-600 mb-8 text-base md:text-lg">
                अगर आप एक रिटेलर या थोक व्यापारी हैं और हमारे साथ काम करना चाहते हैं, तो अपनी पूछताछ भेजें। 
                  <br className="hidden md:block" />
                  हम ऐसे नए साझेदारों का स्वागत करते हैं जो हमारे ब्रांड में रुचि रखते हैं और हमसे गुणवत्तापूर्ण बीज खरीदना चाहते हैं।
                </p>
                <button className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 text-base">
                पूछताछ भेजें
                </button>
              </div>
            </motion.div>
          </div>

          {/* Card 3 */}
          <div className="sticky top-40 z-30 space-y-16">
            {/* Main Block */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-purple-100 rounded-3xl p-6 md:p-14 text-center shadow-lg hover:shadow-2xl transition-all"
            >
              <h3 className="text-2xl md:text-4xl font-bold text-purple-800 mb-4">
              हमारे बीज देखें
              </h3>
              <p className="text-gray-700 max-w-xl mx-auto mb-6 text-sm md:text-lg">
              विभिन्न फसलों और वैरायटी के लिए हमारे उत्पादों को देखें — पैक साइज और उपयोग की पूरी जानकारी के साथ।
              </p>

              {/* View Products Button - Hidden on mobile */}
              <div className="hidden md:block">
                <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition text-sm md:text-base">
                उत्पाद देखें
                </button>
              </div>

              {/* Crop Cards - Different layout for mobile */}
              <div className="mt-6 md:mt-10">
                {/* Mobile layout - horizontal cards */}
                <div className="md:hidden space-y-4">
                  {[
                    { title: "गेहूं", href: "/products/wheat", image: card32 },
                    { title: "बाजरा", href: "/products/bajra", image: card31 },
                    { title: "ज्वार", href: "/products/jowar", image: card33 },
                  ].map((crop, idx) => (
                    <Link key={idx} href={crop.href} className="block">
                      <motion.div
                        whileHover={{
                          y: -4,
                          scale: 1.02,
                          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                        }}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg p-3 flex items-center gap-4 transition cursor-pointer"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={crop.image}
                            alt={crop.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <h4 className="text-base font-semibold text-gray-800 flex-1 text-left">
                          {crop.title}
                        </h4>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* Desktop layout - original grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "गेहूं", href: "/products/wheat", image: card32 },
                    { title: "बाजरा", href: "/products/bajra", image: card31 },
                    { title: "ज्वार", href: "/products/jowar", image: card33 },
                  ].map((crop, idx) => (
                    <Link key={idx} href={crop.href} className="block">
                      <motion.div
                        whileHover={{
                          y: -8,
                          scale: 1.05,
                          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
                        }}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl pb-5 text-center transition cursor-pointer"
                      >
                        <Image
                          src={crop.image}
                          alt={crop.title}
                          className="rounded-t-xl h-40 w-full object-cover mb-4"
                        />
                        <h4 className="text-lg font-semibold text-gray-800">
                          {crop.title}
                        </h4>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Card 4 */}
          <div className="sticky top-48 z-40 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-blue-100 rounded-[32px] p-10 md:p-16 flex flex-col md:flex-row items-center shadow-2xl hover:shadow-3xl transition-all"
            >
              {/* Image Section */}
              <div className="hidden md:block w-full md:w-1/2">
                <Image
                  src={card3}
                  alt="Shipra Seeds"
                  className="rounded-[24px] w-full object-cover h-[400px]"
                />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0 md:ml-12">
                <h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-blue-800">
                हर बीज की बोरी के पीछे एक कहानी होती है।
                </h3>
                <p className="text-gray-700 mb-8 text-base md:text-lg">
                यह हमारी है — भरोसे, मेहनत और किसानों के लिए बनाई गई।
                </p>
                <button className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition text-base">
                शिप्रा सीड्स को जानिए
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
