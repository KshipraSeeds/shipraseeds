"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import statesAndDistricts from "@/components/statesAndDistricts.json";

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
import { client } from "@/sanity";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

// --------------------- Form Input Component ---------------------
const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
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
}) => (
  <div>
    <label
      htmlFor={name}
      className="flex items-center text-md font-medium text-white mb-1"
    >
      {/* Icon color changed from amber-500 to orange-500 for better contrast/sophistication */}
      {Icon && <Icon className="w-4 h-4 mr-2 text-orange-500" />}
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      // Input background changed from green-800/75 to emerald-900/75 (darker)
      // Border changed from green-400/60 to emerald-600/60
      // Focus ring changed from amber-500 to orange-500
      className="w-full p-3 bg-emerald-900/75 border border-emerald-600/60 rounded-lg text-white placeholder-slate-300/80 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-300"
    />
  </div>
);

// --------------------- Retailer Page ---------------------
const RetailerPage = () => {
  const { lang: language, t } = useLanguage();

  const [formData, setFormData] = useState({
    state: "",
    district: "",
    name: "",
    mobileNumber: "",
    // Retaining 'रिटेलर' as a default if it's the required default value
    businessType: "रिटेलर", 
  });

  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setAvailableStates(Object.keys(statesAndDistricts));
  }, []);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    setFormData((prev) => ({
      ...prev,
      state: selectedState,
      district: "",
    }));
    setAvailableDistricts(statesAndDistricts[selectedState] || []);
    validateField("state", selectedState);
    validateField("district", "");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = e.target.value;
    setFormData((prev) => ({
      ...prev,
      district: selectedDistrict,
    }));
    validateField("district", selectedDistrict);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // --------------------- Validation ---------------------
  const validateField = (name: string, value: string) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      // Define error text dictionary here (or outside the component)
      const errorText = {
        name: {
          hi: "नाम आवश्यक है",
          en: "Name is required",
          pa: "ਨਾਮ ਲਾਜ਼ਮੀ ਹੈ",
        },
        mobileRequired: {
          hi: "मोबाइल नंबर आवश्यक है",
          en: "Mobile number is required",
          pa: "ਮੋਬਾਈਲ ਨੰਬਰ ਲਾਜ਼ਮੀ ਹੈ",
        },
        mobileInvalid: {
          hi: "कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें",
          en: "Please enter a valid 10-digit mobile number",
          pa: "ਕਿਰਪਾ ਕਰਕੇ 10 ਅੰਕਾਂ ਵਾਲਾ ਠੀਕ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ",
        },
        preferredLanguage: {
          hi: "भाषा आवश्यक है",
          en: "Language is required",
          pa: "ਭਾਸ਼ਾ ਲਾਜ਼ਮੀ ਹੈ",
        },
        state: {
          hi: "राज्य आवश्यक है",
          en: "State is required",
          pa: "ਰਾਜ ਲਾਜ਼ਮੀ ਹੈ",
        },
        district: {
          hi: "जिला आवश्यक है",
          en: "District is required",
          pa: "ਜ਼ਿਲ੍ਹਾ ਲਾਜ਼ਮੀ ਹੈ",
        },
      };

      // Remove error if valid
      switch (name) {
        case "name":
          if (!value.trim())
            newErrors.name = errorText.name[language] || errorText.name.hi;
          else delete newErrors.name;
          break;

        case "mobileNumber":
          if (!value.trim())
            newErrors.mobileNumber =
              errorText.mobileRequired[language] || errorText.mobileRequired.hi;
          else if (!/^\d{10}$/.test(value.trim()))
            newErrors.mobileNumber =
              errorText.mobileInvalid[language] || errorText.mobileInvalid.hi;
          else delete newErrors.mobileNumber;
          break;

        case "preferredLanguage":
          if (!value)
            newErrors.preferredLanguage =
              errorText.preferredLanguage[language] ||
              errorText.preferredLanguage.hi;
          else delete newErrors.preferredLanguage;
          break;

        case "state":
          if (!value)
            newErrors.state = errorText.state[language] || errorText.state.hi;
          else delete newErrors.state;
          break;

        case "district":
          if (!value)
            newErrors.district =
              errorText.district[language] || errorText.district.hi;
          else delete newErrors.district;
          break;

        default:
          break;
      }

      return newErrors;
    });
  };


  const validate = () => {
    const errorText = {
      name: {
        hi: "नाम आवश्यक है",
        en: "Name is required",
        pa: "ਨਾਮ ਲਾਜ਼ਮੀ ਹੈ",
      },
      mobileRequired: {
        hi: "मोबाइल नंबर आवश्यक है",
        en: "Mobile number is required",
        pa: "ਮੋਬਾਈਲ ਨੰਬਰ ਲਾਜ਼ਮੀ ਹੈ",
      },
      mobileInvalid: {
        hi: "कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें",
        en: "Please enter a valid 10-digit mobile number",
        pa: "ਕਿਰਪਾ ਕਰਕੇ 10 ਅੰਕਾਂ ਵਾਲਾ ਠੀਕ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ",
      },
      preferredLanguage: {
        hi: "भाषा आवश्यक है",
        en: "Language is required",
        pa: "ਭਾਸ਼ਾ ਲਾਜ਼ਮੀ ਹੈ",
      },
      state: {
        hi: "राज्य आवश्यक है",
        en: "State is required",
        pa: "ਰਾਜ ਲਾਜ਼ਮੀ ਹੈ",
      },
      district: {
        hi: "जिला आवश्यक है",
        en: "District is required",
        pa: "ਜ਼ਿਲ੍ਹਾ ਲਾਜ਼ਮੀ ਹੈ",
      },
    };

    const newErrors: Record<string, string> = {};

    if (!formData.name.trim())
      newErrors.name = errorText.name[language] || errorText.name.hi;

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber =
        errorText.mobileRequired[language] || errorText.mobileRequired.hi;
    } else if (!/^\d{10}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber =
        errorText.mobileInvalid[language] || errorText.mobileInvalid.hi;
    }

    
    if (!formData.state)
      newErrors.state = errorText.state[language] || errorText.state.hi;
    if (!formData.district)
      newErrors.district =
        errorText.district[language] || errorText.district.hi;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --------------------- Firestore Submit ---------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await addDoc(collection(db, "Retailer Queries"), {
        ...formData,
        timestamp: serverTimestamp(),
      });

      setShowSuccess(true);
      setFormData({
        name: "",
        mobileNumber: "",
        businessType: "रिटेलर",
        district: "",
        state: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error saving retailer registration:", error);
      alert(t("submissionError") || "Something went wrong. Please try again!");
    }
  };

  // --------------------- CMS content ---------------------
  const [cardData, setCardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(`*[_type == "retailerSection"][0]{
          item1, item2, item3, item4
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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="relative w-full min-h-screen overflow-hidden py-5 px-4">
      {/* Background gradient changed to muted amber-100 and emerald-100 */}
      <div className="absolute m-4 mb-0 sm:m-5 sm:mb-0 inset-0 bg-gradient-to-br from-amber-100 via-emerald-100 to-white opacity-95 rounded-[30px] sm:rounded-[42px]" />

      {/* Decorative icons changed from green-500 to emerald-600 (darker, more earthy) */}
      <Sprout className="absolute top-5 left-5 sm:top-10 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 text-emerald-600 opacity-50 transform -rotate-12 pointer-events-none" />
      <Leaf className="absolute bottom-5 right-5 sm:bottom-10 sm:right-10 w-16 h-16 sm:w-20 sm:h-20 text-emerald-600 opacity-50 transform rotate-12 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center px-4 pt-16 sm:pt-24 pb-12 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="w-full max-w-3xl mx-auto space-y-10"
        >
          <section className="text-center">
            {/* Slate text is fine for contrast */}
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans3">
              {cardData.item1?.[language] || cardData.item1?.hi}
            </p>
          </section>

          <header className="text-center">
            {/* Icon color changed from amber-500 to orange-500 */}
            <UserCircle className="mx-auto text-orange-500 h-12 w-12 sm:h-16 mb-3" />
            {/* Heading text changed from green-700 to emerald-800 */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-800 drop-shadow-sm font-heading3">
              👨‍🌾 {cardData.item2?.[language] || cardData.item2?.hi}
            </h1>
          </header>

          {/* Background changed from green-700/80 to emerald-800/90 (darker, less translucent) */}
          <section className="bg-emerald-800/90 p-6 rounded-xl shadow-lg backdrop-blur-sm">
            <ul className="space-y-2.5">
              <li className="flex items-start">
                {/* Icon color changed from amber-500 to orange-500 */}
                <CheckCircle className="w-5 h-5 text-orange-500 mr-2.5 mt-0.5 flex-shrink-0" />
                <span className="text-base sm:text-lg text-white mb-4 font-sans3">
                  {cardData.item3?.[language] || cardData.item3?.hi}
                </span>
              </li>
            </ul>
          </section>

          {/* Background changed from green-700/80 to emerald-800/90 */}
          <section className="bg-emerald-800/90 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm">
            {/* Heading icon color changed from amber-500 to orange-500 */}
            <h2 className="flex items-center text-xl sm:text-2xl font-semibold text-white mb-6 font-heading3">
              <ClipboardList className="w-7 h-7 mr-3 text-orange-500" />
              {t("basicFormInfo")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 font-sans3">
              <div>
                {/* FormInput component uses updated colors internally */}
                <FormInput
                  label={t("retailerNameLabel")}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("retailerNamePlaceholder")}
                  icon={UserCircle}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <FormInput
                  label={t("retailerMobileNumberLabel")}
                  name="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder={t("retailerMobileNumberPlaceholder")}
                  icon={Send}
                />
                {errors.mobileNumber && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.mobileNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-md font-medium text-white mb-2">
                  {/* Icon color changed from amber-500 to orange-500 */}
                  <ClipboardList className="w-5 h-5 mr-2 text-orange-500" />
                  {t("retailerBusinessType")}
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="flex gap-6 text-white text-xs">
                  {[t("retailerLabel"), t("wholesalerLabel")].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="businessType"
                        value={type}
                        checked={formData.businessType === type}
                        onChange={handleChange}
                        // Radio button colors changed from amber-500 & green-800 & green-400 to orange-500 & emerald-900 & emerald-600
                        className="w-4 h-4 accent-orange-500 bg-emerald-900 border-emerald-600/60 focus:ring-orange-500 focus:outline-none cursor-pointer"
                      />
                      <span className="text-sm">{t(type)}</span>
                    </label>
                  ))}
                </div>
                {errors.businessType && (
                  <p className="text-red-400 text-sm mt-1">{errors.businessType}</p>
                )}
              </div>

              <div>
                <label className="flex items-center text-md font-medium text-white mb-2">
                  {/* Icon color changed from amber-500 to orange-500 */}
                  <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                  {t("place")}
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleStateChange}
                      // Select field colors changed to emerald-900/75, emerald-600/60, and orange-500
                      className="w-full p-3 bg-emerald-900/75 border border-emerald-600/60 rounded-lg text-white focus:ring-2 focus:ring-orange-500 outline-none"
                    >
                      <option value="">{t("state")}</option>
                      {availableStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-red-400 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>
                  <div>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleDistrictChange}
                      disabled={!formData.state}
                      // Select field colors changed to emerald-900/75, emerald-600/60, and orange-500
                      className="w-full p-3 bg-emerald-900/75 border border-emerald-600/60 rounded-lg text-white focus:ring-2 focus:ring-orange-500 outline-none"
                    >
                      <option value="">{t("district")}</option>
                      {availableDistricts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="text-red-400 text-sm mt-1">{errors.district}</p>
                    )}
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                // Button color changed from amber-500/600 to a stronger orange-600/700
                className="w-full flex items-center justify-center p-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-md transition-colors duration-300 text-base sm:text-lg"
              >
                <Send className="w-5 h-5 mr-2" />
                {t("sendInquiry")}
              </motion.button>
            </form>
          </section>

          {/* Background changed from green-700/80 to emerald-800/90 */}
          <section className="bg-emerald-800/90 p-4 rounded-xl shadow-lg backdrop-blur-sm">
            <div className="flex items-start">
              {/* Icon color changed from amber-500 to orange-500 */}
              <AlertTriangle className="w-10 h-10 sm:w-6 sm:h-6 text-orange-500 mr-3 flex-shrink-0" />
              <div>
                {/* Heading color changed from amber-500 to orange-500 */}
                <h3 className="font-semibold text-orange-500 mb-1 font-heading3">
                  {t("note")}
                </h3>
                <p className="text-sm text-white leading-relaxed font-sans3">
                  {cardData.item4?.[language] || cardData.item4?.hi}
                </p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          {/* Success popup background changed from green-800 to emerald-900 */}
          <div className="bg-emerald-900 w-full max-w-md sm:max-w-sm rounded-2xl shadow-xl text-center text-green-50 px-5 py-6 sm:px-6 sm:py-8">
            {/* Icon color changed from yellow-400 to orange-400 */}
            <CheckCircle className="w-12 h-12 mx-auto text-orange-400 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              {t("retailerSuccessTitle") || "🎉 Successful!"}
            </h2>
            <p className="text-sm sm:text-base mb-4">
              {t("retailerSuccessMessage") ||
                "Your inquiry has been submitted successfully."}
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              // Button color changed from amber-500/600 to orange-600/700
              // Text color changed from green-900 to emerald-900 (for consistency, though green-900 is close)
              className="mt-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-emerald-900 font-bold rounded-lg shadow transition-colors text-sm sm:text-base"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetailerPage;
