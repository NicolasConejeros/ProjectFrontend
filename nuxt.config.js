export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'tesis-front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/api.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', 'nuxt-socket-io'],

  auth: {
    strategies: {
      local: {
        token: {
          property: "token",
          global: true,
          type: "Bearer",
          required: true,
        },
        user: {
          property: false,
          autoFetch: true,
        },
        endpoints: {
          login: { url: "/login", method: "post" },
          logout: { url: "/login", method: "delete" },
          user: { url: "/users/user/me", method: "get" },
        },
      }
    }
  },
  io: {
    // module options
    sockets: [
      {
        url: process.env.SOCKET_IO_SERVER_URL,
      },
    ],
  },

  axios: {
    baseURL: process.env.AXIOS_BASE_URL,
    browserBaseURL: process.env.AXIOS_BROWSER_BASE_URL,
    retry: { retries: 1 },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|mp4|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '\[path\][name].[ext]'
        }
      })
    }
  }

}
