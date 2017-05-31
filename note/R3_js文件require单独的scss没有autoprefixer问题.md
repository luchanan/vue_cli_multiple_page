### vue-loader会对.vue文件进行处理，这包括了sass编译和autoprefixer浏览器前缀的处理（包括style使用@import链接其他资源scss文件）

```
// .vue
<style lang="scss" scoped>
  //@import "../../assets/scss/common.scss";
  .title{
    .flex{
      display:flex;
      .flex_item{
        flex: 1;
      }
    }
  }
</style>
```

```
// 处理后
<style type="text/css">
.title .flex[data-v-d86d36ee] {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.title .flex .flex_item[data-v-d86d36ee] {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
        -ms-flex: 1;
            flex: 1;
}
</style>
```

但是.js文件require或者import的scss文件，不会帮你autoprefixer处理， 因此作出如下的修改：

build/webpack.base.conf.js

1. 第一方法，是最简单的，修改最少的

- 步骤一

```
在下面的基础上
exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }
```
追加

```
  ,
  postcssLoader = {
    loader: 'postcss-loader'
  }
```
也就是
```
exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  },
  postcssLoader = {
    loader: 'postcss-loader'
  }
```

- 步骤二

exports.cssLoaders 找到

```
//在这个基础上
var loaders = [cssLoader]
//改为
var loaders = [cssLoader, postcssLoader]
```

2. 第二种方法：

exports.styleLoaders改为

```
exports.styleLoaders = function(options = {}) {
    const extract = function(loaders) {
      if(options.extract) {
        loaders = loaders.map(loader => {
          let result = '';
          if(typeof loader === 'string') {
            result = loader;
          } else {
            result = loader.loader;
            if(loader.options) {
              result += '?';
              for(key in loader.options) {
                result += key + '=' + loader.options[key] + '&'
              }
            }
          }
          return result;
        }).splice(1).join('!')
        return ExtractTextPlugin.extract({
                  fallback: 'vue-style-loader',
                  use: loaders
              })
      }
      return loaders;
    }
    return [
        {
            test: /\.css$/,
            use: extract([
                'vue-style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: options.sourceMap || false,
                        minimize: true
                    }
                },
                'postcss-loader',
            ])
        },
        {
            test: /\.scss$/,
            use: extract([
                'vue-style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: options.sourceMap || false,
                        minimize: true
                    }
                },
                'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: [path.resolve(__dirname, '../src/sass')],
                        sourceMap: options.sourceMap || false
                    }
                }
            ])
        }
    ]
}
```

参考资料：

[记一次vue-cli中webpack升级2.x](https://zwingz.github.io/2017/02/17/webpackUpdate/)



