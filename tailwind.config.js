// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'h-green': '#1dcd59',
                'h-gray': '#777b8f',
            },
        },
        fontFamily: {
            custom: ['Nunito', ...defaultTheme.fontFamily['sans']],
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                hodlers: {
                    success: '#1dcd59',
                },
            },
        ],
    },
}
