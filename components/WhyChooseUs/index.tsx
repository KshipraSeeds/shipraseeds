// components/WhyChooseUs.tsx
import React from 'react';
import { ShieldCheck, Leaf, Award, DollarSign, Sparkles, Gem } from 'lucide-react'; // Added more icon options

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  accentColorClass: string; // e.g., 'bg-agri-green-light', 'text-agri-green-deep'
  iconColorClass: string;   // e.g., 'text-agri-green-deep'
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  accentColorClass,
  iconColorClass,
}) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-custom-medium hover:shadow-custom-hover transition-all duration-300 overflow-hidden group transform hover:-translate-y-1 ">
      <div className={`relative p-6 flex flex-col items-center text-center ${accentColorClass}-light-bg `}> {/* Custom class or inline style if needed for light bg */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${accentColorClass}`}>
          <Icon className={`w-8 h-8 ${iconColorClass}`} strokeWidth={2} />
        </div>
        <h3 className="text-xl font-semibold text-agri-text-dark mb-1">{title}</h3>
      </div>
      <div className="p-6 pt-2 text-center flex-grow">
        <p className="text-agri-text-light leading-relaxed text-sm">
          {description}
        </p>
      </div>
      <div className={`h-1.5 ${accentColorClass} transition-all duration-300 group-hover:h-2.5`}></div>
    </div>
  );
};

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      id: 1,
      icon: Award, // Changed for more "premium" feel
      title: "गुणवत्ता",
      description: "हम हर बीज की खेप को सावधानी से प्रोसेस और टेस्ट करते हैं — ताकि उच्च अंकुरण, शुद्धता और विश्वसनीय प्रदर्शन सुनिश्चित किया जा सके।",
      accentColorClass: "bg-agri-green-medium", // Main part of accent color
      iconColorClass: "text-white",
    },
    {
      id: 2,
      icon: Gem, // Changed to signify pure/original
      title: "असली पहचान ",
      description: "कोई शॉर्टकट नहीं, कोई मिलावट नहीं, कोई झूठे नाम नहीं। हम वही बीज बेचते हैं जो वैज्ञानिकों द्वारा विकसित और नामित किए गए हैं। किसान जानते हैं कि वे क्या खरीद रहे हैं।",
      accentColorClass: "bg-agri-orange-harvest",
      iconColorClass: "text-white",
    },
    {
      id: 3,
      icon: Sparkles, // Changed to signify "value" or "smart choice"
      title: "किफायती दरें ",
      description: "हम उच्च गुणवत्ता वाले बीज उचित दरों पर उपलब्ध कराते हैं। जहां अन्य कंपनियां अधिक कीमत वसूलती हैं, वहीं हम यह सुनिश्चित करते हैं कि हर किसान बिना ज्यादा खर्च किए भरोसेमंद बीज पा सके।",
      accentColorClass: "bg-agri-sky-blue", // Using a different color for variety
      iconColorClass: "text-agri-text-dark", // Dark icon for light blue bg
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-agri-section-bg via-white to-agri-section-bg m-4 mb-0 rounded-[30px] sm:rounded-[42px]">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Main Section Card Styling - Applied indirectly by the page structure if every section is a card */}
        {/* If this section itself needs to be a "card" on a different page background, wrap its content or apply card styles here */}
        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200/70">
            <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-extrabold text-agri-green-deep sm:text-4xl lg:text-5xl mb-4 tracking-tight">
            हमें क्यों चुनें?
            </h2>
            {/* <p className="text-lg text-agri-text-light max-w-2xl mx-auto">
                Experience the difference that dedication to quality, authenticity, and farmer-first value can make to your harvest.
            </p> */}
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
            {features.map((feature) => (
                <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                accentColorClass={feature.accentColorClass}
                iconColorClass={feature.iconColorClass}
                />
            ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

// Add to your global CSS if you need the light background variants for FeatureCard header:
/*
.bg-agri-green-medium-light-bg { background-color: #e6f0e7; } // Example light variant
.bg-agri-orange-harvest-light-bg { background-color: #fff3e0; } // Example light variant
.bg-agri-sky-blue-light-bg { background-color: #e1f5fe; } // Example light variant
*/

// Or, in Tailwind JIT mode, you can use arbitrary values more easily
// for the FeatureCard header background if you don't want to define explicit classes:
// className={`relative p-6 flex flex-col items-center text-center bg-[${getLightBg(accentColorClass)}]`}
// Where getLightBg is a helper function. For simplicity, I've removed this dynamic part.
// A simpler approach for the feature card header is to just use a very light gray or off-white:
// className="relative p-6 flex flex-col items-center text-center bg-gray-50"
// Or if your `accentColorClass` itself has a light variant in your config, use that.
// For this example, I've removed the `${accentColorClass}-light-bg` and you might want to use a standard light color like `bg-gray-50` or `bg-agri-card-bg` for the feature card header text area if the main `accentColorClass` is too dark for the text.
// Let's adjust FeatureCard to have a standard light background for the icon area for simplicity with Tailwind,
// and the accent color is primarily for the icon circle and bottom bar.

// REVISED FeatureCard Header (simpler background for the icon section):
/*
const FeatureCard: React.FC<FeatureCardProps> = ({ ... }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-custom-medium hover:shadow-custom-hover transition-all duration-300 overflow-hidden group transform hover:-translate-y-1">
      <div className={`relative p-6 flex flex-col items-center text-center bg-agri-card-bg`}> // Using a standard light card BG for this part
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${accentColorClass}`}>
          <Icon className={`w-8 h-8 ${iconColorClass}`} strokeWidth={2} />
        </div>
        <h3 className="text-xl font-semibold text-agri-text-dark mb-1">{title}</h3>
      </div>
      // ... rest of the card
    </div>
  );
};
*/
// For the submitted code, I'll assume the current `${accentColorClass}-light-bg` implies you'll handle these light backgrounds.
// A more robust way would be to pass another prop like `headerBgColorClass`.
// To keep it simpler with standard Tailwind, I'll modify the feature card header: