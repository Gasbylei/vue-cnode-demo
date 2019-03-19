<template>
  <div class="container">

    <!-- 帖子列表 -->
    <div class="col-md-12 topics-index main-col">
      <div class="panel panel-default">
        <div class="panel-heading">
          <a v-for="(tab, key) in tabs" :key="key" :class="[current_tab === key ? 'active' : '', 'topic-tab']" @click="select(key)">{{ tab }}</a>
        </div>

        <div v-for="topicitem in topicitems.data" class="panel-body remove-padding-horizontal" :key="topicitem.id">

            <router-link class="user_avatar pull-left" :to="{path: '/userinfo',query: {username: topicitem.author.loginname}}">
              <img :src="topicitem.author.avatar_url" :alt="topicitem.author.loginname">
            </router-link>
            <span class="reply-count pull-left">
              <span class="count_of_replies " title="回复数">{{ topicitem.reply_count }}</span>
              <span class="count_seperator">/</span>
              <span class="count_of_visits" title="点击数">{{ topicitem.visit_count }}</span>
            </span>
            <a class="last_time pull-right" href="#">
              <img class="user_small_avatar" :src="topicitem.author.avatar_url" alt="logo">
              <span class="last_active_time">{{ topicitem.last_reply_at | moment('from')}}</span>
            </a>
            <div class="topic_title_wrapper">
              <span class="topiclist-tab pull-left">{{ topicitem.tab }}</span>
              <router-link class="topic_title" :to="{ path: 'detail', query: { id: topicitem.id,username: topicitem.author.loginname}}" :title="topicitem.title">
                {{ topicitem.title }}
              </router-link>
            </div>

        </div>

          <nav aria-label="..." class="pull-left">
            <ul class="pager">
              <li class="previous"><a @click="prev()"><span aria-hidden="true">&larr;</span>上一页</a></li>
              <li><span class="page"><strong>{{current_page}}</strong></span></li>
              <li class="next"><a @click="next()">下一页 <span aria-hidden="true">&rarr;</span></a></li>
            </ul>
          </nav>

      </div>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress'

export default {
  data() {
    return {
      current_tab : 'all',
      topicitems: '',
      current_page : 1,
      tabs: {
        all: '全部',
        good: '精华',
        share: '分享',
        ask: '问答',
        job: '招聘'
      }
    }
  },
  methods: {
    select(type) {
      NProgress.start()
      this.current_tab = type
      this.current_page = 1
      this.axios.get('https://cnodejs.org/api/v1/topics' + '?tab=' + type)
      .then((response) => {
        this.topicitems = response.data
        NProgress.done()
      })
    },
    prev() {
      NProgress.start()
      this.current_page--
      let pageNum = this.current_page
      if (pageNum <=0 ){
        this.$message.show('当前是第一页哦','warning')
        this.current_page = 1
        this.axios.get('https://cnodejs.org/api/v1/topics', {
          params: {
            page: 1,
            tab: this.current_tab
        }})
        .then((response) => {
          this.topicitems = response.data
          NProgress.done()
        })
      } else {
        this.axios.get('https://cnodejs.org/api/v1/topics', {
          params: {
            page: pageNum,
            tab: this.current_tab
          }
        }).then((response) => {
          this.topicitems = response.data
          NProgress.done()
        })
      }
    },
    next() {
      NProgress.start()
      if (this.topicitems.data.length < 40) {
        this.$message.show('已经是最后一页了','warning')
      } else {
        this.current_page++
        let pageNum = this.current_page
        this.axios.get('https://cnodejs.org/api/v1/topics', {
          params: {
            page: pageNum,
            tab: this.current_tab
          }
        }).then((response) => {
          this.topicitems = response.data
          NProgress.done()
        })
      }
    }
  },
  created() {
   NProgress.start()
   this.axios.get('https://cnodejs.org/api/v1/topics')
   .then((response) => {
      this.topicitems = response.data
      NProgress.done()
    })
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
.page{
  color: #337ab7;
}
</style>
