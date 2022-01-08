// pages/profileIntro/index.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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
            // if (originalWidth > winWidth) {
            //     var autoWidth = winWidth;
            //     var autoHeight = (autoWidth * originalHeight) / originalWidth;
            //     imageWidth = autoWidth + 'px';
            //     imageHeight = autoHeight + 'px';
            // } else {
            //     imageWidth = originalWidth + 'px';
            //     imageHeight = originalHeight + 'px';
            // }
            // console.log("-----------" + imageWidth + " == " + imageHeight)
            that.setData({
                imgWidth: imageWidth,
                imgHeight: imageHeight
            });
        }
    })
  },
  showDetail:function(){
    wx.navigateTo({
      url: '../../pages/profileIntroDetail/index',
    })
  }
})