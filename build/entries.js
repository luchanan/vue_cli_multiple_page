var path = require('path'),
    glob = require('glob');
    config = require('../config')

let globPath = {
  js: config.pathString.src+'/'+config.moduleName+'/**/**/*.js',
  html: config.pathString.src+'/'+config.moduleName+'/**/**/*.html'
}

//分别获取多页面的js和html路径，剪裁moduleName作为key输出
function getEntries (globPath) {
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

module.exports = {
  entriesJs: getEntries(globPath.js),
  entriesHtml: getEntries(globPath.html)
}
