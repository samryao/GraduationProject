<!--最新文章-->
<template>
  <div class="newPublish">
    <el-col :span="8" v-for="o in 1" :key="o" :offset="1" class="card">
      <el-card class="box-card" v-for="(article, index) in article_list" :key="index">
        <div slot="header" class="clearfix">
          <router-link :to="{path:'/Articledetail',query: {id: article.id}}">
            <span class="muted">
           {{article.title}}
          </span>
            <img :src="img_list[index].img" alt="今日推荐" class="img">
            <div class="description">
              <p class="common" style="font-size: 14px">
                {{article.excerpt}}  ...
              </p>
              <icon name="user" class="icon common"></icon>
              <i class="author common">{{article.user}}</i>
              <i class="icon el-icon-time common">&nbsp;&nbsp;&nbsp;{{article.create_time}}</i>
            </div>
          </router-link>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
  import {NewPublish} from '../networks/api/index'
  export default {
    data () {
      // 选项 / 数据
      return {
        article_list: [],
        first_id: "",
        last_id: "",
        img_list: [
          {id:"", img: require('../img/new_article_img/1.jpg')},
          {id:"", img: require('../img/new_article_img/2.jpg')},
          // {id:"", img: require('../img/new_article_img/3.jpg')},
          {id:"", img: require('../img/new_article_img/4.jpg')},
          {id:"", img: require('../img/new_article_img/5.jpg')},
          // {id:"", img: require('../img/new_article_img/6.jpg')},
          // {id:"", img: require('../img/new_article_img/7.jpg')},
          // {id:"", img: require('../img/new_article_img/8.jpg')}
        ],

      }
    },
    methods: {
      // 事件处理器
      to_item () {
        this.$router.push({name: 'ArticleDetail'})
      }
    },
    components: {
      // 定义组件
    },
    created () {
      NewPublish().then(res => {
        // console.log("最新发布", res)
        if (res.code == 200){
          this.article_list = res.data;
        }
      })
    }

  }
</script>

<style scoped>

  .newPublish {
    width: 100%;
  }

  .muted {
    color: rgb(64, 158, 255);
    padding-left: 67px;
    font-size: 14px;
  }

  .description {
    width: 500px;
    padding-top: 30px;
    height: 100px;
    position: absolute;
    left: 265px;
  }

  .icon{
    top: 25px;
  }

  .author{
    top: 25px;
    left: 20px;
  }

  .el-icon-time{
    top: 25px;
    left: 57px;
  }

  .blog{
    top: 25px;
    left: 111px;
  }

  .common{
    position: relative;
    color: #999;
    font-size: 12px;
  }
  .card {
    margin-right: 5px;
    margin-left: 0;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 787px;
    height: auto;

  }

  .img {
    float: left;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 160px;
    height: 150px;
  }
</style>
