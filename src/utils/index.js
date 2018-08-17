let baseUrl = 'https://m.yaojunrong.com'
let token = wx.getStorageSync('token') // 获取到本机缓存的token值
let header = {
  'content-type': 'application/json' //    默认值
}
if (token) { // 如果token存在，请求头中加入token这个值
  header.token = token
}

export const axios = {
  get (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        data,
        method: 'GET',
        header,
        success: function (res) {
          if (res.header.Token) {
            wx.setStorageSync('token', res.header.Token) // 判断登录请求头中是否有token，有的话存起来
          }
          resolve(res.data)
        }
      })
    })
  },
  post (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        data,
        method: 'POST',
        header,
        success: function (res) {
          if (res.header.Token) {
            wx.setStorageSync('token', res.header.Token) // 判断登录请求头中是否有token，有的话存起来
          }
          resolve(res.data)
        }
      })
    })
  },
  login (url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        data,
        method: 'POST',
        header: {
          'content-type': 'application/json' //    默认值
        },
        success: function (res) {
          resolve(res.header)
        }
      })
    })
  }
}
