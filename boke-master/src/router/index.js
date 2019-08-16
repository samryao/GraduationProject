import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: resolve => require(['@/views/Login/Login'], resolve),
    },
    {
      path: '/login',
      component: resolve => require(['@/views/Login/Login'], resolve),
    },
    {
      path: '/register',
      name: 'Register',
      component: resolve => require(['@/views/Register/register'], resolve),
    },
    {
      path: '/home',
      component: resolve => require(['@/components/Main'], resolve),
      children: [
        {
          path: '/home',
          name: 'Home',
          component: resolve => require(['@/views/Home/index'], resolve),
        }, //  默认首页
        {
          path: '/Articledetail',
          name: 'Articledetail',
          component: resolve => require(['@/views/Articledetail/index'], resolve)
        }, // 热门文章
        {
          path: '/MyArticle',
          name: 'MyArticle',
          component: resolve => require(['@/views/MyArticle/index'], resolve)
        }, // 文章详情
        {
          path: '/HotArticle',
          name: 'HotArticle',
          component: resolve => require(['@/views/HotArticle/index'], resolve)
        }, // 文章详情
        {
          path: '/editor',
          name: 'ArticleEditor',
          component: resolve => require(['@/views/ArticleEditor/index'], resolve)
        }, // 编辑
        {
          path: '/add',
          name: 'ArticleAdd',
          component: resolve => require(['@/views/ArticleAdd/index'], resolve)
        }, // 添加

        {
          path: '/Settings',
          name: 'Settings',
          component: resolve => require(['@/views/Settings/index'], resolve)
        }, // 设置


      ]
    }, {
      path: '*',
      redirect: {name: 'Home'}
    }]
})
