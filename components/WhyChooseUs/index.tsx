// components/WhyChooseUs.tsx
import React, { useEffect, useState } from 'react';
import { Award, Sparkles, Gem } from 'lucide-react';
import { client } from "@/sanity";
import { useLanguage } from "@/app/context/LanguageContext";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  accentColorClass: string;
  iconColorClass: string;   
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  accentColorClass,
  iconColorClass,
}) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-custom-medium hover:shadow-custom-hover transition-all duration-300 overflow-hidden group transform hover:-translate-y-1">
      <div className={`relative p-6 flex flex-col items-center text-center ${accentColorClass}-light-bg`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${accentColorClass}`}>
          <Icon className={`w-8 h-8 ${iconColorClass}`} strokeWidth={2} />
        </div>
        <h3 className="text-xl font-semibold text-agri-text-dark mb-1 font-heading3">{title}</h3>
      </div>
      <div className="p-6 pt-2 text-center flex-grow">
        <p className="text-agri-text-light leading-relaxed text-sm font-sans3">{description}</p>
      </div>
      <div className={`h-1.5 ${accentColorClass} transition-all duration-300 group-hover:h-2.5`}></div>
    </div>
  );
};

const iconMap: Record<string, React.ElementType> = {
  Award,
  Gem,
  Sparkles,
};

interface LocalizedText {
  en?: string;
  hi?: string;
  pa?: string;
  [key: string]: string | undefined;
}

interface FeatureItem {
  _key: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  accentColorClass: string;
  iconColorClass: string;
}

interface WhyChooseUsData {
  SectionTitle?: LocalizedText;
  features?: FeatureItem[];
}

const WhyChooseUs: React.FC = () => {
  const { lang: language, t } = useLanguage();
  const [cardData, setCardData] = useState<WhyChooseUsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(`*[_type == "whyChooseUs"][0]{
          SectionTitle,
          features[]{
            _key,
            title,
            description,
            icon,
            accentColorClass,
            iconColorClass
          }
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

  if (!cardData) {
    return <div className="text-center py-10">No card content found.</div>;
  }

  const localizedTitle = cardData.SectionTitle?.[language] || cardData.SectionTitle?.hi || "";

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-agri-section-bg via-white to-agri-section-bg m-4 mb-0 rounded-[30px] sm:rounded-[42px]">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200/70">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-extrabold text-agri-green-deep sm:text-4xl lg:text-5xl mb-4 tracking-tight font-heading3">
              {localizedTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
            {cardData.features?.map((feature) => (
              <FeatureCard
                key={feature._key}
                icon={iconMap[feature.icon] || Award}
                title={feature.title?.[language] || feature.title?.hi || ""}
                description={feature.description?.[language] || feature.description?.hi || ""}
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
