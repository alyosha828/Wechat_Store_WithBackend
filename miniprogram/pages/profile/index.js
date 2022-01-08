// const Request = require('../../request/index');
const { envList } = require('../../envList.js');
Page({
  onShareAppMessage() {
    return {
    }
  },
  data: {
    openId:'',
    envList,
    selectedEnv: envList[0],
    myLevel: 1
  },
  onLoad(){
    var isLogin = wx.getStorageSync('isLogin')
    if (isLogin){
      this.setData({
        isLogin: isLogin,
        myLevel: wx.getStorageSync('userInfo').level
      })
    }else{
      this.setData({
        isLogin: isLogin
      })
    }
    wx.setNavigationBarTitle({
      title: '我的',
    })
  },
  gotoDetail:function(){
    wx.navigateTo({
      url: '../../pages/profileDetail/index',
    })
  },
  gotoIntro:function(){
    wx.navigateTo({
      url: '../../pages/profileIntro/index',
    })
  },
  clickLogin:function(){
    // this.getOpenId()
    var that = this
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.signature)
        console.log(res.userInfo.nickName)
        wx.setStorageSync("sign", res.signature)
        // this.setData({
        //   userInfo: res.signature,
        // })
        that.loginUser(wx.getStorageSync('openId'), res.userInfo.nickName, res.userInfo.avatarUrl)
      }
    })
  },
  loginUser(sign, name, url){
    var userData = {
      sign: sign,
      name: name,
      url: url,
      level: 1,
      sublevel: 0,
    }
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'addUser',
        data: userData
      }
    }).then((resp) => {
      console.log(resp);
      if (resp.result.success) {
        this.setData({
          userInfo: userData,
          sign: sign,
          isLogin: true
        })
        wx.setStorageSync('isLogin', true)
        wx.setStorageSync('userInfo', userData)
      }
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
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
     wx.hideLoading();
   }).catch((e) => {
      this.setData({
        showUploadTip: true
      });
     wx.hideLoading();
    });
  },

  clickAccountLevel:function(){
    wx.navigateTo({
      url: '../../pages/profileDetail/index?envId=' + this.data.selectedEnv.envId,
    })
  },
  clickAccountInfo:function(){
    wx.navigateTo({
      url: '../../pages/accountInfo/index',
    })
  },
  clickFeedBack:function(){
    wx.navigateTo({
      url: '../../pages/profileIntroDetail/index?envId=' + this.data.selectedEnv.envId,
    })
  }
});
