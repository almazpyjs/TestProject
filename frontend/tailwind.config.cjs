module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#38bdf8',
        accent: '#f97316'
      },
      fontFamily: {
        display: ['"Fira Sans"', 'ui-sans-serif', 'system-ui'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        glass: '0 10px 40px rgba(15, 23, 42, 0.25)'
      }
    }
  },
  plugins: []
};
