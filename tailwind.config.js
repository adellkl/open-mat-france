/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            keyframes: {
                'fade-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(25px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                }
            },
            animation: {
                'fade-up': 'fade-up 2.0s ease-out'
            },
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
            },
        }
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
    // Configuration pour le contraste élevé
    future: {
        hoverOnlyWhenSupported: true,
    },
    // Styles pour le contraste élevé
    variants: {
        extend: {
            backgroundColor: ['high-contrast'],
            textColor: ['high-contrast'],
            borderColor: ['high-contrast'],
        },
    },
};