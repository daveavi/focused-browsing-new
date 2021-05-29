let mix = require("laravel-mix")

var path = require('path')

mix.setPublicPath('./')
.webpackConfig({
    resolve: {
            alias: {
                '@': path.resolve('src/sass')
            }
        }
    })
    // .sass('src/sass/app.scss', 'dist/css')
    .js('src/js/background.js', 'dist/js')
    .js('src/js/content.js', 'dist/js')
    .js('src/js/siteStrategy/TwitterStrategy.js', 'dist/js/siteStrategy')
    .js('src/js/siteStrategy/LinkedInStrategy.js', 'dist/js/siteStrategy')
    .js('src/js/renderCards/twitter/feed.js', 'dist/js/renderCards/twitter').vue()
    .js('src/js/renderCards/twitter/panel.js', 'dist/js/renderCards/twitter').vue()
    .options({
        processCssUrls: false
    })