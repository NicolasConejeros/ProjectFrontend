module.exports = {
    content: [
        './components/**/*.{js,vue}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.js',
        "./nuxt.config.js",
    ],
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    // daisyUI config (optional)
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        darkTheme: "business",
    },
};
