import Toast from '@vant/weapp/toast/toast';
Page({
  data: {
    message: '',
    openid: "",
    info: {},
    id: ""
  },
  onLoad(options) {
    this.setData({
      id: options.id
    })
    this.getInfo()
  },
  onChange(event) {
    this.setData({
      message: event.detail
    })
  },
  onSubmit() {
    const that = this
    wx.cloud.callFunction({
      name: "comment_create",
      data: {
        avatar: that.data.info.avatar,
        nickName: that.data.info.nickName,
        time: that.fermitTime(),
        start: 0,
        id: this.data.id,
        openid: that.data.info.openId,
        content:that.data.message
      }
    }).then(res => {
      Toast({
        type: 'success',
        message: '评论成功',
        onClose: () => {
          var pages = getCurrentPages();
          if (pages.length > 1) {
            var prePage = pages[pages.length - 2];
            prePage.onShow();
            wx.navigateBack({
              delta: 1,
            })
          }
        },
      });
    })
  },
  getInfo() {
    const that = this
    wx.cloud.callFunction({
      name: "user_info_get"
    }).then(res => {
      that.setData({
        info: res.result.data[0]
      })
    })
  },
  fermitTime() {
    const now = new Date()
    const year = now.getFullYear();
    const mon = now.getMonth() + 1;
    const date = now.getDate();
    const hour = now.getHours();
    const min = now.getMinutes();
    const postDate = year + '-' + mon + '-' + date + ' ' + hour + ':' + min
    return postDate;
  }
})