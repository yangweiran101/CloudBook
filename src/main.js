import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',
      'pages/mybook/main',
      'pages/personal/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [{
        pagePath: 'pages/index/main',
        text: '首页',
        iconPath: '/static/img/shouye.png',
        selectedIconPath: '/static/img/shouye2.png'
      }, {
        pagePath: 'pages/mybook/main',
        text: '我的云书',
        iconPath: '/static/img/书.png',
        selectedIconPath: '/static/img/书2.png'
      }, {
        pagePath: 'pages/personal/main',
        text: '个人中心',
        iconPath: '/static/img/个人中心.png',
        selectedIconPath: '/static/img/个人中心2.png'
      }]
    },
    networkTimeout: {
      request: 10000,
      downloadFile: 10000
    }
  }
}
