/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luxury-cream': '#FCF9F1',
        'luxury-beige': '#F5F2EA',
        'luxury-gold': '#B87333', // Copper/Gold from logo
        'luxury-navy': '#0A1D37', // Navy from logo
        'luxury-accent': '#D4AF37',
        charcoal: {
          light: '#334155',
          DEFAULT: '#0A1D37', // Use Navy as charcoal replacement
          dark: '#05101E',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 2s',
        'spin-slow': 'spin 12s linear infinite',
        'draw': 'draw 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        }
      },
      borderRadius: {
        '4xl': '2.5rem',
        '5xl': '3.5rem',
      },
      boxShadow: {
        'luxury': '0 10px 40px -10px rgba(0,0,0,0.05)',
        'glass': '0 8px 32px 0 rgba(10, 29, 55, 0.07)',
      }
    },
  },
  plugins: [],
}
