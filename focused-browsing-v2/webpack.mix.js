let mix = require("laravel-mix")

var path = require('path')

mix.setPublicPath('./')
    .sass('src/sass/twitter.scss', 'dist/css')
    .sass('src/sass/twitter-dark.scss', 'dist/css')
    .js('src/js/background.js', 'dist/js')
    .js('src/js/content.js', 'dist/js')
    .js('src/js/siteStrategy/TwitterStrategy.js', 'dist/js/siteStrategy')
    .js('src/js/siteStrategy/LinkedInStrategy.js', 'dist/js/siteStrategy')
    // TODO: look into using wild cards to apply rules to all files in a folder
    .js('src/js/renderCards/feed.js', 'dist/js/renderCards/twitter').vue()
    .options({
        processCssUrls: false
    })