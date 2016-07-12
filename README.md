# DragnDrop.js

基于h5的拖放小框架，原版来自https://github.com/PascalPrecht/DnD.js.git，改造成比较容易使用的版本，不用再写各种回调，直接配置html即可使用常用功能。

参考案例：http://08180.pw/demo/dnd/

## Installation

下载最新版本:

```
git clone https://github.com/yangyusong/dnd.js
```


## 如何使用

<head>下加入样式 
```
<script src=path/to/dnd.css></script>
```

<body>结尾处加入js文件
```
<script src=path/to/dnd.js></script>
```

html中加入元素需要的属性
如果想要元素可拖动，加入三个属性：
class='drag_box' dnd-id='uniq_name' draggable=true
即可。其中dnd-id取一个比较唯一的名称，另外两个属性写死。

如果元素是可以盛放拖动元素的容器，那么这样给元素加入如下属性
class='drag_container'

如果元素是用来删除容器中所有内容的容器（目前只支持删除所有），那么给元素加入如下属性
class='drag_trash'

对了，如果你对容器的样子不满意，就修改dnd.css


