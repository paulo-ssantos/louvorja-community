/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--color-primary-900) / <alpha-value>)',
          950: 'rgb(var(--color-primary-950) / <alpha-value>)',
        },

        'color-primary-generic': 'rgb(var(--color-primary-generic) / <alpha-value>)',
        'color-primary-generic-alternative': 'rgb(var(--color-primary-generic-alternative) / <alpha-value>)',
        'color-primary-generic-inverse': 'rgb(var(--color-primary-generic-inverse) / <alpha-value>)',
        'color-primary-generic-inverse-alternative': 'rgb(var(--color-primary-generic-inverse-alternative) / <alpha-value>)',

        'color-text': 'rgb(var(--color-text) / <alpha-value>)',
        'color-text-inverse': 'rgb(var(--color-text-inverse) / <alpha-value>)',
        'color-text-hover': 'rgb(var(--color-text-hover) / <alpha-value>)',
        'color-text-muted-60': 'rgb(var(--color-text) / 65%)',
        'color-text-muted-75': 'rgb(var(--color-text) / 75%)',
        'color-text-muted-90': 'rgb(var(--color-text) / 90%)',

        'color-background': 'rgb(var(--color-background) / <alpha-value>)',
        'color-background-alternative': 'rgb(var(--color-background-alternative) / <alpha-value>)',
        'color-background-inverse': 'rgb(var(--color-background-inverse) / <alpha-value>)',
        'color-background-inverse-alternative': 'rgb(var(--color-background-inverse-alternative) / <alpha-value>)',
        'color-background-nav': 'rgb(var(--color-background-nav) / <alpha-value>)',

        'color-logo': 'rgb(var(--color-logo) / <alpha-value>)',
        'color-logo-hover': 'rgb(var(--color-logo-hover) / <alpha-value>)',
        
        'color-button': 'rgb(var(--color-button) / <alpha-value>)',
        'color-button-hover': 'rgb(var(--color-button-hover) / <alpha-value>)',

        'color-border': 'rgb(var(--color-border) / <alpha-value>)',
        'color-border-hover': 'rgb(var(--color-border-hover) / <alpha-value>)',

        'color-link': 'rgb(var(--color-link) / <alpha-value>)',
        'color-link-hover': 'rgb(var(--color-link-hover) / <alpha-value>)',
        'color-link-active': 'rgb(var(--color-link-active) / <alpha-value>)',

        'color-success': 'rgb(var(--color-success) / <alpha-value>)',
        'color-success-hover': 'rgb(var(--color-success-hover) / <alpha-value>)',

        'color-warning': 'rgb(var(--color-warning) / <alpha-value>)',
        'color-warning-hover': 'rgb(var(--color-warning-hover) / <alpha-value>)',

        'color-error': 'rgb(var(--color-error) / <alpha-value>)',
        'color-error-hover': 'rgb(var(--color-error-hover) / <alpha-value>)',

        'color-info': 'rgb(var(--color-info) / <alpha-value>)',
        'color-info-hover': 'rgb(var(--color-info-hover) / <alpha-value>)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-5ms': 'bounce 1.500s infinite',
        'bounce-6ms': 'bounce 1.600s infinite',
        'bounce-7ms': 'bounce 1.700s infinite',

      },
      dropShadow: {
        'standard': '0px 0px 15px rgb(var(--color-primary-generic) / <alpha-value>)',
      }
    },
    container: {
      center: true,
    },
  },
  plugins: [require("flowbite/plugin")],
};
