/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      darkblue: '#32384D',
    }),
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        landing: "url('/images/blue-overlay.svg')",
        overlay: '-webkit-linear-gradient(243deg, #040d21 33%, transparent)',
        'overlay-light': '-webkit-linear-gradient(243deg, #fff 33%, transparent)',
      },
      fontSize: {
        xs2: '.6rem',
      },
      minWidth: {
        md: '36rem',
        sm: '24rem',
        16: '4rem',
      },
      zIndex: {
        60: 60,
      },
      colors: {
        darkblue: '#32384D',
        esbrown: '#ECE2DC',
        'esbrown-dark': '#B49286',
        'esbrow-highlight': '#FBF9F8',
        espink: '#7C3E66',
        esgreen: '#00BA88',
        esred: '#ED2E7E',
      },

      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.white'),
              '&:hover': {
                color: theme('colors.white'),
              },
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.gray.200'),
            },
            h4: {
              color: theme('colors.gray.200'),
            },
            h5: {
              color: theme('colors.gray.200'),
            },
            h6: {
              color: theme('colors.gray.200'),
            },
            strong: {
              color: theme('colors.gray.200'),
            },
            pre: {
              backgroundColor: theme('colors.gray.900'),
            },
            code: {
              color: theme('colors.white'),
            },
            figcaption: {
              color: theme('colors.gray.300'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
    typography: ['dark'],
    backgroundImage: ['dark'],
    backgroundOpacity: ['active', 'dark'],
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-rtl')],
};
