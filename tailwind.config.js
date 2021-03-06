/* eslint-disable @typescript-eslint/no-var-requires */
const theme = '#308bab'

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './index.html',
      './src/**/*.vue',
      './src/**/*.js',
      './src/**/*.ts',
      './src/**/*.md',
    ],
  },
  theme: {
    extend: {
      opacity: {
        10: '0.1',
        85: '0.85',
      },
      colors: {
        theme,
      },
    },
  },
  variants: {
    cursor: ['responsive', 'disabled'],
    backgroundColor: ['dark', 'hover', 'disabled'],
    borderColor: ['dark', 'active', 'focus', 'disabled'],
    textColor: ['dark', 'hover', 'active', 'disabled'],
    opacity: ['dark', 'hover', 'active', 'focus', 'disabled'],
  },
  darkMode: 'class',
}
