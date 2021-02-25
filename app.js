const api_key = "hEqnBzOEkoAe4AoKUGSfWsZt";
const secret_key = "p1j0mDKs2RAYdPn0rDUMVdcb0aazzlp6";

//app.js
App({
  onLaunch: function () {
    //this.requestToken();
    //this.requestIsIsFaceRe();
  },

  //判断用户是否注册人脸识别
  requestIsIsFaceRe:function(){
    let that=this;
    wx.request({
      url: 'https://www.rijiyuan.com/WXAPI/IsFaceRe',
      success:function(res){
        that.globalData.resultInfo=res;
      },
      fail(err) {
        console.log('接口调用失败:', err)
      },
      complete() {
        console.log('请求完成')
      }
    })

  },

  // 初始化 鉴权获取token 存起来
  requestToken:function(){
    let that = this;
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      data: {
        grant_type: "client_credentials",
        client_id: api_key,
        client_secret: secret_key
      },
      success: function (res) {
        if(res.statusCode == 200){
          wx.setStorageSync("access_token", res.data.access_token);
          wx.setStorageSync("expires_in", res.data.expires_in);
          wx.setStorageSync("access_token_date", new Date().getTime());
          that.globalData.access_token = res.data.access_token;
        }
      }
    })
  },
  globalData: {
    userInfo: {} ,
    resultInfo:{}
  }
})
