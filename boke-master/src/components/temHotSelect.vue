<!--热门分类-->
<template>
    <el-row class="smallselectBox"  >
        <el-col :xs="6" :sm="4" :md="3" v-for="item in headclassList" :key="item.id">
            <router-link :to="{name: 'Comment', params: {classId: item.id}}" target="_blank">
                <img class="fitImg" :src="item.image" onerror="this.onerror=null;this.src='../assets/img/logo.png'">
                <p>{{item.class_name}}</p>
            </router-link>
        </el-col>
    </el-row>
</template>

<script>
import { ClassList } from '../networks/api/index'
export default {
  data () {
    //选项 / 数据
    return {
      headclassList: ''
    }
  },
  methods: {
    //事件处理器
  },
  components: {
    //定义组件
  },
  created () {
    ClassList().then(res => {
      console.log("temHotSelect", res)
      if (res.code == 200) {
        const data = res.data
        this.headclassList = data[0].class_names
      }
    })

  }
}
</script>

<style>
.smallselectBox a {
  display: block;
}
.smallselectBox img {
  background: #fff;
  height: 50px;
}
.smallselectBox {
  background: #f4f0ec;
  padding: 10px;
  box-sizing: border-box;
}
.smallselectBox .el-col {
  /*margin:10px 0;*/
  padding: 10px;
}
.smallselectBox p {
  text-align: center;
}
</style>
