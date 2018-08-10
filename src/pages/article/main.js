import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    ckgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '阅读',
    navigationBarTextStyle: 'black',
    usingComponents: {
      wemark: '/static/wemark/wemark'
    }
  }
}
