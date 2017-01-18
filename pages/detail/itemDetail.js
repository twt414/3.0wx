// pages/detail/itemDetail.js
var app = getApp();
Page({
  data:{
    itemDetail:[],
    percent:null,
    showTime:'',
    id:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({id:options.projectId});
    var that = this
      wx.request({
      url: app.globalWebUrl.host+'/project/detail.html', //仅为示例，并非真实的接口地址
      data:{
        projectId:options.projectId
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {

        that.setData({
          'itemDetail':res.data,
          'percent':((res.data.project.accountYes/res.data.project.account)*100).toFixed(2)
        });

        let project = res.data.project;
        if(project.saleEndTime){   
            let deadTime = (project.saleEndTime - res.data.systemTime)/1000;
            if((project.saleEndTime - res.data.systemTime) > 0){
             that.timer = setInterval(function(){
               if(deadTime >= 0){
                  that.setData({
                    'showTime':that.formatSeconds(--deadTime)
                  });
               } 
              },1000)
            }
        }
      }
    })
  },
	formatSeconds:function(value) {
		var theTime = parseInt(value);// 秒
		var theTime1 = 0;// 分
		var theTime2 = 0;// 小时
		if(theTime > 60) {
			theTime1 = parseInt(theTime/60);
			theTime = parseInt(theTime%60);
			if(theTime1 > 60) {
				theTime2 = parseInt(theTime1/60);
				theTime1 = parseInt(theTime1%60);
			}
		}
		var result = ""+parseInt(theTime)+"秒";
		if(theTime1 > 0) {
			result = ""+parseInt(theTime1)+"分"+result;
		}
		if(theTime2 > 0) {
			result = ""+parseInt(theTime2)+"小时"+result;
		}
		if(parseInt(theTime2) >= 24 ){
			result = Math.ceil(parseInt(theTime2)/24) + "天";
		}
		if(parseInt(value)==0){
			clearInterval(this.timer)
			result='已结束'
		}
		return result;
	},  
  tapName: function(event) {
    console.log(event);
  },
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
  }
})