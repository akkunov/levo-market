import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            bage : 'D9D9D9',
        },
        extend: {
            container: {
                center: true, // центрируем
                padding: "1rem", // стандартные паддинги
                screens: {
                    sm: "100%",   // до 640px — 100%
                    md: "720px",  // до 768px
                    lg: "960px",  // до 1024px
                    base: "868px",
                    xl: "1140px", // до 1280px
                    "2xl": "1320px", // кастомная ширина
                },
            },
        },
        screens: {
            sm: {max: "100%"},   // до 640px — 100%
            md: {max: "720px"},
            base: {max:"868px"},// до 768px
            lg: {max: "960px"},  // до 1024px
            xl: {max:"1140px"}, // до 1280px
            "2xl": {max:"1320px"}, // кастомная ширина
        },
    },
    plugins: [],
};
export default config;
