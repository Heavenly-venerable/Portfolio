/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"]
      },
      colors: {
        navy: {
          DEFAULT: '#e6f1ff', // Warna default (Light Mode)
          dark: '#0a192f', // Warna Dark Mode
        },
        'light-navy': {
          DEFAULT: '#ccd6f6',
          dark: '#112240',
        },
        'lightest-navy': {
          DEFAULT: '#a8b2d1',
          dark: '#233554',
        },
        slate: {
          DEFAULT: '#233554',
          dark: '#8892b0',
        },
        'light-slate': {
          DEFAULT: '#112240',
          dark: '#a8b2d1',
        },
        'lightest-slate': {
          DEFAULT: '#0a192f',
          dark: '#ccd6f6',
        },
        white: {
          DEFAULT: '#ffffff',
          dark: '#e6f1ff',
        },
        green: {
          DEFAULT: '#0a192f',
          dark: '#64ffda',
        },
      },
    },
  },
  plugins: [],
}

