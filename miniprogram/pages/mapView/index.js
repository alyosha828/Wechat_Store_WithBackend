Page({

  /**
   * 页面的初始数据
   */
  data: {

    latitude: 23.099994,
    longitude: 113.324520
  },
  onLoad(options) {
    this.setData({
      latitude: options.latitude,
      longitude: options.longitude
    });
  },
  goBack() {
    wx.navigateBack({
      delta: 2
    });
  },

});
