import React from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";
import card2 from "@/public/freepik__the-style-is-candid-image-photography-with-natural__17002.png";

export const CardTwo = () => {
    return (
        <div className="relative sticky top-4 z-[20]">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-orange-100 rounded-[32px] p-6 sm:p-10 md:p-16 flex flex-col md:flex-row items-center shadow-2xl hover:shadow-3xl transition-all"
            >
                <div className="w-full md:w-1/2">
                    <Image
                        src={card2}
                        alt="Card 2"
                        className="rounded-[24px] w-full object-cover h-[220px] sm:h-[300px] md:h-[400px]"
                    />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0 md:ml-12">
                    <h3 className="text-orange-800 text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
                        क्या आप हमारे बीज खरीदने में रुचि रखते हैं?
                    </h3>
                    <p className="text-gray-600 mb-6 text-base sm:text-lg leading-relaxed">
                        अगर आप एक रिटेलर या थोक व्यापारी हैं और हमारे साथ काम करना चाहते हैं, तो अपनी पूछताछ भेजें। हम ऐसे नए साझेदारों का स्वागत करते हैं जो हमारे ब्रांड में रुचि रखते हैं।
                    </p>
                    <button className="bg-black text-white px-6 py-3 rounded-full transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:scale-105 hover:shadow-xl text-sm font-semibold shadow-md">
                        पूछताछ भेजें
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
