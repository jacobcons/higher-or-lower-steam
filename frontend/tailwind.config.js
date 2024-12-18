/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '400px',
        lg: '1025px',
        vertical: { raw: '(max-width: 1025px) and (max-height: 1025px)' },
      },
    },
  },
  plugins: [],
};
