const { theme } = require('./src/utils/theme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          sage: theme.colors.primary.sage,
          'sage-light': theme.colors.primary.sageLight,
          'sage-dark': theme.colors.primary.sageDark,
        },
        secondary: {
          terracotta: theme.colors.secondary.terracotta,
          'terracotta-light': theme.colors.secondary.terracottaLight,
          'terracotta-dark': theme.colors.secondary.terracottaDark,
        },
        neutral: {
          cream: theme.colors.neutral.cream,
          'cream-light': theme.colors.neutral.creamLight,
          'cream-dark': theme.colors.neutral.creamDark,
        },
        success: theme.colors.success,
        warning: theme.colors.warning,
        error: theme.colors.error,
        info: theme.colors.info,
        text: {
          primary: theme.colors.text.primary,
          secondary: theme.colors.text.secondary,
          light: theme.colors.text.light,
        },
        background: {
          light: theme.colors.background.light,
          dark: theme.colors.background.dark,
        },
        // Add your brand colors here
        'brand-orange': '#FF4500',
        'brand-black': '#111',
        'brand-white': '#fff',
      },
      fontFamily: {
        heading: theme.typography.fontFamily.heading,
        body: theme.typography.fontFamily.body,
      },
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeight,
      spacing: theme.spacing,
      borderRadius: theme.borderRadius,
      boxShadow: theme.shadows,
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}