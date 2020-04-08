;(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory()
    } else if (typeof define === 'function' && define.amd) {
        define(factory)
    } else {
        root['dashboard'] = factory()
    }
})(this, function () {
  var version = "1.0.0"
  var DEBUG = true
  if(DEBUG){
    console.group("Dashboard.js APIs:")
    console.log("dashboard(id,duration):\r\n\tid: 需要绑定的<canvas>标签的id。\r\n\tduration: 进入动画的时长。")
    console.log("data-text-color: 需要绑定的<canvas>标签的属性，定义仪表盘字体颜色。")
    console.log("data-background-color: 需要绑定的<canvas>标签的属性，定义仪表盘进度条的背景颜色。")
    console.log("data-color: 需要绑定的<canvas>标签的属性，定义仪表盘进度条的前景颜色。")
    console.log("data-label: 需要绑定的<canvas>标签的属性，定义仪表盘的上标签。")
    console.log("data-score: 需要绑定的<canvas>标签的属性，number，定义仪表盘的进度，范围在0-100之间，更新会导致重新播放进入动画。")
    console.log("data-pre-text: 需要绑定的<canvas>标签的属性，定义仪表盘的进度前面显示的文本。")
    console.log("data-post-text: 需要绑定的<canvas>标签的属性，定义仪表盘的进度后面显示的文本。")
    console.log("")
    console.log("原则上支持所有MVVM框架更新属性，但在MVVM框架绑定元素前绑定<canvas>标签可能会导致问题。")
    console.log("")
    console.groupEnd("Dashboard.js详解")
    console.log("Dashboard.js v"+version+" @zbLiuLiu zbliuliu.top 2020-现在")
  }
  
  function a (id, dur) {
    window.requestAnimFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60)
        }
      )
    })()

    var canvas = document.getElementById(id),
      ctx = canvas.getContext('2d'),
      cWidth = Number(canvas.width),
      cHeight = Number(canvas.height),
      label = (canvas.attributes['data-label']||{"value":""}).value,
      score = Number((canvas.attributes['data-score']||{"value":"0"}).value),
      color = (canvas.attributes['data-color']||{"value":"#000000"}).value,
      backgroundColor = (canvas.attributes['data-background-color']||{"value":"#BFBFBF"}).value,
      textColor = (canvas.attributes['data-text-color']||{"value":"#000000"}).value,
      pre_text=(canvas.attributes['data-pre-text']||{"value":""}).value,
      post_text=(canvas.attributes['data-post-text']||{"value":""}).value,
      barWidth = Number((canvas.attributes['data-bar-width']||{"value":10}).value),
      deg0 = Math.PI / 9, //每一格20度
      blocks = 14,
      mum = 1, //数字步长
      /*
                 * 要求：圆弧走完，数字得自加完，就得确定圆弧走的次数和数字走的次数相等！
                 数字最大100，对应的度数是11*PI/9,那每个步长mum对应的度数如下：
                 */
      deg1 = (mum * Math.PI * blocks) / 9 / 100, // 每mum对应的度数
      framesNumber = dur / (1000 / 60)

    var angle = 0, 
      credit = 0, 
      radius = (((cWidth>cHeight)?cHeight:cWidth)/2)-barWidth, //圆的半径
      mumsPerFrame = score / framesNumber

    var drawFrame = function () {
      if (canvas.attributes['data-label']&&canvas.attributes['data-label'].value !== label)
        label = (canvas.attributes['data-label']||{"value":""}).value
      if (canvas.attributes['data-color']&&canvas.attributes['data-color'].value !== color)
        color = (canvas.attributes['data-color']||{"value":"#000000"}).value
      if (canvas.attributes['data-background-color']&&canvas.attributes['data-background-color'].value !== backgroundColor)
        backgroundColor = (canvas.attributes['data-background-color']||{"value":"#BFBFBF"}).value
      if (canvas.attributes['data-text-color']&&canvas.attributes['data-text-color'].value !== textColor)
        textColor = (canvas.attributes['data-text-color']||{"value":"#000000"}).value
      if (canvas.attributes['data-pre-text']&&canvas.attributes['data-pre-text'].value !== pre_text)
        pre_text = (canvas.attributes['data-pre-text']||{"value":""}).value
      if (canvas.attributes['data-post-text']&&canvas.attributes['data-post-text'].value !== post_text)
        post_text = (canvas.attributes['data-post-text']||{"value":""}).value
      if (canvas.attributes['data-bar-width']&&canvas.attributes['data-bar-width'].value !== barWidth)
        barWidth = Number((canvas.attributes['data-bar-width']||{"value":10}).value)
      if (canvas.attributes['data-score']&&Number(canvas.attributes['data-score'].value) !== score) {
        score = Number((canvas.attributes['data-score']||{"value":"0"}).value)
        angle = 0 
        credit = 0
        mumsPerFrame = score / framesNumber
      }
      if (score < 0 || score > 100) {
        console.log('"data-score"只能是0-100')
        score = 100
      }
      ctx.save()
      ctx.clearRect(0, 0, cWidth, cHeight)
      ctx.translate(cWidth / 2, cHeight / 2)

      var aim = (score * deg1) / mum 
      if (angle < aim) {
        angle += deg1 * mumsPerFrame
      }

      if (credit < score) {
        credit += mumsPerFrame 
      } else if (credit >= 100) {
        credit = 100
      } else {
        credit = score
      }
      ctx.save()
      ctx.restore()
      //
      text(Math.floor(credit) + '%', '50px Microsoft yahei', 0)
      text(label, '25px Microsoft yahei', 40)

      ctx.save()
      ctx.beginPath()
      ctx.strokeStyle = backgroundColor
      ctx.lineWidth = 20
      ctx.rotate(9 * deg0 - (blocks * deg0 - 9 * deg0) / 2)
      ctx.arc(0, 0, radius, 0, blocks * deg0, false) //设置外圆环280度
      ctx.stroke()
      ctx.restore()
      ctx.save()
      ctx.restore()
      ctx.beginPath()
      ctx.lineWidth = 20
      ctx.strokeStyle = color
      ctx.rotate(9 * deg0 - (blocks * deg0 - 9 * deg0) / 2) //200度
      ctx.arc(0, 0, radius, 0, angle, false) //动画圆环
      ctx.stroke()
      ctx.restore()

      window.requestAnimFrame(drawFrame)
    }

    function text (process, font, y) {
      ctx.save()
      //ctx.rotate(10 * deg0) //200度
      ctx.fillStyle = textColor
      ctx.font = font
      ctx.textAlign = 'center'
      ctx.textBaseLine = 'top'
      ctx.fillText(process, 0, y)
      ctx.restore()
    }

    setTimeout(function () {
      drawFrame()
    }, 10)
  }
  a.version=version
  return a
})
