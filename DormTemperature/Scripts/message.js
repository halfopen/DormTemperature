/**
 * 留言板
 */


$(document).ready(function(){
    console.log("are you ok?");
	
	$("#submit-message").on("click", function(){
		var username = $("#message-username").html();
		var d=new Date();
		// 2016/6/8 8:33:23
		var timestamp = getTime();
		var content = $("#message-content").val();
	
		console.log(username);
		console.log(timestamp);
		console.log(content);
		
		$.ajax({
			type:"POST",
			url:"../Create",
			//提交的数据
			data:{username:username,timestamp:timestamp, content:content},
			//返回数据的格式
			datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
			success:function(data){
				alert("提交成功");
				console.log("提交成功");
				window.location.reload();
			}   ,
			error: function(){
			}
		});
		
	});
    
});


function getTime()
{

var x;
var d=new Date();

//获取年
var year= d.getFullYear() + "/";

//获取月
var month = d.getMonth();
var mon = d.getMonth() + 1
if (mon >= 1 && mon <= 9) {
    
    month = '0'+ mon + "/"; 
}

//获取日
var day = d.getDate() ;
if (d.getDate() >= 0 && d.getDate() <= 9) {
    
    day = '0'+ d.getDate() + " "; 
}

//获取时
var hour = d.getHours() + ":";

//获取分
var minute = d.getMinutes() + ":";

//获取秒
var second = d.getSeconds();

  x= year + month + day + hour + minute + second ;
  return x;
}
