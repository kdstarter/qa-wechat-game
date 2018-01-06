const util = require('../../utils/util.js')

Page({
  data: {
    qa: []
  },
  onLoad: function () {
    var qa_list = wx.getStorageSync('qa_list') || [];

    this.setData({
      qa: qa_list[0]
    })
  },
  backToQaList: function() {
    wx.navigateBack({
      url: '/pages/qas/qas'
    })
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
    console.log("你猜测是: " + guess);

    var is_over = false;
    var that = this;
    for (var i = 0; i < answers.length - 1; i++) {
      var answer = answers[i];
      if (answer.match_pattern == "equal" && guess === answer.content) {
        console.log(util.formatTime(new Date()) + " 你真厉害，完全猜对");
        is_over = true;
        wx.showModal({
          title: "提示",
          content: "真厉害，完全猜对!",
          success: that.backToQaList,
          showCancel: false
        });
        break
      } else if (answer.match_pattern == "include" && guess.indexOf(answer.content) >= 0) {
        console.log(util.formatTime(new Date()) + " 你真厉害，猜对了关键词");
        is_over = true;
        wx.showModal({
          title: "提示",
          content: "不错哦，猜对了关键词!",
          success: that.backToQaList,
          showCancel: false
        });
        break
      }
    }

    if (is_over) { 
      // this.backToQaList();
    } else {
      console.warn(util.formatTime(new Date()) + " 非常遗憾，你猜错了");
      wx.showModal({
        title: "提示",
        content: "喔 很遗憾猜错了~~",
        showCancel: false
      });
    }
  }
})
