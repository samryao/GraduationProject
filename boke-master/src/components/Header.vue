<template>
  <div class="headBack">
    <div class="container">
      <div class="headBox">
          <span class="logoImg">
              <img src="" alt="" class="fitImg">
          </span>
        <ul>
          <li>
            <router-link to="/home" :class="$route.name=='Home'?'active':''" >
              <i class="el-icon-menu" style="color: #fff"></i>&nbsp;&nbsp;首页
            </router-link>
          </li>
<!--          <li>-->
<!--            <router-link to="/Articlelist" :class="$route.name=='Comment'?'active':''">-->
<!--              <i class="el-icon-more-outline" style="color: #fff"></i>&nbsp;&nbsp;&nbsp;所有评论-->
<!--            </router-link>-->
<!--          </li>-->

          <li>
            <router-link to="/HotArticle" :class="$route.name=='HotArticle'?'active':''">
              <i class="el-icon-message" style="color: #fff"></i>&nbsp;&nbsp;&nbsp;热门文章
            </router-link>
          </li>

          <li>
            <router-link to="/add" :class="$route.name=='ArticleAdd'?'active':''">
              <i class="el-icon-edit" style="color: #fff"></i>&nbsp;&nbsp;&nbsp;写博客
            </router-link>
          </li>
          <li>
            <el-dropdown style="margin-left: 60px">
              <span class="el-dropdown-link">
              欢迎, {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/MyArticle" v-if="user!=='root'">
                  <el-dropdown-item icon="el-icon-bell">我的博客</el-dropdown-item>
                </router-link>
                <router-link to="/MyArticle" v-if="user==='root'">
                  <el-dropdown-item icon="el-icon-plus">管理博客</el-dropdown-item>
                </router-link>
                <router-link to="/Settings" >
                  <el-dropdown-item icon="el-icon-setting">账号设置</el-dropdown-item>
                </router-link>
                <router-link to="/login" >
                  <el-dropdown-item icon="el-icon-circle-check-outline">退出登录</el-dropdown-item>
                </router-link>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {ClassList} from '../networks/api/index'

  export default {
    data () {
      // 选项 / 数据
      return {
        user:this.$store.state.username,
        username: '',
        headclassList: '', // 分类列表
        restaurants: [],
        isCollapse: true,
        isOpen: false,
        path: '',
        pMenu: false,
      }
    },
    methods: {
      // 事件处理器
      hoverFun: function () {
        // hover移入时 展示分类列表
        this.isOpen = true
      },
      leaveFun: function () {
        // 鼠标离开时 隐藏分类列表
        this.isOpen = false
      },
      clickMenu: function () {
        if (this.pMenu) {
          this.pMenu = false
        } else {
          this.pMenu = true
        }
      },
      querySearch (queryString, cb) {
        // 快速选择
        // console.log(queryString,cb,this.$router.query);
        var restaurants = this.restaurants
        var results = queryString
          ? restaurants.filter(this.createFilter(queryString))
          : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter (queryString) {
        return restaurant => {
          return restaurant.value.indexOf(queryString.toLowerCase()) === 0
        }
      },
      loadAll () {
        return []
      },

    },
    mounted () {
      this.restaurants = this.loadAll()
    }
    ,
    created () {
      this.username = this.$store.state.username
    }
  }
</script>

<style>

  .headBack {
    width: 100%;
    background: rgb(51, 51, 51);
    /*background: #eef1f6;*/
    margin-bottom: 30px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  }

  .headBox a {
    color: rgb(176, 176, 176);
  }

  .headBox .is-active {
    color: #ffffff;
  }

  .headBox > ul {
    height: 60px;
    display: inline-block;
    /*font-size: 15px;*/
  }

  .headBox > ul li > a {
    display: inline-block;
    padding: 10px 20px;
  }

  .el-icon-search {
    cursor: pointer;
  }

  .headBox > ul li {
    display: inline-block;
    padding: 20px 20px;
    position: relative;
    top: -10px;
    border-bottom: 5px solid transparent;
  }

  .headBox > ul li:hover {
    border-bottom: 2px solid #56b6e7;
  }

  .headBox > ul li a.active {
    color: #ffffff;
  }

  .headBox > ul li.noPadSearch:hover {
    border-bottom: 5px solid transparent;
  }

  .selectBoxShow {
    box-sizing: border-box;
    overflow: hidden;
    position: absolute;
    padding: 0 5px;
    top: 110%;
    height: 0;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    z-index: 999;
    transition: all 0.3s ease-out;
  }

  .selectBoxShow a {
    color: #424242;
  }

  .selectBoxShow.show {
    /*display: block;*/
    height: 375px;
  }

  .headBox > ul li.noPadSearch {
    padding: 0;
    top: 16px;
    margin-left: 30px;
  }

  .selectBox {
    border-bottom: 1px solid #f1f1f1;
    display: block;
    width: 390px;
    min-height: 70px;
    /*line-height: 150%;*/
    padding: 10px;
    cursor: default;
  }

  .selectBox a {
    display: inline-block;
    padding: 2px 4px;
    margin: 2px 0;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .selectBox a:hover {
    background-color: #56b6e7;
    color: #fff;
  }

  .selectMore {
    margin-left: -5px;
    margin-right: -5px;
    text-align: center;
    padding: 10px 0;
    background: #f1f1f1;
  }

  .selectMore:hover {
    background: #56b6e7;
    color: #fff;
  }

  .selectMore:hover a {
    color: #fff;
  }

  .logoImg {
    width: 160px;
    height: 50px;
    display: inline-block;
    padding: 5px 5px;
    vertical-align: top;
  }

  .logoImg img {
    width: 100%;
    height: 100%;
  }

  .searchBox {
    margin-top: -47px;
  }

  .search:hover {
    cursor: pointer;
  }

</style>
