import Notify from '@vant/weapp/notify/notify';
import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    id: "",
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
    wx.cloud.callFunction({
      name: 'post_get_id_update',
      data: {
        id: this.data.id,
        title: this.data.post_title,
        post_image: this.data.fileList[0].url
      }
    })
    Toast({
      type: 'success',
      message: '修改成功',
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
  onLoad(options) {
    this.getPost(options.id)
    this.setData({
      id: options.id
    })
  },
  getPost(value) {
    const that = this
    wx.cloud.callFunction({
      name: "post_get_id",
      data: {
        id: value
      }
    }).then(res => {
      that.setData({
        post_title: res.result.data.title,
        fileList: [{
          url: res.result.data.post_image
        }]
      })
    })
  }
})