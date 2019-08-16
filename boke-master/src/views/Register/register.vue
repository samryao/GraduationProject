<template>
  <div class="background">
    <div class="registerBox">
      <h1 class="registerTitle">
        <a href="/">注册</a>
      </h1>
          <div class="lr-title">
            <p>
              已有账号<a href="/login" class="tcolors">登录</a>
            </p>
          </div>
          <el-alert
            v-show="registerErr"
            :title="registerTitle"
            type="error"
            show-icon :closable="true">
          </el-alert>

          <!--注册-->

          <!--用户名-->
          <el-input
            type="text"
            placeholder="用户名"
            v-model="reg_username">
          </el-input>
          <!--用户名错误-->
          <el-alert
            v-show="reg_usernameErr"
            :title="err_username_msg"
            type="warning"
            show-icon :closable="true">
          </el-alert>
          <!--密码-->
          <el-input
            type="password"
            placeholder="密码:6-12位英文、数字、下划线"
            v-model="reg_password">
          </el-input>
          <!--密码错误-->
          <el-alert
            v-show="reg_passwordErr"
            :title="err_password_msg"
            type="error"
            show-icon :closable="true">
          </el-alert>
          <!--确认密码-->
          <el-input
            type="password"
            placeholder="确认密码"
            @keyup.enter.native="registerEnterFun"
            v-model="reg_password2">
          </el-input>
          <!--重复密码有误-->
          <el-alert
            v-show="reg_password2Err"
            :title="err_password2_msg"
            type="error"
            show-icon :closable="true">
          </el-alert>
          <!--邮箱-->
          <el-input
            type="email"
            placeholder="邮箱"
            v-model="reg_email">
          </el-input>
          <!--邮箱错误-->
          <el-alert
            v-show="reg_emailErr"
            :title="err_email_msg"
            type="error"
            show-icon :closable="true">
          </el-alert>
          <div class="lr-btn tcolors-bg" @click="newRegister" :plain="true">
            注册
          </div>
        </div>
    </div>
</template>

<script>
  import {getRegister} from '../../networks/api/index'
  export default {
    name: 'register',
    data () { //选项 / 数据
      return {

        reg_username: '',//新用户注册名
        reg_password: '',//新用户注册密码
        reg_password2: '',//新用户注册重复密码
        reg_email: '',//新用户注册邮箱

        reg_usernameErr: false,//新用户注册用户名错误
        reg_emailErr: false,//新用户注册邮箱错误
        reg_passwordErr: false,//新用户注册密码错误
        reg_password2Err: false,//新用户注册重复密码错误

        err_username_msg: '',
        err_password_msg: '',
        err_password2_msg: '',
        err_email_msg: '',

        registerErr: false,//已注册错误
        registerTitle: '该邮箱已注册',

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



      //注册提交
      newRegister () {

        let that = this
        let params = {
          reg_username: this.reg_username,
          reg_password: this.reg_password,
          reg_email: this.reg_email
        }
        let valid_username = /^(\w){3,12}$/ // 用户名位数为3-12位
        let valid_email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ // 验证邮箱格式
        let valid_password = /^(\w){6,12}$/ // 验证密码格式为6-12位

        // 验证用户名,密码,邮箱等
        if (that.reg_username === '') { // 如果username为空
          that.reg_usernameErr = true
          that.err_username_msg = '用户名不能为空'
          return
        } else {
          if (valid_username.test(that.reg_username)) { // 如果用户名格式正确
            that.reg_usernameErr = false
          } else { // 用户名格式不正确
            that.reg_usernameErr = true
            that.err_username_msg = '用户名格式不正确'
            return
          }
        }
        if (that.reg_password === '') { // 如果password为空
          that.reg_passwordErr = true
          that.err_password_msg = '密码不能为空'
          return
        } else {
          if (that.reg_password && valid_password.test(that.reg_password)) { // 如果password符合格式
            that.reg_passwordErr = false
            if (that.reg_password === that.reg_password2) {
              that.reg_password2Err = false
            } else {
              that.reg_password2Err = true
              that.err_password2_msg = '两次密码不一致'
              return
            }
          } else {
            that.reg_passwordErr = true
            that.err_password_msg = '密码格式不正确'
            return
          }
        }
        if (that.reg_email === '') { // 如果email为空
          that.reg_emailErr = true
          that.err_email_msg = '邮箱不能为空'
          return
        } else {
          if (valid_email.test(that.reg_email)) { // 如果email符合格式
            that.reg_emailErr = false
          } else {
            that.reg_emailErr = true
            that.err_email_msg = '邮箱格式不正确'
            return
          }
        }

        // 发起注册请求
        getRegister(params).then(res => {
          if (res.code === 200) {//注册成功
            that.$message({
              message: '注册成功',
              type: 'success',
              duration: 1000
            })
            let timer = setTimeout(function () {
              that.$router.push({path: '/login'})
            }, 1000)

          } else if (res.code === 201) {//该邮箱已注册
            that.registerErr = true
            that.registerTitle = '用户已存在,请重新注册'
          } else {
            that.registerErr = true
            that.registerTitle = '注册失败'
          }
        })
      },

      // 回车注册
      registerEnterFun: function(e){
          let keyCode = window.event? e.keyCode:e.which;
          if(keyCode === 13 ){
              this.newRegister();
          }
      },
    },

  }
</script>

<style>

  .registerTitle {
    text-align: center;
    font-size: 26px;
    padding-top: 50px;
    margin-bottom: 20px;
  }
  .registerBox {
    padding: 40px;
    max-width: 320px;
    margin: 0 auto;
  }

  .background {
    color: rgba(255,255,255,0.3);
    position: relative;
    width: 100%;
    height: 635px;
    background-image: url(../../assets/login-bg.jpg);
    background-size: 100%;
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

  .tcolors{
    color: #56b6e7;
  }
  .registerSuc .sucIcon {
    text-align: center;
    margin-bottom: 30px;
    padding-left: 60px;
  }

  .registerSuc .sucContent {
    line-height: 1.5;
    font-size: 15px;
    text-align: center;
  }

  .registerSuc .sucContent p {
    margin-top: 10px;
    font-size: 13px;
    color: #999;
  }

  .registerSuc .sucContent .lastbtn {
    display: inline-block;
    font-size: 14px;
    padding: 3px 10px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
  }

  .registerSuc .sucContent {
    font-size: 13px;
  }
</style>
