module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      backgroundImage: {
        "primary-gradient": `linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);`,
      },
    },
  },
  plugins: [
	require('@tailwindcss/line-clamp')
  ],
};
