
Page({
  onShareAppMessage() {
    return {
    }
  },
  data: {
    background: [{
      title:'demo-text-1',
      backColor:"#C1896E",
      image:"../../images/profile-level1.png",
      name:"LV.1  HEADING",
      detailList:[
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry11.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry12."
      ]
    },
    {
      title:'demo-text-2',
      backColor:"#8FA0B2",
      image:"../../images/profile-level1.png",
      name:"LV.2  HEADING",
      detailList:[
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry21.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry22."
      ]
    },
    {
      title:'demo-text-3',
      backColor:"#FCC214",
      image:"../../images/profile-level1.png",
      name:"LV.3  HEADING",
      detailList:[
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry31.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry32.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry33."
      ]
    },
    {
      title:'demo-text-2',
      backColor:"#3A3D46",
      image:"../../images/profile-level1.png",
      name:"LV.4  HEADING",
      detailList:[
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry41.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry42."
      ]
    },],
    dataList:[],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    current: 0
  },
  onLoad(options){
    wx.setNavigationBarTitle({
      title: '我的',
    })
    this.setData({
      selectedEnvid: options.envId
    })
    this.getLevels()
  },
  getLevels(){
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnvid
      },
      data: {
        type: 'getLevels'
      }
    }).then((resp) => {
      // console.log(resp.result);
      this.setData({
        dataList: resp.result.data
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
  changeSelect(event) {
    console.log(event.detail);
    console.log("test ==========" + event.detail.current)
    this.setData({
    current: event.detail.current
   })
  },
  
});
