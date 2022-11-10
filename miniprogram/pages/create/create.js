import Notify from '@vant/weapp/notify/notify';
import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    post_title: "",
    topic: {
      topic: {
        originText: ""
      },
      originText: ""
    },
    fileList: [],
  },
  onChangeTitle: function (e) {
    this.setData({
      post_title: e.detail
    })
  },
  onInputtingDesc: function (e) {
    let html = e.detail.html;
    let originText = e.detail.text;
    this.setData({
      ['topic.topic.originText']: html,
      ['topic.originText']: originText
    });
  },
  onClickIcon: function () {
    Notify({
      type: 'primary',
      message: '标题不会直接显示~'
    });
  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    const {
      url
    } = file
    const {
      fileList = []
    } = this.data
    fileList.push({
      url
    });
    this.setData({
      fileList
    });
  },

  del(event) {
    let id = event.detail.index
    let fileList = this.data.fileList
    fileList.splice(id, 1)
    this.setData({
      fileList: fileList
    })
  },
  submit() {
    if (this.data.post_title.length == 0) {
      Toast.fail('请添加标题');
      return
    }
    if (this.data.fileList.length == 0) {
      Toast.fail('请添加封面');
      return
    }
    const that = this
    wx.cloud.callFunction({
      name: 'post_add',
      data: {
        title: this.data.post_title,
        post_content: this.data.topic.topic.originText,
        post_image: this.data.fileList[0].url,
        time:that.fermitTime()
      }
    })
    Toast({
      type: 'success',
      message: '提交成功',
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
    })
  },
  fermitTime() {
    const now = new Date()
    var year = now.getFullYear();
    var mon = now.getMonth() + 1;
    var date = now.getDate();
    var postDate = year + '-' + mon + '-' + date
    return postDate;
  }
})