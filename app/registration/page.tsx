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
import { client } from "@/sanity";
import statesAndDistricts from "@/components/statesAndDistricts.json";
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
  // required = true,
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
  // required?: boolean;
}) => (
  <div>
    <label
      htmlFor={name}
      className="flex items-center text-md font-medium text-green-100 mb-1"
    >
      {Icon && <Icon className="w-4 h-4 mr-2 text-yellow-400" />}
      {label}
      {/* {required && <span className="text-red-400 ml-1">*</span>} */}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      // required={required}
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

  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [showSuccess, setShowSuccess] = useState(false);

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

  useEffect(() => {
    setAvailableStates(Object.keys(statesAndDistricts));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prev) => ({
      ...prev,
      state: selectedState,
      district: "",
    }));
    setAvailableDistricts(statesAndDistricts[selectedState] || []);
    validateField("state", selectedState);
    validateField("district", ""); // clear district error if state changes
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFormData((prev) => ({
      ...prev,
      district: selectedDistrict,
    }));
    validateField("district", selectedDistrict);
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

    if (!formData.preferredLanguage)
      newErrors.preferredLanguage =
        errorText.preferredLanguage[language] || errorText.preferredLanguage.hi;
    if (!formData.state)
      newErrors.state = errorText.state[language] || errorText.state.hi;
    if (!formData.district)
      newErrors.district =
        errorText.district[language] || errorText.district.hi;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await addDoc(collection(db, "FarmerRegistrations"), {
        ...formData,
        timestamp: serverTimestamp(),
      });

      setShowSuccess(true);
      setFormData({
        name: "",
        mobileNumber: "",
        preferredLanguage: "",
        district: "",
        state: "",
      });
      setErrors({});
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
        const data = await client.fetch(
          `*[_type == "farmerSection"][0]{item1, item2, item3, item4, item5}`
        );
        setCardData(data);
      } catch (err) {
        setError("Failed to load content.");
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading Card Content...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

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

          <section className="bg-white/5 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm">
            <h2 className="flex items-center text-xl sm:text-2xl font-semibold text-white mb-6">
              <ClipboardList className="w-7 h-7 mr-3 text-yellow-400" />
              {t("registrationFormInfo")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <FormInput
                  label={t("farmerNameLabel")}
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
                <label className="flex items-center text-md font-medium text-green-100 mb-2">
                  <Languages className="w-4 h-4 mr-2 text-yellow-400" />
                  {t("language")}
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <select
                  name="preferredLanguage"
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                  // required
                  className="w-full p-3 bg-white/10 border border-green-400/50 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 outline-none"
                >
                  <option className="text-black" value="">
                    --
                  </option>
                  {languages.map((lang, index) => (
                    <option className="text-black" key={index} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                {errors.preferredLanguage && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.preferredLanguage}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center text-md font-medium text-green-100 mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                  {t("farmingLocation")}
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleStateChange}
                      // required
                      className="w-full p-3 bg-white/10 border border-green-400/50 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 outline-none"
                    >
                      <option className="text-black" value="">
                        {t("state")}
                      </option>
                      {availableStates.map((state) => (
                        <option
                          className="text-black"
                          key={state}
                          value={state}
                        >
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>
                  <div>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleDistrictChange}
                      // required
                      disabled={!formData.state}
                      className="w-full p-3 bg-white/10 border border-green-400/50 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 outline-none"
                    >
                      <option className="text-black" value="">
                        {t("district")}
                      </option>
                      {availableDistricts.map((district) => (
                        <option
                          className="text-black"
                          key={district}
                          value={district}
                        >
                          {district}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.district}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full flex items-center justify-center p-3.5 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold rounded-lg shadow-md"
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

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-green-800 w-full max-w-md sm:max-w-sm rounded-2xl shadow-xl text-center text-green-50 px-5 py-6 sm:px-6 sm:py-8">
            <CheckCircle className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              {t("registrationSuccessTitle") || "🎉 रजिस्ट्रेशन सफल!"}
            </h2>
            <p className="text-sm sm:text-base mb-4">
              {t("registrationSuccessMessage") ||
                "आपका फॉर्म सफलतापूर्वक सबमिट हो गया है।"}
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-green-900 font-bold rounded-lg shadow transition-colors text-sm sm:text-base"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerRegistrationPage;
