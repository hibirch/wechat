const app = getApp()

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const db = wx.cloud.database();
Page({
  data: {
    active: 0,
    user: {
      avatarUrl: defaultAvatarUrl,
      nickname: '风风子',
      userId: '1',
      fans: '',
      like: '',
      collect: '',
      openId: "",
      explain:""
    },
    dynamic: []
  },
  onLoad() {
    const openid = wx.getStorageSync('openId')
    this.setData({
      'user.openId': openid
    })
    this.getUserData()
  },
  onShow() {
    this.getTabBar().init();
  },
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      'user.avatarUrl': avatarUrl
    })
  },
  getUserData: async function () {
    wx.cloud.callFunction({
      name: "user_info_get"
    }).then(res => {
      this.setData({
        'user.nickname':res.result.data[0].nickName,
        'user.avatarUrl':res.result.data[0].avatar,
        'user.fans':res.result.data[0].fans,
        'user.like':res.result.data[0].like,
        'user.collect':res.result.data[0].collect,
        'user.explain':res.result.data[0].explain
      })
    })
  }
})