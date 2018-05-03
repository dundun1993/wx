! function () {

    // 服务器请求地址
    var host = 'api.mopai99.com';
    var href = 'http://' + host + '/';
    var wxappid = 'wx0df3970063f195f7';
    var destHost = "http://www.mopai99.com/";
    // 用户资料
    var userInfo = {
        city: null,
        country: null,
        headimgurl: null,
        nickname: null,
        openid: null,
        province: null,
        sex: null,
        token: '',
        uid: ''
    }
    var mcfish = {
        /***************************************************************
         *
         * @brief 通用接口
         **
         ***************************************************************/
        API: {
            /**
             * 支付设备
             */

            payMyOrder: function(orderno,callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + 'api/walletController/payMyOrder',
                    type: 'POST',
                    data: {
                        orderno: orderno,
                        openId: $.cookie("openId")
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                })
            },
            /**
             * 推送报修
             * 
            */
            aErrorDevice: function(phone, sno, comment, callback){
                $.ajax({
                    url: href + 'api/deviceController/aErrorDevice',
                    type: 'POST',
                    data: {
                        phone: phone,
                        sno: sno,
                        comment: comment
                    },
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                })
            },
            /**
             * 关闭设备
             * 
            */
            aCloseDevice: function(phone, sno, callback){
                $.ajax({
                    url: href + 'api/deviceController/aCloseDevice',
                    type: 'GET',
                    data: {
                        phone: phone,
                        sno: sno
                    },
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                })
            },
            /**
             * 查询订单
             */
            aQueryOrderDetail: function(phone, sno, callback){
                $.ajax({
                    url: href + 'api/deviceController/aQueryOrderDetail',
                    type: 'GET',
                    data: {
                        phone: phone,
                        sno: sno
                    },
                    async: false,
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                })
            },
            /**
             * 渠道登录
             */
            agentLogin: function (phone, password, callback){
                $.ajax({
                    url: href + 'api/userController/agentLogin',
                    type: 'POST',
                    data: {
                        phone: phone,
                        password: password
                    },
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                })
            },
            /**
             * @brief 个人余额查询
             */
            queryWallet: function (callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + 'api/walletController/queryWallet',
                    type: 'GET',
                    data: {},
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                })
            },
            /**
             * @brief 用户实名认证
             */
            userAuth: function (positive, opposite, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + 'api/personController/auth',
                    type: 'POST',
                    async: false,
                    data: {
                        type: 1,
                        positive: positive,
                        opposite: opposite,
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                })
            },
            /**
             * @brief 授权拿到微信appid
             */
            getWeChatConfig: function (url, callback) {
                $.ajax({
                    url: href + "/api/weixinController/getWeChatConfig?url=" + url,
                    type: "GET",
                    async: false,
                    success: callback
                })
            },
            /**
             * @brief 微信相关接口函数 -- -
             */
            WxUpload: function (apiArr, callback) {
                var url = window.location.href;
                this.getWeChatConfig(url, function (res) {
                    if (res.status === 0) {
                        var conf = res.data;
                        wx.config({
                            debug: false,
                            appId: conf.appId,
                            timestamp: conf.timestamp,
                            nonceStr: conf.nonceStr,
                            signature: conf.signature,
                            jsApiList: apiArr
                        });
                        wx.ready(function () {
                            callback;
                        })
                    } else {
                        alert(res.resmsg)
                    }
                })
            },
            /**
             * @brief 用户注册
             */
            userRegister: function (phone, password, code, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + 'api/userController/userRegister',
                    type: 'POST',
                    data: {
                        phone: phone,
                        password: password,
                        code: code,
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                })
            },
            /**
             * @brief 用户上传头像
             */
            uploadImage: function (headUrl, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + 'api/personController/uploadImage',
                    type: 'POST',
                    data: {
                        headUrl: headUrl
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                })
            },
            /**
             * @brief 修改用户资料
             */
            uptProfile: function (obj, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + 'api/personController/uptProfile',
                    type: 'POST',
                    data: obj,
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                })
            },
            /**
             * @brief 授权登录
             */
            authLogin: function (code, type, callback) {
                var userInfo = {};
                $.ajax({
                    url: href + 'api/userController/authLogin',
                    type: 'POST',
                    async: false,
                    data: {
                        code: code,
                        appid: wxappid,
                        type: type
                    },
                    dataType: 'json',
                    success: function (res) {
                        if (res.status === 0) {
                            $.cookie('token', res.data.token, {
                                path: "/",
                                expires: 7
                            })
                            $.cookie("uid", res.data.uid, {
                                path: "/",
                                expires: 7
                            });
                            $.cookie("openId", res.data.wx, {
                                path: "/",
                                expires: 7
                            });
                            userInfo = res.data;
                        }
                        if (callback) {
                            callback(res);
                        }
                    },
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                })
                return userInfo;
            },
            /**
             * @brief 用户主动凭账号登录
             */
            userLogin: function (callback) {
                var userInfo = {};
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + 'api/userController/login',
                    type: 'POST',
                    async: false,
                    data: {
                        login_type: 2,
                        account: uid,
                        password: token
                    },
                    dataType: 'json',
                    success: function (res) {
                        userInfo = res.data;
                        if (callback) {
                            callback(res);
                        }
                    },
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                })
                return userInfo
            },
            /**
             * @brief 绑定手机号
             */
            bindPhone: function (phone, pwd, code, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + 'api/userController/bindPhone',
                    type: 'POST',
                    data: {
                        phone: phone,
                        pwd: pwd,
                        code: code
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                })
            },
            /***
             * @brief 获取手机验证码
             */
            getPhonecode: function (phone, used_to, callback) {
                $.ajax({
                    url: href + 'api/userController/phoneCode',
                    type: 'GET',
                    data: {
                        phone: phone,
                        used_to: used_to
                    },
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                })
            },
            /***
             * @brief 图片上传 formData
             * 
             * @param {Obeject} file : formData类型
             */
            uploadFile: function (file, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + 'api/personController/uploadFile',
                    type: 'POST',
                    data: file,
                    processData: false,
                    contentType: false,
                    async: true,
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                })
            },
            /***
             * @brief 图片上传 base64
             * 
             * @param {Obeject} file : base64类型
             */
            uploadFileBase64: function (file, callback) {

                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + 'api/personController/uploadFileBase64',
                    type: 'POST',
                    data: {
                        data: file,
                        bath: 'userAuth'
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                })
            },
            /**
             * =========================================================================
             * 
             *                      共享包含地图扫码类 START
             * 
             * =========================================================================
             */
            /**
             * @brief 获取地图网点列表
             **/
            get_home_list: function (lng, lat, dis, callback) {
                $.ajax({
                    async: false,
                    url: href + "api/deviceController/getHomeList",
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        "lng": lng,
                        "lat": lat,
                        "distance": dis
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             *@brief 获取商家详情
             **/
            get_shop_detail: function (shopid, callback) {
                $.ajax({
                    async: false,
                    url: href + "api/mallController/getShopDetail",
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        "id": shopid
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             *@brief 获取代理商信息
             **/
            get_agent_detail: function (agentId, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    async: false,
                    url: href + "api/mallController/getAgentMessage",
                    type: 'GET',
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    data: {
                        "aid": agentId
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 获取商家优惠券
             **/
            get_shop_coupon: function (shopid, callback) {
                $.ajax({
                    async: false,
                    url: href + "api/mallController/getShopCoupon",
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        "id": shopid
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 获取商家设备
             **/
            get_shop_device: function (shopId, status, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                try {
                    $.ajax({
                        async: false,
                        url: href + "api/mallController/mallDevice",
                        type: 'GET',
                        dataType: 'json',
                        beforeSend: function (request) {
                            request.setRequestHeader("token", token);
                            request.setRequestHeader("uid", uid);
                        },
                        data: {
                            "shopId": shopId,
                            "status": status
                        },
                        success: callback,
                        error: function (err) {
                            alert("err:" + JSON.stringify(err));
                        }
                    });
                } catch (e) {
                    alert("exception:" + JSON.stringify(e));
                }
            },
            /**
             *@brief 获取商家佣金
             **/
            get_shop_yojin: function (callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");

                $.ajax({
                    async: true,
                    url: href + "api/mallController/mallShopYojin",
                    type: 'GET',
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 检查设备状态信息
             */
            check_device: function (sno, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + "api/deviceController/checkDevice",
                    type: 'GET',
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    data: {
                        "sno": sno
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @param {string} sno : 设备序列码
             * @param {int} dev_type: 0:IOS 1:Android 2:TypeC 3:Other
             * @brief 远程借一个设备
             * */
            borrow_one: function (sno, dev_type, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                //借用逻辑
                $.ajax({
                    url: href + "api/deviceController/borrowOne",
                    type: 'GET',
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    data: {
                        'sno': sno,
                        "type": dev_type
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @param {string} sno : 设备序列码
             * @brief 远程还一个设备
             * */
            return_one: function (sno, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");

                //借用逻辑
                $.ajax({
                    url: href + "api/deviceController/returnOne",
                    type: 'GET',
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    data: {
                        'sno': sno
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @param {string} orderNo : 订单状态
             * @brief 请求远程开启设备，模式：先支付后开启设备
             * */
            share_device: function (orderNo, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + "api/deviceController/shareDevice",
                    type: 'GET',
                    dataType: 'json',
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    data: {
                        "orderno": orderNo
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @param {string} sno : 设备序列码
             * @param {int} pay_type: 0:钱包  1:微信   2:微信H5支付  3:支付宝支付 4:支付宝生活号
             * @brief 请求远程开启设备，模式：先支付后开启设备
             * */
            open_device: function (sno, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                // var openId	= $.cookie("openId");  
                //借用逻辑
                $.ajax({
                    url: href + "api/deviceController/openDevice",
                    type: 'GET',
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    data: {
                        "sno": sno
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 等待设备开启状态 ,FIXME: 修改使用dno 或者 orderNo来查询
             */
            wait_device: function (orderNo, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");

                // 根据订单状态，查询设备开启结果
                $.ajax({
                    url: href + "api/deviceController/queryRecordDetail",
                    type: 'GET',
                    data: {
                        orderNo: orderNo
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 查询最新的未结束订单信息
             **/
            query_using_order: function (callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");

                // 获取订单
                $.ajax({
                    url: href + "api/deviceController/queryTime",
                    type: 'GET',
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 判断是否为支付宝环境
             **/
            is_alipay: function () {
                if (/AlipayClient/.test(window.navigator.userAgent)) {
                    return true;
                } else {
                    return false;
                }
            },
            /**
             * @brief 获取支付宝用户信息
             **/
            query_userinfo_alipay: function (code) {
                // 同步获取支付宝
                $.ajax({
                    async: false,
                    type: "post",
                    url: href + "api/alipayController/getAlipayAppId",
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    data: {
                        "code": code
                    },
                    dataType: 'json',
                    success: function (res) {
                        var Obj = eval("(" + res.data.body + ")");
                        var userData = Obj.alipay_user_info_share_response;

                        try {
                            userInfo.city = userData.city;
                            userInfo.headimgurl = userData.avatar;
                            userInfo.nickname = userData.nick_name;
                            userInfo.openid = userData.user_id;
                            userInfo.province = userData.province;
                            userInfo.sex = userData.user_type;
                            // 缓存openId;
                            $.cookie("openId", userInfo.openid, {
                                path: "/",
                                expires: 7
                            });
                        } catch (e) {
                            alert('exception:' + JSON.stringify(e));
                        }
                    }
                });

                return userInfo;
            },
            /**
             * @brief 获取微信用户信息  // remove
             **/
            query_userinfo_weixin: function (code) {
                // 同步获取微信
                $.ajax({
                    async: false,
                    type: "post",
                    url: href + "api/weixinController/getWeChatAppId",
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    data: {
                        "code": code
                    },
                    dataType: 'json',
                    success: function (res) {
                        var jsonObj = eval("(" + res.data + ")");
                        try {
                            userInfo.city = jsonObj.city;
                            userInfo.country = jsonObj.country;
                            userInfo.headimgurl = jsonObj.headimgurl;
                            userInfo.nickname = jsonObj.nickname;
                            userInfo.openid = jsonObj.openid;
                            userInfo.province = jsonObj.province;
                            userInfo.sex = jsonObj.sex;

                            // 缓存openId;
                            $.cookie("openId", userInfo.openid, {
                                path: "/",
                                expires: 7
                            });
                        } catch (e) {

                        }
                    }
                });

                return userInfo;
            },
            /**
             * @brief 唤起微信扫一扫
             **/
            wakeup_scan_weixin: function (url, callback) {
                $.ajax({
                    url: href + "/api/weixinController/getWeChatConfig?url=" + url,
                    type: "GET",
                    async: false,
                    success: function (msg) {
                        if (msg.status === 0) {
                            var wxData = msg;
                            wx.config({
                                debug: false,
                                appId: wxData.data.appId,
                                timestamp: wxData.data.timestamp,
                                nonceStr: wxData.data.nonceStr,
                                signature: wxData.data.signature,
                                jsApiList: [
                                    // 所有要调用的 API 都要加到这个列表中
                                    'scanQRCode'
                                ]
                            });
                            wx.ready(function () {
                                wx.scanQRCode({
                                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                                    scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                                    success: function (data) {
                                    if (callback) {
                                        callback(data.resultStr)
                                    } else {
                                        mcfish.Handle.handle_scan_result(data.resultStr); // 扫描结果处理函数
                                    }
                                    }
                                });
                            });
                            wx.error(function (res) {
                                console.log("出错了：" + res.errMsg);
                            });
                        }
                    }
                });
            },
            /**
             * @param {Object} data: 微信支付信息
             * @brief 唤起微信支付
             **/
            wakeup_pay_weixin: function (data) {
                if (data == null) {
                    alert('唤起支付失败：参数错误');
                    return;
                }

                function onBridgeReady() {
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId": data.str.appId, //公众号名称，由商户传入     
                            "timeStamp": data.str.timeStamp, //时间戳，自1970年以来的秒数     
                            "nonceStr": data.str.nonceStr, //随机串     
                            "package": data.str.packAge,
                            "signType": data.str.signType, //微信签名方式：
                            "paySign": data.str.paySign //微信签名 
                        },
                        function (res) {
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                //跳转等待页面
                                window.history.go(-1)
                                // window.location.href = destHost + 'app/pages/user/charge.html';
                            } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                        }
                    );
                }
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                } else {
                    onBridgeReady();
                }
            },
            /**
             * @brief 唤起支付宝扫一扫
             **/
            wakeup_scan_alipay: function () {
                if (navigator.userAgent.indexOf("AlipayClient") === -1) {
                    alert('请在支付宝钱包内运行');
                } else {
                    if ((Ali.alipayVersion).slice(0, 3) >= 8.1) {
                        Ali.scan({
                            type: 'qr'
                        }, function (result) {
                            if (result.errorCode) {
                                switch (result.errorCode) {
                                    case 10:
                                        alert('用户取消');
                                        break;
                                    default:
                                        alert('操作失败');
                                        break;
                                }
                            } else {
                                //成功扫码的情况
                                if (result.barCode !== undefined) {
                                    alert('条码是：' + result.barCode);
                                } else if (result.qrCode !== undefined) {
                                    mcfish.Handle.handle_scan_result(result.qrCode); // 扫描结果处理函数
                                } else if (result.cardNumber !== undefined) {
                                    alert('银行卡号是：' + result.cardNumber);
                                }
                            }
                        });
                    } else {
                        alert('请在钱包8.1以上版本运行');
                    }
                }
            },
            /**
             * @param {Object} data: 支付宝支付信息
             * @brief 唤起支付宝支付
             **/
            wakeup_pay_alipay: function (data) {
                if (data == null) {
                    alert('唤起支付失败：参数错误');
                    return;
                }
                var json = JSON.parse(data);
                var trade_no = json.alipay_trade_create_response.trade_no;
                if (trade_no == undefined) {
                    alert('获取支付数据失败');
                    return;
                }

                AlipayJSBridge.call("tradePay", {
                    tradeNO: trade_no
                }, function (result) {
                    if (result.resultCode == '9000') { // 支付成功
                        window.location.href = "Merchant/refund.html";
                        return;
                    } else {
                        alert(result.memo);
                        return;
                    }
                });
            },
            /**
             * @param {String} scop: snsapi_base:基本授权， snsapi_userinfo:确认授权
             * @brief 获取微信授权URL
             **/
            get_auth_url_weixin: function (url, scope) {
                var uri = encodeURIComponent(url);

                var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wxappid + '&' +
                    'redirect_uri=' + uri + '&' +
                    'response_type=code&' +
                    'scope=' + scope + '&' +
                    'state=123#wechat_redirect'
                return url;
            },
            /**
             * @param {String} scop: auth_base:基本授权， auth_user:确认授权
             * @brief 获取支付宝授权URL
             **/
            get_auth_url_alipay: function (url, scope) {
                var uri = encodeURIComponent(url);
                var url = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=' + alappid +
                    '&auth_skip=false&scope=' + scope +
                    '&redirect_uri=' + uri;
                return url;
            },
            /**
             * @brief 根据设备编号，获取关联的商家信息
             **/
            get_shop_detail_by_sno: function (sno, callback) {
                $.ajax({
                    url: href + "api/deviceController/getSnoShop",
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        "sno": sno
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 领取商家的优惠券
             **/
            recv_shop_coupon: function (code, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + "api/mallController/recvCoupon",
                    type: 'POST',
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    data: {
                        "type": 1,
                        "code": code
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 使用商家的优惠券
             **/
            use_shop_coupon: function (id, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");

                $.ajax({
                    url: href + "api/mallController/useCoupon",
                    type: 'GET',
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    data: {
                        "type": 1,
                        "coupon_id": id
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 获取指定的系统参数
             * */
            getCharge: function (callback) {
                $.ajax({
                    url: href + "api/systemController/getCharge",
                    type: 'GET',
                    dataType: 'json',
                    data: {},
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 获取指定的系统参数
             * */
            get_system_value: function (key, callback) {
                $.ajax({
                    url: href + "api/systemController/getSystemContent",
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    data: {
                        "key": key
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 获取全部的系统配置
             **/
            get_system_conf: function (callback) {
                $.ajax({
                    url: href + "api/systemController/getSystemConfig",
                    type: 'GET',
                    dataType: 'json',
                    data: {},
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 获取指定的参数(关于类，帮助类)
             * */
            get_app_content: function (key, callback) {
                $.ajax({
                    url: href + "api/systemController/getAppContent",
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    data: {
                        "key": key
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 获取我的借还记录
             **/
            get_my_borrow: function (page, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + "api/personController/queryBorrow",
                    type: 'GET',
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    data: {
                        'page': page
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @param {int} type: 0:平台 1：商家 2全部
             * @param {int} status ：状态 0-未使用 1-已使用 2-已过期 3-全部
             * @brief 获取我的优惠券
             * */
            get_my_coupon: function (callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + "api/personController/myCoupon",
                    type: 'GET',
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    data: {
                        type: 0
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 申请成为小二
             **/
            request_as_staff: function (agentId, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");

                $.ajax({
                    url: href + "api/mallController/addAgentStaff",
                    type: 'POST',
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    data: {
                        "agentId": agentId
                    },
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 获取个人信息
             **/
            getProfile: function (callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + "api/personController/getProfile",
                    type: 'GET',
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    async: false,
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 充值系统
             **/
            chargeMoney: function (amount, pay_type, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                var openId = $.cookie("openId");
                $.ajax({
                    url: href + "api/walletController/charge",
                    type: 'POST',
                    data: {
                        amount: amount,
                        pay_type: pay_type,
                        openId: openId,
                        used_to:1
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            queryRecordMoney: function(callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url:href+"api/walletController/queryRecordMoney",   
                    type:'GET', 
                   beforeSend: function(request) {
                         request.setRequestHeader("token", token);
                         request.setRequestHeader("uid", uid);
                    },
                    dataType:'json',
                    data:{"page":0},
                    success:callback
                })
            },
            /**
             * @brief 申请提现
             **/
            withdraws: function (obj, callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + "api/walletController/withdraws",
                    type: 'POST',
                    data: obj,
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 根据设备号获取设备详情
             **/
            queryDevice: function (sno, callback) {
                $.ajax({
                    url: href + "api/deviceController/queryDevice",
                    type: 'GET',
                    data: {
                        sno: sno
                    },
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            },
            /**
             * @brief 开启查询状态
             **/
            queryTime: function (callback) {
                var token = $.cookie("token");
                var uid = $.cookie("uid");
                $.ajax({
                    url: href + "api/deviceController/queryTime",
                    type: 'GET',
                    beforeSend: function (request) {
                        request.setRequestHeader("token", token);
                        request.setRequestHeader("uid", uid);
                    },
                    async: false,
                    dataType: 'json',
                    success: callback,
                    error: function (err) {
                        alert('err:' + JSON.stringify(err));
                    }
                });
            }
            /**
             * =================================================
             * 
             *                共享包含地图类 END
             * 
             * =================================================
             */
        },
        /***************************************************************
         ** 
         * @brief 本地辅助函数
         **
         ***************************************************************/
        Handle: {
            /**
             * @param {String} url: 扫码结果字符串
             * @param {Function} succ_callback: 成功回调，不设置的话就默认跳转到设备详情页
             * @brief 处理扫描结果
             * */
            handle_scan_result: function (url, callback) {
                // 解析扫描的结果
                var that = this;
                var request = mcfish.Tools.parseURL(url);
                // 安全交验
                // if (request.host != destHost){
                //     alert('不能识别的二维码');
                //     return;
                // }
                // 判断是否有cmd
                // if (request.params['cmd'] != undefined) {
                //     switch (request.params['cmd']) {
                //         case 'staff': // 成为小二
                //             window.location.href = href + "app/Merchant/staff.html?agentId=" + request.params['agentId'];
                //             return;
                //         case 'share': // 转借设备
                //             return;
                //         default:
                //             alert('不能识别的二维码');
                //             return;
                //     }
                // }
                // 判断是否有SNO
                if (request.params['sno'] == undefined) {
                    alert('不能识别的二维码');
                    return;
                }
                // 成功获取到设备的序列码，检查设备状态	
                var sno = request.params['sno'];
                window.location.href = destHost + 'app/pages/dev/device.html?sno=' + sno // 跳转device
            },
            /**
             * @param {object} data: 设备信息
             * @param {string} sno: 设备编号
             * @brief 处理设备操作返回码
             * */
            handle_device_status: function (data, sno) {
                switch (data.status) {
                    case 0:
                        window.location.href = destHost + 'app/pages/dev/loading.html?orderNo=' + data.data.orderno;
                        return;
                    case 510:
                        alert('设备正在使用中');
                        return;
                    case 502: // 余额不足
                        alert("您的余额不足！");
                        // FIXME: 跳转到充值页面
                        break;
                    case 506: // 设备离线
                        alert('此设备离线！');
                        break;
                    case 507: // 设备不存在
                        alert('此设备不存在！');
                        break;
                    case 509: // 设备故障
                        alert('设备故障!');
                        break;
                    default:
                        alert('未知错误：' + data.resmsg);
                        window.location.href = destHost + "app/pages/dev/los.html";
                        break;
                };
            },
            /**
             * 
             * @param brief 上传图片方式
             * @param {object} files: input[0].files
             * 
             * 利用promise 异步机制拿到 同步数据
             * 
             * */
            postImgURL: function (files) {
                var file = files;
                if (typeof FileReader == 'undefined') {
                    alert("<p>你的浏览器不支持FileReader接口！</p>");
                }
                if (!/image\/\w+/.test(file.type)) { //检验是否为图像文件  
                    alert("看清楚，这个需要图片！");
                    return false;
                }
                // return new Promise(function (resolve, reject) { //通过 fromData 来上传
                //     var fdata = new FormData();
                //     fdata.append('file', file)
                //     fdata.append('bath', 'userAuth')
                //     mcfish.API.uploadFile(fdata, function (res) {
                //         if (res.status === 0) {
                //             resolve(res.data.fileUrl)
                //         }
                //         else {
                //             alert(res.resmsg)
                //         }
                //     })
                // })
                return new Promise(function (resolve, reject) { // 通过 base64 上传
                    let reader = new FileReader()
                    reader.readAsDataURL(file) // base64
                    reader.onload = function () {
                        var initImgSize = this.result.length;
                        var img = new Image();
                        img.src = this.result;
                        if (initImgSize <= (200 * 1024)) { // if >  200kb should upload
                            mcfish.API.uploadFileBase64(this.result, function (res) {
                                if (res.status === 0) {
                                    resolve(res.data.fileUrl)
                                } else {
                                    alert("上传失败");
                                }
                            })
                        } else { //  进行压缩上传 compress
                            img.onload = function () { // 当图片加载完成时
                                var compressUrl = compress(img)
                                mcfish.API.uploadFileBase64(compressUrl, function (res) {
                                    if (res.status === 0) {
                                        resolve(res.data.fileUrl)
                                    } else {
                                        alert(res.resmsg);
                                    }
                                })
                            }
                        }
                    }
                })
                function compress(img) { // 压缩方法 
                    var initSize = img.src.length;
                    var width = img.width;
                    var height = img.height;
                    var canvas = document.createElement('canvas');
                    var tCanvas = document.createElement('canvas'); // 创建瓦片canvas 
                    var ctx = canvas.getContext('2d')
                    var tctx = tCanvas.getContext('2d')
                    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
                    var ratio;
                    if ((ratio = width * height / 4000000) > 1) {
                        ratio = Math.sqrt(ratio);
                        width /= ratio;
                        height /= ratio;
                    } else {
                        ratio = 1;
                    }
                    canvas.width = width;
                    canvas.height = height;
                    //  铺底色
                    ctx.fillStyle = "#fff";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    //  如果图片像素大于100万则使用瓦片绘制
                    var count;
                    if ((count = width * height / 1000000) > 1) {
                        count = ~~(Math.sqrt(count) + 1); //  计算要分成多少块瓦片
                        //  计算每块瓦片的宽和高
                        var nw = ~~(width / count);
                        var nh = ~~(height / count);
                        tCanvas.width = nw;
                        tCanvas.height = nh;
                        for (var i = 0; i < count; i++) {
                            for (var j = 0; j < count; j++) {
                                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                            }
                        }
                    } else {
                        ctx.drawImage(img, 0, 0, width, height);
                    }
                    //进行比率压缩
                    var ndata = canvas.toDataURL('image/jpeg', 0.7); // 处理
                    console.log('压缩前：' + initSize);
                    console.log('压缩后：' + ndata.length);
                    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
                    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
                    return ndata;
                }
            },
        },
        /***************************************************************
         ** 
         * @brief 本地工具函数
         **
         ***************************************************************/
        Tools: {
            /** 
             * @param {string} url 完整的URL地址 
             * @returns {object} 自定义的对象 
             * @description 用法示例：var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');
             * */
            parseURL: function (url) {
                var a = document.createElement('a');
                a.href = url;
                return {
                    source: url,
                    protocol: a.protocol.replace(':', ''),
                    host: a.hostname,
                    port: a.port,
                    query: a.search,
                    params: (function () {
                        var ret = {},
                            seg = a.search.replace(/^\?/, '').split('&'),
                            len = seg.length,
                            i = 0,
                            s;
                        for (; i < len; i++) {
                            if (!seg[i]) {
                                continue;
                            }
                            s = seg[i].split('=');
                            ret[s[0]] = s[1];
                        }
                        return ret;
                    })(),
                    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
                    hash: a.hash.replace('#', ''),
                    path: a.pathname.replace(/^([^\/])/, '/$1'),
                    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
                    segments: a.pathname.replace(/^\//, '').split('/')
                };
            },
            /**
             * @param {double} lat为纬度, lng为经度, 
             * @brief 计算两点之间的距离
             * */
            getDisance: function (lat1, lng1, lat2, lng2) {
                function toRad(d) {
                    return d * Math.PI / 180;
                }
                var dis = 0;
                var radLat1 = toRad(lat1);
                var radLat2 = toRad(lat2);
                var deltaLat = radLat1 - radLat2;
                var deltaLng = toRad(lng1) - toRad(lng2);
                var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
                return (dis * 6378137).toFixed(2);
            },
            /**
             * @brief 整数排序
             * */
            intBy: function (name) {
                return function (o, p) {
                    var a, b;
                    if (typeof o === "object" && typeof p === "object" && o && p) {
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
            },
            /**
             * @brief 手机验证
             * */
            isTel: function (phone) {
                var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test(phone)) {
                    return false;
                } else {
                    return true;
                }
            },
            /**
             * @brief 获取cookie
             * */
            GetCookie: function (offset) {
                var endstr = document.cookie.indexOf(";", offset);
                if (endstr == -1)
                    endstr = document.cookie.length;
                return decodeURIComponent(document.cookie.substring(offset, endstr));
            },
            /**
             * @brief 删除cookie
             * */
            DelCookie: function (name) {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval = this.GetCookie(name);
                document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString() + "; path=/";
            }
        }
    }

    window.mcfish = mcfish;

}(window)

/*
    1. 引入相应的页面去
    2. 调用：
        var $http = mcFish.API
        $http.get();
        $handle 

*/