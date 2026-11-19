/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-strong': 'var(--color-surface-strong)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        border: 'var(--color-border)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-soft': 'var(--color-primary-soft)',
        'primary-contrast': 'var(--color-primary-contrast)',
        'inverse-text': 'var(--color-inverse-text)',
        brass: 'var(--color-brass)',
        rec: 'var(--color-rec)',
      },
      fontFamily: {
        display: ['Anton', '"Arial Narrow"', 'Impact', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Consolas', 'monospace'],
      },
      fontSize: {
        display: ['3.5rem', { lineHeight: '1.1' }],
        h1: ['2.5rem', { lineHeight: '1.2' }],
        h2: ['2rem', { lineHeight: '1.25' }],
        h3: ['1.5rem', { lineHeight: '1.3' }],
        h4: ['1.25rem', { lineHeight: '1.35' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.55' }],
        caption: ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      lineHeight: {
        '1.1': '1.1',
        '1.2': '1.2',
        '1.25': '1.25',
        '1.3': '1.3',
        '1.35': '1.35',
        '1.4': '1.4',
        '1.55': '1.55',
        '1.6': '1.6',
        '1.7': '1.7',
      },
      spacing: {
        1: '4px', 2: '8px', 3: '12px', 4: '16px', 6: '24px',
        8: '32px', 12: '48px', 16: '64px', 24: '96px',
      },
      borderRadius: {
        none: '0px', sm: '6px', md: '8px', lg: '12px',
      },
      maxWidth: {
        container: '1200px',
        prose: '42rem',
      },
      transitionDuration: {
        300: '300ms',
      },
    },
  },
  plugins: [],
};
