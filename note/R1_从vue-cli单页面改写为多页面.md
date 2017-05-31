### 如何在vue-cli单页面的基础上去改造为多页面（实际是多页spa组合）？

- 去掉根目录index.html
- 去掉src下的router，App.vue，main.js

改写的js包含
- build/webpack.base.conf.js

```
//由原来一个入口
module.exports = {
  entry: {
    app: './src/main.js'
  }
}
//改为多入口
var entries =  utils.getEntries(config.pathString.src+'/'+config.moduleName+'/**/**/*.js');
module.exports = {
  entry:entries
}
```
- build/utils.js追加getEntries方法

```
//分别获取多页面的js和html路径，剪裁moduleName作为key输出
exports.getEntries = function (globPath) {
  var entries = {}, tmp, pathname;
  glob.sync(globPath).forEach(function (entry) {
    // 以moduelname作为文件名输出
    tmp = entry.split('/').splice(-3,2);
    // 以views/home输出,前台http://localhost:8080/views/home.html这样访问
    pathname = tmp.join("/")
    entries[pathname] = entry;
  });
  return entries;
}

```

- build/webpack.dev.conf.js
```
//注释原来的单个html修改
module.exports = merge(baseWebpackConfig, {
  ...
  plugins: [
    ...
    /*new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),*/
    ...
  ]
})
```

- build/webpack.base.conf.js追加方法
```
module.exports = {
  entry:entries,
  ...
  plugins:[] // add
}
//遍历多个html，把js插入多个html
var pages =  utils.getEntries(config.pathString.src+'/'+config.moduleName+'/**/**/*.html');
for (var pathname in pages) {
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname],
    chunks: [pathname, 'vendors', 'manifest'],
    inject: true
  };
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}
```

- build／dev-server.js修改预览地址

```
var uri = 'http://localhost:' + port
// 修改启动地址，免得每次都要输入
var uri = 'http://localhost:' + port + '/' + config.moduleName + '/home.html'
```

大致上就这样吧
