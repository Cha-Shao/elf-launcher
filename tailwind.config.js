import { addDynamicIconSelectors } from '@iconify/tailwind'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        light: '#fafafd',
        dark: '#2a2b2c',

        lightBackground: '#f0f0f6',
        darkBackground: '#202122',

        border: '#94a3b833',

        // status
        info: '#33b1fe',
        success: '#9fdb1d',
        warning: '#f6c941',
        error: '#f54245',
        danger: '#f54245',
      },
    },
  },
  plugins: [
    addDynamicIconSelectors(),
    typography(),
  ],
}
