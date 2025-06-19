"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserCircle,
  Leaf,
  Sprout,
  CheckCircle,
  Mail,
  ClipboardList,
  AlertTriangle,
  Send,
  Languages,
  MapPin,
} from "lucide-react";

import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  placeholder?: string;
  icon?: React.ElementType;
  required?: boolean;
}) => (
  <div>
    <label
      htmlFor={name}
      className="flex items-center text-md font-medium text-green-100 mb-1"
    >
      {Icon && <Icon className="w-4 h-4 mr-2 text-yellow-400" />}
      {label}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full p-3 bg-white/10 border border-green-400/50 rounded-lg text-white placeholder-green-200/70 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all duration-300"
    />
  </div>
);

const FarmerRegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    preferredLanguage: "",
    district: "",
    state: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "farmerRegistrations"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      alert("🎉 आपका रजिस्ट्रेशन सफल रहा!");
      setFormData({
        name: "",
        mobileNumber: "",
        preferredLanguage: "",
        district: "",
        state: "",
      });
    } catch (error) {
      alert("❌ फॉर्म जमा करने में त्रुटि हुई। कृपया पुनः प्रयास करें।");
    }
  };

  const benefits = [
    "खेती से जुड़ी सलाह और मौसमी सुझाव",
    "हमारी नई वैरायटीज़ की जानकारी",
    "उपज, गुण और फील्ड परफॉर्मेंस से जुड़ी उपयोगी जानकारी",
    "किसानों के लिए सीधे भेजे जाने वाले अपडेट",
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden py-5 px-4">
      <div className="absolute m-4 mb-0 sm:m-5 sm:mb-0 inset-0 bg-gradient-to-br from-green-700 via-teal-800 to-blue-900 opacity-95 rounded-[30px] sm:rounded-[42px]" />
      <Sprout className="absolute top-5 left-5 sm:top-10 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 text-white opacity-30 transform -rotate-12 pointer-events-none" />
      <Leaf className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 w-16 h-16 sm:w-20 sm:h-20 text-white opacity-30 transform rotate-12 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-white px-4 pt-16 sm:pt-24 pb-12 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="w-full max-w-3xl mx-auto space-y-10"
        >
          <section className="text-center">
            <p className="text-green-200 text-sm sm:text-base leading-relaxed">
              यह एक फॉर्म है किसानों, उगाने वालों और कृषकों के लिए, हमसे जुड़ने हेतु।
            </p>
          </section>

          <header className="text-center">
            <UserCircle className="mx-auto text-yellow-400 h-12 w-12 sm:h-16 mb-3" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-md">
              👨‍🌾 किसान रजिस्ट्रेशन फॉर्म
            </h1>
          </header>

          <section className="bg-white/5 p-6 rounded-xl shadow-lg backdrop-blur-sm">
            <p className="text-base sm:text-lg text-green-100 mb-4">
              अगर आप धान या गेहूं की खेती करते हैं, तो यह फॉर्म आपके लिए है। इसमें रजिस्ट्रेशन करके आप पाएंगे:
            </p>
            <ul className="space-y-2.5">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mr-2.5 mt-0.5 flex-shrink-0" />
                  <span className="text-green-50">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="text-center space-y-2">
            <p className="text-lg sm:text-xl font-semibold text-yellow-300">
              शिप्रा सीड्स से सीधा जुड़ाव रखें। अपडेट पाएं। बेहतर खेती करें।
            </p>
            <p className="flex items-center justify-center text-green-100 text-sm sm:text-base">
              <Mail className="w-5 h-5 mr-2 text-yellow-400" />
              फॉर्म भरने में एक मिनट से भी कम समय लगेगा।
            </p>
          </section>

          <section className="bg-white/5 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm">
            <h2 className="flex items-center text-xl sm:text-2xl font-semibold text-white mb-6">
              <ClipboardList className="w-7 h-7 mr-3 text-yellow-400" />
              कृपया नीचे अपनी जानकारी भरें:
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label="आपका नाम"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="आपका पूरा नाम"
                icon={UserCircle}
              />
              <FormInput
                label=" मोबाइल नंबर"
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="आपका मोबाइल नंबर"
                icon={Send}
              />
              <FormInput
                label="पसंदीदा भाषा"
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleChange}
                placeholder="उदाहरण: हिन्दी, अंग्रेज़ी, पंजाबी"
                icon={Languages}
              />

              <div>
                <label className="flex items-center text-md font-medium text-green-100 mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                  आपका खेती करने का स्थान:
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="जिला"
                    required
                    className="w-full p-3 bg-white/10 border border-green-400/50 rounded-lg text-white placeholder-green-200/70 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all duration-300"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="राज्य"
                    required
                    className="w-full p-3 bg-white/10 border border-green-400/50 rounded-lg text-white placeholder-green-200/70 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full flex items-center justify-center p-3.5 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold rounded-lg shadow-md transition-colors duration-300 text-base sm:text-lg"
              >
                <Send className="w-5 h-5 mr-2" />
                अभी रजिस्टर करें
              </motion.button>
            </form>
          </section>

          <section className="bg-white/5 p-4 rounded-xl shadow-lg backdrop-blur-sm">
            <div className="flex items-start">
              <AlertTriangle className="w-10 h-10 sm:w-6 sm:h-6 text-yellow-400 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-300 mb-1">नोट:</h3>
                <p className="text-sm text-green-100 leading-relaxed">
                  यह फॉर्म केवल उन किसानों के लिए है जो शिप्रा सीड्स से जुड़े रहना चाहते हैं। आपकी जानकारी केवल हमारी टीम के उपयोग के लिए है — कहीं और साझा नहीं की जाएगी।
                </p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default FarmerRegistrationPage;
