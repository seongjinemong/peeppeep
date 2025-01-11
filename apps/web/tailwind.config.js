/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'inset-b': 'inset 0 -1px 0 0 var(--border)',
        'inset-bl': 'inset 1px -1px 0 0 var(--border)',
        'inset-br': 'inset -1px -1px 0 0 var(--border)',
        'inset-tl': 'inset 1px 1px 0 0 var(--border)',
        'inset-tr': 'inset -1px 1px 0 0 var(--border)',
        'inset-t': 'inset 0 1px 0 0 var(--border)',
        'inset-r': 'inset -1px 0 0 0 var(--border)',
        'inset-l': 'inset 1px 0 0 0 var(--border)',
        'inset-all': 'inset 0 0 0 1px var(--border)'
      },
      colors: {
        aicfo: {
          DEFAULT: 'var(--aicfo-purple)',
          accent: 'var(--aicfo-purple-accent)'
        },
        background: {
          gray: 'var(--background-gray)',
          primary: {
            DEFAULT: 'var(--background-primary)',
            accent: 'var(--background-secondary)'
          },
          secondary: {
            DEFAULT: 'var(--background-secondary)',
            accent: 'var(--background-tertiary)'
          },
          tertiary: {
            DEFAULT: 'var(--background-tertiary)',
            accent: 'var(--background-tertiary/50)'
          },
          sidebar: {
            DEFAULT: 'var(--background-sidebar)',
            accent: 'var(--background-secondary)'
          },
          disabled: 'var(--background-disabled)'
        },
        hover: 'var(--text-hover)',
        primary: {
          DEFAULT: 'var(--text-primary)',
          accent: 'var(--text-primary/50)'
        },
        secondary: {
          DEFAULT: 'var(--text-secondary)',
          accent: 'var(--text-secondary/50)'
        },
        tertiary: {
          DEFAULT: 'var(--text-tertiary)',
          accent: 'var(--text-tertiary/50)'
        },
        disabled: 'var(--button-disabled-text)',
        border: 'var(--border)',
        placeholder: 'var(--placeholder)'
      },
      height: {
        'topbar-height': 'var(--topbar-height)',
        'searchbar-height': 'var(--searchbar-height)'
      },
      width: {
        'sidebar-width': 'var(--sidebar-width)',
        'right-modal-width': 'var(--right-modal-width)'
      },
      fontFamily: {
        sans: ['var(--font-family)']
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
