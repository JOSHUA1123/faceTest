// pages/login/index.js

var app = getApp();


const API = require('../../public/api')
// 调用封装好的时间和经纬度方法
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // success: false, 
    // remain_time: 0, //距离上班还有多久
    // distance:0,  //打卡距离
    // longitude2:120.007563, //经度
    // latitude2:30.286455 //纬度 120.007563,30.286455
    staffNO:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var staffNO=options.staffNO;
    this.setData({
      staffNO:staffNO
    })
    // 开启定时器，每隔一秒钟，扫码人脸，验证
    // 计算打卡时间
    this.timer = setInterval(() => {
      this.takePhoto()
      //this.getPosition()
      //this.calculatRemainTime()
    }, 1000)

  },
  // 页面离开时要清空定时器，不要再扫码人脸了
  onUnload(){
    clearInterval(this.timer)
  },

  // 获取经纬度
  getPosition(){
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        // console.log('经度:', longitude)
        // console.log('纬度:', latitude)

        // 计算两点之间距离，当距离小于2km时可以打卡
        let dis = util.getDistance(latitude,longitude,that.data.latitude2,that.data.longitude2)
        that.setData({
          distance: dis
        })
        console.log('距离:',dis)
        if(dis < 2){
            that.takePhoto()
        }
      }
    })

  },

  /**
   * 用户打卡 
   * 在此获取用户授权，获得用户照片 发送接口进行比对结果
   */
  takePhoto: function () {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'low',
      success: (res) => {
        this.setData({
          imgUrl: res.tempImagePath
        })
        // 把图片转成base64
        let base64 = wx.getFileSystemManager().readFileSync(res.tempImagePath, 'base64')
        
        // wx.showModal({
        //   title: '提示',
        //   content: base64,
        //   success: function (res) {
        //     if (res.confirm) {
        //       console.log('用户点击确定')
        //     } else if (res.cancel) {
        //       console.log('用户点击取消')
        //     }
        //   }
        // })
        
        this.requestapi(base64);
      }
    })
  },
  toRegist(){
    wx.redirectTo({
      url: '/pages/form/index',
    })
  },
  /**
   * 请求接口百度AI接口 比对接口
   */
  requestapi: function (base64) {
    let that = this;
    wx.request({
      url: API.search,
      header: {
        "content-type": "application/json"
      },
      timeout: 30000,
      method: "POST",
      data: {
        imgData64: base64,
        staffNO: this.data.staffNO
      },
      success: function (res) {
        console.log(res)
        // if (res.data.error_code === 0 && res.data.result) {
        //   if (res.data.result.user_list[0].score > 90) {

        //     clearInterval(that.timer)
        //     // 成功跳到成功
        //     wx.redirectTo({
        //       url: '/pages/msg/success?type=login'
        //     })
        //   }
        // }
        if (res.res) {
              wx.redirectTo({
              url: '/pages/webs/index?info='+res.info
            })
        } else {
          
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
  failTip() {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = '../../public/audio/login_fail.mp3'
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  // 计算距离上班还有多长时间
  calculatRemainTime() {
    let remain_time = util.calculatRemainTime()
    this.setData({
      remain_time: remain_time
    })
  },
  onShareAppMessage(){
    return {
      title: '考勤打卡',
      path: '/page/login/index'
    }
  }
})