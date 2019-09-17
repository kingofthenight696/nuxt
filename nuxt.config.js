const pkg = require('./package')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  mode: 'universal',
  server: {
    port: 3000, // default: 3000
    host: 'localhost', // default: localhost
  },
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
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '~plugins/mixins/validation',
    '~plugins/mixins/user',
    '~plugins/axios',
  ],
  router:{
    middleware: [
      'clearValidationErrors'
    ]
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/login', method: 'post', propertyName: 'token'
          },
          user:{
            url: 'me', method: 'get', propertyName: 'data'
          },
          logout:{
            url: 'logout', method: 'get'
          }
        }
      },
    },
    redirect:{
      login: '/auth/login',
      redirect: '/'
    },
    plugins:[
      // '~plugins/auth',
    ]
  },
  axios: {
    baseURL: 'http://localhost:3001/api',
    withCredentials: true,
  },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    vendor: [],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
