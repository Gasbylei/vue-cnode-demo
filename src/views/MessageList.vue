<template>
  <div class="container">
    <div class="col-md-9">

      <div class="panel panel-default">
        <div class="panel-heading">
          <a v-for="(tab, key) in tabs" :key="key" :class="[current_tab === key ? 'active' : '', 'message-tab']" @click="select(key)">{{ tab }}</a>
        </div>
        
        <div v-for="message in messages" class="panel-body" :key="message.id">
          <div class="author_content">
            <router-link :to="{path: '/userinfo',query: {username: message.author.loginname }}">
              <img :src="message.author.avatar_url" width="30px" height="30px" :alt="message.author.loginname">
            </router-link>
            <div class="user_info">
              <router-link  :to="{path: '/userinfo',query: {username: message.author.loginname }}" class="reply_author">
              {{ message.author.loginname }}
              </router-link>

              <span class="name" v-if="message.type==='at'">在回复中@了您</span>
              <span class="name" v-if="message.type==='reply'">回复了您的话题</span>

              <a class="reply_time">{{ message.reply.create_at | moment('from') }}</a>
            </div>
            <div class="user_action pull-right">
              <router-link :to="{name:'detail',params:{id:message.topic.id}}">
                <div class="topic-title">
                    话题：{{message.topic.title}}
                </div>
              </router-link>
            </div>
          </div>

          <div class="reply_content">
            <div class="markdown-text" v-html="message.reply.content">
            </div>
          </div>
        </div>

      </div>

      <div v-if="this.messages.length <= 0" class="panel panel-default">
        <div class="panel-body">
          暂无消息哦
        </div>
      </div>

    </div>
    <TheSideBar />
  </div>
</template>

<script>
import NProgress from 'nprogress'
import TheSideBar from '@/components/layouts/TheSideBar.vue'

export default {
  data() {
    return {
      messages: '',
      current_tab : 'noread',
      tabs: {
        noread: '未读消息',
        hasread: '已读消息'
      }
    }
  },
  components: {
    TheSideBar
  },
  created() {
    if (!this.$store.state.userinfo.token) {
        this.$router.push({
            path: '/login'
        })
    } else {
      NProgress.start()
      this.axios.get('https://cnodejs.org/api/v1/messages', {
        params: {
          accesstoken: this.$store.state.userinfo.token
        }
      }).then((response) => {
        this.messages = response.data.data.hasnot_read_messages
        NProgress.done()
      })
    }
   },
   methods: {
    select(type) {
      NProgress.start()
      this.current_tab = type
      this.axios.get('https://cnodejs.org/api/v1/messages', {
        params: {
          accesstoken: this.$store.state.userinfo.token
        }
      }).then((response) => {
        if (type === 'hasread')
        {
          this.messages = response.data.data.has_read_messages
        } else {
          this.messages = response.data.data.hasnot_read_messages
        }
        NProgress.done()
      })
    },
   }
}

</script>

<style lang="scss" scoped>
a{
  float: left;
  display: block;
  color: #ccc;
  padding: 0px 10px;
  text-decoration: none;
  font-size: 15px;
  a:hover {
  color: white;
 }
}
.panel {
  margin-top: 20px;
  text-align: left;
}
.panel-heading {
  padding: 20px 15px;
  background-color: white;
  font-size: 13px;
  a{
    text-decoration-line:none;
  }
}
.message-tab {
  margin: -10px 10px;
  color: #80bd01;
}
.active{
  background-color: #80bd01;
  color: #fff;
  padding: 2px;
  border-radius: 3px;
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

.user_info {
  display: inline-block;
  margin-left: 10px;
  .reply_author{
    padding: 0;
    color: black;
    font-size: 13px;
    font-weight: 700;
    text-decoration-line: none;
  }
  .reply_time{
    padding: 0;
    margin-left: 5px;
    font-size: 12px;
    text-decoration-line: none;
  }
}
.user_action {
  font-size: 15px;
}
.reply_content {
  padding-left: 50px;
}
/deep/ .markdown-text {
  img {
    max-width: 100%;
  }
}
</style>
