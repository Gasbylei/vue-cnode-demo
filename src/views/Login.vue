<template>
  <div class="container login">
    <div class="panel panel-default">
      <div class="panel-heading">
        <span>登录</span>
      </div>

      <div class="panel-body">
        <div class="form-group">
          <label for="accessToken" class="col-sm-2 control-label">accessToken</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="userToken" id="accessToken" placeholder="请输入你的accessToken" maxlength="36" required>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button type="submit" class="btn btn-primary pull-left loginbtn form-control" @click="login">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import ls from '@/plugins/localStorage'

export default {
  name: 'Login',
  data() {
    return {
      userToken : ''
    }
  },
  methods: {
    login() {
      // alert(this.userToken)
      if (this.userToken === '')
      {
        this.$message.show('令牌格式错误,应为36位UUID字符串','danger')
        return false
      }
      NProgress.start()
      this.axios.post('https://cnodejs.org/api/v1/accesstoken',{
        accesstoken: this.userToken
      }).then((response) => {
        let userinfo = {
          username : response.data.loginname,
          userId : response.data.id,
          token :this.userToken,
        }
        ls.setItem('userinfo', userinfo)
        this.$store.dispatch('login', userinfo)
        if(response) {
           this.$router.push({path:'/userinfo',query:{ username: response.data.loginname }})
           this.$message.show('登录成功','success')
        }
        NProgress.done()
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 800px;
  margin-top: 20px;
}
.loginbtn {
  margin-top: 10px;
}
</style>
