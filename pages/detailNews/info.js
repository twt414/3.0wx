// pages/detail-info/info.js
var WxParse = require('../wxParse/wxParse.js');
var app = getApp();
Page({
  data:{
    data:""
    },
  onLoad:function(options){
    var that = this;
    this.setData({
      'type':options.type
    });
    wx.request({
      url: app.globalWebUrl.host+'/project/content.html',
      header: {
          'content-type': 'application/json'
      },
      data:{
        "projectId":options.projectId
      },      
      success: function(res) {
        
        that.setData({
          'data':res.data
        });

        WxParse.wxParse('article', 'html', res.data.content, that,5);

      }
    })   
  },
  
})