// pages/regist/index.js
var app = getApp();

const API = require('../../public/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "",
    info: '',
    toast: false,
    hideToast: false,
  },

  onLoad: function (options) {
    var staffNO = options.info;
    var name = options.name
    this.setData({
      staffNO: staffNO,
      name: name
    })
  },

  openToast: function () {
    this.setData({
      toast: true
    });
    setTimeout(() => {
      this.setData({
        hideToast: true
      });
      setTimeout(() => {
        this.setData({
          toast: false,
          hideToast: false,
        });
      }, 300);
    }, 3000);
  },
  /**
   * 点击拍照
   * 在此获取用户授权，获得用户信息
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
        wx.request({
          url: "https://www.rijiyuan.com/WXAPI/FaceRegistration",
          header: {
            "content-type": "application/json"
          },
          timeout: 30000,
          method: "POST",
          data: {
            imgData64: base64,
            staffNO: staffNO,
            UserName: name
          },
          success: (res) => {
            // 上传成功以后
            if (res.res) {
              wx.redirectTo({
                url: '/pages/webs/index?info=' + res.other
              })
            } else {
              wx.showModal({
                title: '提示',
                content: res.info,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
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

      }
    })
  },
  /**
   * 上传
   * 请求接口百度AI接口
   */
  requestapi: function () {

    wx.getFileSystemManager().readFile({
      filePath: this.data.imgUrl,
      encoding: "base64",
      success: (res) => {

        wx.request({
          url: API.add,
          header: {
            "content-type": "application/json"
          },
          timeout: 3000,
          method: "POST",
          data: {
            image: res.data,
            image_type: "BASE64",
            group_id: "face_01",
            user_id: new Date().getTime(),
            user_info: JSON.stringify(app.globalData.userInfo)
          },
          success: (res) => {
            // 上传成功以后
            wx.redirectTo({
              url: '/pages/msg/success?type=regist'
            })
          },
          fail(err) {
            console.log('接口调用失败:', err)
          },
          complete() {
            console.log('请求完成')
          }
        })

      },
      err: (errMsg) => {
        console.log(errMsg)
      },
    })
  },
  // 分享按钮
  onShareAppMessage() {
    return {
      title: '人脸识别注册',
      path: '/pages/main/index'
    }
  }
})