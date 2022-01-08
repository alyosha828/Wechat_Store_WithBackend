// pages/roomDetail/index.js
Page({

    /**
     * Page initial data
     */
    data: {
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
        selectedEnvid:"",
        
        showActionsheet: false,
        currentDate:"2010/03/23",
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {
        let info=JSON.parse(options.tempArr);
        this.setData({
            room_info:info,
            selectedEnvid:options.envId
        })
        wx.setNavigationBarTitle({
            title: 'Room Information',
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
    showRoomDetail: function(e){
        
        this.setData({
            currentDate: e.currentTarget.dataset.date,
            showActionsheet: true
        })
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
        if (e.detail.type == "start"){
            this.setData({
                dateStringStart: e.detail.dateString
            })
        }else if (e.detail.type == "end"){
            this.setData({
                dateStringEnd: e.detail.dateString,
                showActionsheet: false
            })
            let arr=JSON.stringify(this.data.room_info);
            wx.navigateTo({
              url: `/pages/roomDetailAllow/index?type=new&startDate=${this.data.dateStringStart}&endDate=${this.data.dateStringEnd}&tempArr=${arr}&envId=${this.data.selectedEnvid}`,
            })
        }
    },
    onViewCheckinInfo: function(){
        wx.navigateTo({
            // url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
             url: `/pages/checkInInstro/index`
           })
    },
    onViewCheckoutInfo: function(){
        wx.navigateTo({
            // url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
             url: `/pages/checkOutInstro/index`
           })
    }
})