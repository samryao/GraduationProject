webpackJsonp([9],{"Vww/":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("mGwb"),r={inject:["reload"],data:function(){var e=this;return{user:this.$store.state.username,change_username:!1,change_password:!1,change_email:!1,user_manage:!1,params:{id:"",data:{old_password:"",change_password:""}},new_username:"",new_email:"",ruleForm2:{password:"",changepass:"",checkPass:""},rules2:{password:[{validator:function(t,s,a){""===s?a(new Error("请输入原密码")):(""!==e.ruleForm2.changepass&&e.$refs.ruleForm2.validateField("changepass"),a())},trigger:"blur"}],changepass:[{validator:function(t,s,a){""===s?a(new Error("请输入新密码")):(""!==e.ruleForm2.checkPass&&e.$refs.ruleForm2.validateField("checkPass"),a())},trigger:"blur"}],checkPass:[{validator:function(t,s,a){""===s?a(new Error("请再次输入密码")):s!==e.ruleForm2.changepass?a(new Error("两次输入密码不一致!")):a()},trigger:"blur"}]},multipleSelection:[],userinfo:"",dialogTableVisible:!1,dialogFormVisible:!1,form:{id:"",username:"",password:"",email:""},formLabelWidth:"120px"}},methods:{change0:function(){this.$refs.ruleForm2&&this.$nextTick(function(){this.$refs.ruleForm2.clearValidate()}),this.change_username=!0,this.change_password=!1,this.change_email=!1,this.user_manage=!1},change1:function(){this.$refs.ruleForm1&&this.$nextTick(function(){this.$refs.ruleForm1.clearValidate()}),this.change_password=!0,this.change_username=!1,this.change_email=!1,this.user_manage=!1},change2:function(){this.$refs.ruleForm1&&this.$nextTick(function(){this.$refs.ruleForm1.clearValidate()}),this.change_email=!0,this.change_username=!1,this.change_password=!1,this.user_manage=!1},change3:function(){this.$refs.ruleForm1&&this.$nextTick(function(){this.$refs.ruleForm1.clearValidate()}),this.user_manage=!0,this.change_email=!1,this.change_username=!1,this.change_password=!1},submit1:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.params.id=t.$store.state.user_id,t.params.data.old_password=t.ruleForm2.password,t.params.data.change_password=t.ruleForm2.changepass,Object(a.h)(t.params).then(function(e){200==e.code?t.$message({message:"修改密码成功",type:"success",duration:1e3}):t.$message({message:e.msg,type:"warning",duration:1e3})})})},submit0:function(){var e=this;if(""===this.new_username)this.$message({message:"用户名不能为空",type:"error",duration:1e3});else{var t={id:"",change_username:""};t.id=this.$store.state.user_id,t.change_username=this.new_username,Object(a.i)(t).then(function(t){if(200==t.code){e.$message({message:"用户名修改成功",type:"success",duration:1e3});var s={username:e.new_username,user_id:e.$store.state.user_id};e.$store.commit("setUser",s),e.reload()}else e.$message({message:t.msg,type:"error",duration:1e3})})}},submit2:function(){var e=this;if(""===this.new_email)this.$message({message:"修改的邮箱不能为空",type:"error",duration:1e3});else{var t={id:"",change_email:""};t.id=this.$store.state.user_id,t.change_email=this.new_email,Object(a.g)(t).then(function(t){200==t.code?e.$message({message:"邮箱修改成功",type:"success",duration:1e3}):e.$message({message:t.msg,type:"error",duration:1e3})})}},reset1:function(e){this.$refs[e].resetFields()},handleSelectionChange:function(e){this.multipleSelection=e},handleEdit:function(e,t){this.dialogFormVisible=!0,this.form.id=t.id,this.form.username=t.username,this.form.password=t.password,this.form.email=t.email},handleDelete:function(e,t){var s=this;console.log(e,t),this.form.id=t.id,this.form.username=t.username,Object(a.s)(this.form).then(function(e){200==e.code&&(s.$message({message:"删除用户成功",type:"success",duration:1e3}),s.reload())})},edit:function(){var e=this;this.dialogFormVisible=!1,Object(a.t)(this.form).then(function(t){200==t.code?(e.$message({message:"用户信息修改成功",type:"success",duration:1e3}),e.reload()):e.$message({message:"修改失败",type:"error",duration:1e3})})}},created:function(){var e=this;this.change_username=!0,Object(a.v)().then(function(t){200==t.code&&(e.userinfo=t.data)})}},o={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-container",{staticStyle:{width:"80%","text-align":"center",margin:"0 auto",height:"500px",border:"1px solid #eee"}},[s("el-aside",{attrs:{width:"200px"}},[s("el-menu",[s("el-menu-item-group",[s("el-menu-item",[s("template",{slot:"title"},[e._v("账号设置")])],2),e._v(" "),s("el-menu-item",{on:{click:e.change0}},[e._v("修改登录账号")]),e._v(" "),s("el-menu-item",{on:{click:e.change1}},[e._v("修改密码")]),e._v(" "),s("el-menu-item",{on:{click:e.change2}},[e._v("修改邮箱")]),e._v(" "),"root"===e.user?s("el-menu-item",{on:{click:e.change3}},[e._v("管理用户")]):e._e()],1)],1)],1),e._v(" "),s("el-container",[e.change_username?s("el-main",[s("el-form",{staticClass:"demo-ruleForm",attrs:{"label-width":"100px"}},[s("el-form-item",{attrs:{label:"输入新用户名"}},[s("el-input",{attrs:{type:"text",autocomplete:"off",placeholder:"至少为3位"},model:{value:e.new_username,callback:function(t){e.new_username=t},expression:"new_username"}})],1),e._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:e.submit0}},[e._v("提交")])],1)],1)],1):e._e(),e._v(" "),e.change_password?s("el-main",[s("el-form",{ref:"ruleForm2",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm2,"status-icon":"",rules:e.rules2,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"输入原密码",prop:"password"}},[s("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm2.password,callback:function(t){e.$set(e.ruleForm2,"password",t)},expression:"ruleForm2.password"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"输入新密码",prop:"changepass"}},[s("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm2.changepass,callback:function(t){e.$set(e.ruleForm2,"changepass",t)},expression:"ruleForm2.changepass"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"确认密码",prop:"checkPass"}},[s("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.ruleForm2.checkPass,callback:function(t){e.$set(e.ruleForm2,"checkPass",t)},expression:"ruleForm2.checkPass"}})],1),e._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submit1("ruleForm2")}}},[e._v("提交")]),e._v(" "),s("el-button",{on:{click:function(t){return e.reset1("ruleForm2")}}},[e._v("重置")])],1)],1)],1):e._e(),e._v(" "),e.change_email?s("el-main",[s("el-form",{staticClass:"demo-ruleForm",attrs:{"label-width":"100px"}},[s("el-form-item",{attrs:{label:"输入新邮箱"}},[s("el-input",{attrs:{type:"text",autocomplete:"off",placeholder:"例如: 123@163.com"},model:{value:e.new_email,callback:function(t){e.new_email=t},expression:"new_email"}})],1),e._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:e.submit2}},[e._v("提交")])],1)],1)],1):e._e(),e._v(" "),e.user_manage?s("el-main",[s("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.userinfo,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[s("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),s("el-table-column",{attrs:{label:"用户名",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.username))]}}],null,!1,1495375691)}),e._v(" "),s("el-table-column",{attrs:{prop:"password",label:"密码",width:"120"}}),e._v(" "),s("el-table-column",{attrs:{prop:"email",label:"邮箱","show-overflow-tooltip":""}}),e._v(" "),s("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{attrs:{size:"mini"},on:{click:function(s){return e.handleEdit(t.$index,t.row)}}},[e._v("编辑\n            ")]),e._v(" "),s("el-dialog",{attrs:{title:"编辑用户",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[s("el-form",{attrs:{model:e.form}},[s("el-form-item",{attrs:{label:"用户名","label-width":e.formLabelWidth}},[s("el-input",{attrs:{autocomplete:"off",placeholder:"111"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"密码","label-width":e.formLabelWidth}},[s("el-input",{attrs:{autocomplete:"off",placeholder:"111"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"邮箱","label-width":e.formLabelWidth}},[s("el-input",{attrs:{autocomplete:"off",placeholder:"111"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1)],1),e._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),s("el-button",{attrs:{type:"primary"},on:{click:e.edit}},[e._v("确 定")])],1)],1),e._v(" "),s("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(s){return e.handleDelete(t.$index,t.row)}}},[e._v("删除\n            ")])]}}],null,!1,2700355554)})],1)],1):e._e()],1)],1)},staticRenderFns:[]};var i=s("VU/8")(r,o,!1,function(e){s("zMj7")},null,null);t.default=i.exports},zMj7:function(e,t){}});