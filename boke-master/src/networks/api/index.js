import axios from 'axios'
// 设置全局请求前缀
let base_url = 'http://127.0.0.1:9527/'

//用户注册
const getRegister = params => {
  let url = base_url + 'register/'
  return axios.post(url, params).then(res => res.data)
}

//用户登录
const UserLogin = params => {
  let url = base_url + 'login/'
  return axios.post(url, params).then(res => res.data)
}

// 今日推荐
const TodayRecommend = () => {
  let url = base_url + 'today_recommend/'
  return axios.get(url).then(res => res.data)
}

// 最新发布
const NewPublish = () => {
  let url = base_url + 'new_publish/'
  return axios.get(url).then(res => res.data)
}

// 热门标签
const HotTags = () => {
  let url = base_url + 'hot_tags/'
  return axios.get(url).then(res => res.data)
}
// 推荐文章
const Recommend = () => {
  let url = base_url + 'recommend/'
  return axios.get(url).then(res => res.data)
}

// 搜索文章
const Search = (params) => {
  let url = base_url + 'search/'
  return axios.post(url, params).then(res => res.data)
}

// 我的文章
const MyArticle = (params) => {
  let url = base_url + 'my_article/'
  return axios.post(url, params).then(res => res.data)
}

// 热门文章
const HotArticle = () => {
  let url = base_url + 'hot_article/'
  return axios.get(url).then(res => res.data)
}

// 文章详情
const ArticleDetail = (id) => {
  let url = base_url + `article_detail/id=${id}`
  return axios.get(url).then(res => res.data)
}

// 更新文章
const ArticleUpdate = params => {
  let url = base_url + 'article_update/'
  return axios.post(url, params).then(res => res.data)
}

// 添加文章
const ArticleAdd = params => {
  let url = base_url + 'article_add/'
  return axios.post(url, params).then(res => res.data)
}

// 删除文章
const ArticleDelete = id => {
  let url = base_url + `article_delete/id=${id}`
  return axios.post(url).then(res => res.data)
}

// 根据标签找出对应的文章
const TagArticle = params => {
  let url = base_url + 'tag_article/'
  return axios.post(url, params).then(res => res.data)
}

// 根据日期找出对应的文章
const TimeFilterArticle = params => {
  let url = base_url + 'time_filter_article/'
  return axios.post(url, params).then(res => res.data)
}

// 根据日期找出对应的文章
const TimeFilter = (params) => {
  let url = base_url + 'time_filter/'
  return axios.post(url, params).then(res => res.data)
}

// 修改密码
const ChangePassword = params => {
  let url = base_url + 'change_password/'
  return axios.post(url, params).then(res => res.data)
}

// 修改用户名
const ChangeUsername = params => {
  let url = base_url + 'change_username/'
  return axios.post(url, params).then(res => res.data)
}

// 修改邮箱
const ChangeEmail = params => {
  let url = base_url + 'change_email/'
  return axios.post(url, params).then(res => res.data)
}

// 管理用户
const UserManage = () => {
  let url = base_url + 'user_manage/'
  return axios.get(url).then(res => res.data)
}

// 编辑用户
const UserEdit = (params) => {
  let url = base_url + 'user_edit/'
  return axios.post(url, params).then(res => res.data)
}

// 删除用户
const UserDelete = (params) => {
  let url = base_url + 'user_delete/'
  return axios.post(url, params).then(res => res.data)
}

// 获取评论
const Comment = () => {
  let url = base_url + 'comment/'
  return axios.get(url).then(res => res.data)
}

// 获取所有详细评论
const ArticleComment = (id) => {
  let url = base_url + `article_comment/id=${id}`
  return axios.post(url).then(res => res.data)
}

// 添加评论
const AddComment = (params) => {
  let url = base_url + 'add_comment/'
  return axios.post(url, params).then(res => res.data)
}

export {
  getRegister,
  UserLogin,
  TodayRecommend,
  NewPublish,
  HotTags,
  Search,
  Recommend,
  MyArticle,
  HotArticle,
  Comment,
  ArticleComment,
  AddComment,
  ArticleDetail,
  ArticleUpdate,
  ArticleAdd,
  ArticleDelete,
  TimeFilterArticle,
  TimeFilter,
  ChangePassword,
  ChangeUsername,
  TagArticle,
  ChangeEmail,
  UserManage,
  UserEdit,
  UserDelete,

}


