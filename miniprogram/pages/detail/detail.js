// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    postArr: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      openid: options.openid
    })
    this.getInfo(options.openid)
    this.getPost(options.openid)
  },
  getInfo(value) {
    const that = this
    wx.cloud.callFunction({
      name: "user_get_avatar",
      data: {
        openid: value
      }
    }).then(res => {
      that.setData({
        info: res.result.data[0]
      })
      console.log(this.data.info)
    })
  },
  getPost(value) {
    const that = this
    wx.cloud.callFunction({
      name: "post_get_openid",
      data: {
        openid: value
      }
    }).then(res => {
      console.log("post", res.result.data)
      that.setData({
        postArr: res.result.data
      })
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: res.target.dataset,
      path: '/pages/detail/detail'
    }
  },
  returnPage() {
    var pages = getCurrentPages();
    if (pages.length > 1) {
      var prePage = pages[pages.length - 2];
      prePage.onShow();
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})