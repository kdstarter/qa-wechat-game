const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    qa: null,
    haveJoined: false
  },
  onLoad: function (event) {
    var qaList = wx.getStorageSync('qaList') || [];
    for (var i = 0; i < qaList.length; i++) {
      var qa = qaList[i];
      if (qa.id == ~~event.id) {
        this.setData({
          qa: qa
        })
        console.log("showQa: ", qa)
        break
      }
    }
    
  },
  backToQaList: function() {
    wx.navigateBack({
      url: '/pages/qas/qas'
    })
  },
  qaFinshed: function() {
    return this.data.qa.status === 'exposed'
  },
  viewAnswerTap: function(event) {
    var guesses = this.data.qa.guesses;
    var current_user_id = app.globalData.authInfo.user.id;

    if (current_user_id === this.data.qa.owner.id) {
      this.setData({haveJoined: true})
      console.log('出题者可查看', current_user_id)
    } else if (this.qaFinshed()) {
      for (var i = 0; i < guesses.length; i++) {
        var guess = guesses[i];
        if (current_user_id === guess.user.id) {
          this.setData({haveJoined: true})
          console.log('有猜测过可查看', current_user_id, guess)
          break;
        }
      }
    } 

    if (!this.data.haveJoined) {
      console.log('未猜测过', current_user_id, guesses)
      wx.showModal({
        title: "提示",
        content: "只有猜测过才可查看喔！",
        showCancel: false
      });
    }
  },
  showGuessResult: function(event) {
    var form_data = event.detail.value;
    var guess = form_data.guess_conent;
    if (guess.trim() === "") {
      wx.showToast({
        title: '请输入你的猜测词',
        icon: 'success',
        duration: 2000
      })
      return
    }

    var answers = this.data.qa.answers;
    console.log("你猜测是: " + guess, answers);
    var authToken = app.globalData.authInfo.auth_token

    wx.request({
      method: 'POST',
      url: app.globalData.serverHost + 'api/questions/' + this.data.qa.id + '/guess_answer',
      header: { 'Authorization': authToken, 'Accept': 'application/vnd.api+json;version=1' },
      data: { data: {
        guess: {
          content: guess
        }
      } },
      success: res => {
        var data = res.data.data;
        console.log("guessQa: ", res.data)
        if (res.data.errors) {
          wx.showToast({
            title: res.data.errors[0].detail,
            icon: 'success',
            duration: 2000
          })
        } else {
          if (util.isEmpty(data.hited_answer)) {
            console.warn(util.formatTime(new Date()) + " 非常遗憾，你猜错了");
            wx.showModal({
              title: "提示",
              content: "喔 很遗憾猜错了~~",
              showCancel: false
            });
          } else if (data.hited_answer.match_pattern === 'match_equal') {
            console.log(util.formatTime(new Date()) + " 你真厉害，完全猜对");
            wx.showModal({
              title: "提示",
              content: "真厉害，完全猜对!",
              success: this.backToQaList,
              showCancel: false
            });
          } else if (data.hited_answer.match_pattern === 'match_include') {
            console.log(util.formatTime(new Date()) + " 你真厉害，猜对了关键词");
            wx.showModal({
              title: "提示",
              content: "不错哦，猜对了关键词!",
              success: this.backToQaList,
              showCancel: false
            });
          };
        }
      }
    });
  }
})
