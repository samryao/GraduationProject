<template>
  <div class="background">
    <div class="loginBox">
      <h1 class="loginTitle">
        <a href="/">登录</a>
      </h1>
      <div class="lr-title">
        <p>
          新用户<a href="/register" class="tcolors">注册</a>
        </p>
      </div>
      <el-alert
        v-show="loginErr"
        :title="loginTitle"
        type="error"
        show-icon :closable="true">
      </el-alert>
      <el-input
        type="email"
        placeholder="用户名或邮箱"
        v-model="username">
        <el-button slot="prepend">
          <icon name="user"></icon>
        </el-button>
      </el-input>
      <el-alert
        v-show="login_usernameErr"
        :title="err_username_msg"
        type="error"
        show-icon :closable="true">
      </el-alert>
      <el-input
        type="password"
        placeholder="密码"
        @keyup.enter.native="loginEnterFun"
        v-model="password">
        <el-button slot="prepend">
          <icon name="lock"></icon>
        </el-button>
      </el-input>
      <el-alert
        v-show="login_passwordErr"
        :title="err_password_msg"
        type="error"
        show-icon :closable="true">
      </el-alert>
      <div class="lr-btn tcolors-bg" @click="gotoHome">登录</div>
    </div>
  </div>
</template>

<script>
  import {UserLogin} from '../../networks/api/index'

  export default {
    name: 'Login',
    data () { //选项 / 数据
      return {

        err_username_msg: '',
        err_password_msg: '',
        err_password2_msg: '',
        err_email_msg: '',

        username: '',//登录用户名
        password: '',//登录密码

        login: 0,//是否已经登录
        loginTitle: '用户名或密码错误',
        login_usernameErr: false,//登录邮箱错误
        login_passwordErr: false,//登录密码错误
        loginErr: false,//登录错误

        user: '',
        user_id: ''

      }
    },
    methods: { //事件处理器
      routeChange: function () {
        let that = this
        that.login = that.$route.query.login === undefined ? 1 : parseInt(that.$route.query.login)//获取传参的login
        that.url_state = that.$route.query.url_state === undefined ? 0 : that.$route.query.url_state//获取传参的url_state状态码
        // console.log(that.login,that.url_state);
        if (that.url_state === 0) {
          that.err2005 = false
          that.step = 1
        } else if (that.url_state === 'urlInvalid') {
          that.err2005 = true
          that.step = 2
        } else if (that.url_state === 'urlErr') {
          that.err2005 = true
          that.step = 1
        }
      },

      // 回车登录
      loginEnterFun: function (e) {
        let keyCode = window.event ? e.keyCode : e.which
        // console.log('回车登录',keyCode,e);
        if (keyCode === 13) {
          this.gotoHome()
        }
      },

      //用户登录
      gotoHome: function () {
        let that = this
        let params = {
          username: that.username,
          password: that.password
        }
        if (that.username === '') {
          that.err_username_msg = '用户名不能为空'
          that.login_usernameErr = true
          return
        }
        if (that.password === '') {
          that.err_password_msg = '密码不能为空'
          that.login_passwordErr = true
          return
        }

        UserLogin(params).then(res => {
          that.user = res.data.username
          that.user_id = res.data.user_id
          if (res.code !== 200) {
            that.err_username_msg = res.msg
            that.login_usernameErr = true
          } else {
            let res = {username: that.user, user_id: that.user_id}
            this.$store.commit('setUser', res)
            that.login_usernameErr = false
            that.$message({
              message: '登录成功',
              type: 'success',
              duration: 1000
            })
            let timer = setTimeout(function () {
              that.$router.push({path: '/home'})
            }, 1000)
          }
        })

      },

    },
    components: { //定义组件

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'routeChange'
    },
    created () { //生命周期函数
      let that = this
      that.routeChange()
    }
  }
</script>

<style>
  /*登录注册标题*/
  .loginTitle {
    text-align: center;
    font-size: 26px;
    padding-top: 50px;
    margin-bottom: 20px;
  }

  .background {
    color: rgba(255, 255, 255, 0.3);
    position: relative;
    width: 100%;
    height: 635px;
    background-image: url(../../assets/login-bg.jpg);
    background-size: 100%;
  }

  .tcolors {
    color: #56b6e7;
  }

  .loginBox, .registerBox {

    padding: 40px;
    max-width: 320px;
    margin: 0 auto;
  }

  .loginBox {
    padding-bottom: 0;
  }

  .lr-title {
    position: relative;
    height: 32px;
    line-height: 32px;
    margin-bottom: 20px;
  }

  .lr-title h1 {
    font-size: 24px;
    color: #666;
    font-weight: bold;
    /*width:50%;*/
  }

  .lr-title p {
    font-size: 12px;
    color: #999;
    position: absolute;
    right: 0;
    top: 0;
  }

  .lr-btn {
    background-color: #56b6e7;
    color: #fff;
    text-align: center;
    letter-spacing: 5px;
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 30px;
  }

  .loginBox .el-input, .registerBox .el-input {
    margin-bottom: 20px;
  }

  .loginBox .el-alert, .registerBox .el-alert {
    top: -18px;
    background-color: #888;
  }

  .loginBox .el-input input, .registerBox .el-input input {
    border-radius: 4px;
  }

  .loginBox h3, .registerBox h3 {
    text-align: right;
    margin-bottom: 20px;
  }

  .loginBox h3 a, .registerBox h3 a {
    font-size: 13px;
    color: #999;
  }

  .loginBox .otherLogin {
    max-width: 320px;
    padding: 30px 40px;
    background: #ddd;
    text-align: center;
    margin-left: -40px;
    margin-right: -40px;
    visibility: hidden;
  }

  .loginBox .otherLogin p {
    margin-bottom: 20px;
    font-size: 16px;
  }

  .loginBox .otherLogin a i {
    display: inline-block;
    width: 42px;
    height: 42px;
    line-height: 42px;
    font-size: 18px;
    border-radius: 50%;
    color: #fff;
    margin: 0 10px;
  }

  .loginBox .otherLogin a i.fa-wechat {
    background: #7bc549;
  }

  .loginBox .otherLogin a i.fa-qq {
    background: #56b6e7;
  }

  .loginBox .otherLogin a i.fa-weibo {
    background: #ff763b;
  }

  /*登录成功*/


  .registerSuc .sucContent p {
    margin-top: 10px;
    font-size: 13px;
    color: #999;
  }

</style>

