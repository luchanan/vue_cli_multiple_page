### npm run build之后出现Cannot read property call of undefined问题

在修改webpack.prod.conf.js的时候，进行如下的修改
```
......
var entries = require('./entries')
var entriesJs = entries.entriesJs
var chunks = Object.keys(entriesJs);
......
var webpackConfig = merge(baseWebpackConfig, {
  ......
  plugins: [
    ......
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    /*new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),*/
    // split vendor js into its own file
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),*/
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),*/
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: chunks,
      minChunks: 4 || chunks.length
    }),
    ......
  ]
})
var pages = entries.entriesHtml
for (var pathname in pages) {
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname],
    chunks: ['vendor',pathname],
    inject: true,
    hash:true
  };
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = webpackConfig

```

其中minChunks改为Infinity，也就是npm run build之后没有把vue等其他公用文件的生成到vendor.js的话，这样就不会报上面的错
```
new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  chunks: chunks,
  minChunks: 2 || chunks.length
})
```
上面的设置minChunks改为2，同时已经存在两个文件同时引入了公共的文件，所有会把它打包到vendor.js，但是报错了，Cannot read property call of undefined，所以开始一直以为是这里配置的问题，之后后来看了
一篇文章
把这个
```
new ExtractTextPlugin({
  filename: utils.assetsPath('css/[name].[contenthash].css')
})
```
改为
```
new ExtractTextPlugin({
  filename: utils.assetsPath('css/[name].[contenthash].css'),
  allChunks: true
})
```
就可以了，其中base.js代码如下
```
// require('scss/common.scss')
import 'scss/common.scss'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import zhCN from 'assets/locales/zh_CN.json'
const language = 'zh_CN'
Vue.use(VueI18n)
Vue.use(VueRouter)
const locales = {
  [language]: zhCN
}
const i18n = new VueI18n({
  locale: language,
  messages: locales
})
export {
  Vue, i18n, VueRouter
}
```
home/index.js,center/index.js公共引用了base.js

参考：
[webpack2问题 Cannot read property call of undefined](https://segmentfault.com/q/1010000007045505/a-1020000007049825)
