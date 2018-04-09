function pop(att){
	$('.enter').html(function(){
		return att;
	})
	$('.pnumber').show();
}
$('.confirmbtn').click(function(){
	$('.pnumber').hide();
})

var songshu_url = '/';

function ajaxSubmit(id, frm, cb) {
	if (typeof(id)!="number"){
		console.error('ajaxSubmit id is not number!');
		return false;
	}
	var dataPara = getFormJson(frm);
	$.ajax({
		url: songshu_url + id,
		type: 'get',
		data: dataPara,
		success: cb
	});
	console.log('ajaxSubmit:' + id);
}

function ajaxGet(id, data, cb) {
	if (typeof(id)!="number"){
		console.error('ajaxGet id is not number!');
		return false;
	}
	$.ajax({
		url: songshu_url + id,
		type: 'get',
		data: data,
		success: cb
	});
	console.log('ajaxGet:' + id);
}

function setData(key,value)
{
	localStorage.setItem(key,value)
}

function getData(key)
{
	var value=localStorage.getItem(key)
	return value
}

//将form中的值转换为键值对。
function getFormJson(frm) {
	var o = {};
	var a = $(frm).serializeArray();
	$.each(a, function () {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}

function getTimeStamp(){
	return Math.round(new Date().getTime()/1000)
}

function getSevenDays(){
	var dates = [] 
	var day = new Date();
	for(var i=6;i>-1;i--){
		var day1 = new Date();
		day1.setTime(day.getTime()-i*24*60*60*1000);
		dates.push(day1.getMonth() + 1 + '.' + day1.getDate())
	}
	return dates
}

function getVeryfy(){
	return songshu_url + '1003?'+ Math.random();
}

function smsCheck(ob,phone,cb) {
	var reg = /^1[3|4|5|8|7|9|6][0-9]\d{8}$/;
	if(phone == "" || !reg.test(phone)){
		pop("请正确填写手机号码");
		return;
	}

	ob.unbind('click',cb);
	ajaxGet(1002,{phone:phone}, function(data){
		if(data.status!=0){
			pop(data.message);
		}else{
			pop("发送成功");
		}
	});

	var i=60;
	var intval = setInterval(function(){
		ob.html(i);
		i--;
		if(i<0){
			ob.bind('click',cb);
			ob.html("重新获取");
			clearInterval(intval);
		}
	},1000);
}

function getalllog(id,page,d_number,d_reqtype,d_pagenum,d_pagecount,d_tableboard){
	ajaxGet(id,{p:page},function(data){
		if (data){
			if(data.count>0){
				d_number.text(data.page + ' / ' + data.all_page);

				d_reqtype.text(id);
				d_pagenum.text(data.page);
				d_pagecount.text(data.all_page);

				if (data.list == '') {
					d_tableboard.html('<tr><td colspan="10">暂无数据</td></tr>');
					return false;
				}
				else{
					d_tableboard.html(data.list);
				}
			}else{
				d_tableboard.html('<tr><td colspan="10">暂无数据</td></tr>');
			}
		}else{
			d_tableboard.html('<tr><td colspan="10">网络错误</td></tr>');
		}
	});
}

function getallitem(id,name,page,d_number,d_reqtype,d_pagenum,d_pagecount,d_tableboard){
	ajaxGet(id,{name:name, p:page},function(data){
		if (data && data.all_page && data.count){
			if(data.count>0){
				d_number.text(data.page + ' / ' + data.all_page);

				d_reqtype.text(id);
				d_pagenum.text(data.page);
				d_pagecount.text(data.all_page);

				if (data.list == '') {
					d_tableboard.html('<tr><td colspan="10">暂无数据</td></tr>');
					return false;
				}
				else{
					d_tableboard.html(data.list);
				}
			}else{
				d_tableboard.html('<tr><td colspan="10">暂无数据</td></tr>');
			}
		}else{
			d_tableboard.html('<tr><td colspan="10">网络错误</td></tr>');
		}
	});
}

function getlamp(cb){
	ajaxGet(1043,{},function(data){
		if (data && data.msg_info && data.msg_info.length>0){
			cb(data.msg_info)
		}	
	});
}