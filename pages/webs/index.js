var app = getApp();


const API = require('../../public/api')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    urls: 'https://www.baidu.com',
    staffNO: '1'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var info=options.info;
    //this.setData({
    //  staffNO:info
    // }),
    this.methodYin()
    this.setData({
      urls: 'https://www.rijiyuan.com/home/FaceView1?v=1'
      // urls:'https://www.rijiyuan.com/home/GZInfoWeb?staffNO='+info
    })
  },
  search: function () {
    var ddd = this.data.staffNO;
    // wx.showToast({
    //   title:ddd,
    // })
    this.method()
    wx.showModal({
      title: '提示',
      content: '测试提示111111111111111111111111',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')

        }
      }
    })
  },

  
  methodYin: function(){

    //  添加声音
const innerAudioContext = wx.createInnerAudioContext()
// innerAudioContext.autoplay = true
innerAudioContext.src = '/public/audio/login_success.mp3'

innerAudioContext.play()
innerAudioContext.onPlay(() => {
  console.log('开始播放')
})
innerAudioContext.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})


},





})