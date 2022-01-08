// pages/roomDetail/index.js
import {
    selectorList,
    selectorData,
    cusMultiList,
    cusMultiData,
    cusCascadeList,
    cusCascadeData
  } from '../../schema/data'
Page({

    /**
     * Page initial data
     */
    data: {
      
      showActionsheet: false,
      currentDate:"2010/03/23",
      selectorAnimalList:selectorList,
      selectorRoomList:selectorList,
      startDate:"1991-05-05",
      endDate:"1992-09-08",
      periodDay:1,
      status:0,
      roomCount: {id: 1, label: "1No"},
      animalCount: {id: 1, label: "1No"},
      resultPrice:160,
      noteText:"",
      checked:false,
      room_info:{
        checkintext: "erwrwerwer",
        checkouttext: "erwrwerwerwerwer",
        countanimal: 4,
        imageurl: "cloud://cloud1-0gw1q99l31ee317d.636c-cloud1-0gw1q99l31ee317d-1308271999/logo1.svg",
        roomdetail: "Lorem lpsum is simply dummy text of the printing and typwsettin industry",
        roomname: "Watched the phone",
        roomprice1: 23,
        roomprice2: 134,
        roomsizetext: "Width 30cm, heght 20cm, length 50cm"
      },
        
    array: ['1 No', '2 No', '3 No', '4 No'],
    index: 0,
    date: '2016-09-01',
    time: '12:01',

    modeSelector:'selector',
    modeMultiSelector:'multiSelector',
    modeCascadeSelector:'cascadeSelector',
    modeDate:'date',
    modeTime:'time',

    flagRoomSelector: false,
    flagAnimalSelector:false,
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
    selectedEnvid:"",
    type: 'new',
    orderid:''
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
      var type = options.type
      var startTime, endTime, diffTime, periodDay;
      this.setData({
        type: type
      })

      if (type == 'new'){
        startTime = this.changeStrToTimestamp(options.startDate)
        endTime = this.changeStrToTimestamp(options.endDate)
        diffTime = endTime - startTime;
        periodDay = diffTime / 24 / 3600 / 1000

        let info=JSON.parse(options.tempArr);
        console.log(info);

        this.setData({
          startDate: options.startDate,
          endDate: options.endDate,
          periodDay: periodDay,
          status: options.status,
          room_info:info,
          selectedEnvid:options.envId,
          resultPrice:160,
          noteText:"",
        });
      }else {
        var info=JSON.parse(options.tempArr);
        console.log(info);
        var _roomInfo = {
          checkintext: info.checkintext,
          checkouttext: info.checkouttext,
          countanimal: info.animalcount,
          imageurl: info.imageurl,
          roomdetail: info.roomdetail,
          roomname: info.roomname,
          roomprice1: info.roomprice1,
          roomprice2: info.roomprice2,
          roomsizetext: info.sizedetail
        },

        startTime = this.changeStrToTimestamp(info.startdate)
        endTime = this.changeStrToTimestamp(info.enddate)
        diffTime = endTime - startTime;
        periodDay = diffTime / 24 / 3600 / 1000


        this.setData({
          startDate: info.startdate,
          endDate: info.enddate,
          periodDay: periodDay,
          status: info.status,
          room_info:_roomInfo,
          selectedEnvid:options.envId,
          resultPrice:info.setprice,
          checked:true,
          noteText:info.note,
          orderid:info._id
        });
      }

      wx.setNavigationBarTitle({
        title: 'Room Check-in',
      })
      // var startDateList = this.data.startDate.split("-");
      // var newDate = new Date( startDateList[0], startDateList[1] - 1, startDateList[2]);
      // console.log(newDate.getTime());
      
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
    changeStrToTimestamp:function(_str){
      var startDateList = _str.split("-");
      var newDate = new Date( startDateList[0], startDateList[1] - 1, startDateList[2]);
      return newDate
    },
  checkboxChange: function(e) {
    if (e.detail.value.length == 1){
      this.setData({
        checked:true
      })
    }else{
      this.setData({
        checked:false
      })
    }
  }, 
  okCusRoomPicker: function (e) {
    let val = e.detail;
    // wx.showToast({
    //   icon:'none',
    //   title: '自行查看控制台返回的数据结构',
    //   duration:3000
    // })
    
    this.setData({
      roomCount:val.el
    })
    
    this.noCusPicker()
  },
  okCusAnimalPicker: function (e) {
    let val = e.detail;
    // wx.showToast({
    //   icon:'none',
    //   title: '自行查看控制台返回的数据结构',
    //   duration:3000
    // })
    this.setData({
      animalCount:val.el
    })
    
    this.noCusPicker()
  },
  noCusPicker: function () {
    this.setData({
      flagRoomSelector: false,
      flagAnimalSelector: false,
      flagMultiSelector: false,
      flagCascadeSelector: false,
      flagNowDate: false,
      flagAfterDate: false,
      flagStartEndDate: false,
      flagFieldsDate: false,
      flagTime: false
    })
  },
  showRoomCountSelector: function (e) {
    let flag = e.currentTarget.dataset.flag;
    this.setData({
      [flag]: true
    })
  },
  showAnimalCountSelector: function (e) {
    let flag = e.currentTarget.dataset.flag;
    this.setData({
      [flag]: true
    })
  },
  showRoomDetail:function(){
    var that = this
    wx.showModal({
      title: 'Alert',
      content: 'Confirm Order?',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          // console.log(this.changeStrToTimestamp("2020-02-03"));
          that.sendOrder();
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
  textareaInput(e){
    this.setData({
      noteText:e.detail.value,
    })
  },
  sendOrder:function(){
    console.log('用户点击 ' + this.data.noteText)
    var _order = {
      animalcount: this.data.room_info.countanimal,
      checkintext: this.data.room_info.checkintext,
      checkouttext: this.data.room_info.checkouttext,
      enddate: this.data.endDate,
      imageurl: this.data.room_info.imageurl,
      roomdetail: this.data.room_info.roomdetail,
      roomname: this.data.room_info.roomname,
      roomprice1: this.data.room_info.roomprice1,
      roomprice2: this.data.room_info.roomprice2,
      setprice: this.data.resultPrice,
      setroomcount: this.data.roomCount.id,
      setanimalcount: this.data.animalCount.id,
      note: this.data.noteText,
      sizedetail: this.data.room_info.roomsizetext,
      startdate: this.data.startDate,
      status: 1,
      userid: wx.getStorageSync('openId')
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
        type: 'createOrder',
        data: _order
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
  },

  clickCancelOrder:function(){
    var that = this
    wx.showModal({
      title: 'Alert',
      content: 'Confirm Cancel?',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          console.log('用户点击确定')
          that.cancelOrder()
        } else {//这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
    })
  },
  cancelOrder(){
    console.log('用户点击 ' + this.data.selectedEnvid + " == " + this.data.orderid)
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnvid
      },
      data: {
        type: 'orderCancel',
        data: this.data.orderid
      }
    }).then((resp) => {
      console.log(resp);
      if (resp.result.success) {
        this.setData({
          status: 2
        });
      }
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      wx.hideLoading();
    });
  },
  showCalendar: function(e){
    console.log("e.currentTarget.dataset.date == " + e.currentTarget.dataset.date)
    this.setData({
        currentDate: e.currentTarget.dataset.date,
        showActionsheet: true
    })
    console.log("currentTarget == " + this.data.currentDate)
    // wx.navigateTo({
    //     // url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    //      url: `/pages/roomDetailAllow/index`
    //    })
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
              dateStringStartTemp: e.detail.dateString
          })
      }else if (e.detail.type == "end"){
          var startTime = this.changeStrToTimestamp(this.data.dateStringStartTemp)
          var endTime = this.changeStrToTimestamp(e.detail.dateString)
          var diffTime = endTime - startTime;
          var periodDay = diffTime / 24 / 3600 / 1000
          this.setData({
              endDate: e.detail.dateString,
              startDate: this.data.dateStringStartTemp,
              periodDay: periodDay,
              showActionsheet: false
          })
           console.log("------" + this.data.dateStringStart + " == " + this.data.dateStringEnd)
          // wx.navigateTo({
          //   url: `/pages/roomDetailAllow/index?startDate=${this.data.dateStringStart}&endDate=${this.data.dateStringEnd}`,
          // })
      }
  },
})