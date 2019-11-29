import { InMemoryCache } from 'apollo-cache-inmemory'

const loader = require('stylus-loader')
const autoprefixer = require('autoprefixer-stylus')
const rupture = require('rupture')
const jeet = require('jeet')

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
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
  css: ['~/assets/stylus/core.styl'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/validate', '~/plugins/icons'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/apollo'],
  /*
   ** Apollo configuration
   */
  apollo: {
    tokenName: 'token',
    cookieAttributes: {
      expires: 1
    },
    includeNodeModules: true,
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:4000/graphql',
        httpLinkOptions: {
          credentials: 'same-origin'
        },
        inMemoryCacheOptions: {
          addTypename: false
        },
        wsEndpoint: 'ws://localhost:4000/graphql',
        tokenName: 'token'
      }
    }
  },
  /*
   ** Router configuration
   */
  router: {
    middleware: ['index']
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: ['vee-validate/dist/rules'],
    plugins: [
      new loader.OptionsPlugin({
        default: {
          use: [autoprefixer(), rupture(), jeet()]
        }
      })
    ],
    extend(config) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      })
    }
  }
}
