# Dashboard.js
一个简单的JS+canvas的仪表盘插件，你只需要在&lt;canvas>中写好id和属性，在&lt;script>中调用一下dashboard函数即可轻松绘制一个仪表盘！你还可以仅仅使用jQuery、Vue.js甚至document.getElementById(id).setAttribute()来更新&lt;canvas>的参数即可修改数据和样式！

## 为什么要制作这个插件
我的大学报的校企合作专业，其中企业方给我们布置了一个考试，要求仿照Lenovo Learning System的教师页面做一个页面+页面相关的后端API，不能使用任何框架，指定使用HTML+CSS+JS做前端，PHP+MySQL做后端。其中页面中有四个仪表盘，因此我就用8个小时的考试时间中的约一半多一点的时间做了这个插件。然后略微修改之后便成了你现在所看到的插件的第一个版本。

## Dashboard.js的特点
- 不需要了解任何关于Canvas绘图的知识！几乎是会写HTML就能用！
- 基于原生JavaScript开发，能用Canvas就能用！完美兼容JQuery、Vue.js等框架！
- 代码只有几kb，非常轻量！
- ~~乱七八糟的功能少~~

## 如何使用Dashboard.js？
    <canvas id="canvas" width="300" height="300" data-score="50"></canvas>
    <script src="Dashboard.js"></script>
    <script>
    	dashboard("canvas", 1000)
    </script>

只需要加入上面5行代码，你的网页上就会出现一个仪表盘！

## Dashboard.js的API
Dashboard.js拥有~~其实一点也不~~丰富的API。

|API名称|API类型|API介绍|API示例|API默认值|
|----|----|----|----|----|
|panel(id,duration)|JavaScript Function|id: 需要绑定的&lt;canvas>标签的id。<br/>duration: 进入动画的时长。|`panel("canvas",1000)`|`无`|
|data-text-color|HTML Attribute|定义仪表盘字体颜色。|`<canvas data-text-color="#000000"></canvas>`|`"#000000"`|
|data-background-color|HTML Attribute|定义仪表盘进度条的背景颜色。|`<canvas data-background-color="#BFBFBF"></canvas>`|`"#BFBFBF"`|
|data-color|HTML Attribute|定义仪表盘进度条的前景颜色。|`<canvas data-color="#000000"></canvas>`|`"#000000"`|
|data-label|HTML Attribute|定义仪表盘的上标签。|`<canvas data-label="标签"></canvas>`|`""`|
|data-score|HTML Attribute|定义仪表盘的进度，范围在0-100之间，**只能是数字**，更新会导致重新播放进入动画。|`<canvas data-score="0"></canvas>`|`0`|
|data-pre-text|HTML Attribute|定义仪表盘的进度前面显示的文本。|`<canvas data-pre-text=""></canvas>`|`""`|
|data-post-text|HTML Attribute|定义仪表盘的进度后面显示的文本。|`<canvas data-post-text="%"></canvas>`|`""`|

## 使用方法
**直接下载下载** [Dashboard.min.js](https://github.com/zbLiuLiu/Dashboard.js/blob/master/dist/Dashboard.min.js "Panel.min.js")并在页面中引入。
**使用CDN** 暂无CDN，将来会上传hhh

## 关于作者
❤ 欢迎访问我的小站哦：[一只zbLiuLiu的小天地](https://zbliuliu.top "一只zbLiuLiu的小天地")
