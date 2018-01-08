//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    goQaAdd: '说个秘密',
    goQaGuess: ' 去猜秘密',
    goUserRanking: ' 得分排行',
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
    wx.showToast({
      title: '暂时未开放',
      icon: 'success',
      duration: 1000
    })
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
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
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
    console.log("wxUserInfo", e.detail.userInfo, e)
    console.log("globalData: ", app.globalData)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
