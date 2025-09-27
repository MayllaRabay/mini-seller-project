/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1e1e24",
        coral: "#fb9f89",
        sand: "#c4af9a",
        teal: "#83c9c5",
        emerald: "#21a179",

        primary: {
          50: "#f0fdfc",
          100: "#ccfbf1",
          500: "#83c9c5",
          600: "#6bb7b2",
          700: "#5a9995",
          900: "#134e4a"
        },
        secondary: {
          50: "#faf9f7",
          100: "#f5f4f1",
          500: "#c4af9a",
          600: "#b5a086",
          700: "#a69072",
          900: "#8b7355"
        },
        accent: {
          50: "#fef7f5",
          100: "#fdeee9",
          500: "#fb9f89",
          600: "#f9856a",
          700: "#f56b4a",
          900: "#dc2626"
        },
        neutral: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#c4af9a",
          500: "#a8a29e",
          600: "#78716c",
          700: "#57534e",
          800: "#44403c",
          900: "#1e1e24"
        },
        // Status colors
        blue: {
          100: "#dbeafe",
          200: "#bfdbfe",
          800: "#1e40af"
        },
        orange: {
          100: "#fed7aa",
          200: "#fdba74",
          800: "#9a3412"
        },
        emerald: {
          100: "#d1fae5",
          200: "#a7f3d0",
          800: "#065f46"
        },
        purple: {
          100: "#f3e8ff",
          200: "#e9d5ff",
          800: "#6b21a8"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"]
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }]
      },
      spacing: {
        18: "4.5rem",
        88: "22rem"
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem"
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        medium:
          "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)",
        strong:
          "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)"
      }
    }
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        /* Webkit scrollbar customization */
        "::-webkit-scrollbar": {
          width: "6px",
          height: "6px"
        },
        "::-webkit-scrollbar-track": {
          backgroundColor: "#f5f4f1", // secondary-100 (sand very light)
          borderRadius: "3px"
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#c4af9a", // secondary-500 (sand)
          borderRadius: "3px",
          transition: "background-color 0.2s ease"
        },
        "::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#b5a086" // secondary-600 (sand darker)
        },
        /* Firefox scrollbar customization */
        "*": {
          "scrollbar-width": "thin",
          "scrollbar-color": "#c4af9a #f5f4f1" // thumb track
        }
      })
    }
  ]
}
