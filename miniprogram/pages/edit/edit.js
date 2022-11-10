const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    openId: "",
    nickName: "",
    avatarUrl: defaultAvatarUrl,
    explain: "请输入个性签名"
  },
  onLoad(options) {
    this.setData({
      openId: options.openId
    })
  },
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })
  },
  edit() {
    const that = this
    wx.cloud.callFunction({
      name: 'user_edit_info',
      data: {
        avatar: that.data.avatarUrl,
        nickName: that.data.nickName,
        explain: this.data.explain
      }
    }).then(res => {
      that.returnPage()
    })
  },
  editForm(data) {
    this.setData({
      nickName: data.detail.value.nickName,
      explain: data.detail.value.explain
    })
    this.edit()
  },
  returnPage() {
    var pages = getCurrentPages();
    if (pages.length > 1) {
      var prePage = pages[pages.length - 2];
      prePage.onShow();
      prePage.onLoad();
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})