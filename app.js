//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("logincode: " + res.code)
        wx.request({
          method: 'POST',
          url: this.globalData.serverHost + 'api/sessions',
          headers: { 'accept': 'application/vnd.api+json;version=1' },
          data: { data: { js_code: res.code } },
          success: res => {
            console.log("signInfo: ", res.data.data)
            wx.setStorageSync('auth_info', res.data.data)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            // withCredentials: true,
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log("wxUserInfo: ", res)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                var js_code = wx.getStorageSync('auth_info')['auth_token'];
                if (js_code) {
                  wx.request({
                    method: 'POST',
                    url: this.globalData.serverHost + 'api/sessions',
                    headers: { 'accept': 'application/vnd.api+json;version=1' },
                    data: { data: { js_code: js_code, user_info: res.userInfo } },
                    success: res => {
                      console.log("signInfo2: ", res.data.data)
                      wx.setStorageSync('auth_info', res.data.data)
                    }
                  })
                } else {
                  console.warn('Empty auth_info', wx.getStorageSync('auth_info'))
                };
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    serverHost: 'https://qa-api.kdan.cn/',
    // serverHost: 'http://localhost:8090/',
    userInfo: null
  }
})