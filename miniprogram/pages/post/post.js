// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: false,
    like: false,
    isSelf: false,
    htmlSnip: "",
    avatar: "",
    nickName: "",
    value: "",
    info: {},
    id: "",
    title:"",
    count: 0,
    commentArr: []
  },
  onLoad: function (options) {
    this.onSee(options.id)
    this.setData({
      id: options.id
    })
    this.getAuther(options.openid)
    this.getPost(options.id)
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.getComment()
  },
  getPost(id) {
    const that = this
    wx.cloud.callFunction({
      name: "post_get_id",
      data: {
        id: id
      }
    }).then(res => {
      that.setData({
        info: res.result.data
      })
    })
  },
  getAuther(value) {
    const that = this
    wx.cloud.callFunction({
      name: "user_get_avatar",
      data: {
        openid: value
      }
    }).then(res => {
      wx.getStorage({
        key: 'openId',
        success(auth) {
          if (auth.data == res.result.data[0].openId) {
            that.setData({
              isSelf: true
            })
          } else {
            that.setData({
              isSelf: false
            })
          }
        },
        fail(err) {
          console.log('err', err)
        }

      })
      that.setData({
        avatar: res.result.data[0].avatar,
        nickName: res.result.data[0].nickName
      })
    })
  },
  getComment() {
    const that = this
    wx.cloud.callFunction({
      name: "comment_get",
      data: {
        id: that.data.id
      }
    }).then(res => {
      that.setData({
        count: res.result.data.length,
        commentArr: res.result.data
      })
    })
  },
  onSee(id) {
    wx.cloud.callFunction({
      name: "post_see",
      data: {
        id: id
      }
    })
  },
  onlike() {
    this.setData({
      like: true,
    })
    wx.cloud.callFunction({
      name: "post_like_add",
      data: {
        id: this.data.id
      }
    })
  },
  relike() {
    this.setData({
      like: false,
    })
    wx.cloud.callFunction({
      name: "post_like_sub",
      data: {
        id: this.data.id
      }
    })
  },
  onComment(e) {
    this.setData({
      comment: true,
    })
    wx.cloud.callFunction({
      name: "comment_like_add",
      data: {
        id: e.currentTarget.dataset.id
      }
    })
  },
  reComment(e) {
    this.setData({
      comment: true,
    })
    wx.cloud.callFunction({
      name: "comment_like_sub",
      data: {
        id: e.currentTarget.dataset.id
      }
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: res.target.dataset,
      path: '/pages/post/post'
    }
  },
})