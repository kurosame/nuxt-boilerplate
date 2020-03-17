import { Configuration } from '@nuxt/types'

// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const pkg = require('./package')

const nuxtConfig: Configuration = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  // css: ['~/assets/style/app.styl'],

  // plugins: ['@/plugins/vuetify'],
  modules: ['@nuxtjs/axios', '@nuxtjs/moment', '@nuxtjs/proxy', '@nuxtjs/pwa'],
  moment: { locales: ['ja'] },
  axios: { baseURL: '/', retry: true },
  proxy: {
    '/.netlify/functions/atnd': { target: 'http://localhost:9000' },
    '/.netlify/functions/connpass': { target: 'http://localhost:9000' }
  },
  /*
   ** Build configuration
   */
  build: {
    // transpile: ['vuetify/lib'],
    // plugins: [new VuetifyLoaderPlugin()],
    // loaders: {
    //   stylus: {
    //     import: ['~assets/style/variables.styl']
    //   }
    // },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        if (!config.module) return
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  buildModules: [
    [
      '@nuxt/typescript-build',
      { typeCheck: true, ignoreNotFoundWarnings: true }
    ],
    ['@nuxtjs/vuetify', { theme: { dark: true } }],
    '@nuxtjs/eslint-module'
  ]
}

export default nuxtConfig
