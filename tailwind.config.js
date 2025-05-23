const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', 'monospace'],
      },
      colors: {
        medical: {
          primary: '#1e293b',    // slate-800
          secondary: '#334155',  // slate-700  
          accent: '#0f766e',     // teal-700
          success: '#15803d',    // green-700
          background: '#f8fafc', // slate-50
        }
      },
      letterSpacing: {
        'medical': '0.025em',
      }
    },
  },
  plugins: [],
}; 