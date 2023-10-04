import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          default: '#5b21b6' //indigo-800
        },
        secondary: {
          default: '#9a3412' //orange-800
        },
        warning: {
          default: '#ef4444'
        },
        success: {
          default: '#22c55e'
        },
        translucent: {
          black: {
            100: 'rgba(0,0,0, 0.1)',
            300: 'rgba(0,0,0, 0.3)',
            500: 'rgba(0,0,0, 0.5)',
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
