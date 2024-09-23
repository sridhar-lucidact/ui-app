const { nextui } = require("@nextui-org/react");
const { fontFamily } = require('tailwindcss/defaultTheme');

import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ['var(--font-inter)', ...fontFamily.sans],
            'inter-tight': ['var(--font-inter-tight)', ...fontFamily.sans],
        },
        colors: {
            'lucid-blue': {
                100: 'var(--lucid-blue-100)',
                200: 'var(--lucid-blue-200)',
                300: 'var(--lucid-blue-300)',
                400: 'var(--lucid-blue-400)',
                500: 'var(--lucid-blue-500)',
                600: 'var(--lucid-blue-600)',
                700: 'var(--lucid-blue-700)',
                800: 'var(--lucid-blue-800)',
                900: 'var(--lucid-blue-900)',
            },
            'lucid-grey': {
                100: 'var(--lucid-grey-100)',
                200: 'var(--lucid-grey-200)',
                300: 'var(--lucid-grey-300)',
                400: 'var(--lucid-grey-400)',
                500: 'var(--lucid-grey-500)',
                600: 'var(--lucid-grey-600)',
                700: 'var(--lucid-grey-700)',
                800: 'var(--lucid-grey-800)',
                900: 'var(--lucid-grey-900)',
            },
            'lucid-red': {
                100: 'var(--lucid-red-100)',
                200: 'var(--lucid-red-200)',
                250: 'var(--lucid-red-250)',
                300: 'var(--lucid-red-300)',
                400: 'var(--lucid-red-400)',
            },
            'lucid-orange': {
                100: 'var(--lucid-orange-100)',
                200: 'var(--lucid-orange-200)',
                300: 'var(--lucid-orange-300)',
                400: 'var(--lucid-orange-400)',
                500: 'var(--lucid-orange-500)',
                600: 'var(--lucid-orange-600)',
            },
            'lucid-yellow': {
                100: 'var(--lucid-yellow-100)',
                200: 'var(--lucid-yellow-200)',
                300: 'var(--lucid-yellow-300)',
            },
            'lucid-green': {
                100: 'var(--lucid-green-100)',
                200: 'var(--lucid-green-200)',
                300: 'var(--lucid-green-300)',
                400: 'var(--lucid-green-400)',
                500: 'var(--lucid-green-500)',
            },
            'lucid-magenta': {
                100: 'var(--lucid-magenta-100)',
                200: 'var(--lucid-magenta-200)',
                300: 'var(--lucid-magenta-300)',
                400: 'var(--lucid-magenta-400)',
            },
        },
        typography: (theme) => ({
            DEFAULT: {
                css: {
                    // customize 'typography' related base styles here
                },
            },
        }),
        boxShadow: {
            'elevated-lite':
                '2px 2px 5px 0px hsla(var(--lucid-grey-700), 0.05)',
            'active-input': '0px 0px 0px 2px var(--lucid-blue-200)',
            'error-input': '0px 0px 0px 2px var(--lucid-red-250)',
        },
        transitionDuration: {
            '1500': '1500ms',
            '2000': '2000ms',
            '2500': '2500ms',
            '3000': '3000ms',
            '3500': '3500ms',
            '4000': '4000ms',
            '4500': '4500ms',
            '5000': '5000ms',
            '5500': '5500ms',
            '6000': '6000ms',
            '6500': '6500ms',
            '7000': '7000ms',
            '7500': '7500ms',
            '8000': '8000ms',
            '8500': '8500ms',
            '9000': '9000ms',
            '9500': '9500ms',
            '10000': '10000ms'
        }
    },
},
  darkMode: "class",
  plugins: [nextui(), require('@tailwindcss/typography')]
} satisfies Config