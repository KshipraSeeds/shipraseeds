import typography from '@tailwindcss/typography';

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      colors: {
        'agri-footer-bg-light': '#E6F0E7',
        'agri-green-deep': '#2A4B2C',   // Rich, dark green for trust
        'agri-green-medium': '#5E8C61', // Earthy, natural green
        'agri-green-light': '#A3D9A5',  // Fresh, vibrant green
        'agri-brown-rich': '#795548',   // Deep soil brown
        'agri-brown-light': '#D7CCC8',  // Light earthy tone
        'agri-yellow-sun': '#FFD700',   // Bright sunshine/harvest yellow
        'agri-orange-harvest': '#FFA726',// Warm harvest orange
        'agri-sky-blue': '#B3E5FC',     // Clear sky blue
        'agri-text-dark': '#333333',    // Primary text color
        'agri-text-light': '#555555',   // Secondary text color
        'agri-card-bg': '#F8F9FA',      // Very light, clean card background
        'agri-section-bg': '#ECEFF1', 
        'agri-footer-bg': '#1F2937',   // Light, neutral section background
        
        // Futuristic accents
        'futuristic-bg': '#0D1117', // Dark background, like GitHub dark mode
        'futuristic-card': 'rgba(22, 27, 34, 0.8)', // Semi-transparent dark card
        'futuristic-border': 'rgba(48, 54, 61, 0.8)',
        'futuristic-text-primary': '#C9D1D9', // Light gray text
        'futuristic-text-secondary': '#8B949E', // Dimmer gray text
        'futuristic-accent': '#58A6FF',      // A bright blue accent
        'futuristic-glow-from': 'rgba(88, 166, 255, 0.3)',
        'futuristic-glow-to': 'rgba(88, 166, 255, 0)',
      },
      fontFamily: {
        // You can add custom fonts here if you like
        // sans: ['YourCustomFont', 'sans-serif'],
      },
      boxShadow: {
        'custom-light': '0 2px 10px rgba(0,0,0,0.07)',
        'custom-medium': '0 5px 15px rgba(0,0,0,0.1)',
        'custom-hover': '0 8px 25px rgba(0,0,0,0.12)',
      },
      animation: {
        'slide-down': 'slide-down 0.3s ease-out',
      },
    },
  },
  plugins: [
    typography, 
  ],
};
