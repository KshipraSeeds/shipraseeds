"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  UserCircle,
  Leaf,
  Sprout,
  CheckCircle,
  ClipboardList,
  AlertTriangle,
  Send,
  MapPin,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { client, urlFor } from "@/sanity";

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
      className="flex items-center text-md font-medium text-white mb-1"
    >
      {" "}
      {Icon && <Icon className="w-4 h-4 mr-2 text-amber-500" />}
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
      className="w-full p-3 bg-green-800/75 border border-green-400/60 rounded-lg text-white placeholder-slate-300/80 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300" // BG, text, placeholder, border updated
    />
  </div>
);

const RetailerPage = () => {
    const { lang: language, t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    businessType: "रिटेलर", // <-- new field
    district: "",
    state: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Farmer Registration Data:", formData);
    alert("Registration submitted! (Check console for data)");
    setFormData({
      name: "",
      mobileNumber: "",
      businessType: "",
      district: "",
      state: "",
    });
  };

    const [cardData, setCardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

      useEffect(() => {
        const fetchCardData = async () => {
          try {
            setLoading(true);
            // Your GROQ query is already correct for fetching the data structure.
            const data =
              await client.fetch(`*[_type == "retailerSection"][0]{
    item1,
    item2,
    item3,
    item4,
    
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
      <div className="absolute m-4 mb-0 sm:m-5 sm:mb-0 inset-0 bg-gradient-to-br from-yellow-300 via-green-500 to-white opacity-95 rounded-[30px] sm:rounded-[42px]" />

      <Sprout className="absolute top-5 left-5 sm:top-10 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 text-green-500 opacity-50 transform -rotate-12 pointer-events-none" />
      <Leaf className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 w-16 h-16 sm:w-20 sm:h-20 text-green-500 opacity-50 transform rotate-12 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-4 pt-16 sm:pt-24 pb-12 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="w-full max-w-3xl mx-auto space-y-10"
        >
          <section className="text-center">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {" "}
              {cardData.item1?.[language] || cardData.item1?.hi}
            </p>
          </section>

          <header className="text-center">
            <UserCircle className="mx-auto text-amber-500 h-12 w-12 sm:h-16 sm:h-16 mb-3" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-700 drop-shadow-sm">
              {" "}
              👨‍🌾{cardData.item2?.[language] || cardData.item2?.hi}

            </h1>
          </header>

          <section className="bg-green-700/80 p-6 rounded-xl shadow-lg backdrop-blur-sm">
            {" "}
            <ul className="space-y-2.5">
              {
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-amber-500 mr-2.5 mt-0.5 flex-shrink-0" />
                  <span className="text-base sm:text-lg text-white mb-4">  {cardData.item3?.[language] || cardData.item3?.hi}</span>{" "}
                  {/* Text color changed to white */}
                </li>
              }
            </ul>
          </section>

          <section className="bg-green-700/80 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm">
            {/* BG Updated */}
            <h2 className="flex items-center text-xl sm:text-2xl font-semibold text-white mb-6">
              <ClipboardList className="w-7 h-7 mr-3 text-amber-500" />
             {t("basicFormInfo")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label={t("retailerNameLabel")}
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

              {/* व्यवसायकाप्रकार (रिटेलर / होलसेलर) */}
              <div>
                <label className="flex items-center text-md font-medium text-white mb-2">
                  <ClipboardList className="w-5 h-5 mr-2 text-amber-500" />
                  {t("retailerBusinessType")}
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="flex gap-6 text-white text-xs">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="businessType"
                      value="रिटेलर"
                      checked={formData.businessType === "रिटेलर"}
                      onChange={handleChange}
                      className="w-4 h-4 accent-amber-500 bg-green-800 border-green-400/60 focus:ring-yellow-500 focus:outline-none cursor-pointer"
                      required
                    />
                    <span className="text-base text-sm">{t("retailer")}</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="businessType"
                      value="होलसेलर"
                      checked={formData.businessType === "होलसेलर"}
                      onChange={handleChange}
                      className="w-4 h-4 accent-amber-500 bg-green-800 border-green-400/60 focus:ring-yellow-500 focus:outline-none cursor-pointer"
                      required
                    />
                    <span className="text-base text-sm">{t("wholesaler")}</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="flex items-center text-md font-medium text-white mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-amber-500" />
                  {t("place")}
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
                    className="w-full p-3 bg-green-800/75 border border-green-400/60 rounded-lg text-white placeholder-slate-300/80 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder={t("state")}
                    required
                    className="w-full p-3 bg-green-800/75 border border-green-400/60 rounded-lg text-white placeholder-slate-300/80 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full flex items-center justify-center p-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg shadow-md transition-colors duration-300 text-base sm:text-lg"
              >
                <Send className="w-5 h-5 mr-2" />
                {t("sendInquiry")}
              </motion.button>
            </form>
          </section>

          <section className="bg-green-700/80 p-4 rounded-xl shadow-lg backdrop-blur-sm">
            {" "}
            <div className="flex items-start">
              <AlertTriangle className="w-10 h-10 sm:w-6 sm:h-6 text-amber-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-500 mb-1">{t("note")}</h3>{" "}
                <p className="text-sm text-white leading-relaxed">
                  {" "}
                                {cardData.item4?.[language] || cardData.item4?.hi}

                </p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default RetailerPage;
