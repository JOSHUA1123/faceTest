const access_token = wx.getStorageSync("access_token");

const API = {
  add: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=' + access_token,
  // search: 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=' + access_token,
  search: 'https://www.rijiyuan.com/WXAPI/FaceDistinguish',
}

module.exports = API;