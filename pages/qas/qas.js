//qas.js
const util = require('../../utils/util.js')

Page({
  data: {
    qas: []
  },
  onLoad: function () {
    var qa_list = wx.getStorageSync('qa_list') || [];
    if (qa_list.length === 0) {
      var demo_qa1 = this.demoQaData("001");
      qa_list.push(demo_qa1);
      // var demo_qa2 = this.demoQaData("002");
      // qa_list.push(demo_qa2);
      wx.setStorageSync('qa_list', qa_list);
    }

    this.setData({
      qas: (qa_list).map(qa => {
        return qa
      })
    })
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
          "match_pattern": "equal",
          "award_price": 3
        },
        {
          "answer_id": "002",
          "content": "泰迪",
          "match_pattern": "include",
          "award_price": 2
        },
        {
          "answer_id": "003",
          "content": "狗",
          "match_pattern": "include",
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
