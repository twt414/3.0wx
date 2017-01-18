var util = require('../../utils/util.js')
Page({
  data: {
    errorMessage:{
      phoneCodeError:'',
      codeError:''
    },
    value:{
      phone:'',
      code:''
    },
    disabled: false,
    codeMsg:'获取验证码',
    error:true
  },
  onShow:function(){
    console.log(1)
  },
  phoneCodeCheck:function(e){
   if(util.isMobile(e.detail.value)||e.detail.value==''){
     e.detail.value='';
     this.setData({
      'errorMessage.phoneCodeError':'请填写正确的手机号码！'
     })
   } else{
       this.setData({
       'errorMessage.phoneCodeError':'',
       'value.phone':e.detail.value
     })
   }
  },
  CodeCheck:function(e){
      if(e.detail.value==''){
     e.detail.value='';
     this.setData({
      'errorMessage.codeError':'请填写验证码'
     })
   } else{
       this.setData({
       'errorMessage.codeError':''
     })
   }
  },
  sendcode:function(e){
    if(this.data.value.phone==''||util.isMobile(this.data.value.phone)){
       this.setData({
        'errorMessage.phoneCodeError':'请填写正确的手机号码！'
     })
    }else{
      var that=this;
      var timer=60;
         this.setData({
        'disabled':true,
        'error':false
        })
      var time=setInterval(function(){
          if(timer>0){
            that.setData({
            'codeMsg':--timer+'秒后重新获取'
            
            })
          }else{
            that.setData({
            'codeMsg':'重新获取'
            })
            clearInterval(time)
              that.setData({
               'disabled':false
              })
          }
        },1000)
      
    }
  },
   formSubmit: function(e) {
     if(e.detail.value.code==''){
        this.setData({
        'errorMessage.codeError':'请填写验证码'
      })
     }else if(e.detail.value.iphoneNumber==''){
        this.setData({
        'errorMessage.phoneCodeError':'请填写正确的手机号码！'
     })
     }else{
       if(this.data.error==true){
           this.setData({
              'errorMessage.codeError':'请先获取验证码'
           })
       }else{
         
         wx.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 5000
        })
        setTimeout(function(){
        wx.hideToast()
        wx.switchTab({
             url: '../index/index'
          })
        },5000)
       }
     }
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
})