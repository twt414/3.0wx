// pages/recordList/list.js
var app = getApp();
Page({
  data:{
    listData:[],
    scrollTop:0,
    windowHeight:'',
    projectTypeId:'', 
    page:1,
    selectIndex:0
  },
  onLoad:function(options){

    var that = this;

      //获取屏幕高度
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
          'windowHeight':res.windowHeight
          })
        }
      });

      this.setData({
        'projectTypeId':options.projectId
      });

      that.listRequest(options.projectId,"1","10",'0')

  },
    listRequest: function (projectTypeId,page,pageSize,selectIndex,funType){
    var that=this;
    wx.request({
        url: app.globalWebUrl.host+'/invest/recordList.html',
        header: {
            'content-type': 'application/json'
        },
        data:{
          "projectId":projectTypeId,
          'page.page':page,
          'page.pageSize':pageSize
        },
        success: function(res) {

        if(funType=='add'){
          that.setData({
          'listData':that.data.listData.concat(res.data.page.rows)
          })
     
        }else{
          that.setData({
          'listData':res.data.page.rows
          })
        }
        }
      })
  },
  bottomRefresh: function(e){
    this.listRequest(this.data.projectTypeId,this.data.page+1,'10',this.data.selectIndex,'add')
    this.setData({
       page:this.data.page+1
    })
    }
})