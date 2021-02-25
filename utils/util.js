const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const Rad = (d) => {
  //根据经纬度判断距离
  return d * Math.PI / 180.0;
}

// 根据经纬度计算两点之间距离
const getDistance = (lat1, lng1, lat2, lng2) => {
  // lat1用户的纬度
  // lng1用户的经度
  // lat2商家的纬度
  // lng2商家的经度
  var radLat1 = Rad(lat1);
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var b = Rad(lng1) - Rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  s = s.toFixed(1) //保留两位小数
  console.log('经纬度计算的距离:' + s)
  return s
}

// 计算距离上班时间还有多久
const calculatRemainTime = () => {
  let now = new Date()
  let timestemp = now.getTime()

  let target = new Date(`${now.toString().substr(0, 16)}9:30:00 GMT+0800 (中国标准时间)`)
  let delta = (target - timestemp) / 1000


  let h = Math.floor(delta / 3600)
  let m = Math.floor(delta % 3600 / 60)
  let s = Math.floor(delta % 3600 % 60)

  let str = ''
  if (h >= 1) {
    str = h + '小时' + m + '分钟' + s + '秒'
  } else {
    str = m + '分钟' + s + '秒'
  }

  return str;

}



module.exports = {
  formatTime: formatTime,
  getDistance: getDistance,
  calculatRemainTime: calculatRemainTime
}
