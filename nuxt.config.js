require('dotenv').config()

export default {

    loading: {
        height: '4px',
        continuous: true
    },

    publicRuntimeConfig: {
        appName: process.env.APP_NAME,
        apiURL: process.env.API_URL,

    },

    privateRuntimeConfig: {

    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Gricdbooks Dashboard',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css', integrity: 'sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l', crossorigin: 'anonymous' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap' },
            { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" }
        ],
        script: [{
                src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
                body: true
            },
            {
                src: 'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js',
                integrity: 'sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN',
                crossorigin: 'anonymous',
                body: true
            },
            {
                src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js',
                integrity: 'sha384-+YQ4JLhjyBLPDQt//I+STsc9iw4uQqACwlvpslubQzn4u2UU2UFM80nGisd026JF',
                crossorigin: 'anonymous',
                body: true
            },
            {
                src: '/js/main.js',
                body: true
            }
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/static/css/main.css',
        '~/static/css/ladda-themeless.min.css',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~plugins/vue-js-modal.js',
        '~/plugins/vidle.js',
        '~/plugins/slick.js',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/dotenv',
        '@nuxtjs/moment',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxtjs/toast',
    ],

    toast: {
        position: 'top-right',
        duration: 3000
    },

    auth: {
        strategies: {
            local: {
                token: {
                    property: 'token',
                    global: true,
                },
                user: {
                    property: 'user',
                },
                endpoints: {
                    login: { url: process.env.API_URL + '/v1/auth/login', method: 'post' },
                    logout: false,
                    user: { url: process.env.API_URL + '/v1/user', method: 'get' }
                }
            }
        },
        redirect: {
            home: '/dashboard',
            login: '/admin/login',
        },
        rewriteRedirects: false
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {

    },

    router: {
        middleware: ['auth']
    }
}
