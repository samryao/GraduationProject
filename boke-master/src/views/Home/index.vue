<template>
  <el-row class="container">
    <Carouselmap></Carouselmap>
    <div>
      <div class="title1">今日推荐</div>
      <TodayRecommend class="todayList"></TodayRecommend>
    </div>

    <el-row class="tag">
      <el-card class="box-card">
        <h1>热门标签</h1>
        <hr>
        <el-button size="small" round v-for="tag in hot_tags" class="button_tag" :key="tag.id" @click="button1(tag.id)">
          {{tag.title}}
        </el-button>
      </el-card>


      <div style="width: 100%; height: 50px"></div>
      <el-row class="tag1">
        <el-card class="box-card" style="height: auto">
          <h1>推荐文章</h1>
          <hr>
          <el-col :span="8" v-for="article in recommend_article_list" :key="article.id" :offset="1" class="card1"
                  shadow="never">
            <el-card :body-style="{ padding: '0px' }" class="recommend1" shadow="hover">
              <router-link :to="{path:'/Articledetail',query: {id: article.id}}">
                <span class="title">{{article.title}}</span>
                <p class="muted">{{article.excerpt}}</p>
                <icon name="user" class="icon common box1" style="margin-left: 15px; margin-top: 20px;"></icon>
                <i class="author1 common box1" style="margin-left: 7px;margin-top: 20px;">{{article.user}}</i>
                <i class="icon1 el-icon-time common box1" style="margin-left: 13px;margin-top: 20px;">{{article.create_time}}</i>
                <span class="box1" style="margin-left: 10px;margin-top: 20px;">{{article.total_views}}次浏览</span>
              </router-link>
            </el-card>
          </el-col>
        </el-card>
      </el-row>

      <div style="width: 100%; height: 50px"></div>

      <!--<el-row class="tag1">-->
        <!--<el-card class="box-card" style="height: 420px">-->
          <!--<h1>最新评论</h1>-->
          <!--<hr>-->
          <!--<el-col :span="8" v-for="comment in comment_list" :key="comment.id" :offset="1" class="card1" shadow="never">-->
            <!--<el-card :body-style="{ padding: '0px' }" class="recommend" shadow="hover">-->
              <!--<router-link :to="{path:'/Articledetail',query: {id: comment.article_id}}">-->
                <!--<span class="title">{{comment.article}}</span>-->
                <!--<p class="muted">{{comment.excerpt}}</p>-->
              <!--</router-link>-->
            <!--</el-card>-->
          <!--</el-col>-->
        <!--</el-card>-->
      <!--</el-row>-->

    </el-row>

    <div>
      <div class="title1">最新发布</div>
      <NewPublish class="newPublish"></NewPublish>
    </div>


  </el-row>
</template>

<script>
  import {Recommend} from '../../networks/api'
  import {Comment} from '../../networks/api'
  import {HotTags} from '../../networks/api'
  import Carouselmap from '../../components/Carouselmap.vue'
  import TodayRecommend from '../../components/TodayRecommend.vue'
  import NewPublish from '../../components/NewPublish'

  export default {
    name: 'Home',
    data () {
      //选项 / 数据
      return {
        hot_tags: [],
        recommend_article_list: [],
        comment_list: [],
        myTitle: '标题',
      }
    },
    methods: {
      //事件处理器
      button1(tag_id) {
        // console.log(tag_id)
        this.$router.push({name:'MyArticle', query: {id: tag_id}})
      }

    },
    components: {
      //自定义组件
      Carouselmap: Carouselmap, //轮播
      TodayRecommend: TodayRecommend, //今日推荐
      NewPublish: NewPublish, //最新菜谱
    },
    created () {
      let time = function (time) {
        let date = new Date(time)
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = date.getDate() + ' '
        return Y + M + D
      }

      Recommend().then(res => {
        let that = this
        // console.log('推荐文章', res)
        if (res.code == 200) {
          that.recommend_article_list = res.data
          for (let i = 0; i < that.recommend_article_list.length; i++) {
            that.recommend_article_list[i].create_time = time(that.recommend_article_list[i].create_time)
          }
        }
      })

      // Comment().then(res => {
      //   let that = this;
      //   // console.log("最新评论", res)
      //   if (res.code == 200){
      //     that.comment_list = res.data
      //   }
      // })

      HotTags().then(res => {
        // console.log(res);
        let that = this;
        that.hot_tags = res.data;

      })

    }
  }
</script>

<style>

  .todayList,
  .newPublish {
    width: 100%;
  }

  .title1 {
    padding-top: 5px;
    padding-bottom: 5px;
    line-height: 25px;
    width: 100%;
    height: 25px;
    font-size: 16px;
  }

  .recommend1 {
    vertical-align: middle;
    height: 200px;
  }

  .box1 {
    font-size: 12px;
    color: #999;
  }

  .button_tag {
    margin: 10px;
    border: 1px solid #00c3b6;
  }

  .card1 {
    width: 100%;
    height: 150px;
    margin-left: 0;
  }

  .tag {
    width: 290px;
    height: 250px;
    position: relative;
    float: right;
    margin-top: -240px;
    display: inline;
  }


  .tag1 {
    width: 290px;
    height: 250px;
    display: inline;
    margin-top: -20px;
  }

  .icon1 {
    top: 25px;
  }

  .author1 {
    top: 25px;
    left: 20px;
  }
</style>
