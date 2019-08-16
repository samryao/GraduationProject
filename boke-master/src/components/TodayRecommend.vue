<!--今日推荐-->
<template>
  <div>
    <div v-for="o in 1" :key="o" class="text item">
      <el-row>
        <el-col :span="8"  v-for="(every, index) in recommend" :key="index" :offset="1" class="card">
          <el-card :body-style="{ padding: '0px' }" class="recommend" shadow="hover">
            <img :src="img_list[index].img" alt="今日推荐" class="img">
            <router-link :to="{path:'/Articledetail',query: {id: every.id}}">
              <span class="title">{{every.title}}</span>
              <p class="muted" style="width: 300px; left: 16px;">{{every.excerpt}}&nbsp;&nbsp;&nbsp;...</p>
            </router-link>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {TodayRecommend} from '../networks/api/index'

  export default {
    data () {
      //选项 / 数据
      return {
        currentDate: new Date().getFullYear(),
        img_list: [
          {img: require('../img/small_img/5.jpg')},
          {img: require('../img/small_img/6.jpg')},
          {img: require('../img/small_img/3.jpg')},
          {img: require('../img/small_img/8.jpg')},
        ],
        recommend: ''
      }
    },
    methods: {
      //事件处理器
    },
    components: {
      //定义组件
    },
    created () {
      TodayRecommend().then(res => {
        if (res.code = 200) {
          // console.log("今日推荐",res);
          this.recommend = res.data
        }
      })

    }
  }
</script>

<style>

  .card {
    margin-right: 5px;
    margin-left: 0;
  }

  .img {
    float: left;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 110px;
    height: 80px;
  }

  .text {
    font-size: 14px;
  }

  .recommend {
    vertical-align: middle;
    height: 110px;
  }

  .item {
    padding: 18px 0;
  }

  .title {
    color: rgb(64,158,255);
    float: left;
    margin-top: 20px;
    margin-left: 18px;
  }

  .muted {
    font-size: 12px;
    position: relative;
    padding-top: 55px;
    left: 6px;
    font-family: "Microsoft YaHei";
    color: #333;
  }


</style>
