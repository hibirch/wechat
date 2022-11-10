const app = getApp()
const db = wx.cloud.database();
Page({
  data: {
    like: false,
    userInfo: {
      openid: ""
    },
    postArr: [],
    userArr: [],
  },

  onShow() {
    this.getTabBar().init();
  },
  onLoad() {
    wx.getStorage({
      key: "openId",
      success: (res) => {
      },
      fail: (err) => {
        this.userInit()
      }
    })
    this.getPostAll()
    this.getUserAll()
  },
  async userInit() {
    const that = this
    wx.cloud.callFunction({
      name: 'user_init'
    }).then(res => {
      that.setData({
        userInfo: res.result
      })
      wx.setStorage({
        key: "openId",
        data: res.result
      })
    })
  },
  getPostAll() {
    const that = this
    wx.cloud.callFunction({
      name: "post_get_all"
    }).then(res => {
      that.setData({
        postArr: res.result.data
      })
    })
  },
  getUserAll() {
    const that = this
    wx.cloud.callFunction({
      name: "user_get_all"
    }).then(res => {
      that.setData({
        userArr: res.result.data
      })
    })
  },
  likeAdd(event) {
    this.setData({
      like: false
    })
    wx.cloud.callFunction({
      name: "post_like_add",
      data: {
        id: event.currentTarget.dataset.id
      }
    })
  },
  likeSub: function (event) {
    this.setData({
      like: true
    })
    wx.cloud.callFunction({
      name: "post_like_sub",
      data: {
        id: event.currentTarget.dataset.id
      }
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: res.target.dataset,
      path: '/pages/detail/detail'
    }
  },
})