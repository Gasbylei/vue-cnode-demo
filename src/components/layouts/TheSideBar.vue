<template>
    <div class="col-md-3 sidebar">
      <div class="panel panel-default">

      <div class="panel-heading">
        作者
      </div>
      <div class="panel-body">
        <div class="user_card">
          <a href="#" class="user_avatar">
            <img :src="authorInfo.avatar_url" :alt="authorInfo.loginname">
          </a>
          <span class="user_name">
            <router-link class="dark" :to="{path: '/userinfo',query: {username: authorInfo.loginname}}">{{authorInfo.loginname}}</router-link>
          </span>
          <div class="board">
            <div class="floor">
              <span class="big">积分: {{ authorInfo.score }}</span>
            </div>
          </div>
          <span class="signature">
            "2019 拥抱大前端"
          </span>
        </div>
      </div>

      </div>

      <div class="panel panel-default" style="margin-top:20px;">
        <div class="panel-heading">
          作者其他话题
        </div>
        <div class="panel-body">
          <ul class="unstyled">
            <li v-for="(item, index) in recentTopics" :key="index">
              <div v-if="index < 5"><router-link class="topic_title" :to="{ path: 'detail', query: { id: item.id,username: item.author.loginname}}" :title="item.title">{{ item.title }}</router-link></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "TheSideBar",
  data() {
    return {
      authorInfo: '',
      recentTopics: ''
    }
  },
  created() {
    let username = this.$route.query.username || this.$store.state.userinfo.username
    this.axios.get('https://cnodejs.org/api/v1/user/' + username)
    .then((response) => {
      this.authorInfo = response.data.data
      this.recentTopics = response.data.data.recent_topics
    })
  }
}
</script>

<style lang="scss" scoped>
.panel {
  margin-top: 20px;
  text-align: left;
}
.panel-heading {background-color: white; font-size: 13px;}
.user_avatar img {
  width: 48px;
  height: 48px;
}
.user_name {
  display: inline-block;
  margin-left: 10px;
}
.board {margin-top: 20px;}
.big {font-size: 14px;}
.signature {font-size: 13px;}
.unstyled {
  margin-left: 0;
  list-style: none;
  padding: 0;
  li {
    margin: 5px;
    div>a {
      color: #778087;
      text-decoration: none;
    }
  }
}
.topic_title{
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
