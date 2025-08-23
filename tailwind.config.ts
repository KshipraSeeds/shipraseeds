/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // If you have a 'src' directory and components there, uncomment the line below:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Shipra Seeds Specific Colors (from first config, prioritized as they seem to be the primary brand colors)
        'shipra-green-500': '#5E8C61', // Main green
        'shipra-green-700': '#4A6D4C', // Darker green for headings
        'shipra-green-100': '#E6F0E6', // Lighter green for backgrounds
        'shipra-off-white': '#F8F8F8', // Off-white background
        'shipra-text': '#333333',     // Primary text color for Shipra
        'shipra-border': '#E0E0E0',   // New: for card borders

        // Agri-specific colors (from second config, kept)
        'agri-footer-bg-light': '#E6F0E7',
        'agri-green-deep': '#2A4B2C',
        'agri-green-medium': '#5E8C61', // This is identical to shipra-green-500, can be consolidated if desired
        'agri-green-light': '#A3D9A5',
        'agri-brown-rich': '#795548',
        'agri-brown-light': '#D7CCC8', // This is identical to agri-brown-light from the first snippet, kept to avoid breaking existing styles if they were used.
        'agri-yellow-sun': '#FFD700',
        'agri-orange-harvest': '#FFA726',
        'agri-sky-blue': '#E0F2F7',     // This is identical to agri-sky-blue from the first snippet, kept.
        'agri-text-dark': '#333333',
        'agri-text-light': '#555555',
        'agri-card-bg': '#E8F5E9',      // This is identical to agri-card-bg from the first snippet, kept.
        'agri-section-bg': '#ECEFF1',
        'agri-footer-bg': '#1F2937',
        'grayish': '#6B7280',

        // Futuristic accents (kept from second config)
        'futuristic-bg': '#0D1117',
        'futuristic-card': 'rgba(22, 27, 34, 0.8)',
        'futuristic-border': 'rgba(48, 54, 61, 0.8)',
        'futuristic-text-primary': '#C9D1D9',
        'futuristic-text-secondary': '#8B949E',
        'futuristic-accent': '#58A6FF',
        'futuristic-glow-from': 'rgba(88, 166, 255, 0.3)',
        'futuristic-glow-to': 'rgba(88, 166, 255, 0)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      keyframes: {
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Renamed slideInFromTop to slide-in-top for consistency with component
        'slide-in-top': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        // Renamed fadeIn to fade-in for consistency with component
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Renamed slideInRight to slide-in-right for consistency with component
        'slide-in-right': {
          '0%': { transform: 'translateX(20%)', opacity: '0' }, // Changed from 20px to 20% for potentially smoother large screen animation
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.3s ease-out',
        'slide-in-top': 'slide-in-top 1s ease-out forwards',
        'fade-in': 'fade-in 1s ease-out forwards', // Kept 1s duration from first config for this specific animation
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.3s ease-out forwards',
      },
      boxShadow: {
        'custom-light': '0 2px 10px rgba(0,0,0,0.07)',
        'custom-medium': '0 5px 15px rgba(0,0,0,0.1)',
        'custom-hover': '0 8px 25px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [
    typography,
  ],
};