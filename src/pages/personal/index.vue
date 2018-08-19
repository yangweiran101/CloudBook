<template>
<div class="box">
  <div class="login" v-if="!isLogin">
    <button open-type="getUserInfo"  @getuserinfo="onGotUserInfo">获取用户信息</button>
    <!--<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">获取用户信息</button>-->
  </div>
  <div class="header" v-if="isLogin">
    <div class="information">
      <div class="left-box">
        <img :src="userInfo.avatarUrl">
      </div>
      <div class="right-box">
        <div class="name">{{userInfo.nickName}}</div>
        <div class="sign">这个家伙很懒</div>
      </div>
    </div>
    <div class="details">
      <div class="collect" @click="gotoCollect">
        <div class="count">{{count}}</div>
        <div>收藏</div>
      </div>
      <div class="collect">
        <div class="count">2</div>
        <div>关注</div>
      </div>
      <div class="collect">
        <div class="count">2</div>
        <div>粉丝</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import {axios} from '../../utils/index'
  export default {
    data () {
      return {
        isLogin: false,
        userInfo: {},
        count: 0
      }
    },
    methods: {
      getCollect () {
        axios.get('/collection', {pn: 1, size: 100}).then(res => {
          this.count = res.data.length
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
                if (res.data.code === 200) {
                  wx.setStorageSync('token', res.header.Token)
                } else {
                  console.log('登录失败,重新登陆')
                  that.getLogin()
                }
              })
            }
          }
        })
        this.getCollect()
      },
      onGotUserInfo: function (e) {
        let that = this
        if (e.mp.detail.errMsg === 'getUserInfo:ok') {
          this.userInfo = e.mp.detail.userInfo
          wx.setStorageSync('userInfo', e.mp.detail.userInfo)
          if (!wx.getStorageSync('token')) {
            that.getLogin()
          }
          this.isLogin = true
        } else {
          wx.showToast({
            title: '授权失败，无法登陆',
            icon: 'none'
          })
        }
      },
      gotoCollect () {
        wx.navigateTo({
          url: '/pages/collect/main'
        })
      }
    },
    onShow () {
      if (wx.getStorageSync('userInfo')) {
        this.userInfo = wx.getStorageSync('userInfo')
        this.isLogin = true
        this.getCollect()
      }
    }
  }
</script>

<style scoped lang="less" src="../../css/personal.less">

</style>
