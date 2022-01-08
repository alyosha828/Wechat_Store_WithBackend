// pages/history/history.js
const { envList } = require('../../envList.js');
Page({

  /**
   * Page initial data
   */
  data: { 
    tabs:["All", "Paid", "Canceled", "Progressing", "Finished"],
    activeIndex: 0,
    dataList:[],
    showList:[],
    todayDay:"2000-05-25",
    envList,
    selectedEnv: envList[0],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      activeIndex: 0
    })
    wx.setNavigationBarTitle({
      title: 'My Order',
    })
    
    
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

    console.log("onReady")
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    
    this.getOrderInfos()
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
    this.getOrderInfos()
    console.log("asdasdas  sadas " + this.data.activeIndex);
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

  getOrderInfos() {
    if (wx.getStorageSync('isLogin') != true){
      wx.showModal({
        title: 'Alert',
        content: 'Please login!',
        showCancel: false,
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } 
        }
      })
      return
    }
    wx.showLoading({
      title: '',
    });
    console.log(wx.getStorageSync('openId'))
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getOrders',
        data: wx.getStorageSync('openId')
      }
    }).then((resp) => {
      console.log(resp.result.data[0]);
      this.setData({
        dataList: resp.result.data
      });
      this.getShowList()
     wx.hideLoading();
   }).catch((e) => {
      console.log(e);
      // this.setData({
      //   showUploadTip: true
      // });
     wx.hideLoading();
   });
  },
  getShowList(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    this.updateList(this.data.activeIndex)
    this.setData({
      // activeIndex:0,
      // showList:this.data.dataList,
      todayDay:date
    })
  },

  tabClick: function (e) {
    this.updateList(e.detail.index)
    this.setData({
      activeIndex: e.detail.index
    });
  },
  updateList:function(_index){
    var midList = []
    var i = 0, j = 0, len = 0;
    if (_index == 0){
      midList = this.data.dataList
    }else{
      for(j = 0,len=this.data.dataList.length; j < len; j++) {
        if (_index == this.data.dataList[j].status){
          midList[i] = this.data.dataList[j]
          i++
        }
      }
    }
    this.setData({
      showList:midList
    })
  },
  clickOrderCell:function(e){
    var index = e.currentTarget.dataset.index
    console.log("index ==== " + index)
    let arr=JSON.stringify(this.data.showList[index]);
    wx.navigateTo({
      url: `/pages/roomDetailAllow/index?type=edit&&tempArr=${arr}&envId=${this.data.selectedEnv.envId}`,
    })
  }
})