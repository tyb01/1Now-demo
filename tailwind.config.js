/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      colors: {
        // oklch(0.98 0.003 165) — near-white with faint green
        background: '#f5f9f7',
        // oklch(0.24 0.014 165) — very dark teal-gray
        foreground: '#283630',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#1c2b26',
        },
        primary: {
          // oklch(0.40 0.075 166) — forest green
          DEFAULT: '#2d6b5a',
          foreground: '#f8faf9',
        },
        secondary: {
          // oklch(0.96 0.007 165) — very light mint
          DEFAULT: '#eff4f1',
          foreground: '#3d4e45',
        },
        muted: {
          DEFAULT: '#f0f3f1',
          foreground: '#697d72',
        },
        accent: {
          DEFAULT: '#eff4f1',
          foreground: '#1c2b26',
        },
        destructive: {
          // oklch(0.55 0.18 27) — orange-red
          DEFAULT: '#c44826',
          foreground: '#faf9f8',
        },
        border: '#dde5e0',
        input: '#dde5e0',
        ring: '#b3c2ba',
        success: {
          // oklch(0.43 0.09 162)
          DEFAULT: '#2c7058',
          soft: '#e4f2ec',
        },
        warning: {
          // oklch(0.48 0.10 70)
          DEFAULT: '#7a5e1c',
          soft: '#f3efc5',
        },
        'danger-soft': '#faf0ec',
        // oklch(0.69 0.19 35) — vivid orange
        brand: '#e87040',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
    },
  },
  plugins: [],
}
