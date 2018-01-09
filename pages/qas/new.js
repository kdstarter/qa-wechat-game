const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    show_type: 0,
    match_pattern: 0,
    show_types: [
      { name: '公开', value: 0, checked: 'true' },
      { name: '匿名', value: 1 }
    ],
    match_patterns: [
      { name: '完全匹配', value: 0, checked: 'true' },
      { name: '关键词匹配', value: 1 }
    ]
  },
  onLoad: function () {
    console.log('show_types: ', this.data)
  },
  radioChange: function(e) {
    if (e.currentTarget.id == 'show_type') {
      this.data.show_type = e.detail.value
    } else if (e.currentTarget.id == 'match_pattern') {
      this.data.match_pattern = e.detail.value
    }
    console.log('show_type: ' + this.data.show_type + ', match_pattern: ' + this.data.match_pattern)
  },
  submitNewQa: function(event) {
    var formData = event.detail.value;
    console.log('newQa: ', formData)
    var authToken = app.globalData.authInfo.auth_token
    
    wx.request({
      method: 'POST',
      url: app.globalData.serverHost + 'api/questions',
      header: { 'Authorization': authToken, 'Accept': 'application/vnd.api+json;version=1' },
      data: { data: {
        show_type: ~~this.data.show_type,
        content: formData.content,
        ticket_price: ~~formData.ticket_price,
        answers: [{
          match_pattern: ~~this.data.match_pattern,
          content: formData.answer_content,
          award_price: ~~formData.answer_award_price
        }]
      } },
      success: res => {
        console.log("createQa: ", res.data)
        if (res.data.errors) {
          wx.showToast({
            title: res.data.errors[0].detail,
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000,
            success: function() {
              wx.redirectTo({
                url: '/pages/qas/qas'
              })
            }
          })
        }
      }
    });
  }
})
