"use client";

import { useEffect, useState } from "react";
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
import { useLanguage } from "../context/LanguageContext";
import { client, urlFor } from "@/sanity";

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
  const { lang: language, t } = useLanguage();

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

  const benefits = Array.isArray(t("benefits")) ? t("benefits") : [];
const languages = ["हिंदी", "English", "ਪੰਜਾਬੀ"];

const [cardData, setCardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

      useEffect(() => {
        const fetchCardData = async () => {
          try {
            setLoading(true);
            // Your GROQ query is already correct for fetching the data structure.
            const data =
              await client.fetch(`*[_type == "farmerSection"][0]{
    item1,
    item2,
    item3,
    item4,
    item5,

    
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
             {cardData.item1?.[language] || cardData.item1?.hi}
            </p>
          </section>

          <header className="text-center">
            <UserCircle className="mx-auto text-yellow-400 h-12 w-12 sm:h-16 mb-3" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-md">
              👨‍🌾 {cardData.item2?.[language] || cardData.item2?.hi}
            </h1>
          </header>

          <section className="bg-white/5 p-6 rounded-xl shadow-lg backdrop-blur-sm">
            <p className="text-base sm:text-lg text-green-100 mb-4">
              {t("registrationFormIntro")}
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
              {cardData.item3?.[language] || cardData.item3?.hi}
            </p>
            <p className="flex items-center justify-center text-green-100 text-sm sm:text-base">
              <Mail className="w-5 h-5 mr-2 text-yellow-400" />
              {cardData.item4?.[language] || cardData.item4?.hi}
            </p>
          </section>

          <section className="bg-white/5 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm">
            <h2 className="flex items-center text-xl sm:text-2xl font-semibold text-white mb-6">
              <ClipboardList className="w-7 h-7 mr-3 text-yellow-400" />
              {t("registrationFormInfo")}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label={t("farmerNameLabel")}
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("retailerNamePlaceholder")}
                icon={UserCircle}
              />
              <FormInput
                label={t("retailerMobileNumberLabel")}
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder={t("retailerMobileNumberPlaceholder")}
                icon={Send}
              />
              <div>
                <label className="flex items-center text-md font-medium text-green-100 mb-2">
                  <Languages className="w-4 h-4 mr-2 text-yellow-400" />
                  {t("language")}
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <select
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white/10 border border-green-400/50 rounded-lg text-white placeholder-green-200/70 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all duration-300"
                >
                  {languages.map((lang, index) => (
                    <option className="text-black" key={index} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                
              </div>

              <div>
                <label className="flex items-center text-md font-medium text-green-100 mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                  {t("farmingLocation")}
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder={t("district")}
                    required
                    className="w-full p-3 bg-white/10 border border-green-400/50 rounded-lg text-white placeholder-green-200/70 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all duration-300"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder={t("state")}
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
                {t("registerNow")}
              </motion.button>
            </form>
          </section>

          <section className="bg-white/5 p-4 rounded-xl shadow-lg backdrop-blur-sm">
            <div className="flex items-start">
              <AlertTriangle className="w-10 h-10 sm:w-6 sm:h-6 text-yellow-400 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-300 mb-1">
                  {t("note")}
                </h3>
                <p className="text-sm text-green-100 leading-relaxed">
                  {cardData.item5?.[language] || cardData.item5?.hi}
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
