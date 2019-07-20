import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/login.vue'
import Home from '../views/home'
import Welcome from '../views/welcome'
import NotFound from '../views/404'
import Article from '../views/article'
import Image from '@/views/imagess'
import Publish from '@/views/publish'
import Comment from '@/views/comment'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article },
        { name: 'image', path: '/image', component: Image },
        { name: 'publish', path: '/publish', component: Publish },
        { name: 'comment', path: '/comment', component: Comment }

      ]
    },
    { name: '404', path: '*', component: NotFound }
  ]
})
// 前置守卫 前端路由跳转中间判断
router.beforeEach((to, from, next) => {
  // 如果路由为/login 直接下一步
  if (to.path === '/login') return next()
  // 获取sessionStorage的值 如果有下一步 没有就走next('/login)
  const user = window.sessionStorage.getItem('tokens')
  if (user) {
    return next()
  }
  // 其他情况都跳回登录页面
  next('/login')
})
export default router
