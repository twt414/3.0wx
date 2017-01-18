//index.js
//获取应用实例
var app = getApp()
Page({
data: {
    typeData:[],
    listData:[],
    scrollTop:0,
    windowHeight:'',
    projectTypeId:'', 
    page:1,
    selectIndex:0
  },
  onLoad: function () {
      var that = this;
      //获取屏幕高度
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
          'windowHeight':res.windowHeight
          })
        }
      })
     //类型请求
     wx.request({
      url: app.globalWebUrl.host+'/invest/projectTypeList.html', //仅为示例，并非真实的接口地址
      header: {
          'content-type': 'application/json'
      },
      data:{
        "parentId":"7ca31c421ce34e3fb8d57208e42f409f"
      },
      success: function(res) {
        res.data.list.forEach(function (item,index,input) {
          if(index==0){
             input[index].iscur= 'type-choose';
          }else{
             input[index].iscur= '';
          }
        })
        //初始化内容
        that.listRequest(res.data.list[0].id,"1","10",'0')
        that.setData({
        'projectTypeId':res.data.list[0].id,  
        'typeData':res.data.list
        })
      }
    }) 
  },
  changeType: function (event){
    this.listRequest(event.target.dataset.id,"1","10",event.target.dataset.index)
    this.setData({
      'projectTypeId':event.target.dataset.id,
      'selectIndex':event.target.dataset.index,
      'scrollTop':0
    })
  },
  listRequest: function (projectTypeId,page,pageSize,selectIndex,funType){
    var that=this;
    wx.request({
        url: app.globalWebUrl.host+'/invest/projectList.html',
        header: {
            'content-type': 'application/json'
        },
        data:{
          "projectTypeId":projectTypeId,
          'page.page':page,
          'page.pageSize':pageSize
        },
        success: function(res) {
          that.data.typeData.forEach(function (item,index,input) {
          if(index==selectIndex){
             input[index].iscur= 'type-choose';
          }else{
             input[index].iscur= '';
          }
        })       
        if(funType=='add'){
          that.setData({
          'typeData':that.data.typeData,
          'listData':that.data.listData.concat(res.data.page.rows)
          })
     
        }else{
          that.setData({
          'typeData':that.data.typeData,
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
