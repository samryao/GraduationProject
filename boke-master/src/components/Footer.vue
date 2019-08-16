<template>
  <div class="longPage">
    <el-row class="container">
      <el-col :span="24">
        <div class="link">
          <a href="/About" target="_blank">关于博客</a>
          <a href="/Suggestion" target="_blank">意见反馈</a>
          <a href="javascript:void(0) ">
            博客已运行<span v-html='longTime' class="timeJump">{{longTime}}</span><span class="timeJump">(●'◡'●)ﾉ♥</span>
          </a>
        </div>
        <div class="Recordnumber">
          <p>托管于<a href="javascript:void(0)">GitHub</a> , <a href="javascript:void(0)">百度统计</a> 提供网站统计服务 ©2019 由 <a
            href="javascript:void(0)">Vue</a> 搭建,京ICP备17071595号
            </p>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  export default {
    data () {
      // 选项 / 数据
      return {
        longTime: '',
      }
    },
    methods: {
      // 事件处理器
      runTime: function () {//运行倒计时
        var that = this
        var oldTime = new Date('2019/03/01 00:00:00')
        var timer = setInterval(function () {
          var nowTime = new Date()
          var longTime = nowTime - oldTime
          var days = parseInt(longTime / 1000 / 60 / 60 / 24, 10) //计算剩余的天数
          var hours = parseInt(longTime / 1000 / 60 / 60 % 24, 10) //计算剩余的小时
          var minutes = parseInt(longTime / 1000 / 60 % 60, 10)//计算剩余的分钟
          var seconds = parseInt(longTime / 1000 % 60, 10)//计算剩余的秒数
          that.longTime = days + '天' + hours + '小时' + minutes + '分' + seconds + '秒'
        }, 1000)
      }
    },
    components: {
      // 定义组件
    },
    created () {
      // 生命周期函数
      var that = this
      that.runTime()
    }
  }
</script>

<style>
  .longPage {
    background: #f8f8f7;
    margin-top: 30px;
    text-align: center;
  }

  .link {
    margin: 15px 0;
  }

  .Recordnumber {
    margin: 20px 0;
  }

  .link a, p {
    font-size: 12px;
    padding: 10px;
  }

  .timeJump {
    animation: my-face 5s infinite ease-in-out;
    -webkit-animation: my-face 5s infinite ease-in-out;
    display: inline-block;
    margin: 0 5px;
  }

  @-webkit-keyframes my-face {
    2% {
      -webkit-transform: translate(0, 1.5px) rotate(1.5deg);
      -moz-transform: translate(0, 1.5px) rotate(1.5deg);
      -ms-transform: translate(0, 1.5px) rotate(1.5deg);
      -o-transform: translate(0, 1.5px) rotate(1.5deg);
      transform: translate(0, 1.5px) rotate(1.5deg)
    }
    4% {
      -webkit-transform: translate(0, -1.5px) rotate(-.5deg);
      -moz-transform: translate(0, -1.5px) rotate(-.5deg);
      -ms-transform: translate(0, -1.5px) rotate(-.5deg);
      -o-transform: translate(0, -1.5px) rotate(-.5deg);
      transform: translate(0, -1.5px) rotate(-.5deg)
    }
    6% {
      -webkit-transform: translate(0, 1.5px) rotate(-1.5deg);
      -moz-transform: translate(0, 1.5px) rotate(-1.5deg);
      -ms-transform: translate(0, 1.5px) rotate(-1.5deg);
      -o-transform: translate(0, 1.5px) rotate(-1.5deg);
      transform: translate(0, 1.5px) rotate(-1.5deg)
    }
    8% {
      -webkit-transform: translate(0, -1.5px) rotate(-1.5deg);
      -moz-transform: translate(0, -1.5px) rotate(-1.5deg);
      -ms-transform: translate(0, -1.5px) rotate(-1.5deg);
      -o-transform: translate(0, -1.5px) rotate(-1.5deg);
      transform: translate(0, -1.5px) rotate(-1.5deg)
    }
    10% {
      -webkit-transform: translate(0, 2.5px) rotate(1.5deg);
      -moz-transform: translate(0, 2.5px) rotate(1.5deg);
      -ms-transform: translate(0, 2.5px) rotate(1.5deg);
      -o-transform: translate(0, 2.5px) rotate(1.5deg);
      transform: translate(0, 2.5px) rotate(1.5deg)
    }
    12% {
      -webkit-transform: translate(0, -.5px) rotate(1.5deg);
      -moz-transform: translate(0, -.5px) rotate(1.5deg);
      -ms-transform: translate(0, -.5px) rotate(1.5deg);
      -o-transform: translate(0, -.5px) rotate(1.5deg);
      transform: translate(0, -.5px) rotate(1.5deg)
    }
    14% {
      -webkit-transform: translate(0, -1.5px) rotate(1.5deg);
      -moz-transform: translate(0, -1.5px) rotate(1.5deg);
      -ms-transform: translate(0, -1.5px) rotate(1.5deg);
      -o-transform: translate(0, -1.5px) rotate(1.5deg);
      transform: translate(0, -1.5px) rotate(1.5deg)
    }
    16% {
      -webkit-transform: translate(0, -.5px) rotate(-1.5deg);
      -moz-transform: translate(0, -.5px) rotate(-1.5deg);
      -ms-transform: translate(0, -.5px) rotate(-1.5deg);
      -o-transform: translate(0, -.5px) rotate(-1.5deg);
      transform: translate(0, -.5px) rotate(-1.5deg)
    }
    18% {
      -webkit-transform: translate(0, .5px) rotate(-1.5deg);
      -moz-transform: translate(0, .5px) rotate(-1.5deg);
      -ms-transform: translate(0, .5px) rotate(-1.5deg);
      -o-transform: translate(0, .5px) rotate(-1.5deg);
      transform: translate(0, .5px) rotate(-1.5deg)
    }
    20% {
      -webkit-transform: translate(0, -1.5px) rotate(2.5deg);
      -moz-transform: translate(0, -1.5px) rotate(2.5deg);
      -ms-transform: translate(0, -1.5px) rotate(2.5deg);
      -o-transform: translate(0, -1.5px) rotate(2.5deg);
      transform: translate(0, -1.5px) rotate(2.5deg)
    }
    22% {
      -webkit-transform: translate(0, .5px) rotate(-1.5deg);
      -moz-transform: translate(0, .5px) rotate(-1.5deg);
      -ms-transform: translate(0, .5px) rotate(-1.5deg);
      -o-transform: translate(0, .5px) rotate(-1.5deg);
      transform: translate(0, .5px) rotate(-1.5deg)
    }
    24% {
      -webkit-transform: translate(0, 1.5px) rotate(1.5deg);
      -moz-transform: translate(0, 1.5px) rotate(1.5deg);
      -ms-transform: translate(0, 1.5px) rotate(1.5deg);
      -o-transform: translate(0, 1.5px) rotate(1.5deg);
      transform: translate(0, 1.5px) rotate(1.5deg)
    }
    26% {
      -webkit-transform: translate(0, .5px) rotate(.5deg);
      -moz-transform: translate(0, .5px) rotate(.5deg);
      -ms-transform: translate(0, .5px) rotate(.5deg);
      -o-transform: translate(0, .5px) rotate(.5deg);
      transform: translate(0, .5px) rotate(.5deg)
    }
    28% {
      -webkit-transform: translate(0, .5px) rotate(1.5deg);
      -moz-transform: translate(0, .5px) rotate(1.5deg);
      -ms-transform: translate(0, .5px) rotate(1.5deg);
      -o-transform: translate(0, .5px) rotate(1.5deg);
      transform: translate(0, .5px) rotate(1.5deg)
    }
    30% {
      -webkit-transform: translate(0, -.5px) rotate(2.5deg);
      -moz-transform: translate(0, -.5px) rotate(2.5deg);
      -ms-transform: translate(0, -.5px) rotate(2.5deg);
      -o-transform: translate(0, -.5px) rotate(2.5deg);
      transform: translate(0, -.5px) rotate(2.5deg)
    }
    32% {
      -webkit-transform: translate(0, 1.5px) rotate(-.5deg);
      -moz-transform: translate(0, 1.5px) rotate(-.5deg);
      -ms-transform: translate(0, 1.5px) rotate(-.5deg);
      -o-transform: translate(0, 1.5px) rotate(-.5deg);
      transform: translate(0, 1.5px) rotate(-.5deg)
    }
    34% {
      -webkit-transform: translate(0, 1.5px) rotate(-.5deg);
      -moz-transform: translate(0, 1.5px) rotate(-.5deg);
      -ms-transform: translate(0, 1.5px) rotate(-.5deg);
      -o-transform: translate(0, 1.5px) rotate(-.5deg);
      transform: translate(0, 1.5px) rotate(-.5deg)
    }
    36% {
      -webkit-transform: translate(0, -1.5px) rotate(2.5deg);
      -moz-transform: translate(0, -1.5px) rotate(2.5deg);
      -ms-transform: translate(0, -1.5px) rotate(2.5deg);
      -o-transform: translate(0, -1.5px) rotate(2.5deg);
      transform: translate(0, -1.5px) rotate(2.5deg)
    }
    38% {
      -webkit-transform: translate(0, 1.5px) rotate(-1.5deg);
      -moz-transform: translate(0, 1.5px) rotate(-1.5deg);
      -ms-transform: translate(0, 1.5px) rotate(-1.5deg);
      -o-transform: translate(0, 1.5px) rotate(-1.5deg);
      transform: translate(0, 1.5px) rotate(-1.5deg)
    }
    40% {
      -webkit-transform: translate(0, -.5px) rotate(2.5deg);
      -moz-transform: translate(0, -.5px) rotate(2.5deg);
      -ms-transform: translate(0, -.5px) rotate(2.5deg);
      -o-transform: translate(0, -.5px) rotate(2.5deg);
      transform: translate(0, -.5px) rotate(2.5deg)
    }
    42% {
      -webkit-transform: translate(0, 2.5px) rotate(-1.5deg);
      -moz-transform: translate(0, 2.5px) rotate(-1.5deg);
      -ms-transform: translate(0, 2.5px) rotate(-1.5deg);
      -o-transform: translate(0, 2.5px) rotate(-1.5deg);
      transform: translate(0, 2.5px) rotate(-1.5deg)
    }
    44% {
      -webkit-transform: translate(0, 1.5px) rotate(.5deg);
      -moz-transform: translate(0, 1.5px) rotate(.5deg);
      -ms-transform: translate(0, 1.5px) rotate(.5deg);
      -o-transform: translate(0, 1.5px) rotate(.5deg);
      transform: translate(0, 1.5px) rotate(.5deg)
    }
    46% {
      -webkit-transform: translate(0, -1.5px) rotate(2.5deg);
      -moz-transform: translate(0, -1.5px) rotate(2.5deg);
      -ms-transform: translate(0, -1.5px) rotate(2.5deg);
      -o-transform: translate(0, -1.5px) rotate(2.5deg);
      transform: translate(0, -1.5px) rotate(2.5deg)
    }
    48% {
      -webkit-transform: translate(0, -.5px) rotate(.5deg);
      -moz-transform: translate(0, -.5px) rotate(.5deg);
      -ms-transform: translate(0, -.5px) rotate(.5deg);
      -o-transform: translate(0, -.5px) rotate(.5deg);
      transform: translate(0, -.5px) rotate(.5deg)
    }
    50% {
      -webkit-transform: translate(0, .5px) rotate(.5deg);
      -moz-transform: translate(0, .5px) rotate(.5deg);
      -ms-transform: translate(0, .5px) rotate(.5deg);
      -o-transform: translate(0, .5px) rotate(.5deg);
      transform: translate(0, .5px) rotate(.5deg)
    }
    52% {
      -webkit-transform: translate(0, 2.5px) rotate(2.5deg);
      -moz-transform: translate(0, 2.5px) rotate(2.5deg);
      -ms-transform: translate(0, 2.5px) rotate(2.5deg);
      -o-transform: translate(0, 2.5px) rotate(2.5deg);
      transform: translate(0, 2.5px) rotate(2.5deg)
    }
    54% {
      -webkit-transform: translate(0, -1.5px) rotate(1.5deg);
      -moz-transform: translate(0, -1.5px) rotate(1.5deg);
      -ms-transform: translate(0, -1.5px) rotate(1.5deg);
      -o-transform: translate(0, -1.5px) rotate(1.5deg);
      transform: translate(0, -1.5px) rotate(1.5deg)
    }
    56% {
      -webkit-transform: translate(0, 2.5px) rotate(2.5deg);
      -moz-transform: translate(0, 2.5px) rotate(2.5deg);
      -ms-transform: translate(0, 2.5px) rotate(2.5deg);
      -o-transform: translate(0, 2.5px) rotate(2.5deg);
      transform: translate(0, 2.5px) rotate(2.5deg)
    }
    58% {
      -webkit-transform: translate(0, .5px) rotate(2.5deg);
      -moz-transform: translate(0, .5px) rotate(2.5deg);
      -ms-transform: translate(0, .5px) rotate(2.5deg);
      -o-transform: translate(0, .5px) rotate(2.5deg);
      transform: translate(0, .5px) rotate(2.5deg)
    }
    60% {
      -webkit-transform: translate(0, 2.5px) rotate(2.5deg);
      -moz-transform: translate(0, 2.5px) rotate(2.5deg);
      -ms-transform: translate(0, 2.5px) rotate(2.5deg);
      -o-transform: translate(0, 2.5px) rotate(2.5deg);
      transform: translate(0, 2.5px) rotate(2.5deg)
    }
    62% {
      -webkit-transform: translate(0, -.5px) rotate(2.5deg);
      -moz-transform: translate(0, -.5px) rotate(2.5deg);
      -ms-transform: translate(0, -.5px) rotate(2.5deg);
      -o-transform: translate(0, -.5px) rotate(2.5deg);
      transform: translate(0, -.5px) rotate(2.5deg)
    }
    64% {
      -webkit-transform: translate(0, -.5px) rotate(1.5deg);
      -moz-transform: translate(0, -.5px) rotate(1.5deg);
      -ms-transform: translate(0, -.5px) rotate(1.5deg);
      -o-transform: translate(0, -.5px) rotate(1.5deg);
      transform: translate(0, -.5px) rotate(1.5deg)
    }
    66% {
      -webkit-transform: translate(0, 1.5px) rotate(-.5deg);
      -moz-transform: translate(0, 1.5px) rotate(-.5deg);
      -ms-transform: translate(0, 1.5px) rotate(-.5deg);
      -o-transform: translate(0, 1.5px) rotate(-.5deg);
      transform: translate(0, 1.5px) rotate(-.5deg)
    }
    68% {
      -webkit-transform: translate(0, -1.5px) rotate(-.5deg);
      -moz-transform: translate(0, -1.5px) rotate(-.5deg);
      -ms-transform: translate(0, -1.5px) rotate(-.5deg);
      -o-transform: translate(0, -1.5px) rotate(-.5deg);
      transform: translate(0, -1.5px) rotate(-.5deg)
    }
    70% {
      -webkit-transform: translate(0, 1.5px) rotate(.5deg);
      -moz-transform: translate(0, 1.5px) rotate(.5deg);
      -ms-transform: translate(0, 1.5px) rotate(.5deg);
      -o-transform: translate(0, 1.5px) rotate(.5deg);
      transform: translate(0, 1.5px) rotate(.5deg)
    }
    72% {
      -webkit-transform: translate(0, 2.5px) rotate(1.5deg);
      -moz-transform: translate(0, 2.5px) rotate(1.5deg);
      -ms-transform: translate(0, 2.5px) rotate(1.5deg);
      -o-transform: translate(0, 2.5px) rotate(1.5deg);
      transform: translate(0, 2.5px) rotate(1.5deg)
    }
    74% {
      -webkit-transform: translate(0, -.5px) rotate(.5deg);
      -moz-transform: translate(0, -.5px) rotate(.5deg);
      -ms-transform: translate(0, -.5px) rotate(.5deg);
      -o-transform: translate(0, -.5px) rotate(.5deg);
      transform: translate(0, -.5px) rotate(.5deg)
    }
    76% {
      -webkit-transform: translate(0, -.5px) rotate(2.5deg);
      -moz-transform: translate(0, -.5px) rotate(2.5deg);
      -ms-transform: translate(0, -.5px) rotate(2.5deg);
      -o-transform: translate(0, -.5px) rotate(2.5deg);
      transform: translate(0, -.5px) rotate(2.5deg)
    }
    78% {
      -webkit-transform: translate(0, -.5px) rotate(1.5deg);
      -moz-transform: translate(0, -.5px) rotate(1.5deg);
      -ms-transform: translate(0, -.5px) rotate(1.5deg);
      -o-transform: translate(0, -.5px) rotate(1.5deg);
      transform: translate(0, -.5px) rotate(1.5deg)
    }
    80% {
      -webkit-transform: translate(0, 1.5px) rotate(1.5deg);
      -moz-transform: translate(0, 1.5px) rotate(1.5deg);
      -ms-transform: translate(0, 1.5px) rotate(1.5deg);
      -o-transform: translate(0, 1.5px) rotate(1.5deg);
      transform: translate(0, 1.5px) rotate(1.5deg)
    }
    82% {
      -webkit-transform: translate(0, -.5px) rotate(.5deg);
      -moz-transform: translate(0, -.5px) rotate(.5deg);
      -ms-transform: translate(0, -.5px) rotate(.5deg);
      -o-transform: translate(0, -.5px) rotate(.5deg);
      transform: translate(0, -.5px) rotate(.5deg)
    }
    84% {
      -webkit-transform: translate(0, 1.5px) rotate(2.5deg);
      -moz-transform: translate(0, 1.5px) rotate(2.5deg);
      -ms-transform: translate(0, 1.5px) rotate(2.5deg);
      -o-transform: translate(0, 1.5px) rotate(2.5deg);
      transform: translate(0, 1.5px) rotate(2.5deg)
    }
    86% {
      -webkit-transform: translate(0, -1.5px) rotate(-1.5deg);
      -moz-transform: translate(0, -1.5px) rotate(-1.5deg);
      -ms-transform: translate(0, -1.5px) rotate(-1.5deg);
      -o-transform: translate(0, -1.5px) rotate(-1.5deg);
      transform: translate(0, -1.5px) rotate(-1.5deg)
    }
    88% {
      -webkit-transform: translate(0, -.5px) rotate(2.5deg);
      -moz-transform: translate(0, -.5px) rotate(2.5deg);
      -ms-transform: translate(0, -.5px) rotate(2.5deg);
      -o-transform: translate(0, -.5px) rotate(2.5deg);
      transform: translate(0, -.5px) rotate(2.5deg)
    }
    90% {
      -webkit-transform: translate(0, 2.5px) rotate(-.5deg);
      -moz-transform: translate(0, 2.5px) rotate(-.5deg);
      -ms-transform: translate(0, 2.5px) rotate(-.5deg);
      -o-transform: translate(0, 2.5px) rotate(-.5deg);
      transform: translate(0, 2.5px) rotate(-.5deg)
    }
    92% {
      -webkit-transform: translate(0, .5px) rotate(-.5deg);
      -moz-transform: translate(0, .5px) rotate(-.5deg);
      -ms-transform: translate(0, .5px) rotate(-.5deg);
      -o-transform: translate(0, .5px) rotate(-.5deg);
      transform: translate(0, .5px) rotate(-.5deg)
    }
    94% {
      -webkit-transform: translate(0, 2.5px) rotate(.5deg);
      -moz-transform: translate(0, 2.5px) rotate(.5deg);
      -ms-transform: translate(0, 2.5px) rotate(.5deg);
      -o-transform: translate(0, 2.5px) rotate(.5deg);
      transform: translate(0, 2.5px) rotate(.5deg)
    }
    96% {
      -webkit-transform: translate(0, -.5px) rotate(1.5deg);
      -moz-transform: translate(0, -.5px) rotate(1.5deg);
      -ms-transform: translate(0, -.5px) rotate(1.5deg);
      -o-transform: translate(0, -.5px) rotate(1.5deg);
      transform: translate(0, -.5px) rotate(1.5deg)
    }
    98% {
      -webkit-transform: translate(0, -1.5px) rotate(-.5deg);
      -moz-transform: translate(0, -1.5px) rotate(-.5deg);
      -ms-transform: translate(0, -1.5px) rotate(-.5deg);
      -o-transform: translate(0, -1.5px) rotate(-.5deg);
      transform: translate(0, -1.5px) rotate(-.5deg)
    }
    0%, 100% {
      -webkit-transform: translate(0, 0) rotate(0);
      -moz-transform: translate(0, 0) rotate(0);
      -ms-transform: translate(0, 0) rotate(0);
      -o-transform: translate(0, 0) rotate(0);
      transform: translate(0, 0) rotate(0)
    }
  }
</style>
