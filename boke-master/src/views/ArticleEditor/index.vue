<template>
  <div>
    <div>
      <h1>标题</h1>
      <br>
      <el-input
        placeholder="请输入标题"
        style="width: 85%"
        v-model="title"
        clearable>
      </el-input>
    </div>
    <div>
      <h1>标签</h1>
      <br>
      <el-input
        placeholder="请输入标签"
        style="width: 85%"
        v-model="tag"
        clearable>
      </el-input>
    </div>
    <div style="height: 20px; width: auto">

    </div>
    <h1>内容</h1>
    <br>
    <mavon-editor
      ref="editor"
      v-model="context"
      :ishljs="true"
      :toolbars="toolbars"
      @save="save"
      @change="update"
      @keydown=""/>

  </div>
</template>

<script>
  import {ArticleDetail} from '../../networks/api'
  import {ArticleUpdate} from '../../networks/api'

  export default {
    name: 'Editor',
    inject: ['reload'],
    data () {
      return {
        id: '',
        params: {
          'title': '',
          'tag': '',
          'markdown': '',
          'id': '',
          'context': ''
        },
        title: '',
        tag: '',
        context: ' ',//输入的数据
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          mark: true, // 标记
          superscript: true, // 上角标
          quote: true, // 引用
          ol: true, // 有序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          help: true, // 帮助
          code: true, // code
          subfield: true, // 是否需要分栏
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          /* 1.3.5 */
          undo: true, // 上一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true // 导航目录
        }
      }
    },
    methods: {
      update (markdown, html) {
        // 此时会自动将 markdown 和 html 传递到这个方法中
        // console.log('markdown内容: ' + markdown)
        // console.log('html内容:' + markdown)
      },
      save (markdown, html) {
        // 此时会自动将 markdown 和 html 传递到这个方法中
        // console.log('markdown内容:' + markdown)
        // console.log('html内容:' + html)
        this.params['title'] = this.title
        this.params['tag'] = this.tag
        this.params['markdown'] = markdown
        this.params['id'] = this.id
        ArticleUpdate(this.params).then(res => {
          if (res.code == 200) {
            this.$message({
              message: '修改成功',
              type: 'success',
              duration: 1000
            })
            this.reload()
          }
        })
      }
    },
    created () {
      this.id = this.$route.query.id
      let id = this.id
      ArticleDetail(id).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.title = res.data.title
          this.tag = res.data.tag
          this.context = res.data.content
        }
      })
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 25px;
  }
</style>
