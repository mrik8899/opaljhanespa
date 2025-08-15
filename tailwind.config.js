/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <--- THIS IS THE ONLY LINE ADDED FOR DARK MODE
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Add this line if you're using the 'app' directory structure (Next.js 13+)
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Add this line to ensure components in 'src' are scanned
  ],
  theme: {
    extend: {
      colors: {
        // ===============================================================
        // YOUR EXISTING BRAND COLORS (UNTOUCHED - KEPT FOR REFERENCE)
        // ===============================================================
        'brand': {
          'green': '#39AD48',
          'blue': '#AFDCEC',
          'lime': '#BEFD73',
          'yellow': '#F7D560',
          'purple': '#B784A7',
          'dark-purple': '#3C1F76',
          'gray': '#D6D6D1',
        },

        // ===============================================================
        // NEW: LOGO-INSPIRED THEME COLORS (FOR TESTING NEW DESIGN)
        // ===============================================================
        'logo-green-vibrant': '#6DC043',    // Outer ring green from logo
        'logo-green-hand': '#52AB37',       // Hands green from logo
        'logo-green-bamboo': '#82B830',     // Bamboo green from logo
        'logo-green-deep': '#4A8C40',       // NEW: A deeper, richer green for backgrounds
        'logo-purple-dark': '#593297',      // Pebbles & text purple (primary deep purple for theme)
        'logo-purple-light': '#B983C3',     // Light purple petal from logo
        'logo-yellow-light': '#FDF3BE',     // Light yellow petal from logo
        'logo-blue-light': '#BDEDF0',       // Light blue petal from logo

        // Neutral shades for text and subtle backgrounds in the new theme
        'logo-neutral-light-100': '#F5F5F5', // Soft white for main text
        'logo-neutral-light-200': '#E0E0E0', // Slightly off-white for secondary text/borders
        'logo-neutral-dark-800': '#1A1A1A',  // Very dark gray for deep contrast
        'logo-neutral-dark-900': '#0D0D0D',  // Near black

        // Overlay base color (from the transparent section backgrounds)
        // This is #3C1F76, very close to your original 'brand-dark-purple' and harmonizes well.
        'overlay-base-purple': 'rgba(60, 31, 118, var(--tw-bg-opacity, 1))', 
      },
      animation: {
        // YOUR EXISTING ANIMATIONS (UNTOUCHED)
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-out infinite',
        
        // NEW ANIMATION FOR SCROLL INDICATOR (YOUR EXISTING)
        'bounce-slow': 'bounce-slow 3s infinite', // 3 seconds per bounce cycle
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      },
      backgroundImage: {
        // YOUR EXISTING BACKGROUND IMAGES (UNTOUCHED)
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))', // This is for `bg-gradient-radial`
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))', // This will be used with `bg-radial-gradient`
        
        // ===============================================================
        // NEW: LOGO-INSPIRED BODY GRADIENT UTILITY (FOR TESTING)
        // ===============================================================
        'logo-body-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      boxShadow: {
        // YOUR EXISTING BOX SHADOWS (UNTOUCHED)
        'glow': '0 0 40px rgba(57, 173, 72, 0.4)', // Updated to use brand green color
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.5)',
        
        // NEW CUSTOM BOX SHADOW FOR HERO BUTTON (YOUR EXISTING)
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
        'glow': '0 0 15px rgba(109, 192, 67, 0.3)',
        'glow-purple': '0 0 15px rgba(89, 50, 151, 0.3)',
      },
      // NEW: Custom text-shadow utilities (YOUR EXISTING)
      textShadow: {
        'sm': '0 1px 2px var(--tw-shadow-color)',
        'md': '0 2px 4px var(--tw-shadow-color)',
        'lg': '0 8px 16px var(--tw-shadow-color)',
      },
      // NEW: Custom keyframes for the slower bounce animation (YOUR EXISTING)
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(-10%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'in-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      // ===============================================================
      // NEW: FONT FAMILIES (OPTIONAL - ADDED FOR THEME RECOMMENDATION)
      // ===============================================================
      fontFamily: {
        // You can uncomment/adjust these based on your preference
        // 'sans': ['Lato', 'sans-serif'], // Recommended for body text
        // 'heading': ['Playfair Display', 'serif'], // Recommended for headings
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      scale: ['group-hover', 'hover'],
      translate: ['group-hover', 'hover'],
      backgroundColor: ['active', 'group-hover'],
      textColor: ['group-hover', 'hover'],
      borderColor: ['group-hover', 'hover', 'focus'],
      ringColor: ['focus-visible'],
      ringWidth: ['focus-visible'],
      ringOffsetWidth: ['focus-visible'],
      ringOffsetColor: ['focus-visible'],
    },
  },
  plugins: [
    // Custom plugin for better focus states
    function({ addUtilities }) {
      const newUtilities = {
        '.focus-ring': {
          '&:focus': {
            outline: 'none',
            '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
            '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
            'box-shadow': 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
            '--tw-ring-opacity': '0.5',
            '--tw-ring-color': 'rgba(109, 192, 67, var(--tw-ring-opacity))',
          },
        },
        '.scroll-mt-header': {
          'scroll-margin-top': '5rem', // Adjust based on your header height
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover', 'focus'])
    },
    // Plugin for text-shadow (YOUR EXISTING)
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    },
    // Keep any other plugins you might have here. For example:
    // require('@tailwindcss/typography'),
  ],
};