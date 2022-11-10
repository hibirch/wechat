Component({
  properties: {
    showTabBar: {
      type: 'Boolean',
      value: true
    },
    placeholder: {
      type: 'String',
      value: '请输入相关内容'
    },
    name: {
      type: 'String',
      value: ''
    },
    uploadImageURL: {
      type: 'String',
      value: ''
    }
  },
  data: {

  },

  methods: {
    _onEditorReady: function () {
      const that = this;
      that.createSelectorQuery().select('#editor').context(function (res) {
        that.editorCtx = res.context
      }).exec()
    },
    //插入图片
    _addImage: function (event) {
      let _this = this;
      wx.chooseMedia({
        count: 1,
        mediaType:['image'],
        sizeType: ['compressed'],
        sourceType: ['album'],
        success: function (res) {
          wx.showLoading({
            title: '上传中',
            mask: true
          });
          console.log(res.tempFiles.tempFilePath)
          console.log(res.tempFiles.size)
          _this._uploadImage(res.tempFilePaths[0], event.currentTarget.dataset.uploadimageurl);
        }
      });
    },
    _uploadImage: function (tempFilePath, uploadImageURL) {
      let _this = this;
      wx.uploadFile({
        filePath: tempFilePath,
        name: 'image',
        url: uploadImageURL,
        success: function (res) {
          res = JSON.parse(res.data);
          wx.hideLoading({
            success: () => {
              if (res.code === 200) {
                _this.editorCtx.insertImage({
                  src: res.data
                });
              } else {
                wx.showToast({
                  icon: 'error',
                  title: '服务器错误,稍后重试！',
                  mask: true
                })
              }
            },
          });
        }
      });
    },

    _addItalic: function () {
      this.editorCtx.format("italic")
    },

    _addBold: function () {
      this.editorCtx.format("bold")
    },

    _addHeader: function (e) {
      let headerType = e.currentTarget.dataset.header;
      this.editorCtx.format("header", headerType)
    },

    _addAlign: function (e) {
      let alignType = e.currentTarget.dataset.align;
      this.editorCtx.format("align", alignType);
    },

    _addList: function (e) {
      let listType = e.currentTarget.dataset.list;
      this.editorCtx.format("list", listType);
    },

    _undo: function () {
      this.editorCtx.undo();
    },

    _onInputting: function (e) {
      let html = e.detail.html;
      let text = e.detail.text;
      this.triggerEvent("input", { html: html, text: text }, {});
    }
  }
})
