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
      <div class="collect">
        <div class="count">2</div>
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
        userInfo: {}
      }
    },
    methods: {
      getLogin () {
        wx.login({
          success: function (res) {
            if (res.code) {
              axios.login('/login',
                {
                  code: res.code,
                  appid: 'wx8f6a2ce93e943d97',
                  secret: 'be1f011156f56937525787faa2431aba'
                }).then(res => {
                wx.setStorageSync('token', res.Token)
              })
            }
          }
        })
      },
      onGotUserInfo: function (e) {
        // console.log(e.mp.detail.errMsg)
        if (e.mp.detail.errMsg === 'getUserInfo:ok') {
          this.userInfo = e.mp.detail.userInfo
          wx.setStorageSync('userInfo', e.mp.detail.userInfo)
          this.getLogin()
          this.isLogin = true
        } else {
          wx.showToast({
            title: '授权失败，无法登陆',
            icon: 'none'
          })
        }
      }
    },
    onShow () {
      if (wx.getStorageSync('userInfo')) {
        this.userInfo = wx.getStorageSync('userInfo')
        this.isLogin = true
      }
    }
  }
</script>

<style scoped lang="less" src="../../css/personal.less">

</style>
