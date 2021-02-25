const app = getApp()
// pages/form/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    phoneNumber: '',
    errTip: false
  },
  // 获得用户名
  getUserName(e) {
    this.setData({
      userName: e.detail.value 
    })
  },
  // 获得手机号
  getPhoneNumber(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  // 姓名和手机号验证，不为空则跳转下一页
  nextStep() {
    let userName = this.data.userName;
    let phoneNumber = this.data.phoneNumber;
    if (!userName || !phoneNumber) {
      this.setData({
        errTip: true
      })
    } else {
      app.globalData.userInfo.userName = this.data.userName;
      app.globalData.userInfo.phoneNumber = this.data.phoneNumber;
      wx.redirectTo({
        url: '/pages/regist/index'
      })
    }
  },
  onShareAppMessage(){
    return {
      title: '考勤打卡信息注册',
      path: '/page/form/index'
    }
  }
})