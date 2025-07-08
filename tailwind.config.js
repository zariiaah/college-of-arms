/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1e3a5f', // Deep navy
        'primary-foreground': '#ffffff', // white
        
        // Secondary Colors
        'secondary': '#4a5568', // Sophisticated gray
        'secondary-foreground': '#ffffff', // white
        
        // Accent Colors
        'accent': '#d4af37', // Warm gold
        'accent-foreground': '#1e3a5f', // Deep navy
        
        // Background Colors
        'background': '#fafbfc', // Soft off-white
        'surface': '#ffffff', // Pure white
        
        // Text Colors
        'text-primary': '#2d3748', // Rich charcoal
        'text-secondary': '#718096', // Balanced gray
        
        // Status Colors
        'success': '#38a169', // Professional green
        'success-foreground': '#ffffff', // white
        
        'warning': '#d69e2e', // Amber
        'warning-foreground': '#1e3a5f', // Deep navy
        
        'error': '#e53e3e', // Confident red
        'error-foreground': '#ffffff', // white
        
        // Border Colors
        'border': '#e2e8f0', // Subtle border
        'border-active': '#1e3a5f', // Deep navy
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Source Sans Pro', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-medium': '500',
        'heading-semibold': '600',
        'body-normal': '400',
        'body-medium': '500',
        'caption-normal': '400',
        'mono-normal': '400',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        'elevated': '0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06)',
      },
      transitionTimingFunction: {
        'smooth': 'ease-out',
        'layout': 'ease-in-out',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        'navigation': '100',
        'dropdown': '200',
        'overlay': '300',
        'modal': '400',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}