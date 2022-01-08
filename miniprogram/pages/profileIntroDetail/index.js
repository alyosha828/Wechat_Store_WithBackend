// pages/profileIntro/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    itemsOne: [
      {value: 'one', name: 'One', checked: 'true'},
      {value: 'two', name: 'Two'},
      {value: 'three', name: 'Three'},
    ],
    itemsTwo: [
      {value: 'one', name: 'One', checked: 'true'},
      {value: 'two', name: 'Two'},
    ],
    itemsThree: [
      {value: 'one', name: 'One', checked: 'true'},
      {value: 'two', name: 'Two'},
    ],

    num: 4,//后端给的分数,显示相应的星星
    one_1: '',
    two_1: '',
    one_2: 0,
    two_2: 5,

    feed1: "one",
    feed2: "one",
    feed3: "one",
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("sadas" + options.envId)
    this.setData({
      one_1: this.data.num,
      two_1: 5 - this.data.num,
      selectedEnvid:options.envId,
      feed1: "One",
      feed2: "One",
      feed3: "One",
      star: 0,
      noteText: ''
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  
  autoImage(e) {
    var that = this;
    var originalWidth = e.detail.width;
    var originalHeight = e.detail.height;
    var imageWidth = 0;
    var imageHeight = 0;
    wx.getSystemInfo({
        complete: (res) => {
            var winWidth = res.windowWidth;
            var winHeight = res.windowHeight;
            // console.log("-----------" + originalWidth + " == " + winWidth)
            var autoWidth = winWidth;
            var autoHeight = (autoWidth * originalHeight) / originalWidth;
            imageWidth = autoWidth + 'px';
            imageHeight = autoHeight + 'px';
            
            // console.log("-----------" + imageWidth + " == " + imageHeight)
            that.setData({
                imgWidth: imageWidth,
                imgHeight: imageHeight
            });
        }
    })
  },
  radioChangeFeedOne(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.itemsOne
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    console.log(items)
    this.setData({
      feed1:e.detail.value
    })
  },
  radioChangeFeedTwo(e) {
    const items = this.data.itemsTwo
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      feed2:e.detail.value
    })
  },
  radioChangeFeedThree(e) {
    const items = this.data.itemsThree
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      feed3:e.detail.value
    })
  },

  in_xin:function(e){
    var in_xin = e.currentTarget.dataset.in;
    var one_2;
    if (in_xin === 'star-selected'){
      one_2 = Number(e.currentTarget.id);
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2;
    }
    console.log("dfsdfsdf == " + one_2)
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2
    })
  },
  textareaInput(e){
    this.setData({
      noteText:e.detail.value,
    })
  },
  showDetail:function(){
    var feedInfo = {
      feed1: this.data.feed1,
      feed2: this.data.feed2,
      feed3: this.data.feed3,
      feednote: this.data.noteText,
      star: this.data.one_2,
      userid:"aaaaaaaaaaaaaaaaaaaaaaa",
    }
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnvid
      },
      data: {
        type: 'createFeedback',
        data: feedInfo
      }
    }).then((resp) => {
      console.log(resp);
      if (resp.result.success) {
        // this.setData({
        //   haveCreateCollection: true
        // });
        wx.navigateBack({
          delta: 0,
        })
      }
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      wx.hideLoading();
    });
  }
  
})