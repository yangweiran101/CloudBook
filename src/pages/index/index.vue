<template>
<div class="box">
  <swiper :indicator-dots="indicatorDots"
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
          class="swiper"
          >
    <block v-for="(item,index) in imgUrls" :key="index">
      <swiper-item>
        <a :href="'/pages/counter/main?id='+item.book._id">
          <image :src="item.img" class="slide-image" />
        </a>
      </swiper-item>
    </block>
  </swiper>
  <div class="content" v-for="(item,index) in bookList" :key="index">
    <div class="book-title">{{item.title}}</div>
    <a :href="'/pages/counter/main?id='+obj._id" v-for="(obj,num) in item.books" :key="num">
      <div class="book-list">
      <img :src="obj.img" class="image">
      <div class="list-right">
        <div class="list-title">
          {{obj.title}}
        </div>
        <div class="list-content">
          {{obj.desc}}
        </div>
        <div class="list-detail clearfix">
          <span class="detail-author fleft">{{obj.author}}</span>
          <span class="detail-eye fright mleft">{{obj.looknums}}人在看</span>
          <span class="detail-time fright mleft">
            <getTime :time="obj.createTime"></getTime>
          </span>
        </div>
      </div>
    </div>
    </a>
  </div>

</div>
</template>

<script>
import {axios} from '../../utils/index'
import getTime from '../../components/getTime'
export default {
  components: {
    getTime
  },
  data () {
    return {
      imgUrls: [],
      bookList: [],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      pn: 1,
      isLoad: true
    }
  },
  methods: {
    getSwipe () {
      axios.get('/swiper').then(res => {
        // console.log(res.data)
        this.imgUrls = res.data
      })
    },
    getList () {
      axios.get('/category/books', {pn: this.pn}).then(res => {
        if (res.data.length === 0) {
          this.isLoad = false
        } else {
          this.bookList = [...this.bookList, ...res.data]
          // console.log(this.bookList)
        }
      })
    },
    getLogin () {
      let that = this
      wx.login({
        success: function (res) {
          if (res.code) {
            axios.login('/login', { code: res.code,
              appid: 'wx8f6a2ce93e943d97',
              secret: 'be1f011156f56937525787faa2431aba'}).then(res => {
              if (res.header.Token || res.header.token) {
                wx.setStorageSync('token', res.header.Token || res.header.token)
                that.getSwipe()
                that.getList()
              } else {
                console.log('登录失败,重新登陆')
                that.getLogin()
              }
            })
          } else {
            wx.showToast({
              title: '登录失败',
              icon: 'none'
            })
          }
        }
      })
    }
  },
  onReachBottom () {
    if (this.isLoad) {
      this.pn = this.pn + 1
      this.getList()
    }
  },
  onUnload () {
    this.Books = {}
    this.pn = 1
    this.isLoad = true
  },
  created () {
    this.getLogin()
  }
}
</script>

<style scoped lang="less" src="../../css/index.less"></style>
