// pages/space/space.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: false,
    operation: {
      del: false,
      change: false,
      view: false
    },
    postArr: []
  },

  onLoad(options) {
    this.getPost()
  },
  onShow() {
    this.getTabBar().init();
    this.getPost()
  },
  onReady() {
    this.getPost()
  },
  getPost() {
    const that = this
    wx.cloud.callFunction({
      name: "post_get"
    }).then(
      res => {
        that.setData({
          postArr: res.result.data
        })
      }
    )
  },
  onDel() {
    this.setData({
      'operation.change': false,
      'operation.view': false,
      'operation.del': !this.data.operation.del
    })
  },
  onView() {
    this.setData({
      'operation.del': false,
      'operation.change': false,
      'operation.view': !this.data.operation.view
    })
  },
  handleChange() {
    this.setData({
      'operation.del': false,
      'operation.view': false,
      'operation.change': !this.data.operation.change
    })
  },
  onRemove(e) {
    wx.cloud.callFunction({
      name: "post_redmove",
      data: {
        id: e.currentTarget.dataset.id
      }
    })
    this.onLoad()
    this.onShow()
  },
})