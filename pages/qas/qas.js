//qas.js
const util = require('../../utils/util.js')

Page({
  data: {
    qas: []
  },
  onLoad: function () {
    var qa_list = wx.getStorageSync('qa_list') || [];
    if (qa_list.length === 0) {
      qa_list.push(this.demoQaData());
      qa_list.push(this.demoQaData());
    }

    this.setData({
      qas: (qa_list).map(qa => {
        return qa
      })
    })
  },
  demoQaData: function () {
    return {
      "owner_id": "Teddy",
      "question": "我最喜欢的宠物？",
      "status": "opening",
      "type": "public",
      "ticket_pwd": "",
      "ticket_price": 0.1,
      "award_price": 3,
      "pay_qrcode": "https://raw.githubusercontent.com/agilejzl/qa-wechat-game/master/wx_qrcode.png",
      "answers": [
        {
          "content": "泰迪狗",
          "match_pattern": "equal",
          "award_price": 3
        },
        {
          "content": "泰迪",
          "match_pattern": "include",
          "award_price": 2
        },
        {
          "content": "狗",
          "match_pattern": "include",
          "award_price": 1
        }
      ],
      "commits": [
        {
          "user_id": "Kitty",
          "answer": "猫",
          "award_price": "-0.1"
        },
        {
          "user_id": "Teddy",
          "answer": "泰迪",
          "award_price": "2"
        }
      ]
    };
  }
})
