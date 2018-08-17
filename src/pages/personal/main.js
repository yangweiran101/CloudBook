import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    ckgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#409eff',
    navigationBarTitleText: '个人中心',
    navigationBarTextStyle: 'black'
  }
}
