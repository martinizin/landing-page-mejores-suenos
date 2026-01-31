/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'primary-navy': '#033494',
        'primary-blue': '#0557B8',
        'blue-ui': '#0762B3',
        // Accent colors
        'accent-cyan': '#05ADC8',
        'accent-cyan-vivid': '#0FC2D7',
        // Neutral colors
        'dark-slate': '#13242B',
        'muted-slate': '#677789',
        'gray-light': '#D5D7D6',
        'gray-mid': '#AAAAAB',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(90deg, rgba(3,52,148,0.92), rgba(5,87,184,0.78))',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
