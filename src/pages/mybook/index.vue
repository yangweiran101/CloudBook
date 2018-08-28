<template>
    <div class="box">
      <div class="loading" v-if="isLoading">
        <img src="/static/img/loading1.svg">
      </div>
      <div class="content" v-if="!isLoading">
        <div class="read-item" v-for="(item,key) in readlist" :key="key">
          <div class="left-box">
            <img :src="item.book.img">
          </div>
          <div class="right-box">
            <div class="title">
              {{item.book.title}}
            </div>
            <div class="read-progress">
              书籍{{item.title.index + 1}}/{{item.title.total}}章节
            </div>
            <div class="progress-wrap">
              <progress
                class="progress"
                :percent="item.percent"
                :active="true"
                stroke-width="4"
                activeColor="#1296db"
                backgroundColor="#8a8a8a"
              ></progress>
              <span>已看{{item.percent}}%</span>
            </div>
            <div class="last-read">
              <span>上次查看：{{item.title.title}}</span>
              <span><getTime :time="item.updatedTime"></getTime></span>
            </div>
            <div class="btns">
              <button class="btn" @click="continueRead(item.title._id,item.title.bookId)">继续阅读</button>
              <button class="btn" @click="watchCatalog(item.title.bookId)">查看文档</button>
            </div>
          </div>
        </div>
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
        isLoading: true,
        readlist: [],
        code: null
      }
    },
    methods: {
      getReadBook () {
        this.isLoading = true
        axios.get('/readList').then(res => {
          this.isLoading = false
          this.readlist = res.data.map(item => {
            item.percent = Math.ceil(item.title.index / item.title.total * 100)
            return item
          })
          console.log(this.readlist)
        })
      },
      getLogin () {
        let that = this
        wx.login({
          success: function (res) {
            if (res.code) {
              axios.login('/login', {
                code: res.code,
                appid: 'wx8f6a2ce93e943d97',
                secret: 'be1f011156f56937525787faa2431aba'}).then(res => {
                if (res.header.Token || res.header.token) {
                  wx.setStorageSync('token', res.header.Token || res.header.token)
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
        // console.log(wx.getStorageSync('token'))
        this.getReadBook()
      },
      continueRead (id, bookId) {
        wx.navigateTo({
          url: `/pages/article/main?id=${id}&catalogId=${bookId}`
        })
      },
      watchCatalog (id) {
        wx.navigateTo({
          url: `/pages/catalog/main?id=${id}`
        })
      }
    },
    onShow () {
      if (wx.getStorageSync('token')) {
        this.getReadBook()
      } else {
        this.getLogin()
      }
    }
  }
</script>

<style scoped lang="less" src="../../css/mybook.less"></style>
