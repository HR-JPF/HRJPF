import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-navy': '#0f172a',
        'purple-main': '#8069BF',
        'emerald-accent': '#10B981',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      backdropBlur: {
        xl: '24px',
      },
      borderRadius: {
        '3xl': '32px',
      },
    },
  },
  plugins: [],
}
export default config
