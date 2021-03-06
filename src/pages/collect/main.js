import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    ckgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '我的收藏',
    navigationBarTextStyle: 'black',
    onReachBottomDistance: 100
  }
}
