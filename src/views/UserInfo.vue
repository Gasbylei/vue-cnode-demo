<template>
  <div class="container">
    <div class="panel panel-default">

      <div class="panel-heading">
        主页
      </div>
      <div class="panel-body">
        <div class="user_card">
          <a href="#" class="user_avatar">
            <img :src="userinfo.avatar_url" :alt="userinfo.loginname">
          </a>
          <span class="user_name">
            <a href="" class="dark">{{userinfo.loginname}}</a>
          </span>
          <div class="board">
            <div class="floor">
              <span class="big">积分: {{ userinfo.score }}</span>
            </div>
          </div>
          <span class="signature">
            注册时间 {{ userinfo.create_at | moment('from') }}
          </span>
        </div>
      </div>

      </div>

      <div class="panel panel-default" style="margin-top:20px;">
        <div class="panel-heading">
          最近创建的话题
        </div>
        <div v-if="!recent_topics" class="panel-body">
          无话题
        </div>
        <div v-else v-for="topicitem in recent_topics" class="panel-body" :key="topicitem.id">
            <a class="user_avatar pull-left" href="#">
              <img :src="topicitem.author.avatar_url" :alt="topicitem.author.loginname">
            </a>
            <span class="reply-count pull-left">
              <!-- <span class="count_of_replies " title="回复数">{{ topicitem.reply_count }}</span>
              <span class="count_seperator">/</span>
              <span class="count_of_visits" title="点击数">{{ topicitem.visit_count }}</span> -->
            </span>
            <a class="last_time pull-right" href="#">
              <img class="user_small_avatar" src="../assets/logo.png" alt="logo">
              <span class="last_active_time">{{ topicitem.last_reply_at | moment('from')}}</span>
            </a>
            <div class="topic_title_wrapper">
              <!-- <span class="topiclist-tab pull-left">{{ topicitem.tab }}</span> -->
              <router-link class="topic_title" :to="{ path: 'detail', query: { id: topicitem.id,username: topicitem.author.loginname}}" :title="topicitem.title">
                {{ topicitem.title }}
              </router-link>
            </div>
        </div>
      </div>
      
      <div class="panel panel-default" style="margin-top:20px;">
        <div class="panel-heading">
          最近参与的话题
        </div>
        <div v-if="!recent_topics" class="panel-body">
          无话题
        </div>
        <div v-else v-for="topicitem in recent_replies" class="panel-body" :key="topicitem.id">
            <a class="user_avatar pull-left" href="#">
              <img :src="topicitem.author.avatar_url" :alt="topicitem.author.loginname">
            </a>
            <a class="last_time pull-right" href="#">
              <img class="user_small_avatar" src="../assets/logo.png" alt="logo">
              <span class="last_active_time">{{ topicitem.last_reply_at | moment('from')}}</span>
            </a>
            <div class="topic_title_wrapper">
              <!-- <span class="topiclist-tab pull-left">{{ topicitem.tab }}</span> -->
              <router-link class="topic_title" :to="{ path: 'detail', query: { id: topicitem.id,username: topicitem.author.loginname}}" :title="topicitem.title">
                {{ topicitem.title }}
              </router-link>
            </div>
        </div>
      </div>

  </div>
</template>

<script>
import NProgress from 'nprogress'

export default {
  data() {
    return {
      userinfo: '',
      recent_topics: '',
      recent_replies: ''
    }
  },
  created() {
    NProgress.start()
    this.axios.get('https://cnodejs.org/api/v1/user/' + this.$route.query.username)
    .then((response) => {
      this.userinfo = response.data.data
      this.recent_topics = response.data.data.recent_topics
      this.recent_replies = response.data.data.recent_replies
       NProgress.done()
    })

  }
}
</script>

<style lang="scss" scoped>
.panel {
  margin-top: 20px;
  text-align: left;
}
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

// topicList
a{
  float: left;
  display: block;
  color: black;
  padding: 0px 10px;
  text-decoration: none;
  font-size: 15px;
  a:hover {
  color: white;
 }
}
.panel {margin-top:20px;}
.panel-heading {
  padding: 20px 15px;
  a{
    text-decoration-line:none;
  }
}
.topic-tab {
  margin: -10px 10px;
  color: #80bd01;
}
.active{
  background-color: #80bd01;
  color: #fff;
  padding: 2px;
  border-radius: 3px;
}
.panel-body{border-top: 1px solid #f0f0f0;}
.user_avatar img {
  width: 30px;
  height: 30px;
  border-radius: 3px;
}
.reply-count {
  width: 70px;
  display: inline-block;
  text-align: center;
}
.count_of_replies {color: #9e78c0;}
.count_seperator {font-size: 14px;}
.count_of_visits {font-size: 14px; color: #b4b4b4;}
a .last_time{text-decoration: none;margin-top: 3px;}
.user_small_avatar {
  height: 18px; 
  width: 18px;
  margin-right: .5em;
  vertical-align: middle;//此元素在父类元素居中
  border-radius: 3px;
}
.last_active_time {
  text-align: right;
  min-width: 50px;
  display: inline-block;
  white-space: nowrap;//默认不换行
}
.topiclist-tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 14px;
  margin-top: 3px;
}
.topic_title {
  color: #333;
  &:hover {
    color: #888;
  }
  max-width: 70%;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
