function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 手机号码校验
function isMobile(value) {
		var length = value.length;
		return ! (length == 11 && /^((13|18|15)\d{9})|(145|147|170|171|173|175|176|177|178)\d{8}$/.test(value));
}

module.exports = {
  formatTime: formatTime,
  isMobile:isMobile
}