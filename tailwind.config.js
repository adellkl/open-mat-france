/** @type {import('tailwindcss').Config} */
module.exports = {
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
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms')
    ]
};