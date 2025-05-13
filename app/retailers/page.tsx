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
  ChevronDown,
} from "lucide-react";

// Helper component for form input fields for better structure
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
      {/* Text color changed to white */}
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
      businessType: "", // <-- new field
      district: "",
      state: "",
    });
  };

  //   const benefits = [
  //     "Get crop advice and seasonal farming tips",
  //     "Receive updates about new varieties we offer",
  //     "Get useful messages on yield, traits, and field performance",
  //     "Stay informed through direct farmer notifications",
  //   ];

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
              {/* This text is directly on gradient, kept dark for now for yellow bg contrast */}
              यह पेज उन लोगों के लिए है: जो रिटेलर, होलसेलर या बीज विक्रेता हैं
              और Shipra Seeds के बीज बेचने में रुचि रखते हैं।
            </p>
          </section>

          <header className="text-center">
            <UserCircle className="mx-auto text-amber-500 h-12 w-12 sm:h-16 sm:h-16 mb-3" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-700 drop-shadow-sm">
              {" "}
              {/* Main title kept dark green for contrast on light gradient top */}
              👨‍🌾 व्यापारी जानकारी फॉर्म
            </h1>
          </header>

          {/* Sections now have darker backgrounds to support white text */}
          <section className="bg-green-700/80 p-6 rounded-xl shadow-lg backdrop-blur-sm">
            {" "}
            {/* BG Updated */}
            <ul className="space-y-2.5">
              {
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-amber-500 mr-2.5 mt-0.5 flex-shrink-0" />
                  <span className="text-base sm:text-lg text-white mb-4">{`अगर आप हमारे बीज बेचना चाहते हैं या रिटेलर / डिस्ट्रीब्यूटर के रूप
              में हमारे साथ काम करना चाहते हैं, तो कृपया यह फॉर्म भरें। हमारी
              टीम आपकी जानकारी की समीक्षा करेगी और अगर कोई उपयुक्त अवसर होगा, तो
              हम आपसे संपर्क करेंगे।`}</span>{" "}
                  {/* Text color changed to white */}
                </li>
              }
            </ul>
          </section>

          {/* <section className="text-center space-y-2">
            <p className="text-lg sm:text-xl font-semibold text-amber-600">
              Get updates straight from Shipra Seeds. Stay connected. Grow
              better with us.
            </p>
            <p className="flex items-center justify-center text-slate-700 text-sm sm:text-base">
              {" "}
              <Mail className="w-5 h-5 mr-2 text-amber-500" />
              Fill and join in — it takes less than a minute.
            </p>
          </section> */}

          <section className="bg-green-700/80 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm">
            {/* BG Updated */}
            <h2 className="flex items-center text-xl sm:text-2xl font-semibold text-white mb-6">
              <ClipboardList className="w-7 h-7 mr-3 text-amber-500" />
              कृपया अपनी बुनियादी जानकारी साझा करें:
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label="दुकान / व्यवसाय का नाम"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="आपका पूरा नाम"
                icon={UserCircle}
              />

              <FormInput
                label="मोबाइल नंबर"
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="आपका मोबाइल नंबर"
                icon={Send}
              />

              {/* व्यवसायकाप्रकार (रिटेलर / होलसेलर) */}
              <div>
                <label className="flex items-center text-lg font-medium text-white mb-2">
                  <ClipboardList className="w-5 h-5 mr-2 text-amber-500" />
                  व्यवसाय का प्रकार:
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="flex gap-6 text-white text-sm">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="businessType"
                      value="रिटेलर"
                      checked={formData.businessType === "रिटेलर"}
                      onChange={handleChange}
                      className="w-6 h-6 accent-amber-500 bg-green-800 border-green-400/60 focus:ring-yellow-500 focus:outline-none cursor-pointer"
                      required
                    />
                    <span className="text-base">रिटेलर</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="businessType"
                      value="होलसेलर"
                      checked={formData.businessType === "होलसेलर"}
                      onChange={handleChange}
                      className="w-6 h-6 accent-amber-500 bg-green-800 border-green-400/60 focus:ring-yellow-500 focus:outline-none cursor-pointer"
                      required
                    />
                    <span className="text-base">होलसेलर</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="flex items-center text-md font-medium text-white mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-amber-500" />
                  स्थान:
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
                    className="w-full p-3 bg-green-800/75 border border-green-400/60 rounded-lg text-white placeholder-slate-300/80 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-300"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="राज्य"
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
                पूछताछ भेजें
              </motion.button>
            </form>
          </section>

          <section className="bg-green-700/80 p-4 rounded-xl shadow-lg backdrop-blur-sm">
            {" "}
            {/* BG Updated */}
            <div className="flex items-start">
              <AlertTriangle className="w-10 h-10 sm:w-6 sm:h-6 text-amber-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-500 mb-1">नोट:</h3>{" "}
                {/* Accent color kept for heading */}
                <p className="text-sm text-white leading-relaxed">
                  {" "}
                  {/* Text color changed to white */}
                  यह फॉर्म केवल उन बीज विक्रेताओं के लिए है जो Shipra Seeds के
                  साथ संपर्क में रहना चाहते हैं। आपकी जानकारी सिर्फ हमारी टीम
                  द्वारा इस्तेमाल की जाएगी — कोई स्पैम नहीं, और नहीं किसी तीसरे
                  पक्ष के साथ साझा की जाएगी।
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
