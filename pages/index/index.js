//index.js
//获取应用实例
var app = getApp()
Page({
data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    listData:[]
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.request({
      url: app.globalWebUrl.host+'/index/getChoiceProject.html', //仅为示例，并非真实的接口地址
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
        'listData':res.data.choiceProjectList
      })
      }
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
