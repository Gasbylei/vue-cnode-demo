<template>
  <div class="container">
    <div class="col-md-9">
      <div class="panel panel-default">
        <div class="panel-heading">
          <span class="topic_full_title">{{ topicitem.title }}</span>
          <div class="changes">
            <span>• 发布于 {{ topicitem.create_at | moment('from') }}</span>
            <span> • 作者 {{ topicitem.author.loginname }}</span>
            <span> • {{ topicitem.visit_count }} 浏览</span>
            <span> • 来自 {{ topicitem.tab }}</span>

            <span v-show="this.$store.state.auth">
            <input type="button" v-if="!topicitem.is_collect" @click="collect()"  class="collect pull-right btn btn-primary" value="收藏">
            <input type="button" v-else  @click="cancelCollect()" class="collect pull-right btn btn-default" value="取消收藏">
            </span>
          </div>
        </div>

        <div class="panel-body" v-html="topicitem.content">
           {{ topicitem.content}}
        </div>

      </div>

      <div class="panel panel-default reply-list">
        <div class="panel-heading">
          <span>{{ comments.length }} </span> 回复
        </div>

        <div v-for="(comment, index) in comments" class="panel-body" :key="index">
          <div class="author_content">
            <router-link :to="{path: '/userinfo',query: {username: comment.author.loginname }}">
              <img :src="comment.author.avatar_url" width="30px" height="30px" :alt="comment.author.loginname">
            </router-link>
            <div class="user_info">
              <router-link  :to="{path: '/userinfo',query: {username: comment.author.loginname }}" class="reply_author">
              {{ comment.author.loginname }}
              </router-link>
              <a class="reply_time">{{ index+1 }}楼• {{ comment.create_at | moment('from') }}</a>
            </div>
            <div class="user_action pull-right">
              <span @click="ups(comment)">
                <i class="fa up_btn" :class="[isUped(comment.ups) ? 'fa-thumbs-up' : 'fa-thumbs-o-up']" title="喜欢"></i>
                <span class="up-count">
                    {{ comment.ups.length }}
                </span>
              </span>
            </div>
          </div>

          <div class="reply_content">
            <div class="markdown-text" v-html="comment.content">
              {{ comment.content }}
            </div>
          </div>

        </div>
      </div>

    </div>
    <!-- sidebar -->
    <TheSideBar/>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import TheSideBar from '@/components/layouts/TheSideBar.vue'

export default {
  data() {
    return {
      topicitem : '',
      comments : ''
    }
  },
  components: {
    TheSideBar
  },
  created() {
    this.getData()
  },
  watch: {
    $route(to, from) {
      this.getData(); //当路由参数改变，执行操作获取新数据
    } 
  },
  methods: {
    collect() {
      this.axios.post('https://cnodejs.org/api/v1/topic_collect/collect',{
        accesstoken: this.$store.state.userinfo.token,
        topic_id: this.topicitem.id
      })
      .then((response) => {
        console.log(response.data)
        this.topicitem.is_collect = true
      })
      .catch((error)=> {
        this.$message.show(error.response.data.error_msg,'danger')
      })
    },
    cancelCollect() {
      this.axios.post('https://cnodejs.org/api/v1/topic_collect/de_collect',{
        accesstoken: this.$store.state.userinfo.token,
        topic_id: this.topicitem.id
      })
      .then((response) => {
        this.topicitem.is_collect = false
      })
      .catch((error) => {
        this.$message.show(error.response.data.error_msg,'danger')
      })
    },
    getData() {
      NProgress.start()
      this.axios.get('https://cnodejs.org/api/v1/topic/' + this.$route.query.id,{
          params: {
            accesstoken: this.$store.state.userinfo.token
          }
      })
      .then((response) => {
        this.topicitem = response.data.data
        this.comments = response.data.data.replies
        NProgress.done()
      })
    },
    ups(comment) {
      if (!this.$store.state.userinfo.token){
        this.$router.push({
          path: '/login'
        });
        this.$message.show('请登录后再点赞哦','warning')
      } else {
        this.axios.post('https://cnodejs.org/api/v1/reply/' + comment.id + '/ups',{
          accesstoken: this.$store.state.userinfo.token
        })
        .then((response) => {
          if (response.data.action === 'down') {
            let index = inArray(this.$store.state.userinfo.userId, comment.ups)
            comment.ups.splice(index, 1)
          } else {
            comment.ups.push(this.$store.state.userinfo.userId)
          }
        })
        .catch((error) => {
          this.$message.show(error.response.data.error_msg,'danger')
        })
      }
    },
    isUped(ups) {
      return inArray(this.$store.state.userinfo.userId, ups) >= 0
    }

  }
}

function inArray(value, array) {
  if (Array.prototype.indexOf) {
    return array.indexOf(value);
  } else {
    for (var i = 0; i < array.length; i++) {
       if (array[i] === value) return i;
    }
    return -1;
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1400px;
  a {
  color: #08c;
  text-decoration: none;
 }
}
.panel {
  margin-top: 20px;
  text-align: left;
}
.panel-heading {background-color: white; font-size: 13px;}
.panel-body {
  border-top: 1px solid #f0f0f0;
}
.topic_full_title {
  font-size: 22px;
  font-weight: 700;
  margin: 8px 0;
  display: inline-block;
  vertical-align: bottom;
  text-align: left;
  width: 100%;
  line-height: 130%;
}
.changes {
  text-align: left;
  margin: 0 0 10px 0;
  font-size: 12px;
  color: #838383;
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
