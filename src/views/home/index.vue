<template>
  <el-container class="home-container">
    <el-aside class="home-aside" :width="coll?'64px':'200px'">
      <div class="logo" :class="{logosize:coll}"></div>
      <el-menu
      router
      :default-active="$route.path"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="border-right:none"
      :collapse = coll
      :collapse-transition = false
      >
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-document"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="el-icon-picture"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="el-icon-chat-line-square"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="el-icon-sunny"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-container>
      <el-header class="home-header">
        <span class="el-icon-s-fold" @click="open"></span>
        <span class="text">江苏传智播客有限公司</span>
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            <img :src="photo" alt="" style="vertical-align: middle" width="30" height="30">
            <strong>{{name}}</strong>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="setting()">
              <span class="el-icon-s-custom"></span>
              个人设置
            </el-dropdown-item>
            <el-dropdown-item @click.native="out()">
              <span class="el-icon-unlock"></span>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventbus from '@/eventbus'
export default {
  data () {
    return {
      coll: false,
      name: '',
      photo: ''
    }
  },
  created () {
    const set = JSON.parse(window.sessionStorage.getItem('tokens'))
    this.photo = set.photo
    this.name = set.name
    eventbus.$on('xgxx', (name) => {
      this.name = name
    })
    eventbus.$on('xgtx', (photo) => {
      this.photo = photo
    })
  },
  methods: {
    open () {
      this.coll = !this.coll
    },
    setting () {
      this.$router.push('/setting')
    },
    out () {
      window.sessionStorage.removeItem('tokens')
      this.$router.push('/login')
    }
  }
}
</script>

 <style scoped lang="less">
.home-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .home-aside{
    background-color: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #024 url(../../assets/images/logo_admin.png) no-repeat center/140px auto;
    }
    .logosize {
        background: url(../../assets/images/logo_admin_01.png) no-repeat center/36px auto;
      }
  }
  .home-header {
    line-height: 60px;
    box-shadow: 1px 3px 5px #888888;
    z-index: 9999;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
  }
}
</style>
