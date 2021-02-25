var app = getApp();

const API = require('../../public/api')

Page({

  data:{
    resultInfo:[]
  },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestIsIsFaceRe01()
    //var res=this.data.resultInfo;
    //console.log(res);
    // if (res.startcode==200) {//已注册
    //   wx.redirectTo({
    //     url: '/pages/login/index?staffNO='+res.info,
    //   })
    // } 
    // else if(res.startcode==201) {//未注册 
    //   wx.redirectTo({
    //     url: '/pages/regist/index?staffNO='+res.info+'&info='+res.staffNO+'&name='+res.other,
    //   })
    // }
    // else if(res.startcode==400||res.startcode==401){
    //   wx.showToast({
    //     title: res.info,
    //   })
    // }
  },

  //判断用户是否注册人脸识别
  requestIsIsFaceRe01:function(){
    let that=this;
    wx.request({
      url: 'https://www.rijiyuan.com/WXAPI/IsFaceRe',
      success:function(res){
        // var resultInfo=res;
        // that.setData({
        //   resultInfo: resultInfo
        // })
        console.log('请求完成000000'+res.startcode)
        if (res.startcode==200) {//已注册
          wx.redirectTo({
            url: '/pages/login/index?staffNO='+res.info,
          })
        } 
        else if(res.startcode==201) {//未注册 
          wx.redirectTo({
            url: '/pages/regist/index?staffNO='+res.info+'&info='+res.staffNO+'&name='+res.other,
          })
        }
        else if(res.startcode==400||res.startcode==401){
          wx.showToast({
            title: res.info,
          })
        }
      },
      fail(err) {
        console.log('接口调用失败:', err)
      },
      complete() {
        console.log('请求完成')
      }
    })

  },




})
