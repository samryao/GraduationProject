<template lang="html">
  <div class="container">
    <el-row :gutter="30">
      <el-col :xs="24" :sm="16">
        <el-card class="box-card">
          <div>
            <el-input v-model="search" placeholder="请输入内容" clearable>
              <i
                class="el-icon-search el-input__icon"
                slot="suffix"
                @click="Search"
              >
              </i>
            </el-input>
          </div>
          <el-table
            :data="tableData.slice((currentPage-1)*pagesize, currentPage*pagesize)"
            style="width: 100%"
            tooltip-effect="dark"
          >
            <el-table-column
              align='center'
              class="el-table-column"
              prop="title"
              label="标题"
              width="210"
            >
            </el-table-column>
            <el-table-column
              align='center'
              class="el-table-column"
              prop="user"
              label="用户名"
              width="100">
            </el-table-column>
            <el-table-column
              align='center'
              class="el-table-column"
              prop="create_time"
              label="创建时间"
              width="150">
            </el-table-column>

            <el-table-column
              align='center'
              class="el-table-column"
              prop="views"
              label="浏览数">
            </el-table-column>

            <el-table-column
              align='center'
              class="el-table-column"
              fixed="right"
              label="操作"
              width="180">
              <template slot-scope="scope">
                <el-button @click="watchClick(scope.row)" type="text" size="small">查看</el-button>

                <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>

                <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>

              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            small
            background
            :page-size="pagesize"
            layout="prev, pager, next"
            :total="tableData.length">
          </el-pagination>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="8">

        <!--日历组件-->
        <div class="adsHear">
          <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate" v-on:isToday="clickToday">
          </Calendar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {MyArticle} from '../../networks/api'
  import {ArticleDelete} from '../../networks/api'
  import {Search} from '../../networks/api'
  import {TimeFilterArticle} from '../../networks/api'
  import {TagArticle} from '../../networks/api'
  import Calendar from 'vue-calendar-component'

  export default {
    name: 'MyArticle',
    inject: ['reload'],
    data () {
      return {
        total: '',
        pagesize: 5,
        currentPage: 1,
        tag_id: '',
        username: '',
        user_id: '',
        tableData: [],
        search: '',
        params: {'search': ''},
        my_article: {'username': '', 'user_id': ''}
      }
    },
    methods: {
      clickDay (data) {
        // console.log(data) //选中某天
        data = data.substring(0, 19)
        let time = new Date(data).getTime()
        // console.log(time)

        let params = {'time': time, 'username': this.username, 'user_id': this.user_id}
        TimeFilterArticle(params).then(res => {
          let that = this
          that.tableData = res.data
        })
      },
      changeDate (data) {
        // console.log(data) //左右点击切换月份
      },
      clickToday (data) {
        // console.log(data) //跳到了本月
      },
      editClick (data) {
        this.$router.push({name: 'ArticleEditor', query: {id: data.id}})
      },
      watchClick (data) {
        this.$router.push({name: 'Articledetail', query: {id: data.id}})
      },
      deleteClick (data) {
        ArticleDelete(data.id).then(res => {
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              duration: 1000
            })
            this.reload()
          }
        })
      },
      Search () {
        this.params['search'] = this.search
        Search(this.params).then(res => {
          // console.log(res)
          if (res.code == 200) {
            this.tableData = res.data
          } else {
            this.$message({
              message: '未找到符合条件的文章',
              type: 'error',
              duration: 1000
            })
          }
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`)
        this.currentPage = val
      }
    },
    components: {
      // 子组件
      Calendar,
    },

    created () {
      this.tag_id = this.$route.query.id
      // console.log(this.tag_id )
      if (this.tag_id) {
        let params = {id: this.tag_id}
        TagArticle(params).then(res => {
          if (res.code == 200) {
            this.tableData = res.data
            this.total = this.tableData.length
          }
        })
      } else {
        this.username = this.$store.state.username
        this.user_id = this.$store.state.user_id
        this.my_article.username = this.username
        this.my_article.user_id = this.user_id
        MyArticle(this.my_article).then(res => {
          if (res.code == 200) {
            this.tableData = res.data
            this.total = this.tableData.length
          }
        })
      }

    }

  }
</script>

<style lang="css">

  .box-card {
    position: relative;
    width: 100%;
    height: auto;
  }

  .el-table-column {
    text-align: center;
  }

  .adsHear {
    width: 100%;
    height: 250px;
    background: #fff;
    margin-bottom: 30px;
    box-shadow: 0px 1px 3px rgba(100, 100, 100, 0.3);
    -webkit-box-shadow: 0px 1px 3px rgba(100, 100, 100, 0.3);
  }


</style>
