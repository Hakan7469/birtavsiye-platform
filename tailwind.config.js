/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    "text-sm",
    "text-xs",
    "text-gray-500",
    "text-gray-600",
    "border-gray-300",
    "font-medium",
    "hover:bg-blue-100",
    "hover:bg-red-100",
    "px-2",
    "py-0.5",
    "rounded"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
