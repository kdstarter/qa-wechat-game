//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  myAvatarTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goUserRankTap: function() {
    wx.showToast({
      title: '暂时未开放',
      icon: 'success',
      duration: 1000
    })
  },
  goQaAddTap: function() {
    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: '../qas/new'
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'success',
        duration: 1000
      })
    }
  },
  goQaListTap: function() {
    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: '../qas/qas'
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'success',
        duration: 1000
      })
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        authInfo: app.globalData.authInfo,
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          authInfo: app.globalData.authInfo,
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log("globalData1: ", app.globalData)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    console.log("wxUserInfo1", e.detail.userInfo, e)
    console.log("globalData1: ", app.globalData)
    this.setData({
      authInfo: app.globalData.authInfo,
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.request({
      method: 'POST',
      url: app.globalData.serverHost + 'api/sessions',
      header: { 'Accept': 'application/vnd.api+json;version=1' },
      data: { data: { js_code: app.globalData.authInfo.auth_token, user_info: e.detail.userInfo } },
      success: res => {
        console.log("signInfo1: ", res.data.data)
        // wx.setStorageSync('auth_info', res.data.data)
        if (!util.isEmpty(res.data.data)) {
          app.globalData.authInfo = res.data.data
        };
      }
    });
  }
})
