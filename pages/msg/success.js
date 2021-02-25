// pages/msg/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: "注册"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type === 'login') {
      this.setData({
        msg: "打卡"
      })
    }

  // 打卡成功以后 添加声音
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