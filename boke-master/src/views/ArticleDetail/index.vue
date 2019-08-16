<template lang="html">
  <el-row class="container">
    <el-col :span="24">
      <div class="hotnewsBox">
        <div>
          <h1
            style="font-size: 28px; margin: 0px; border: 0px; padding: 0px; line-height: 38px; color: rgb(25, 25, 25);text-align: center;">
            {{title}}
          </h1>
          <h3
            style="font-size: 18px; margin: 0px; border: 0px; padding: 0px; line-height: 38px; color: rgb(25, 25, 25);text-align: center; float: left; margin-left: 5px"
          >标签分类: {{tag}}</h3>
        </div>
        <p>
          <br/>
        </p>
        <p>
          <br/>
        </p>
        <mavon-editor
          v-html="content"
          :subfield="false"
          :toolbarsFlag="false"
          :boxShadow="false"
        />
        <p>
          <br/>
        </p>
        <p>
          <br/>
        </p>
      </div>
    </el-col>
    <el-row class="container suggestionBox">
      <el-col :span="24">
        <br>
        <hr>
        <h3 class="pageTitle" style="font-size: 25px">评论列表</h3>
        <hr>
        <el-card class="box-card">

          <div v-for="comment in comments" :key="comment.comment_id" class="text item">
            时间:<span style="color: #56b6e7"> &nbsp;&nbsp;{{comment.created_time}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            用户:<span style="color: #56b6e7"> &nbsp;&nbsp;{{comment.username}}</span>
            <div class="content">
              <p>
                {{comment.text}}
              </p>
            </div>
            <hr>
          </div>

        </el-card>
      </el-col>
    </el-row>

    <el-row class="container suggestionBox">
      <el-col :span="24">
        <br>
        <hr>
        <h3 class="pageTitle" style="font-size: 25px">发表评论</h3>
        <hr>

        <div class="inputBox">
          <span>昵称:</span>
          <el-input type="email"
                    :placeholder="this.$store.state.username"
                    :disabled="true"
          ></el-input>
        </div>
        <div class="inputBox">
          <span>内容:</span>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="textarea"
            v-on:input="inputfunc"
          ></el-input>
          <el-alert :class="textshow?'show':''"
                    title="内容不能为空"
                    type="error"
                    show-icon
                    :closable="false"
          >
          </el-alert>
          <div class="">
            <el-button type="primary" @click="sendSug">发送</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
  import {ArticleDetail} from '../../networks/api'
  import {AddComment} from '../../networks/api'
  import {ArticleComment} from '../../networks/api'
  import marked from 'marked'

  export default {
    name: 'Articledetail',
    inject: ['reload'],
    data () {
      return {
        article_id: '',
        textshow: false,
        textarea: '',
        title: '',
        tag: '',
        content: '',
        comments:''
      }
    },

    methods: {
      inputfunc () {
        if (this.textarea !== '') {
          this.textshow = false
        }
      },
      sendSug () {
        if (this.textarea == '') {
          this.textshow = true
        } else {
          let params = {'article_id': '', 'user_id': '', 'username': '', 'comment': '',}
          params.article_id = this.article_id
          params.user_id = this.$store.state.user_id
          params.username = this.$store.state.username
          params.comment = this.textarea
          AddComment(params).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '评论成功',
                type: 'success',
                duration: 1000
              })
              this.reload()
            }
          })
        }
      }
    },

    created () {
      this.article_id = this.$route.query.id
      ArticleDetail(this.article_id).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.title = res.data.title
          this.tag = res.data.tag
          this.content = marked(res.data.content)

        }
      })
      ArticleComment(this.article_id).then(res => {
        if (res.code == 200){
          this.comments = res.data
        }
      })
    }
  }
</script>

<style lang="css">
  .hotnewsBox {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(100, 100, 100, 0.3);
  }

  .suggestionBox p {
    text-indent: 28px;
    margin-bottom: 20px;
  }

  .suggestionBox .inputBox {
    /*text-indent: 28px;*/
    margin-left: 30px;
    position: relative;
    margin-bottom: 30px;
  }

  .suggestionBox .inputBox .el-input,
  .suggestionBox .inputBox .el-textarea,
  .suggestionBox .inputBox .el-alert {
    padding-left: 50px;
    width: 80%;
    box-sizing: border-box;
  }

  .suggestionBox .inputBox .el-input input {
    border-radius: 4px;
  }

  .suggestionBox .inputBox .el-alert {
    background: transparent;
    color: #ff4949;
    display: none;
  }

  .suggestionBox .inputBox .el-alert.show {
    display: block;
  }

  .suggestionBox .inputBox .el-alert i {
    color: #ff4949;
  }

  .suggestionBox .inputBox > span {
    position: absolute;
    left: 0;
    top: 10px;
  }

  .suggestionBox .inputBox .el-button {
    margin: 20px 50px;
    background: #ffcc66;
    border: 1px solid #ffcc66;
    color: #a37011;
    /*padding:10px 20px;*/
    letter-spacing: 4px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .content {
    height: auto;
  }
</style>
