<template>
    <nav class="navbar navbar-inverse">
      <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" @click="toggleNav()">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <router-link to="/" class="navbar-brand">
          <span class="title">{{ logo.title }}</span>
          <img :src="logo.src" :alt="logo.title">
        </router-link>
      </div>

      <div class="navbar-right" :class="['collapse', 'navbar-collapse', { in: showCollapsedNav }]">
          <ul>
            <li><router-link to="/">首页</router-link></li>
            <li v-if="!auth">
              <router-link to="/login">登录</router-link>
            </li>
            <li v-else>
              <router-link :to="{path: '/userinfo',query:{username: userinfo.username}}">我的</router-link>
            </li>
            <li v-show="auth"><router-link to="/messages">消息</router-link></li>
            <li><router-link to="/about">关于</router-link></li>
            <li v-show="auth"><a  @click="logout" href="#">退出</a></li>   
          </ul>
      </div>
     </div>
    </nav>
</template>

<script>
import ls from '@/plugins/localStorage'
// 引入 mapState 辅助函数
import { mapState } from 'vuex'

export default {
  name: "TheHeader",
  data() {
    return {
      logo: {
         src: this.uploadsUrl,
         title: 'cnodejs'
      },
      showCollapsedNav: false
    }
  },
  // 添加计算属性选项
  computed: {
    // 使用对象展开运算符，将 mapState 对象混入到计算属性之中
    ...mapState([
      // 映射 this.auth 为 store.state.auth
      'auth',
      // 映射 this.userinfo 为 store.state.userinfo
      'userinfo'
    ])
  },
  beforeCreate() {
    this.uploadsUrl = 'https://static2.cnodejs.org/public/images/cnodejs_light.svg'
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$message.show('退出成功','success')
    },
    toggleNav() {
      this.showCollapsedNav = !this.showCollapsedNav
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  width: 100%;
  margin: -60px 0 0 0;
  background-color:#444;
}
.navbar {
  background: #444;
  margin-bottom: 0;
}
.brand {
  width: 120px;
  padding: 10px 20px;
  height: 34px;
  line-height: 34px;
  color: #ccc;
  font-weight: 700;
}
.navbar-right {
  margin-top: 14px;
}
ul{
  list-style:none; 
  float: right;
  vertical-align: middle;
}
ul li ,a{
  float: left;
  display: block;
  color: #ccc;
  padding: 0px 10px;
  text-decoration: none;
  font-size: 15px;
}
a:hover {
  color: white;
  text-decoration: none;
}
a:focus {
  color: white;
  text-decoration: none;
}
.title {display: none;}
img{
  height: auto;
  width: 120px;
  margin-top: 10px;
  border: 0;
}
</style>
