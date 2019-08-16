import Vue from 'vue'
import App from './App'
import router from './router'
import VueMeta from 'vue-meta'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/style.less'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/index'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueMeta)
Vue.use(Vuex)
Vue.use(mavonEditor)
Vue.use(Icon)
Vue.component('icon',Icon)


const store = new Vuex.Store({
  state:{
    username: localStorage.getItem("username"),
    user_id: localStorage.getItem("user_id")
  },
  mutations:{
    setUser(state,res){
      localStorage.setItem('username',res.username)
      localStorage.setItem('user_id',res.user_id)
      state.username = res.username
      state.user_id = res.user_id
    }
  },
  actions:{

  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
