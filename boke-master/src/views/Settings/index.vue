<template lang="html">
  <el-container style="width: 80%; text-align: center; margin: 0 auto; height: 500px; border: 1px solid #eee">
    <el-aside width="200px">
      <el-menu>
        <el-menu-item-group>
          <el-menu-item>
            <template slot="title" style="">账号设置</template>
          </el-menu-item>
          <el-menu-item @click="change0">修改登录账号</el-menu-item>
          <el-menu-item @click="change1">修改密码</el-menu-item>
          <el-menu-item @click="change2">修改邮箱</el-menu-item>
          <el-menu-item @click="change3" v-if="user==='root'">管理用户</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>

    <el-container>
      <!--修改用户名-->
      <el-main v-if="change_username">
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="输入新用户名">
            <el-input type="text" v-model="new_username" autocomplete="off" placeholder="至少为3位"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit0">提交</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <!--修改密码-->
      <el-main v-if="change_password">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="输入原密码" prop="password">
            <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="输入新密码" prop="changepass">
            <el-input type="password" v-model="ruleForm2.changepass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit1('ruleForm2')">提交</el-button>
            <el-button @click="reset1('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <!--修改邮箱-->
      <el-main v-if="change_email">
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="输入新邮箱">
            <el-input type="text" v-model="new_email" autocomplete="off" placeholder="例如: 123@163.com"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit2">提交</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <!--管理用户-->
      <el-main v-if="user_manage">
        <el-table
          ref="multipleTable"
          :data="userinfo"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
<!--          <el-table-column-->
<!--            type="selection"-->
<!--            width="55">-->
<!--          </el-table-column>-->
          <el-table-column
            label="用户名"
            width="120">
            <template slot-scope="scope">{{ scope.row.username }}</template>
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row) ">编辑
              </el-button>
              <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off" placeholder="111"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off" placeholder="111"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.email" autocomplete="off" placeholder="111"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="edit">确 定</el-button>
                </div>
              </el-dialog>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-main>

    </el-container>
  </el-container>
</template>

<script>
  import {ChangePassword} from '../../networks/api'
  import {ChangeUsername} from '../../networks/api'
  import {ChangeEmail} from '../../networks/api'
  import {UserManage} from '../../networks/api'
  import {UserEdit} from '../../networks/api'
  import {UserDelete} from '../../networks/api'

  export default {
    inject: ['reload'],
    data () {

      let validate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'))
        } else {
          if (this.ruleForm2.changepass !== '') {
            this.$refs.ruleForm2.validateField('changepass')
          }
          callback()
        }
      }

      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass')
          }
          callback()
        }
      }

      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm2.changepass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }

      return {
        user: this.$store.state.username,
        change_username: false,
        change_password: false,
        change_email: false,
        user_manage: false,

        params: {'id': '', data: {'old_password': '', 'change_password': ''}},
        new_username: '',
        new_email: '',
        ruleForm2: {
          password: '',
          changepass: '',
          checkPass: '',
        },
        rules2: {
          password: [
            {validator: validate, trigger: 'blur'}
          ],
          changepass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
        },
        multipleSelection: [],
        userinfo: '',

        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          id: '',
          username: '',
          password: '',
          email: '',

        },
        formLabelWidth: '120px'
      }
    },

    methods: {

      // 修改用户名
      change0 () {
        if (this.$refs['ruleForm2']) {
          // 延时执行
          this.$nextTick(function () {
            this.$refs['ruleForm2'].clearValidate()
          })
        } else {

        }
        this.change_username = true
        this.change_password = false
        this.change_email = false
        this.user_manage = false
      },

      // 修改密码
      change1 () {
        if (this.$refs['ruleForm1']) {
          // 延时执行
          this.$nextTick(function () {
            this.$refs['ruleForm1'].clearValidate()
          })
        } else {

        }
        this.change_password = true
        this.change_username = false
        this.change_email = false
        this.user_manage = false
      },

      // 修改邮箱
      change2 () {
        if (this.$refs['ruleForm1']) {
          // 延时执行
          this.$nextTick(function () {
            this.$refs['ruleForm1'].clearValidate()
          })
        } else {

        }
        this.change_email = true
        this.change_username = false
        this.change_password = false
        this.user_manage = false
      },

      // 管理用户
      change3 () {
        if (this.$refs['ruleForm1']) {
          // 延时执行
          this.$nextTick(function () {
            this.$refs['ruleForm1'].clearValidate()
          })
        } else {

        }
        this.user_manage = true
        this.change_email = false
        this.change_username = false
        this.change_password = false
      },

      submit1 (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.params.id = this.$store.state.user_id
            this.params.data.old_password = this.ruleForm2.password
            this.params.data.change_password = this.ruleForm2.changepass
            ChangePassword(this.params).then(res => {
              if (res.code == 200) {
                this.$message({
                  message: '修改密码成功',
                  type: 'success',
                  duration: 1000
                })
              } else {
                this.$message({
                  message: res.msg,
                  type: 'warning',
                  duration: 1000
                })
              }
            })
          } else {
            return false
          }
        })
      },

      submit0 () {
        if (this.new_username === '') {
          this.$message({
            message: '用户名不能为空',
            type: 'error',
            duration: 1000
          })
        } else {
          let params = {'id': '', 'change_username': ''}
          params.id = this.$store.state.user_id
          params.change_username = this.new_username
          ChangeUsername(params).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '用户名修改成功',
                type: 'success',
                duration: 1000
              })
              let res = {username: this.new_username, user_id: this.$store.state.user_id}
              this.$store.commit('setUser', res)
              this.reload()
            } else {
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 1000
              })
            }
          })
        }
      },

      submit2 () {
        if (this.new_email === '') {
          this.$message({
            message: '修改的邮箱不能为空',
            type: 'error',
            duration: 1000
          })
        } else {
          let params = {'id': '', 'change_email': ''}
          params.id = this.$store.state.user_id
          params.change_email = this.new_email
          ChangeEmail(params).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '邮箱修改成功',
                type: 'success',
                duration: 1000
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 1000
              })
            }
          })
        }
      },

      reset1 (formName) {
        this.$refs[formName].resetFields()
      },

      handleSelectionChange (val) {
        this.multipleSelection = val
      },

      handleEdit (index, row) {
        // console.log(index, row)
        this.dialogFormVisible = true
        this.form.id = row.id
        this.form.username = row.username
        this.form.password = row.password
        this.form.email = row.email
      },

      handleDelete (index, row) {
        console.log(index, row)
        this.form.id = row.id
        this.form.username = row.username
        UserDelete(this.form).then(res => {
          if (res.code == 200) {
            this.$message({
              message: "删除用户成功",
              type: 'success',
              duration: 1000
            })
            this.reload()
          }
        })
      },

      edit () {
        this.dialogFormVisible = false
        UserEdit(this.form).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '用户信息修改成功',
              type: 'success',
              duration: 1000
            })
            this.reload()

          } else {
            this.$message({
              message: '修改失败',
              type: 'error',
              duration: 1000
            })
          }
        })
      }

    }
    ,

    created () {
      this.change_username = true
      UserManage().then(res => {
        if (res.code == 200) {
          this.userinfo = res.data
        } else {

        }

      })
    }
  }
</script>

<style lang="css">
  .el-aside {
    color: #333;
  }
</style>
