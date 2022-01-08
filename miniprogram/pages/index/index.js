// index.js
// const app = getApp()
const { envList } = require('../../envList.js');
import {
  selectorList,
  selectorData,
  cusMultiList,
  cusMultiData,
  cusCascadeList,
  cusCascadeData
} from '../../schema/data'
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  data: {
    storeList:[],
    selectedStoreId:0,
    dropDownHide:true,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    showUploadTip: false,
    
    powerList: [{
      title: '云函数',
      tip: '安全、免鉴权运行业务代码',
      showItem: false,
      item: [{
        title: '获取OpenId',
        page: 'getOpenId'
      },
      //  {
      //   title: '微信支付'
      // },
       {
        title: '生成小程序码',
        page: 'getMiniProgramCode'
      },
      // {
      //   title: '发送订阅消息',
      // }
    ]
    }, {
      title: '数据库',
      tip: '安全稳定的文档型数据库',
      showItem: false,
      item: [{
        title: '创建集合',
        page: 'createCollection'
      }, {
        title: '更新记录',
        page: 'updateRecord'
      }, {
        title: '查询记录',
        page: 'selectRecord'
      }, {
        title: '聚合操作',
        page: 'sumRecord'
      }]
    }, {
      title: '云存储',
      tip: '自带CDN加速文件存储',
      showItem: false,
      item: [{
        title: '上传文件',
        page: 'uploadFile'
      }]
    }, {
      title: '云托管',
      tip: '不限语言的全托管容器服务',
      showItem: false,
      item: [{
        title: '部署服务',
        page: 'deployService'
      }]
    }],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false,
    latitude: 23.099994,
    longitude: 113.324520,
    hiddenStatus: true,
    showActionsheet: false,
    currentDate:"2010/03/23",
    dateString: "",
    spot: ['2020/8/6', '2020/8/9', '2020/8/20', '2020/9/12'],
    array: ['1 No', '2 No', '3 No', '4 No'],
    index: 0,
    date: '2016-09-01',
    time: '12:01',

    modeSelector:'selector',
    modeMultiSelector:'multiSelector',
    modeCascadeSelector:'cascadeSelector',
    modeDate:'date',
    modeTime:'time',

    flagSelector: false,
    flagMultiSelector: false,
    flagCascadeSelector: false,
    flagNowDate: false,
    flagAfterDate: false,
    flagStartEndDate: false,
    flagFieldsDate: false,
    flagTime: false,
    
    selectorList: selectorList,
    //selectorList,
    selectorData:selectorData,

    multiSelectorList: cusMultiList,
    multiSelectorData:cusMultiData,
    
    cascadeSelectorList: cusCascadeList,
    cascadeSelectorData:cusCascadeData,
    
    fields:'month',
    fieldsNowFlag:true,
    fieldsStart:[1992,9],
    fieldsEnd:[2028,12],
    fieldsDateData:[1996,7],

    dateData:[1998,2,1],
    startTime:[1992,6,8],
    endTime:[2028,6,7],
    
    timeData:[9,6],
  },
  
  onPullDownRefresh: function () {

    this.getStoreInfos()
    console.log("asdasdas");
  },
  
  onShow(){
  },
  onLoad(){
    this.getStoreInfos()
    console.log("-------------------------------------")
    console.log(wx.getStorageSync('userInfo') == '')
    console.log(wx.getStorageSync('userInfo'))
    console.log(wx.getStorageSync('openId'))
    // wx.setStorageSync('isLogin', false)
    // if (wx.getStorageSync('userInfo') == '' || wx.getStorageSync('userInfo').sign != wx.getStorageSync('openId')){
      this.getOpenId()
    // }else{
    //   wx.setStorageSync('isLogin', true)
    // }
    
    this.setData({
      latitude: 23.099994,
      longitude: 113.324520,
      hiddenStatus:true,
      currentDate:"2010/03/23"
    })
  },

  getStoreInfos() {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'getStores'
      }
    }).then((resp) => {
      console.log(resp.result.data[0]);
      this.setData({
        storeList: resp.result.data
      });
     wx.hideLoading();
   }).catch((e) => {
      console.log(e);
      // this.setData({
      //   showUploadTip: true
      // });
     wx.hideLoading();
   });
  },
  getOpenId() {
    wx.showLoading({
      title: '',
    });
   wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'getOpenId'
      }
    }).then((resp) => {
      console.log(resp.result)
      this.setData({
        openId: resp.result.openid
      });
      wx.setStorageSync('openId', resp.result.openid)
      wx.setStorageSync('isLogin', false)
      if (wx.getStorageSync('userInfo') == '' || wx.getStorageSync('userInfo').sign != wx.getStorageSync('openId')){
        this.getUserInfo()
      }else{
        wx.setStorageSync('isLogin', true)
      }
     wx.hideLoading();
   }).catch((e) => {
      this.setData({
        showUploadTip: true
      });
     wx.hideLoading();
    });
  },
  getUserInfo(){
    wx.showLoading({
      title: '',
    });
    console.log(" ==open id =" + this.data.openId)
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'getUserInfo',
        data: this.data.openId
      }
    }).then((resp) => {
      console.log(resp.result.data[0]);
      if (resp.result.data.length > 0){
        wx.setStorageSync('userInfo', resp.result.data[0])
        wx.setStorageSync('isLogin', true)
      }else{
        wx.clearStorageSync()
        wx.setStorageSync('isLogin', false)
      }
      wx.setStorageSync('openId', this.data.openId)
      // this.setData({
      //   dataList: resp.result.data
      // });
     wx.hideLoading();
   }).catch((e) => {
      console.log(e);
      // this.setData({
      //   showUploadTip: true
      // });
     wx.hideLoading();
   });
  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  onClickPowerInfo(e) {
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
    const index = e.currentTarget.dataset.index;
    // const powerList = this.data.powerList;
    // powerList[index].showItem = !powerList[index].showItem;
    
    let arr=JSON.stringify(this.data.storeList[this.data.selectedStoreId].roomtypes[index]);
    wx.navigateTo({
      // url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
       url: '/pages/roomDetail/index?tempArr='+arr + '&envId=' + this.data.selectedEnv.envId
     })
  },

  onChangeShowEnvChoose() {
    wx.showActionSheet({
      itemList: this.data.tabs,
      success: (res) => {
        this.onChangeSelectedEnv(res.tapIndex);
      },
      fail (res) {
        console.log(res.errMsg);
      }
    });
  },

  onChangeSelectedEnv(index) {
    if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
      return;
    }
    const powerList = this.data.powerList;
    powerList.forEach(i => {
      i.showItem = false;
    });
    this.setData({
      selectedEnv: this.data.envList[index],
      powerList,
      haveCreateCollection: false
    });
  },

  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },

  onClickDatabase(powerList) {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'createCollection'
      }
    }).then((resp) => {
      if (resp.result.success) {
        this.setData({
          haveCreateCollection: true
        });
      }
      this.setData({
        powerList
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  },
///////////////////////////
  freeTell: function(e){
    var that = this;
    console.log(e.currentTarget.dataset.mobile);
    that.setData({
      mobile: e.currentTarget.dataset.mobile
    })
    wx.makePhoneCall({
      phoneNumber: that.data.mobile,
    })

  },
  gotoLocation:function(e){
    
    // this.setData({
    //   latitude: e.currentTarget.dataset.latitude,
    //   longitude: e.currentTarget.dataset.longitude,
    //   hiddenStatus:false
    // })
    wx.navigateTo({
     // url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
      url: `/pages/mapView/index?latitude=${e.currentTarget.dataset.latitude}&longitude=${e.currentTarget.dataset.longitude}`
    })
  },
  showRoomDetail: function(){
    this.setData({
      // currentDate: e.currentTarget.dataset.date,
      showActionsheet: true
    })
    // wx.navigateTo({
    //   // url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    //    url: `/pages/roomDetailAllow/index`
    //  })
  },
  openActionsheet:function(e){
    console.log("e.currentTarget.dataset.date == " + e.currentTarget.dataset.date)
    this.setData({
      currentDate: e.currentTarget.dataset.date,
      showActionsheet: true
    })
    console.log("currentTarget == " + this.data.currentDate)
  },
  closeActionSheet: function () {
    this.setData({
      showActionsheet: false
    })
  },
  dateChange(e) {
    console.log("选中日期变了,现在日期是 " + e.detail.type, e.detail.dateString)
    if (e.detail.type == "start"){
        this.setData({
            dateStringStart: e.detail.dateString
        })
    }else if (e.detail.type == "end"){
        this.setData({
            dateStringEnd: e.detail.dateString,
            showActionsheet: false
        })
        console.log("------" + this.data.dateStringStart + " == " + this.data.selectedEnv.envId)
        wx.navigateTo({
          url: `/pages/roomDetailAllow/index?startDate=${this.data.dateStringStart}&endDate=${this.data.dateStringEnd}&envId=${this.data.selectedEnv.envId}`,
        })
    }
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  
  okCusPicker: function (e) {
    let val = e.detail;
    wx.showToast({
      icon:'none',
      title: '自行查看控制台返回的数据结构',
      duration:3000
    })
    console.log('点击确定返回的数据结构：',val)
    this.noCusPicker()
  },
  noCusPicker: function () {
    this.setData({
      flagSelector: false,
      flagMultiSelector: false,
      flagCascadeSelector: false,
      flagNowDate: false,
      flagAfterDate: false,
      flagStartEndDate: false,
      flagFieldsDate: false,
      flagTime: false
    })
  },
  showSelector: function (e) {
    let flag = e.currentTarget.dataset.flag;
    this.setData({
      [flag]: true
    })
  },
  showDropdown:function(){
    this.setData({
      dropDownHide: !this.data.dropDownHide
    })
  },
  clickSearchBackground:function(){
    this.setData({
      dropDownHide: !this.data.dropDownHide
    })
  },
  clickCell:function(e){
    console.log('------------' + e.currentTarget.dataset.index)
    this.setData({
      selectedStoreId: e.currentTarget.dataset.index
    })
  }
});
