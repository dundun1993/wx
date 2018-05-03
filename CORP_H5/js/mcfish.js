/***************************************************************
 * file		: mcfish.js
 * author	:
 * date		: 20171010
***************************************************************/
// 服务器请求地址
var amy = 'wuliu.sundan.com'; // http://shundian.mcfish.cnhttp://wuliulian.sundan.com/
 var host = 'wuliulian.sundan.com/SDWL_SERVER';
var href = 'http://' + host + '/';
var corpid = 'wxf2e3281218d0c968';
var agentid = '1000003';
// 用户资料
var userInfo = {
	userid: null,
	name: null,
	department: null,
	position: null,
	mobile: null,
	gender: null,
	email: null,
	avatar:null
};

/**
 * @brief 获取未约工单和已约工单
 * status：1-未约工单 2-已约工单
 * */
function get_worksheet(uid,status,page,callback){
	$.ajax({
		type:"POST",
		url:href + "workSheetController/queryWorkSheet",
		data:{"uid":uid,"status":status,"page":page},
		success:callback,
		error: function(err){
//			alert('err:' + JSON.stringify(err));
		}
	});
}
/**
 * @brief 历史工单
 * */
function get_history_worksheet(workerno,page,callback){
	$.ajax({
		type:"POST",
		url:href + "workSheetController/queryHistoryWorkSheet",
		data:{"workerno":workerno,"page":page},
		success:callback,
		error: function(err){
			alert('err:' + JSON.stringify(err));
		}
	});
}

/**
 * @brief 查询历史工单
 * */
function get_query_history_worksheet(workerno,page,date1,date2,callback){
	$.ajax({
		type:"POST",
		url:href + "workSheetController/queryHistoryWorkSheet",
		data:{"workerno":workerno,"page":page,"date1":date1,"date2":date2},
		success:callback,
		error: function(err){
//			alert('err:' + JSON.stringify(err));
		}
	});
}

/**
 * @brief 查看工单详情
 * 工单号
 * */
function get_worksheet_detail(workNo,status,callback){
	$.ajax({
		type:"POST",
		url:href + "workSheetController/queryWorkSheetDetail",
		data:{"workNo":workNo,"status":status},
		success:callback,
		error: function(err){
			alert('err:' + JSON.stringify(err));
		}
	});
}

/**
 * @brief 取消上门,取消安装
 * type：0-取消上门，1-取消安装
 * */
function get_cancel_worksheet(workNo,comm,type,callback){
	$.ajax({
		type:"POST",
		url:href + "workSheetController/cancelWorkSheet",
		data:{"workNo":workNo,"comm":comm,"type":type},
		success:callback,
		error: function(err){
			alert('err:' + JSON.stringify(err));
		}
	});
}

/**
 * @brief 点击完成订单需请求该接口
 * */
function get_complete_worksheet(workNo,callback){
	$.ajax({
		type:"POST",
		url:href + "workSheetController/completeWorkSheet",
		data:{"workNo":workNo},
		success:callback,
		error: function(err){
			alert('err:' + JSON.stringify(err));
		}
	});
}

/**
 * @brief 点击完成订单需请求该接口
 * */
function get_appoint_workSheet(workno,time,remark,uid,callback){
	$.ajax({
		type:"POST",
		url:href + "workSheetController/appointWorkSheet",
		data:{"workno":workno,"time":time,"remarks":remark},
		success:callback,
        beforeSend: function(req) {
            req.setRequestHeader('uid', uid);
        },
		error: function(err){
			alert('err:' + JSON.stringify(err));
		}
	});
}

/**
 * @brief 通过线路吗获取可选材料
 * */
function get_material(lineNo,page,callback){
	$.ajax({
		type:"POST",
		url:href + "workSheetController/getMaterial",
		data:{"lineNo":lineNo,"page":page},
		success:callback,
//		aysnc:false,
		error: function(err){
			alert('err:' + JSON.stringify(err));
		}
	});
}

/**
 * @brief 提交材料，创建支付
 * @param {String} saveDataAry: 工程单材料信息，whId：工单号，maName：材料名称，Nums：数量，priceStr：单价，无需乘以100，Boxno：工程单号，
 * */
function get_submit_workmaterial(saveDataAry,uid,callback){
	$.ajax({
		type:"POST",
		dataType:"json",      
        contentType:"application/json", 
		url:href + "workSheetController/submitWorkMaterial",
		data:JSON.stringify(saveDataAry),
		success:callback,
        beforeSend: function(req) {
            req.setRequestHeader('uid', uid);
        },
		error: function(err){
			alert('err:' + JSON.stringify(err));
		}
	});
}

/**
 * @brief 获取微信用户信息
 * */
function query_userinfo_weixin(code){
	// 同步获取微信
	$.ajax({
		async: false,
		type:"POST",
		url: href + "corpController/getWeChatCorpId",
		contentType:"application/x-www-form-urlencoded; charset=utf-8",
		data:{
			"code": code 
		},
		dataType:'json',
		success: function(data){
			// alert(data);
			var data = JSON.parse(data);
			var uid = data.data.staff.id;
			var mobile = data.data.staff.mobile;
			var token = data.data.token;
					//alert("uid="+uid+"mobile="+mobile+"token="+token);
			// 缓存userId;
			$.cookie("uid", uid,{
				path: "/", expires: 7 
			});
			// 缓存mobile;
			$.cookie("mobile", mobile,{
				path: "/", expires: 7 
			});
			// 缓存token;
			$.cookie("token", token,{
				path: "/", expires: 7 
			});
		}
	});

	return userInfo;
}

/**
 * @param {Object} data: 微信支付信息
 *  @param {int} orderno: 消费订单号
 * @brief 唤起微信支付
 * */
function wakeup_pay_weixin(data,orderno,sno){
	if (data == null){
		alert('唤起支付失败：参数错误');
		return;
	}
	
	function onBridgeReady() {
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest', {
				"appId": data.appId, 		//公众号名称，由商户传入     
				"timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数     
				"nonceStr": data.nonceStr, 	//随机串     
				"package": data.packAge,
				"signType": data.signType,	//微信签名方式：
				"paySign": data.paySign 		//微信签名 
			},
			function(res) {
				if(res.err_msg == "get_brand_wcpay_request:ok") {
					if(orderno!=null){
						window.location.href="left_time.html?orderno="+orderno+"&sno="+sno;
					}else{
						window.location.href="wallet.html";
					}
				} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
			}
		);
	}

	if(typeof WeixinJSBridge =="undefined"){
		if( document.addEventListener ){
			document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		}else if (document.attachEvent){
			document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
			document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		}
	}else{
		onBridgeReady();
	}
}



/**
 * @param {String} scop: snsapi_base:基本授权， snsapi_userinfo:确认授权
 * @brief 获取微信微信授权URL
 * */
function get_auth_url_weixin(url, scope){
	var uri = encodeURIComponent(url);
	
	var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + corpid + '&' +
			'redirect_uri=' + uri +'&' +
			'response_type=code&' +
			'scope=' + scope + '&agentid=' + agentid + '&' + 'state=123#wechat_redirect';
	return url;
}

/***************************************************************
* @brief 本地工具函数
***************************************************************/
/** 
 * @param {string} url 完整的URL地址 
 * @returns {object} 自定义的对象 
 * @description 用法示例：var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');
 * */
function parseURL(url){
	var a = document.createElement('a');
	a.href = url;
	return {
		source: url,  
		protocol: a.protocol.replace(':',''),
		host: a.hostname,
		port: a.port,
		query: a.search,  
		params: (function(){
			var ret = {},
			seg = a.search.replace(/^\?/,'').split('&'),
			len = seg.length, i = 0, s;
			for (;i<len;i++) {
				if (!seg[i]) {
					continue;
				}
				s = seg[i].split('=');
				ret[s[0]] = s[1];
			}
			return ret;
		})(),
		file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
		hash: a.hash.replace('#',''),
		path: a.pathname.replace(/^([^\/])/,'/$1'),
		relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
		segments: a.pathname.replace(/^\//,'').split('/')
	};
}

/**
 * @brief 整数排序
 * */
var intBy = function(name)
{
	return function(o, p){
		var a, b;
		if (typeof o === "object" && typeof p === "object" && o && p){
			a = parseInt(o[name]);
			b = parseInt(p[name]);
			if (a === b) {
				return 0;
			}
			if (typeof a === typeof b) {
				return a < b ? -1 : 1;
			}
			return typeof a < typeof b ? -1 : 1;
		} else {
			throw ("error");
		}
	}
}

/**
 * @brief 查询线上订单是否支付
 * */
function check_order_status(boxnos,callback){
	$.ajax({
		type:"POST",
		url:href + "/workSheetController/queryWorkSheetPay",
		data:{"boxnos":boxnos},
		success:callback,
		error: function(err){
			alert('err:' + JSON.stringify(err));
		}
	})
}

/**
 * @brief 查询线上订单是否支付
 * */

function offline_cash_pay(boxnos,callback){
	$.ajax({
		type:"POST",
		url:href+"/workSheetController/offLinePayWorkSheet",
		data:{"boxnos":boxnos},
		success:callback,
		error:function(err){
			alert('err:'+JSON.stringify(err));
		}
	})
}