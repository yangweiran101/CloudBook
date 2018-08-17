<template>
  <div class="box">
    <div class="loading" v-if="isLoading">
      <img src="/static/img/loading.svg">
    </div>
    <div class="container" v-if="!isLoading">
      <!--书籍介绍-->
      <div class="header clearfix">
        <img :src="bookDetail.img" class="fleft">
        <div class="detail fleft">
          <div class="detail-title">{{bookDetail.title}}</div>
          <div class="detail-author">作者: {{bookDetail.author}}</div>
          <div class="detail-author">{{bookDetail.looknums}}人在看</div>
          <div class="detail-author">{{likenumber}}人喜欢</div>
        </div>
      </div>
      <div class="botton">
        <button class="btn" @click="addCollection()">加入收藏</button>
        <button class="btn" open-type="share">分享好友</button>
      </div>
      <!--书籍介绍-->

      <!--书籍简介-->
      <div class="middle">
        <div class="desc">简介</div>
        <scroll-view scroll-y="true" class="describe">{{bookDetail.desc}}</scroll-view>
        <div class="tables clearfix">
          <div class="catalog fleft">查看目录</div>
          <div class="total fleft">共19章</div>
          <div class="total fright" @click="gotoRead()">
            更新于两天前
            <i class="iconfont icon-qianjin fright"></i>
          </div>
        </div>
      </div>
      <!--书籍简介-->
      <div class="readbook">
        <button @click="gotoRead()">阅读该书籍</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {axios} from '../../utils/index'

  export default {
    data () {
      return {
        bookDetail: {},
        bookId: '',
        likenumber: 0,
        isLoading: true
      }
    },
    methods: {
      getDetail () { // 获取具体书籍数据
        axios.get(`/book/${this.bookId}`).then(res => {
          this.bookDetail = res.data
          this.likenumber = res.data.like_this_users.length
          this.isLoading = false
        })
      },
      gotoRead () {
        wx.navigateTo({
          url: `/pages/catalog/main?id=${this.bookId}`
        })
      },
      addCollection () {
        axios.post('/collection', {
          bookId: this.bookId
        }).then(res => {
          console.log(res)
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        })
      }
    },
    created () {
      this.isLoading = true
      this.bookDetail = {}
    },
    onLoad (options) {
      this.bookId = options.id // 获取传过来的查询字符串
      this.getDetail() // 调用获取书籍函数
    },
    // 分享操作
    onShareAppMessage (val) {
      return {
        title: this.bookDetail.title,
        path: '/pages/counter/main',
        imageUrl: this.bookDetail.img
      }
    }
  }
</script>


<style scoped lang="less" src="../../css/counter.less"></style>
