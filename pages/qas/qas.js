//qas.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    qas: []
  },
  onLoad: function () {
    var that = this
    var authToken = app.globalData.authInfo.auth_token
    console.log("authorization: ", authToken)
    wx.request({
      method: 'GET',
      url: app.globalData.serverHost + 'api/questions',
      header: { 'Authorization': authToken, 'Accept': 'application/vnd.api+json;version=1' },
      success: res => {
        // 需要做异常处理
        if (res.data.errors) {
          console.error('getQas: ', res.data.errors)
          wx.showToast({
            title: '获取数据失败',
            icon: 'success',
            duration: 2000
          })
        } else {
          console.log("questions: ", res.data.data)
          that.setData({
            qas: (res.data.data).map(qa => {
              return qa
            })
          })
          wx.setStorageSync('qaList', res.data.data)
        };
      }
    });
  },
  goQaViewTap: function() {
    wx.navigateTo({
      url: '../qas/show'
    })
  },
  demoQaData: function (id) {
    return {
      "id": id,
      "owner_id": "Teddy",
      "content": "我最喜欢的宠物？",
      "status": "opening",
      "show_type": "signed",
      "ticket_pwd": "",
      "ticket_price": 1,
      "award_price": 3,
      "pay_qrcode": "https://raw.githubusercontent.com/agilejzl/qa-wechat-game/master/wx_qrcode.png",
      "answers": [
        {
          "answer_id": "001",
          "content": "泰迪狗",
          "match_pattern": "match_equal",
          "award_price": 3
        },
        {
          "answer_id": "002",
          "content": "泰迪",
          "match_pattern": "match_include",
          "award_price": 2
        },
        {
          "answer_id": "003",
          "content": "狗",
          "match_pattern": "match_include",
          "award_price": 1
        }
      ],
      "guesses": [
        {
          "guess_id": "001",
          "user_id": "Kitty",
          "content": "猫",
          "score": "-1"
        },
        {
          "guess_id": "002",
          "user_id": "Teddy",
          "content": "泰迪",
          "score": "2"
        }
      ]
    };
  }
})
