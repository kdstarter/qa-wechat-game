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
    wx.navigateTo({
      url: '/pages/qas/qas'
    })
  },
  showGuessResult: function(event) {
    var form_data = event.detail.value;
    var guess = form_data.guess_conent;
    var answers = this.data.qa.answers;
    console.log("你猜测是: " + guess);

    var is_over = false;
    for (var i = 0; i < answers.length - 1; i++) {
      var answer = answers[i];
      if (answer.match_pattern == "equal" && guess === answer.content) {
        console.log(util.formatTime(new Date()) + " 你真厉害，完全猜对");
        is_over = true;
        break
      } else if (answer.match_pattern == "include" && guess.indexOf(answer.content) >= 0) {
        console.log(util.formatTime(new Date()) + " 你真厉害，猜对了关键词");
        is_over = true;
        break
      }
    }

    if (is_over) { 
      this.backToQaList();
    } else {
      console.warn(util.formatTime(new Date()) + " 非常遗憾，你猜错了");
    }
  }
})
