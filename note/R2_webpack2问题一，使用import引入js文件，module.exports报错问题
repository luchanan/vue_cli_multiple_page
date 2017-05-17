### module.exports暴露使用es6 import进来的js文件，别的js文件引入报错

```
//js/base.js
import Vue from 'vue'
require('scss/common.scss')

module.exports = {
  Vue
}
//home/index.js
import { Vue } from 'js/base'
//出现这样的错误
Cannot assign to read only property 'exports' of object '
```

这段代码记得以前webpack1的时候是没有问题的

解决方法：

```
https://github.com/webpack/webpack/issues/3997
大概意思就是，如果你使用了import 导入文件的话，那么你只能用export来导出了，
如果你使用require导入文件的话，你可以使用module.exports来导出
所以改为：
export {
  Vue
}
但是改为会报错
//__WEBPACK_IMPORTED_MODULE_0_js_base__.Vue is not a constructor
export default {
  Vue
}
```
